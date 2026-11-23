"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface ParticleBarChartProps {
  leakedRevenue: number
  recapturedRevenue: number
  periodYears: number
}

export function ParticleBarChart({
  leakedRevenue,
  recapturedRevenue,
  periodYears,
}: ParticleBarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const barTargetsRef = useRef<number[]>([])
  const currentHeightsRef = useRef<number[]>([])

  // Calculate target heights for each year
  useEffect(() => {
    const barsCount = periodYears === 3 ? 3 : periodYears === 5 ? 5 : 8
    const heights: number[] = []
    
    // Max scale benchmark
    const maxVal = Math.max(leakedRevenue * (periodYears / 2.5), 100000)
    for (let i = 1; i <= barsCount; i++) {
      const yearMultiplier = i / barsCount
      const projectedVal = leakedRevenue * yearMultiplier * 1.2
      const normalizedHeight = Math.min(Math.max((projectedVal / maxVal) * 3.8, 0.4), 4.2)
      heights.push(normalizedHeight)
    }
    
    barTargetsRef.current = heights
    while (currentHeightsRef.current.length < heights.length) {
      currentHeightsRef.current.push(0.2)
    }
  }, [leakedRevenue, recapturedRevenue, periodYears])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    )
    camera.position.set(0, 1.2, 6.2)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    container.appendChild(renderer.domElement)

    // Particle texture
    const canvas = document.createElement("canvas")
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext("2d")
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.3, "rgba(226, 184, 87, 0.95)")
      gradient.addColorStop(0.7, "rgba(212, 175, 55, 0.3)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 32, 32)
    }
    const texture = new THREE.CanvasTexture(canvas)

    // Bars setup
    const barsCount = 8
    const particlesPerBar = 120
    const totalParticles = barsCount * particlesPerBar

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(totalParticles * 3)
    const colors = new Float32Array(totalParticles * 3)

    const colorGold = new THREE.Color(0xe2b857)
    const colorCap = new THREE.Color(0xfff0b3)
    const colorAmber = new THREE.Color(0xd49b27)

    const barWidth = 0.45
    const spacing = 0.65
    const startX = -((barsCount - 1) * spacing) / 2

    // Initialize positions
    for (let b = 0; b < barsCount; b++) {
      const bx = startX + b * spacing
      for (let p = 0; p < particlesPerBar; p++) {
        const idx = (b * particlesPerBar + p) * 3
        const py = (p / particlesPerBar) * 2.5
        const px = bx + (Math.random() - 0.5) * barWidth * 0.7
        const pz = (Math.random() - 0.5) * 0.25

        positions[idx] = px
        positions[idx + 1] = py - 1.2
        positions[idx + 2] = pz

        // Top 10% particles glow bright white-gold
        if (p / particlesPerBar > 0.88) {
          colors[idx] = colorCap.r
          colors[idx + 1] = colorCap.g
          colors[idx + 2] = colorCap.b
        } else {
          colors[idx] = colorGold.r
          colors[idx + 1] = colorGold.g
          colors[idx + 2] = colorAmber.b
        }
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const pointSystem = new THREE.Points(geometry, material)
    scene.add(pointSystem)

    // Base glowing baseline grid
    const gridGeometry = new THREE.BufferGeometry()
    const gridPositions = new Float32Array([
      startX - 0.5, -1.25, 0,
      -startX + 0.5, -1.25, 0
    ])
    gridGeometry.setAttribute("position", new THREE.BufferAttribute(gridPositions, 3))
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0xe2b857,
      transparent: true,
      opacity: 0.4,
    })
    const baseLine = new THREE.Line(gridGeometry, gridMaterial)
    scene.add(baseLine)

    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      const posAttr = geometry.attributes.position as THREE.BufferAttribute
      const activeCount = periodYears === 3 ? 3 : periodYears === 5 ? 5 : 8

      for (let b = 0; b < barsCount; b++) {
        const targetH = b < activeCount ? (barTargetsRef.current[b] || 1.0) : 0.05
        const currentH = currentHeightsRef.current[b] || 0.5
        const newH = currentH + (targetH - currentH) * 0.08
        currentHeightsRef.current[b] = newH

        const bx = startX + b * spacing

        for (let p = 0; p < particlesPerBar; p++) {
          const idx = (b * particlesPerBar + p) * 3
          const normalizedP = p / particlesPerBar
          const y = -1.2 + normalizedP * newH + Math.sin(time * 3 + b + p) * 0.02
          const x = bx + (Math.random() - 0.5) * 0.05 * (b < activeCount ? 1 : 0)

          posAttr.setXYZ(idx, x, y, (Math.random() - 0.5) * 0.08)
        }
      }

      posAttr.needsUpdate = true

      // Gentle scene tilt
      pointSystem.rotation.y = Math.sin(time * 0.5) * 0.08

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      texture.dispose()
      gridGeometry.dispose()
      gridMaterial.dispose()
      renderer.dispose()
    }
  }, [periodYears])

  return (
    <div className="relative w-full h-[280px] sm:h-[320px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full" />
      {/* Floating HUD Axis Overlay */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-around px-4 pointer-events-none text-[10px] font-mono text-[#E2B857]/60 tracking-wider">
        <span>Y1</span>
        <span>Y2</span>
        <span>Y3</span>
        {periodYears >= 5 && <span>Y4</span>}
        {periodYears >= 5 && <span>Y5</span>}
        {periodYears >= 8 && <span>Y6</span>}
        {periodYears >= 8 && <span>Y7</span>}
        {periodYears >= 8 && <span>Y8</span>}
      </div>
    </div>
  )
}
