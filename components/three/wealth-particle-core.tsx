"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WealthParticleCore() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInteracting = useRef(false)
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x08080a, 0.035)

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 7.5)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // 2. Build Procedural Gold Particle Core (Neural Wealth Knot)
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 3500 : 9000

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)

    // Color swatches: Bright Gold, Metallic Amber, Pure Platinum Core
    const colorGold = new THREE.Color(0xe2b857)
    const colorAmber = new THREE.Color(0xf59e0b)
    const colorCore = new THREE.Color(0xffe89e)
    const tempColor = new THREE.Color()

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random() * Math.PI * 2
      const v = Math.random() * Math.PI * 2
      const r = 2.4 + (Math.random() - 0.5) * 0.7

      // Trefoil / Torus knot parametric coordinates
      const p = 2
      const q = 3
      const phi = (i / particleCount) * Math.PI * 2 * 4 + (Math.random() - 0.5) * 0.3
      const rad = 2.1 + Math.sin(q * phi) * 0.65
      
      const x = rad * Math.cos(p * phi) + (Math.random() - 0.5) * 0.35
      const y = rad * Math.sin(p * phi) + (Math.random() - 0.5) * 0.35
      const z = -Math.sin(q * phi) * 1.5 + (Math.random() - 0.5) * 0.35

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z

      scales[i] = Math.random() * 0.8 + 0.4

      // Color distribution: hotter gold in denser center, amber on outer fringes
      const dist = Math.sqrt(x * x + y * y + z * z)
      if (dist < 2.0) {
        tempColor.copy(colorCore)
      } else if (dist < 2.7) {
        tempColor.lerpColors(colorGold, colorAmber, Math.random())
      } else {
        tempColor.copy(colorAmber)
      }

      colors[i * 3] = tempColor.r
      colors[i * 3 + 1] = tempColor.g
      colors[i * 3 + 2] = tempColor.b
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    // 3. Circular Particle Texture
    const canvas = document.createElement("canvas")
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext("2d")
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.25, "rgba(245, 184, 87, 0.9)")
      gradient.addColorStop(0.65, "rgba(212, 175, 55, 0.25)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 64, 64)
    }
    const particleTexture = new THREE.CanvasTexture(canvas)

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.08 : 0.065,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // 4. Reflective Obsidian Floor Plane
    const floorGeometry = new THREE.PlaneGeometry(30, 30, 32, 32)
    const floorMaterial = new THREE.MeshBasicMaterial({
      color: 0x050508,
      transparent: true,
      opacity: 0.85,
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -2.8
    scene.add(floor)

    // Secondary Floor Reflection Particles (Inverted Mirror)
    const mirrorGeometry = geometry.clone()
    const mirrorMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.07 : 0.055,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const mirrorSystem = new THREE.Points(mirrorGeometry, mirrorMaterial)
    mirrorSystem.position.y = -5.6
    mirrorSystem.scale.y = -1
    scene.add(mirrorSystem)

    // 5. Mouse Damping / Cursor Lerp
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouse.current.targetX = x * 0.8
      mouse.current.targetY = y * 0.5
      isInteracting.current = true
    }

    window.addEventListener("mousemove", handleMouseMove)

    // 6. Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()

      // Smooth camera lerp
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.04
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.04

      camera.position.x = mouse.current.x * 1.5
      camera.position.y = mouse.current.y * 1.2
      camera.lookAt(0, 0, 0)

      // Slow orbital rotation of particle core
      particleSystem.rotation.y = time * 0.12
      particleSystem.rotation.x = Math.sin(time * 0.08) * 0.15

      mirrorSystem.rotation.y = particleSystem.rotation.y
      mirrorSystem.rotation.x = -particleSystem.rotation.x

      // Subtle dynamic particle breathing
      const posAttr = geometry.attributes.position as THREE.BufferAttribute
      const count = posAttr.count
      for (let i = 0; i < count; i += 3) {
        const ox = originalPositions[i * 3]
        const oy = originalPositions[i * 3 + 1]
        const oz = originalPositions[i * 3 + 2]

        const wave = Math.sin(time * 1.5 + ox * 1.8 + oy * 1.8) * 0.06
        posAttr.setXYZ(i, ox + ox * wave, oy + oy * wave, oz + oz * wave)
      }
      posAttr.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // 7. Handle Resize
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // 8. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      mirrorGeometry.dispose()
      material.dispose()
      mirrorMaterial.dispose()
      particleTexture.dispose()
      floorGeometry.dispose()
      floorMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  )
}
