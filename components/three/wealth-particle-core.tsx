"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WealthParticleCore() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ 
    x: 0, 
    y: 0, 
    targetX: 0, 
    targetY: 0, 
    worldX: 0, 
    worldY: 0, 
    hasMoved: false 
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene, Camera & Atmospheric Fog Setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x070709, 0.035)

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
    renderer.toneMappingExposure = 1.25
    container.appendChild(renderer.domElement)

    // 2. Multi-Stage Shape Geometries for Seamless Morphing
    const isMobile = window.innerWidth < 768
    const crestCount = isMobile ? 4000 : 8500
    const ambientCount = isMobile ? 800 : 1500
    const totalCount = crestCount + ambientCount

    // Stage Shape Coordinate Buffers
    const stageCrest = new Float32Array(crestCount * 3)
    const stageBrowser = new Float32Array(crestCount * 3)
    const stageGears = new Float32Array(crestCount * 3)
    const stageSpark = new Float32Array(crestCount * 3)
    const stageRing = new Float32Array(crestCount * 3)

    const currentPositions = new Float32Array(totalCount * 3)
    const renderPositions = new Float32Array(totalCount * 3)
    const initialScatter = new Float32Array(totalCount * 3)
    const colors = new Float32Array(totalCount * 3)

    // Gold Palette
    const colorHotGold = new THREE.Color(0xfff0b8)
    const colorLiquidGold = new THREE.Color(0xe2b857)
    const colorAmber = new THREE.Color(0xf59e0b)
    const colorBronze = new THREE.Color(0x92611a)
    const tempColor = new THREE.Color()

    // 2.1 POPULATE STAGE: CREST (M-W Monogram + Center Orb)
    const crestScale = 1.35
    const segments: Array<[[number, number], [number, number]]> = [
      [[-1.35 * crestScale, 0.3 * crestScale], [-1.35 * crestScale, 2.1 * crestScale]],
      [[-1.35 * crestScale, 2.1 * crestScale], [0.0, 0.45 * crestScale]],
      [[0.0, 0.45 * crestScale], [1.35 * crestScale, 2.1 * crestScale]],
      [[1.35 * crestScale, 2.1 * crestScale], [1.35 * crestScale, 0.3 * crestScale]],
      [[-1.35 * crestScale, 0.3 * crestScale], [-0.85 * crestScale, 0.0]],
      [[-0.85 * crestScale, 0.0], [-1.35 * crestScale, -0.3 * crestScale]],
      [[1.35 * crestScale, 0.3 * crestScale], [0.85 * crestScale, 0.0]],
      [[0.85 * crestScale, 0.0], [1.35 * crestScale, -0.3 * crestScale]],
      [[-1.35 * crestScale, -0.3 * crestScale], [-1.35 * crestScale, -2.1 * crestScale]],
      [[-1.35 * crestScale, -2.1 * crestScale], [0.0, -0.45 * crestScale]],
      [[0.0, -0.45 * crestScale], [1.35 * crestScale, -2.1 * crestScale]],
      [[1.35 * crestScale, -2.1 * crestScale], [1.35 * crestScale, -0.3 * crestScale]],
      [[-1.1 * crestScale, 1.2 * crestScale], [0.0, 0.45 * crestScale]],
      [[1.1 * crestScale, 1.2 * crestScale], [0.0, 0.45 * crestScale]],
      [[-1.1 * crestScale, -1.2 * crestScale], [0.0, -0.45 * crestScale]],
      [[1.1 * crestScale, -1.2 * crestScale], [0.0, -0.45 * crestScale]],
    ]

    for (let i = 0; i < crestCount; i++) {
      let x = 0, y = 0, z = 0
      if (i < crestCount * 0.12) {
        // Central Gold Orb
        const u = Math.random()
        const v = Math.random()
        const theta = u * 2.0 * Math.PI
        const phi = Math.acos(2.0 * v - 1.0)
        const r = Math.cbrt(Math.random()) * (0.34 * crestScale)
        x = r * Math.sin(phi) * Math.cos(theta)
        y = r * Math.sin(phi) * Math.sin(theta)
        z = r * Math.cos(phi) * 0.8
        tempColor.lerpColors(colorHotGold, colorLiquidGold, Math.random() * 0.5)
      } else {
        const seg = segments[Math.floor(Math.random() * segments.length)]
        const t = Math.random()
        x = seg[0][0] + (seg[1][0] - seg[0][0]) * t + (Math.random() - 0.5) * 0.14
        y = seg[0][1] + (seg[1][1] - seg[0][1]) * t + (Math.random() - 0.5) * 0.14
        z = (Math.random() - 0.5) * 0.55

        if (Math.abs(y) > 1.8) {
          tempColor.lerpColors(colorHotGold, colorLiquidGold, 0.3)
        } else {
          tempColor.lerpColors(colorLiquidGold, colorAmber, Math.random())
        }
      }

      stageCrest[i * 3] = x
      stageCrest[i * 3 + 1] = y
      stageCrest[i * 3 + 2] = z

      // Initial Scatter for Intro Gathering Animation
      const scatterDist = 12 + Math.random() * 15
      const sAngle = Math.random() * Math.PI * 2
      initialScatter[i * 3] = x + Math.cos(sAngle) * scatterDist
      initialScatter[i * 3 + 1] = y + (Math.random() - 0.5) * 14
      initialScatter[i * 3 + 2] = z + Math.sin(sAngle) * scatterDist

      currentPositions[i * 3] = initialScatter[i * 3]
      currentPositions[i * 3 + 1] = initialScatter[i * 3 + 1]
      currentPositions[i * 3 + 2] = initialScatter[i * 3 + 2]

      colors[i * 3] = tempColor.r
      colors[i * 3 + 1] = tempColor.g
      colors[i * 3 + 2] = tempColor.b
    }

    // 2.2 POPULATE STAGE: 3D BROWSER WINDOW
    for (let i = 0; i < crestCount; i++) {
      let bx = 0, by = 0, bz = (Math.random() - 0.5) * 0.3
      const ratio = i / crestCount
      if (ratio < 0.6) {
        // Outer frame (w=3.4, h=2.3)
        const perimeter = (Math.random() * 4) | 0
        if (perimeter === 0) { bx = (Math.random() - 0.5) * 3.4; by = 1.15; }
        else if (perimeter === 1) { bx = (Math.random() - 0.5) * 3.4; by = -1.15; }
        else if (perimeter === 2) { bx = -1.7; by = (Math.random() - 0.5) * 2.3; }
        else { bx = 1.7; by = (Math.random() - 0.5) * 2.3; }
      } else if (ratio < 0.75) {
        // Top tab bar
        if (Math.random() < 0.3) {
          const btn = (Math.random() * 3) | 0
          bx = -1.4 + btn * 0.25 + (Math.random() - 0.5) * 0.08
          by = 0.95 + (Math.random() - 0.5) * 0.08
        } else {
          bx = (Math.random() - 0.5) * 3.4
          by = 0.8
        }
      } else {
        // Inner image rect
        bx = 0.3 + (Math.random() - 0.5) * 1.5
        by = -0.15 + (Math.random() - 0.5) * 1.2
      }
      stageBrowser[i * 3] = bx
      stageBrowser[i * 3 + 1] = by
      stageBrowser[i * 3 + 2] = bz
    }

    // 2.3 POPULATE STAGE: INTERLOCKING ROTATING GEARS
    for (let i = 0; i < crestCount; i++) {
      const isGearA = i < crestCount * 0.6
      const cx = isGearA ? -0.7 : 0.95
      const cy = isGearA ? 0.35 : -0.5
      const rBase = isGearA ? 1.3 : 0.85
      const numTeeth = isGearA ? 12 : 8

      const angle = Math.random() * Math.PI * 2
      const toothAmp = 0.28 * Math.max(0, Math.sin(angle * numTeeth))
      const r = rBase + toothAmp + (Math.random() - 0.5) * 0.08

      stageGears[i * 3] = cx + Math.cos(angle) * r
      stageGears[i * 3 + 1] = cy + Math.sin(angle) * r
      stageGears[i * 3 + 2] = (Math.random() - 0.5) * 0.45
    }

    // 2.4 POPULATE STAGE: 4-POINT SPARK / STAR DIAMOND
    for (let i = 0; i < crestCount; i++) {
      const arm = (Math.random() * 4) | 0
      const t = Math.pow(Math.random(), 1.8)
      const len = 2.4 * (1 - t)
      const width = 0.65 * t * (1 - t)
      let sx = 0, sy = 0

      const perp = (Math.random() - 0.5) * width
      if (arm === 0) { sx = perp; sy = len; }
      else if (arm === 1) { sx = perp; sy = -len; }
      else if (arm === 2) { sx = len; sy = perp; }
      else { sx = -len; sy = perp; }

      stageSpark[i * 3] = sx
      stageSpark[i * 3 + 1] = sy
      stageSpark[i * 3 + 2] = (Math.random() - 0.5) * 0.4
    }

    // 2.5 POPULATE STAGE: TILTED DOUBLE-ORBIT RING
    for (let i = 0; i < crestCount; i++) {
      const isInner = i < crestCount * 0.45
      const r = isInner ? 1.45 : 2.2
      const angle = Math.random() * Math.PI * 2
      const rx = Math.cos(angle) * r
      const rz = Math.sin(angle) * r
      const ry = (Math.random() - 0.5) * 0.15

      const tilt = 0.95
      stageRing[i * 3] = rx
      stageRing[i * 3 + 1] = ry * Math.cos(tilt) - rz * Math.sin(tilt)
      stageRing[i * 3 + 2] = ry * Math.sin(tilt) + rz * Math.cos(tilt)
    }

    // 2.6 POPULATE AMBIENT FLOATING DUST MOTES
    for (let i = crestCount; i < totalCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const radius = 2.5 + Math.random() * 4.5
      const x = Math.cos(theta) * radius + (Math.random() - 0.5) * 1.5
      const y = (Math.random() - 0.5) * 7.0
      const z = (Math.random() - 0.5) * 5.0

      currentPositions[i * 3] = x
      currentPositions[i * 3 + 1] = y
      currentPositions[i * 3 + 2] = z

      initialScatter[i * 3] = x
      initialScatter[i * 3 + 1] = y
      initialScatter[i * 3 + 2] = z

      tempColor.lerpColors(colorAmber, colorBronze, Math.random())
      colors[i * 3] = tempColor.r
      colors[i * 3 + 1] = tempColor.g
      colors[i * 3 + 2] = tempColor.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(renderPositions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    // 3. Circular Particle Texture
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

    const particleSystem = new THREE.Points(geometry, material)
    particleSystem.position.set(0.0, 0.2, 0)
    scene.add(particleSystem)

    // 4. Distant Mountain Silhouette
    const mountainGeom = new THREE.BufferGeometry()
    const mountainVerts: number[] = []
    const mountainSegments = 28
    const mountainWidth = 40
    for (let i = 0; i <= mountainSegments; i++) {
      const x = (i / mountainSegments) * mountainWidth - mountainWidth / 2
      const peakY = -1.55 + Math.sin(i * 0.85) * 0.45 + Math.cos(i * 1.6) * 0.28
      mountainVerts.push(x, peakY, -14)
      mountainVerts.push(x, -3.4, -14)
    }
    mountainGeom.setAttribute("position", new THREE.Float32BufferAttribute(mountainVerts, 3))
    const mountainMat = new THREE.MeshBasicMaterial({
      color: 0x09090d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    })
    const mountains = new THREE.Mesh(mountainGeom, mountainMat)
    scene.add(mountains)

    // 5. Planar Reflective Water Surface
    const waterLevel = -2.75
    const floorGeometry = new THREE.PlaneGeometry(40, 28, 32, 32)
    const floorMaterial = new THREE.MeshBasicMaterial({
      color: 0x050508,
      transparent: true,
      opacity: 0.88,
    })
    const waterPlane = new THREE.Mesh(floorGeometry, floorMaterial)
    waterPlane.rotation.x = -Math.PI / 2
    waterPlane.position.y = waterLevel
    scene.add(waterPlane)

    // Mirror Inverted Reflection System
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
    mirrorSystem.position.set(0.0, waterLevel * 2 - 0.2, 0)
    mirrorSystem.scale.y = -1
    scene.add(mirrorSystem)

    // 6. Interactive Mouse Tracking with Exact Ray/World Projection
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouse.current.targetX = normX * 0.85
      mouse.current.targetY = normY * 0.55

      // Accurate visible world plane projection at z = 0 (tan(26deg)*8.2 ~= 4.0 half-height)
      const aspect = container.clientWidth / container.clientHeight
      const halfHeight = Math.tan(THREE.MathUtils.degToRad(26)) * 8.2
      const halfWidth = halfHeight * aspect
      mouse.current.worldX = normX * halfWidth
      mouse.current.worldY = normY * halfHeight + 0.2
      mouse.current.hasMoved = true
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // 7. Scroll Progress Tracking
    const scrollState = {
      progress: 0,
      targetProgress: 0,
    }

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll > 0) {
        scrollState.targetProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // 8. Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()
    let assembleProgress = 0.0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()

      // Intro assembly progress (0 -> 1 within first 1.6s)
      if (assembleProgress < 1.0) {
        assembleProgress = Math.min(assembleProgress + 0.018, 1.0)
      }

      // Smooth scroll lerp
      scrollState.progress += (scrollState.targetProgress - scrollState.progress) * 0.08

      // Damped camera lerp (0.04 factor)
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.04
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.04

      camera.position.x = mouse.current.x * 1.5
      camera.position.y = 0.2 + mouse.current.y * 1.0
      camera.lookAt(0, 0.1, 0)

      // Calculate Synchronized Active Stage & Target Buffer across 8 Sections:
      // Section 1 (0.00 - 0.12): Crest centered -> gliding right (2.0)
      // Section 2 (0.12 - 0.26): Crest at right
      // Section 3 (0.26 - 0.40): Crest morphs to Browser Window
      // Section 4 (0.40 - 0.54): Browser morphs to Gears
      // Section 5 (0.54 - 0.68): Gears morph to Spark Star
      // Section 6 (0.68 - 0.82): Spark morphs to Double-Ring Orbit
      // Section 7 (0.82 - 0.90): Ring morphs to Crest on reflective floor
      // Section 8 (0.90 - 1.00): Crest returns to full center (0.0) facing front
      const p = scrollState.progress
      let targetBufA = stageCrest
      let targetBufB = stageCrest
      let stageLerp = 0
      let targetPosX = 2.0
      let baseRotY = time * 0.14

      if (p < 0.12) {
        // SEC 01 Hero: Centered -> Glides to right
        targetBufA = stageCrest
        targetBufB = stageCrest
        targetPosX = (p / 0.12) * 2.0
        stageLerp = 0
      } else if (p < 0.26) {
        // SEC 02 Approach: Crest steady on right
        targetBufA = stageCrest
        targetBufB = stageCrest
        targetPosX = 2.0
        stageLerp = 0
      } else if (p < 0.40) {
        // SEC 03 Storefronts: Crest -> Browser Window
        targetBufA = stageCrest
        targetBufB = stageBrowser
        targetPosX = 2.0
        stageLerp = (p - 0.26) / 0.14
      } else if (p < 0.54) {
        // SEC 04 Automation: Browser -> Gears
        targetBufA = stageBrowser
        targetBufB = stageGears
        targetPosX = 2.0
        stageLerp = (p - 0.40) / 0.14
      } else if (p < 0.68) {
        // SEC 05 Speed-to-Lead: Gears -> Spark Star
        targetBufA = stageGears
        targetBufB = stageSpark
        targetPosX = 2.0
        stageLerp = (p - 0.54) / 0.14
      } else if (p < 0.82) {
        // SEC 06 Selected Work: Spark -> Double-Ring Orbit
        targetBufA = stageSpark
        targetBufB = stageRing
        targetPosX = 2.0 - ((p - 0.68) / 0.14) * 0.9
        stageLerp = (p - 0.68) / 0.14
      } else if (p < 0.90) {
        // SEC 07 Method: Ring -> Crest
        targetBufA = stageRing
        targetBufB = stageCrest
        targetPosX = 1.1 - ((p - 0.82) / 0.08) * 1.1
        stageLerp = (p - 0.82) / 0.08
      } else {
        // SEC 08 Closing CTA: Return to full center facing viewer
        targetBufA = stageCrest
        targetBufB = stageCrest
        targetPosX = 0.0
        stageLerp = 0
        baseRotY = 0 // Face directly front at CTA
      }

      particleSystem.position.x += (targetPosX - particleSystem.position.x) * 0.06
      mirrorSystem.position.x = particleSystem.position.x

      // Particle Position Interpolation + Cursor Proximity Repulsion
      const mWorldX = mouse.current.worldX
      const mWorldY = mouse.current.worldY
      const hasMouseMoved = mouse.current.hasMoved
      const sysPosX = particleSystem.position.x
      const sysPosY = particleSystem.position.y

      for (let i = 0; i < crestCount; i++) {
        const ax = targetBufA[i * 3]
        const ay = targetBufA[i * 3 + 1]
        const az = targetBufA[i * 3 + 2]

        const bx = targetBufB[i * 3]
        const by = targetBufB[i * 3 + 1]
        const bz = targetBufB[i * 3 + 2]

        // Interpolated target
        const tx = ax + (bx - ax) * stageLerp
        const ty = ay + (by - ay) * stageLerp
        const tz = az + (bz - az) * stageLerp

        // Intro gathering lerp
        const ix = initialScatter[i * 3]
        const iy = initialScatter[i * 3 + 1]
        const iz = initialScatter[i * 3 + 2]

        const assembledX = ix + (tx - ix) * assembleProgress
        const assembledY = iy + (ty - iy) * assembleProgress
        const assembledZ = iz + (tz - iz) * assembleProgress

        // Compute particle world coordinate
        let repX = 0, repY = 0
        if (hasMouseMoved && assembleProgress >= 0.8) {
          const pWorldX = assembledX + sysPosX
          const pWorldY = assembledY + sysPosY
          const dx = pWorldX - mWorldX
          const dy = pWorldY - mWorldY
          const distSq = dx * dx + dy * dy

          // Proximity threshold of 1.8 units
          if (distSq < 3.24) {
            const dist = Math.sqrt(distSq) + 0.001
            const force = Math.pow((1.8 - dist) / 1.8, 2) * 1.35
            repX = (dx / dist) * force
            repY = (dy / dist) * force
          }
        }

        renderPositions[i * 3] = assembledX + repX
        renderPositions[i * 3 + 1] = assembledY + repY
        renderPositions[i * 3 + 2] = assembledZ
      }

      // Ambient Dust Motes drift
      for (let i = crestCount; i < totalCount; i++) {
        renderPositions[i * 3] = currentPositions[i * 3] + Math.sin(time * 0.4 + i) * 0.08
        renderPositions[i * 3 + 1] = currentPositions[i * 3 + 1] + Math.cos(time * 0.35 + i) * 0.08
        renderPositions[i * 3 + 2] = currentPositions[i * 3 + 2]
      }

      geometry.attributes.position.needsUpdate = true

      // Tilts and levitation of the 3D Particle Sculpture
      particleSystem.rotation.y = baseRotY + mouse.current.x * 0.45
      particleSystem.rotation.x = Math.sin(time * 0.25) * 0.08 + mouse.current.y * 0.35
      particleSystem.position.y = 0.25 + Math.sin(time * 0.8) * 0.08

      // Mirror reflection synchronizes rotation & position inverted
      mirrorSystem.rotation.y = particleSystem.rotation.y
      mirrorSystem.rotation.x = -particleSystem.rotation.x
      mirrorSystem.position.y = waterLevel * 2 - particleSystem.position.y

      // Sinusoidal wave ripple on reflection points
      const mirrorPos = mirrorGeometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < crestCount; i += 4) {
        const ox = renderPositions[i * 3]
        const oy = renderPositions[i * 3 + 1]
        const oz = renderPositions[i * 3 + 2]
        const ripple = Math.sin(time * 2.2 + ox * 3.5 + oz * 2.0) * 0.08
        mirrorPos.setXYZ(i, ox + ripple, oy, oz + ripple * 0.5)
      }
      mirrorPos.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // 10. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  )
}
