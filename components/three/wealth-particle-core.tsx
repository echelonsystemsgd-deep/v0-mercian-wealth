"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WealthParticleCore() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene, Camera & Atmospheric Fog Setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x070709, 0.038)

    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.1,
      120
    )
    camera.position.set(0, 0.2, 8.2)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // 2. Generate Mercian Wealth M-W Crest Procedural Particle Geometry
    // Exactly maps the brand emblem: Top 'M' chevron, bottom 'W' chevron, waist diamond cuts, central orb.
    const isMobile = window.innerWidth < 768
    const crestParticleCount = isMobile ? 3800 : 8500
    const ambientParticleCount = isMobile ? 800 : 1800
    const totalCount = crestParticleCount + ambientParticleCount

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(totalCount * 3)
    const originalPositions = new Float32Array(totalCount * 3)
    const colors = new Float32Array(totalCount * 3)
    const scales = new Float32Array(totalCount)

    // Gold & Amber palette
    const colorHotGold = new THREE.Color(0xfff0b8) // Bright highlight
    const colorLiquidGold = new THREE.Color(0xe2b857) // Signature Mercian Gold
    const colorMetallicAmber = new THREE.Color(0xf59e0b) // Rich Amber
    const colorDeepBronze = new THREE.Color(0x92611a) // Shadow depth
    const tempColor = new THREE.Color()

    // Helper: sample random point on line segment with jitter
    function sampleSegment(
      p1: [number, number],
      p2: [number, number],
      thickness: number,
      zDepth: number
    ): [number, number, number] {
      const t = Math.random()
      const x = p1[0] + (p2[0] - p1[0]) * t + (Math.random() - 0.5) * thickness
      const y = p1[1] + (p2[1] - p1[1]) * t + (Math.random() - 0.5) * thickness
      const z = (Math.random() - 0.5) * zDepth
      return [x, y, z]
    }

    // Mathematical definition of Mercian Crest vector segments
    const crestScale = 1.35
    const segments: Array<[[number, number], [number, number]]> = [
      // Top 'M' Left Wing Outer & Peak
      [[-1.35 * crestScale, 0.3 * crestScale], [-1.35 * crestScale, 2.1 * crestScale]],
      [[-1.35 * crestScale, 2.1 * crestScale], [0.0, 0.45 * crestScale]],
      // Top 'M' Right Wing Outer & Peak
      [[0.0, 0.45 * crestScale], [1.35 * crestScale, 2.1 * crestScale]],
      [[1.35 * crestScale, 2.1 * crestScale], [1.35 * crestScale, 0.3 * crestScale]],

      // Waist Diamond Cutouts (Left & Right)
      [[-1.35 * crestScale, 0.3 * crestScale], [-0.85 * crestScale, 0.0]],
      [[-0.85 * crestScale, 0.0], [-1.35 * crestScale, -0.3 * crestScale]],
      [[1.35 * crestScale, 0.3 * crestScale], [0.85 * crestScale, 0.0]],
      [[0.85 * crestScale, 0.0], [1.35 * crestScale, -0.3 * crestScale]],

      // Bottom 'W' Left Wing Outer & Valley
      [[-1.35 * crestScale, -0.3 * crestScale], [-1.35 * crestScale, -2.1 * crestScale]],
      [[-1.35 * crestScale, -2.1 * crestScale], [0.0, -0.45 * crestScale]],
      // Bottom 'W' Right Wing Outer & Valley
      [[0.0, -0.45 * crestScale], [1.35 * crestScale, -2.1 * crestScale]],
      [[1.35 * crestScale, -2.1 * crestScale], [1.35 * crestScale, -0.3 * crestScale]],

      // Inner Diagonal Facets
      [[-1.1 * crestScale, 1.2 * crestScale], [0.0, 0.45 * crestScale]],
      [[1.1 * crestScale, 1.2 * crestScale], [0.0, 0.45 * crestScale]],
      [[-1.1 * crestScale, -1.2 * crestScale], [0.0, -0.45 * crestScale]],
      [[1.1 * crestScale, -1.2 * crestScale], [0.0, -0.45 * crestScale]],
    ]

    // Populate Crest Particles
    for (let i = 0; i < crestParticleCount; i++) {
      let x = 0, y = 0, z = 0

      // 12% of particles form the central glowing gold orb
      if (i < crestParticleCount * 0.12) {
        const u = Math.random()
        const v = Math.random()
        const theta = u * 2.0 * Math.PI
        const phi = Math.acos(2.0 * v - 1.0)
        const r = Math.cbrt(Math.random()) * (0.34 * crestScale)
        const sinPhi = Math.sin(phi)
        x = r * sinPhi * Math.cos(theta)
        y = r * sinPhi * Math.sin(theta)
        z = r * Math.cos(phi) * 0.85

        tempColor.lerpColors(colorHotGold, colorLiquidGold, Math.random() * 0.5)
      } else {
        // Sample one of the crest vector segments
        const segIdx = Math.floor(Math.random() * segments.length)
        const [p1, p2] = segments[segIdx]
        const sampled = sampleSegment(p1, p2, 0.14, 0.55)
        x = sampled[0]
        y = sampled[1]
        z = sampled[2]

        const dist = Math.sqrt(x * x + y * y)
        if (Math.abs(y) > 1.8) {
          tempColor.lerpColors(colorHotGold, colorLiquidGold, 0.4)
        } else if (dist < 1.0) {
          tempColor.copy(colorLiquidGold)
        } else {
          tempColor.lerpColors(colorLiquidGold, colorMetallicAmber, Math.random())
        }
      }

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z

      scales[i] = Math.random() * 0.7 + 0.45

      colors[i * 3] = tempColor.r
      colors[i * 3 + 1] = tempColor.g
      colors[i * 3 + 2] = tempColor.b
    }

    // Populate Ambient Golden Dust Motes
    for (let i = crestParticleCount; i < totalCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const radius = 2.5 + Math.random() * 4.2
      const x = Math.cos(theta) * radius + (Math.random() - 0.5) * 1.5
      const y = (Math.random() - 0.5) * 6.5
      const z = (Math.random() - 0.5) * 4.5

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z

      scales[i] = Math.random() * 0.4 + 0.2
      tempColor.lerpColors(colorMetallicAmber, colorDeepBronze, Math.random())

      colors[i * 3] = tempColor.r
      colors[i * 3 + 1] = tempColor.g
      colors[i * 3 + 2] = tempColor.b
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    // 3. Circular Particle Alpha Texture
    const particleCanvas = document.createElement("canvas")
    particleCanvas.width = 64
    particleCanvas.height = 64
    const pctx = particleCanvas.getContext("2d")
    if (pctx) {
      const gradient = pctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.25, "rgba(245, 184, 87, 0.95)")
      gradient.addColorStop(0.65, "rgba(212, 175, 55, 0.28)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      pctx.fillStyle = gradient
      pctx.fillRect(0, 0, 64, 64)
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas)

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.075 : 0.058,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const crestSystem = new THREE.Points(geometry, material)
    crestSystem.position.set(0, 0.25, 0)
    scene.add(crestSystem)

    // 4. Distant Low-Poly Mountain Silhouette
    const mountainGeom = new THREE.BufferGeometry()
    const mountainVerts: number[] = []
    const mountainSegments = 24
    const mountainWidth = 36
    for (let i = 0; i <= mountainSegments; i++) {
      const x = (i / mountainSegments) * mountainWidth - mountainWidth / 2
      const peakY = -1.6 + Math.sin(i * 0.9) * 0.45 + Math.cos(i * 1.7) * 0.3
      // Triangle strip
      mountainVerts.push(x, peakY, -14)
      mountainVerts.push(x, -3.2, -14)
    }
    mountainGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(mountainVerts, 3)
    )
    const mountainMat = new THREE.MeshBasicMaterial({
      color: 0x09090d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    })
    const mountains = new THREE.Mesh(mountainGeom, mountainMat)
    scene.add(mountains)

    // 5. Planar Water Surface & Inverted Crest Reflection Plane
    const waterLevel = -2.75
    const floorGeometry = new THREE.PlaneGeometry(36, 26, 32, 32)
    const floorMaterial = new THREE.MeshBasicMaterial({
      color: 0x050508,
      transparent: true,
      opacity: 0.88,
    })
    const waterPlane = new THREE.Mesh(floorGeometry, floorMaterial)
    waterPlane.rotation.x = -Math.PI / 2
    waterPlane.position.y = waterLevel
    scene.add(waterPlane)

    // Inverted mirror reflection points
    const mirrorGeometry = geometry.clone()
    const mirrorMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.065 : 0.048,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const mirrorSystem = new THREE.Points(mirrorGeometry, mirrorMaterial)
    mirrorSystem.position.set(0, waterLevel * 2 - 0.25, 0)
    mirrorSystem.scale.y = -1
    scene.add(mirrorSystem)

    // 6. Interactive Mouse Tracking with Damped Inertia
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouse.current.targetX = normX * 0.85
      mouse.current.targetY = normY * 0.55
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // 7. Render Loop with Physics & Ripple Dynamics
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()

      // Damped camera lerp (0.04 factor)
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.04
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.04

      camera.position.x = mouse.current.x * 1.6
      camera.position.y = 0.2 + mouse.current.y * 1.1
      camera.lookAt(0, 0.1, 0)

      // Tilts and levitation of the 3D Mercian Crest
      crestSystem.rotation.y = time * 0.14 + mouse.current.x * 0.45
      crestSystem.rotation.x = Math.sin(time * 0.25) * 0.08 + mouse.current.y * 0.35
      crestSystem.position.y = 0.25 + Math.sin(time * 0.8) * 0.08

      // Mirror system synchronizes rotation & levitation inverted
      mirrorSystem.rotation.y = crestSystem.rotation.y
      mirrorSystem.rotation.x = -crestSystem.rotation.x
      mirrorSystem.position.y = waterLevel * 2 - crestSystem.position.y

      // Wave ripple distortion on the reflection particles
      const mirrorPosAttr = mirrorGeometry.attributes.position as THREE.BufferAttribute
      const count = Math.min(crestParticleCount, mirrorPosAttr.count)
      for (let i = 0; i < count; i += 4) {
        const ox = originalPositions[i * 3]
        const oy = originalPositions[i * 3 + 1]
        const oz = originalPositions[i * 3 + 2]

        const ripple = Math.sin(time * 2.2 + ox * 3.5 + oz * 2.0) * 0.08
        mirrorPosAttr.setXYZ(i, ox + ripple, oy, oz + ripple * 0.5)
      }
      mirrorPosAttr.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // 8. Viewport Resize Handler
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // 9. Teardown
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      mirrorGeometry.dispose()
      mountainGeom.dispose()
      floorGeometry.dispose()
      material.dispose()
      mirrorMaterial.dispose()
      mountainMat.dispose()
      floorMaterial.dispose()
      particleTexture.dispose()
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
