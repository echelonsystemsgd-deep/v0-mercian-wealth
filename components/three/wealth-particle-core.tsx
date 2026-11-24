"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { CREST_PARTICLE_COUNT, CREST_PARTICLES } from "@/lib/crest-particle-data"

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

    // 1. Scene, Camera & Deep Royal Purple Atmospheric Fog
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x05030a, 0.038)

    const isMobileInitial = window.innerWidth < 768
    const camera = new THREE.PerspectiveCamera(
      isMobileInitial ? 52 : 48,
      container.clientWidth / container.clientHeight,
      0.1,
      120
    )
    camera.position.set(0, isMobileInitial ? 0.65 : 0.15, isMobileInitial ? 11.2 : 8.2)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.35
    container.appendChild(renderer.domElement)

    // 2. Geometry & Coordinate Buffers from Authentic New MW Logo
    const isMobile = window.innerWidth < 768
    const crestCount = isMobile ? Math.floor(CREST_PARTICLE_COUNT / 2) : CREST_PARTICLE_COUNT
    const ambientCount = isMobile ? 450 : 1100
    const totalCount = crestCount + ambientCount
    const crestStride = isMobile ? 2 : 1

    // 6 Specific 3D Morph Target Shape Buffers matching Cerbo Solutions structure
    // 0: Authentic MW Crest (Hero & CTA)
    const stageCrestBase = new Float32Array(crestCount * 3)
    // 1: Dynamic Swirl / Atmospheric Vortex (Transitions & Approach)
    const stageDispersed = new Float32Array(crestCount * 3)
    // 2: 3D Wireframe Browser Window (Websites / Storefronts)
    const stageBrowser = new Float32Array(crestCount * 3)
    // 3: Two Interlocking Kinetic Gears (Automation)
    const stageGears = new Float32Array(crestCount * 3)
    // 4: Trio of 4-Pointed AI Diamond Stars (Intelligence / AI)
    const stageStars = new Float32Array(crestCount * 3)
    // 5: 3D Architectural Perspective Lattice (Method / Infrastructure)
    const stageLattice = new Float32Array(crestCount * 3)

    const currentPositions = new Float32Array(totalCount * 3)
    const renderPositions = new Float32Array(totalCount * 3)
    const initialScatter = new Float32Array(totalCount * 3)
    const colors = new Float32Array(totalCount * 3)

    // Gear metadata for dynamic tooth rotation
    const gearCenterA = { x: -0.55, y: 0.30 }
    const gearCenterB = { x: 0.65, y: -0.40 }
    const gearAngleA = new Float32Array(crestCount)
    const gearDistA = new Float32Array(crestCount)
    const gearIsB = new Uint8Array(crestCount)

    // Mercian Wealth Royal Purple & Champagne Gold Luxury Palette
    const colorChampagneGold = new THREE.Color(0xfff5d8)
    const colorMetallicGold = new THREE.Color(0xd4af37)
    const colorSoftAmethyst = new THREE.Color(0xb794f6)
    const colorRichViolet = new THREE.Color(0x7c3aed)
    const colorDeepPurple = new THREE.Color(0x31134f)
    const tempColor = new THREE.Color()

    // 2.1 POPULATE SHAPE 0: AUTHENTIC MERCIAN WEALTH CREST
    for (let i = 0; i < crestCount; i++) {
      const srcIdx = (i * crestStride) * 4
      const x = CREST_PARTICLES[srcIdx]
      const y = CREST_PARTICLES[srcIdx + 1]
      const z = CREST_PARTICLES[srcIdx + 2]
      const lum = CREST_PARTICLES[srcIdx + 3]

      // Base MW Crest Sculpture
      stageCrestBase[i * 3] = x
      stageCrestBase[i * 3 + 1] = y
      stageCrestBase[i * 3 + 2] = z

      // SHAPE 1: DYNAMIC GOLDEN & AMETHYST SWIRL VORTEX
      const flowRadius = Math.sqrt(x * x + y * y) + 0.1
      const flowAngle = Math.atan2(y, x) + (flowRadius * 1.6)
      const disperseDist = 1.4 + (i % 9) * 0.35
      stageDispersed[i * 3] = Math.cos(flowAngle) * (flowRadius + disperseDist) + ((i % 5) - 2) * 0.15
      stageDispersed[i * 3 + 1] = Math.sin(flowAngle) * (flowRadius + disperseDist * 0.7) + Math.sin(flowRadius * 3.0) * 0.4
      stageDispersed[i * 3 + 2] = z + Math.sin(flowAngle * 2.0) * 1.8

      // Initial Scatter for Intro Gathering Animation
      const scatterDist = 12 + Math.random() * 16
      const sAngle = Math.random() * Math.PI * 2
      initialScatter[i * 3] = x + Math.cos(sAngle) * scatterDist
      initialScatter[i * 3 + 1] = y + (Math.random() - 0.5) * 14
      initialScatter[i * 3 + 2] = z + Math.sin(sAngle) * scatterDist

      currentPositions[i * 3] = initialScatter[i * 3]
      currentPositions[i * 3 + 1] = initialScatter[i * 3 + 1]
      currentPositions[i * 3 + 2] = initialScatter[i * 3 + 2]

      // Gold core with selective Amethyst and Violet highlights
      if (lum > 0.7) {
        tempColor.lerpColors(colorChampagneGold, colorMetallicGold, (1.0 - lum) * 2.0)
      } else if (lum > 0.45) {
        tempColor.lerpColors(colorMetallicGold, colorSoftAmethyst, (0.7 - lum) / 0.25)
      } else {
        tempColor.lerpColors(colorSoftAmethyst, colorDeepPurple, (0.45 - lum) / 0.45)
      }

      colors[i * 3] = tempColor.r
      colors[i * 3 + 1] = tempColor.g
      colors[i * 3 + 2] = tempColor.b
    }

    // 2.2 POPULATE SHAPE 2: 3D WIREFRAME BROWSER WINDOW (Websites / Storefronts)
    // Strictly bounded perimeter to prevent any vertical streaks, with top toolbar, URL pill, wireframe lines, and media card
    const hw = 1.65, hh = 1.15
    for (let i = 0; i < crestCount; i++) {
      const zRelief = ((i % 7) - 3) * 0.03
      const category = i % 10

      if (category < 4) {
        // Outer Rectangle Perimeter: W=3.3, H=2.3 (Clean modular cycle to prevent any overrun)
        const cycle = (i % 600) / 600
        const t = cycle * 4
        let bx = 0, by = 0
        if (t < 1) { // Top edge
          bx = -hw + t * (hw * 2)
          by = hh
        } else if (t < 2) { // Right edge
          bx = hw
          by = hh - (t - 1) * (hh * 2)
        } else if (t < 3) { // Bottom edge
          bx = hw - (t - 2) * (hw * 2)
          by = -hh
        } else { // Left edge
          bx = -hw
          by = -hh + (t - 3) * (hh * 2)
        }
        stageBrowser[i * 3] = bx
        stageBrowser[i * 3 + 1] = by
        stageBrowser[i * 3 + 2] = zRelief
      } else if (category === 4) {
        // Horizontal top toolbar dividing bar at y = 0.80
        const barT = (i % 250) / 250
        stageBrowser[i * 3] = -hw + barT * (hw * 2)
        stageBrowser[i * 3 + 1] = 0.80
        stageBrowser[i * 3 + 2] = zRelief
      } else if (category === 5) {
        // 3 Window Control Dots (x = -1.40, -1.25, -1.10 at y = 0.96) & Center URL pill
        const sub = i % 4
        if (sub === 0) {
          const theta = Math.random() * Math.PI * 2
          stageBrowser[i * 3] = -1.40 + Math.cos(theta) * 0.05
          stageBrowser[i * 3 + 1] = 0.96 + Math.sin(theta) * 0.05
        } else if (sub === 1) {
          const theta = Math.random() * Math.PI * 2
          stageBrowser[i * 3] = -1.25 + Math.cos(theta) * 0.05
          stageBrowser[i * 3 + 1] = 0.96 + Math.sin(theta) * 0.05
        } else if (sub === 2) {
          const theta = Math.random() * Math.PI * 2
          stageBrowser[i * 3] = -1.10 + Math.cos(theta) * 0.05
          stageBrowser[i * 3 + 1] = 0.96 + Math.sin(theta) * 0.05
        } else {
          // Center URL Bar pill [-0.50 to +0.50]
          const ut = (i % 150) / 150
          stageBrowser[i * 3] = -0.50 + ut * 1.0
          stageBrowser[i * 3 + 1] = 0.96 + (Math.random() - 0.5) * 0.05
        }
        stageBrowser[i * 3 + 2] = zRelief
      } else if (category < 8) {
        // Left Column Wireframe Text Lines (4 distinct horizontal rows)
        const lineIdx = (i % 4)
        const lineY = 0.45 - lineIdx * 0.32
        const lineW = lineIdx === 3 ? 0.75 : 1.15
        const lt = (i % 200) / 200
        stageBrowser[i * 3] = -1.35 + lt * lineW
        stageBrowser[i * 3 + 1] = lineY + (Math.random() - 0.5) * 0.03
        stageBrowser[i * 3 + 2] = zRelief
      } else {
        // Right Column Media Frame: [0.15 to 1.35], [-0.60 to 0.55]
        const fw = 1.2, fh = 1.15
        const ft = (i % 400) / 400
        const edge = Math.floor(ft * 4)
        const edgeT = (ft * 4) - edge
        let fx = 0.15, fy = -0.60
        if (edge === 0) { // top
          fx = 0.15 + edgeT * fw
          fy = 0.55
        } else if (edge === 1) { // right
          fx = 0.15 + fw
          fy = 0.55 - edgeT * fh
        } else if (edge === 2) { // bottom
          fx = 0.15 + fw - edgeT * fw
          fy = -0.60
        } else { // left
          fx = 0.15
          fy = -0.60 + edgeT * fh
        }
        stageBrowser[i * 3] = fx
        stageBrowser[i * 3 + 1] = fy
        stageBrowser[i * 3 + 2] = zRelief + 0.04
      }
    }

    // 2.3 POPULATE SHAPE 3: TWO INTERLOCKING KINETIC GEARS (Automation)
    // Gear 1 (Primary, upper left): center [-0.55, 0.30], R = 1.05, 12 teeth
    // Gear 2 (Secondary, lower right): center [0.65, -0.40], R = 0.70, 8 teeth
    for (let i = 0; i < crestCount; i++) {
      const zRelief = ((i % 5) - 2) * 0.04
      if (i % 5 < 3) {
        // Gear 1 (Primary Cog)
        const cx = gearCenterA.x, cy = gearCenterA.y
        const angle = ((i % 500) / 500) * Math.PI * 2
        const sub = i % 4
        let r = 0.95

        if (sub < 2) {
          // Teeth on outer circumference (12 square-profile teeth)
          const tooth = Math.cos(12 * angle)
          r = 0.95 + (tooth > 0 ? 0.20 : -0.04) + (Math.random() - 0.5) * 0.03
        } else if (sub === 2) {
          // Inner circular hub
          r = 0.30 + Math.random() * 0.05
        } else {
          // 4 Radial Spokes
          const spokeIdx = i % 4
          const spokeAngle = (spokeIdx / 4) * Math.PI * 2
          const st = 0.30 + Math.random() * 0.65
          stageGears[i * 3] = cx + Math.cos(spokeAngle) * st
          stageGears[i * 3 + 1] = cy + Math.sin(spokeAngle) * st
          stageGears[i * 3 + 2] = zRelief
          gearAngleA[i] = spokeAngle
          gearDistA[i] = st
          gearIsB[i] = 0
          continue
        }

        stageGears[i * 3] = cx + Math.cos(angle) * r
        stageGears[i * 3 + 1] = cy + Math.sin(angle) * r
        stageGears[i * 3 + 2] = zRelief
        gearAngleA[i] = angle
        gearDistA[i] = r
        gearIsB[i] = 0
      } else {
        // Gear 2 (Secondary Cog, meshing tightly)
        const cx = gearCenterB.x, cy = gearCenterB.y
        const angle = ((i % 350) / 350) * Math.PI * 2
        const sub = i % 4
        let r = 0.65

        if (sub < 2) {
          // Teeth on outer circumference (8 square-profile teeth, meshed angle phase)
          const tooth = Math.cos(8 * (angle + 0.39))
          r = 0.65 + (tooth > 0 ? 0.16 : -0.03) + (Math.random() - 0.5) * 0.03
        } else if (sub === 2) {
          // Inner circular hub
          r = 0.20 + Math.random() * 0.04
        } else {
          // 4 Radial Spokes
          const spokeIdx = i % 4
          const spokeAngle = (spokeIdx / 4) * Math.PI * 2 + 0.39
          const st = 0.20 + Math.random() * 0.45
          stageGears[i * 3] = cx + Math.cos(spokeAngle) * st
          stageGears[i * 3 + 1] = cy + Math.sin(spokeAngle) * st
          stageGears[i * 3 + 2] = zRelief
          gearAngleA[i] = spokeAngle
          gearDistA[i] = st
          gearIsB[i] = 1
          continue
        }

        stageGears[i * 3] = cx + Math.cos(angle) * r
        stageGears[i * 3 + 1] = cy + Math.sin(angle) * r
        stageGears[i * 3 + 2] = zRelief
        gearAngleA[i] = angle
        gearDistA[i] = r
        gearIsB[i] = 1
      }
    }

    // 2.4 POPULATE SHAPE 4: TRIO OF 4-POINTED AI DIAMOND STARS (Intelligence / AI)
    // Star 1 (Main central diamond star): center [0.0, 0.05], scale 1.45
    // Star 2 (Secondary upper right): center [1.20, 0.85], scale 0.65
    // Star 3 (Tertiary lower left): center [-1.15, -0.75], scale 0.45
    for (let i = 0; i < crestCount; i++) {
      const zRelief = ((i % 5) - 2) * 0.05
      const starCategory = i % 10

      let cx = 0.0, cy = 0.05, scale = 1.45
      if (starCategory === 7 || starCategory === 8) {
        cx = 1.20
        cy = 0.85
        scale = 0.65
      } else if (starCategory === 9) {
        cx = -1.15
        cy = -0.75
        scale = 0.45
      }

      const sub = i % 3
      if (sub === 0) {
        // Pure Astroid 4-Point Diamond Star: |cos|^3.0 and |sin|^3.0 gives razor-sharp star points
        const t = Math.random() * Math.PI * 2
        const cosT = Math.cos(t)
        const sinT = Math.sin(t)
        const sx = Math.sign(cosT) * Math.pow(Math.abs(cosT), 3.0) * scale
        const sy = Math.sign(sinT) * Math.pow(Math.abs(sinT), 3.0) * scale
        stageStars[i * 3] = cx + sx
        stageStars[i * 3 + 1] = cy + sy
        stageStars[i * 3 + 2] = zRelief
      } else if (sub === 1) {
        // Crisp Cardinal Needle Rays radiating along 4 axes
        const rayAxis = i % 4
        const rayLen = Math.random() * (scale * 1.35)
        let rx = 0, ry = 0
        if (rayAxis === 0) rx = rayLen
        else if (rayAxis === 1) ry = rayLen
        else if (rayAxis === 2) rx = -rayLen
        else ry = -rayLen
        stageStars[i * 3] = cx + rx + (Math.random() - 0.5) * 0.02
        stageStars[i * 3 + 1] = cy + ry + (Math.random() - 0.5) * 0.02
        stageStars[i * 3 + 2] = zRelief
      } else {
        // Glowing Stellar Nucleus Core
        const r = Math.pow(Math.random(), 2.2) * (scale * 0.30)
        const theta = Math.random() * Math.PI * 2
        stageStars[i * 3] = cx + Math.cos(theta) * r
        stageStars[i * 3 + 1] = cy + Math.sin(theta) * r
        stageStars[i * 3 + 2] = zRelief * 1.5
      }
    }

    // 2.5 POPULATE SHAPE 5: 3D ARCHITECTURAL PERSPECTIVE LATTICE (Method / Infrastructure)
    // Ground perspective grid plane at y = -0.85, receding depth z, plus 3 vertical beacon lines
    for (let i = 0; i < crestCount; i++) {
      const sub = i % 6
      if (sub < 4) {
        // Perspective Grid Plane
        const gridXIdx = (i % 9) - 4 // -4 to +4
        const gridZIdx = Math.floor((i / 9) % 15) // 0 to 14
        const normZ = gridZIdx / 14
        const z = -2.2 + normZ * 4.4
        const xSpan = 2.4 * (0.4 + normZ * 0.6) // Perspective convergence
        const x = (gridXIdx / 4) * xSpan
        stageLattice[i * 3] = x + (Math.random() - 0.5) * 0.03
        stageLattice[i * 3 + 1] = -0.85 + (Math.random() - 0.5) * 0.03
        stageLattice[i * 3 + 2] = z
      } else {
        // Vertical Architectural Beacon Pillars at x = -0.95, 0.0, +0.95
        const pillarIdx = (i % 3) - 1 // -1, 0, 1
        const px = pillarIdx * 0.95
        const py = -0.85 + Math.random() * 2.1
        stageLattice[i * 3] = px + (Math.random() - 0.5) * 0.03
        stageLattice[i * 3 + 1] = py
        stageLattice[i * 3 + 2] = (Math.random() - 0.5) * 0.5
      }
    }

    // 2.6 POPULATE AMBIENT FLOATING AMETHYST & GOLD DUST MOTES
    for (let i = crestCount; i < totalCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const radius = 2.4 + Math.random() * 5.4
      const x = Math.cos(theta) * radius + (Math.random() - 0.5) * 1.5
      const y = (Math.random() - 0.5) * 7.5
      const z = (Math.random() - 0.5) * 5.0

      currentPositions[i * 3] = x
      currentPositions[i * 3 + 1] = y
      currentPositions[i * 3 + 2] = z

      renderPositions[i * 3] = x
      renderPositions[i * 3 + 1] = y
      renderPositions[i * 3 + 2] = z

      if (i % 3 === 0) {
        tempColor.copy(colorChampagneGold)
      } else if (i % 3 === 1) {
        tempColor.copy(colorSoftAmethyst)
      } else {
        tempColor.copy(colorMetallicGold)
      }

      colors[i * 3] = tempColor.r
      colors[i * 3 + 1] = tempColor.g
      colors[i * 3 + 2] = tempColor.b
    }

    // 3. BufferGeometry & Smooth Alpha Circle Particle Texture
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(renderPositions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const particleCanvas = document.createElement("canvas")
    particleCanvas.width = 64
    particleCanvas.height = 64
    const pctx = particleCanvas.getContext("2d")
    if (pctx) {
      const grad = pctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0, "rgba(255, 255, 255, 1)")
      grad.addColorStop(0.25, "rgba(255, 245, 216, 0.95)")
      grad.addColorStop(0.55, "rgba(212, 175, 55, 0.65)")
      grad.addColorStop(0.85, "rgba(183, 148, 246, 0.15)")
      grad.addColorStop(1, "rgba(0, 0, 0, 0)")
      pctx.fillStyle = grad
      pctx.fillRect(0, 0, 64, 64)
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas)

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.052 : 0.062,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: isMobile ? 0.72 : 0.96,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(geometry, material)
    const heroPosX = isMobile ? 0.0 : 1.75
    particleSystem.position.set(heroPosX, isMobile ? 0.95 : 0.15, 0)
    scene.add(particleSystem)

    // 4. Subtle Inverted Glow Reflection (Placed strictly BELOW the lowest crest tip at y = -2.25)
    const reflectionLevel = -2.25
    const mirrorGeometry = geometry.clone()
    const mirrorMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.038 : 0.048,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: isMobile ? 0.18 : 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const mirrorSystem = new THREE.Points(mirrorGeometry, mirrorMaterial)
    mirrorSystem.position.set(particleSystem.position.x, reflectionLevel * 2 - particleSystem.position.y, 0)
    mirrorSystem.scale.y = -1
    scene.add(mirrorSystem)

    // 5. Interactive Mouse & Touch Tracking with Natural Parallax
    const updatePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1)
      mouse.current.targetX = normX * 0.8
      mouse.current.targetY = normY * 0.5

      const aspect = container.clientWidth / container.clientHeight
      const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z
      const halfWidth = halfHeight * aspect
      mouse.current.worldX = camera.position.x + normX * halfWidth
      mouse.current.worldY = camera.position.y + normY * halfHeight
      mouse.current.hasMoved = true
    }

    const handleMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchstart", handleTouchMove, { passive: true })

    // 6. Scroll Progress Tracking Across 8 Cerbo-Structured Sections
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

    // 7. Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()
    let assembleProgress = 0.0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()

      if (assembleProgress < 1.0) {
        assembleProgress = Math.min(assembleProgress + 0.016, 1.0)
      }

      scrollState.progress += (scrollState.targetProgress - scrollState.progress) * 0.08

      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05

      // Natural camera parallax
      const isMobileScreen = window.innerWidth < 768
      const mouseParallaxX = mouse.current.x * (isMobileScreen ? 0.05 : 0.22)
      const mouseParallaxY = mouse.current.y * (isMobileScreen ? 0.04 : 0.16)
      const baseCamY = isMobileScreen ? 0.65 : 0.15

      camera.position.x = mouseParallaxX * 0.4
      camera.position.y = baseCamY + mouseParallaxY * 0.3
      camera.lookAt(isMobileScreen ? 0.0 : 0.45, isMobileScreen ? 0.65 : 0.05, 0)

      // Calculate Synchronized Active Stage across the 8 Cerbo Sections with Hold-Then-Morph:
      // SEC 01 Hero: 0.00 - 0.10 (MW Crest, right-anchored on desktop, center on mobile)
      // SEC 02 Approach: 0.10 - 0.22 (Dynamic Gold & Amethyst Swirl)
      // SEC 03 Websites: 0.22 - 0.36 (3D Wireframe Browser Window HELD CRISP)
      // SEC 04 Automation: 0.36 - 0.50 (Interlocking Kinetic Gears HELD CRISP with active counter-rotation)
      // SEC 05 AI Systems: 0.50 - 0.64 (Trio of 4-Pointed AI Diamond Stars HELD CRISP)
      // SEC 06 Work / Deployments: 0.64 - 0.76 (Returns to Center behind middle card)
      // SEC 07 Method: 0.76 - 0.88 (3D Architectural Perspective Lattice on Right)
      // SEC 08 Closing CTA: 0.88 - 1.00 (MW Crest returned to DEAD CENTER behind LET'S TALK)
      const p = scrollState.progress
      const rightAnchorX = isMobileScreen ? 0.0 : 1.75

      let targetBufA = stageCrestBase
      let targetBufB = stageCrestBase
      let stageLerp = 0
      let targetPosX = rightAnchorX
      let baseRotY = 0.08 + Math.sin(time * 0.35) * 0.06
      let isGearsStage = false

      if (p < 0.10) {
        // SEC 01: HERO — Authentic MW Crest HELD
        targetBufA = stageCrestBase
        targetBufB = stageCrestBase
        targetPosX = rightAnchorX
        stageLerp = 0
      } else if (p < 0.22) {
        // SEC 02: THE VISION / APPROACH — Swirling outward into atmospheric vortex
        const transP = Math.min((p - 0.10) / 0.05, 1.0)
        targetBufA = stageCrestBase
        targetBufB = stageDispersed
        targetPosX = rightAnchorX
        stageLerp = transP
      } else if (p < 0.36) {
        // SEC 03: 01 — WEBSITES & EXPERIENCES — 3D Wireframe Browser Window
        // Quick 4% scroll transition, then HELD 100% CRISP
        const transP = Math.min((p - 0.22) / 0.04, 1.0)
        targetBufA = stageDispersed
        targetBufB = stageBrowser
        targetPosX = rightAnchorX
        stageLerp = transP
        baseRotY = 0.02 + Math.sin(time * 0.2) * 0.03
      } else if (p < 0.50) {
        // SEC 04: 02 — AUTOMATION — Interlocking Kinetic Gears
        // Quick 4% scroll transition, then HELD 100% CRISP with active tooth meshing
        const transP = Math.min((p - 0.36) / 0.04, 1.0)
        targetBufA = stageBrowser
        targetBufB = stageGears
        targetPosX = rightAnchorX
        stageLerp = transP
        baseRotY = 0.0
        isGearsStage = true
      } else if (p < 0.64) {
        // SEC 05: 03 — INTELLIGENCE — Trio of 4-Pointed AI Diamond Stars
        // Quick 4% scroll transition, then HELD 100% CRISP with stellar sparkle
        const transP = Math.min((p - 0.50) / 0.04, 1.0)
        targetBufA = stageGears
        targetBufB = stageStars
        targetPosX = rightAnchorX
        stageLerp = transP
        baseRotY = Math.sin(time * 0.3) * 0.04
      } else if (p < 0.76) {
        // SEC 06: 04 — SELECTED WORK — Returns to Center behind middle card
        const transP = (p - 0.64) / 0.12
        targetBufA = stageStars
        targetBufB = stageDispersed
        targetPosX = rightAnchorX * (1 - Math.min(transP * 1.5, 1))
        stageLerp = Math.min(transP * 1.2, 1)
        baseRotY = 0.05 + Math.sin(time * 0.25) * 0.04
      } else if (p < 0.88) {
        // SEC 07: 05 — METHOD — Shifts to Right behind steps 03/04 forming 3D Lattice
        const transP = Math.min((p - 0.76) / 0.04, 1.0)
        targetBufA = stageDispersed
        targetBufB = stageLattice
        targetPosX = rightAnchorX * 0.95
        stageLerp = transP
        baseRotY = 0.0
      } else {
        // SEC 08: 06 — LET'S TALK (CLOSING CTA) — MW Crest returned to DEAD CENTER!
        const transP = Math.min((p - 0.88) / 0.04, 1.0)
        targetBufA = stageLattice
        targetBufB = stageCrestBase
        targetPosX = 0.0
        stageLerp = transP
        baseRotY = Math.sin(time * 0.3) * 0.04
      }

      const baseTargetX = targetPosX + mouseParallaxX
      particleSystem.position.x += (baseTargetX - particleSystem.position.x) * 0.06
      mirrorSystem.position.x = particleSystem.position.x

      // Dynamic Rotation for Gears Stage (Gear 1 spins clockwise, Gear 2 spins counter-clockwise)
      const gearSpinA = time * 0.45
      const gearSpinB = -time * 0.675 // 1.5 ratio

      // Particle Position Interpolation + Cursor Proximity Repulsion
      const mWorldX = mouse.current.worldX
      const mWorldY = mouse.current.worldY
      const hasMouseMoved = mouse.current.hasMoved
      const sysPosX = particleSystem.position.x
      const sysPosY = particleSystem.position.y

      for (let i = 0; i < crestCount; i++) {
        let ax = targetBufA[i * 3]
        let ay = targetBufA[i * 3 + 1]
        let az = targetBufA[i * 3 + 2]

        let bx = targetBufB[i * 3]
        let by = targetBufB[i * 3 + 1]
        let bz = targetBufB[i * 3 + 2]

        // If in gears stage, rotate teeth about gear centers
        if (isGearsStage && stageLerp > 0.5) {
          if (gearIsB[i] === 0) {
            const curA = gearAngleA[i] + gearSpinA
            const curR = gearDistA[i]
            bx = gearCenterA.x + Math.cos(curA) * curR
            by = gearCenterA.y + Math.sin(curA) * curR
          } else {
            const curA = gearAngleA[i] + gearSpinB
            const curR = gearDistA[i]
            bx = gearCenterB.x + Math.cos(curA) * curR
            by = gearCenterB.y + Math.sin(curA) * curR
          }
        }

        const tx = ax + (bx - ax) * stageLerp
        const ty = ay + (by - ay) * stageLerp
        const tz = az + (bz - az) * stageLerp

        const ix = initialScatter[i * 3]
        const iy = initialScatter[i * 3 + 1]
        const iz = initialScatter[i * 3 + 2]

        const assembledX = ix + (tx - ix) * assembleProgress
        const assembledY = iy + (ty - iy) * assembleProgress
        const assembledZ = iz + (tz - iz) * assembleProgress

        let repX = 0, repY = 0
        if (hasMouseMoved && assembleProgress >= 0.8) {
          const pWorldX = assembledX + sysPosX
          const pWorldY = assembledY + sysPosY
          const dx = pWorldX - mWorldX
          const dy = pWorldY - mWorldY
          const distSq = dx * dx + dy * dy

          if (distSq < 3.8) {
            const dist = Math.sqrt(distSq) + 0.001
            const force = Math.pow((1.95 - dist) / 1.95, 2) * 1.4
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
      const mobileElevation = isMobileScreen ? 0.95 : 0.0
      particleSystem.rotation.y = baseRotY + mouse.current.x * (isMobileScreen ? 0.15 : 0.32)
      particleSystem.rotation.x = Math.sin(time * 0.25) * 0.05 - mouse.current.y * (isMobileScreen ? 0.1 : 0.2)
      particleSystem.position.y = 0.15 + mobileElevation + Math.sin(time * 0.8) * 0.06 + mouseParallaxY * 0.35

      // Dynamic opacity attenuation on mobile during dense card sections
      if (isMobileScreen) {
        if (p >= 0.62 && p <= 0.88) {
          material.opacity = 0.20
          mirrorMaterial.opacity = 0.05
        } else {
          material.opacity = 0.72
          mirrorMaterial.opacity = 0.18
        }
      } else {
        material.opacity = 0.96
        mirrorMaterial.opacity = 0.28
      }

      // Soften reflection near the very bottom to avoid hard edge against footer
      if (p > 0.96) {
        const fadeP = 1.0 - Math.min((p - 0.96) / 0.04, 1.0)
        mirrorMaterial.opacity *= fadeP
      }

      // Mirror reflection synchronizes rotation & position inverted
      mirrorSystem.rotation.y = particleSystem.rotation.y
      mirrorSystem.rotation.x = -particleSystem.rotation.x
      mirrorSystem.position.y = reflectionLevel * 2 - particleSystem.position.y

      // Sinusoidal wave ripple on reflection points
      const mirrorPos = mirrorGeometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < crestCount; i += 3) {
        const ox = renderPositions[i * 3]
        const oy = renderPositions[i * 3 + 1]
        const oz = renderPositions[i * 3 + 2]
        const ripple = Math.sin(time * 2.6 + ox * 4.0 + oz * 2.5) * 0.08
        mirrorPos.setXYZ(i, ox + ripple, oy, oz + ripple * 0.5)
      }
      mirrorPos.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      const isMobileNow = width < 768
      camera.aspect = width / height
      if (isMobileNow) {
        camera.position.set(0, 0.65, 11.2)
        camera.fov = 52
      } else {
        camera.position.set(0, 0.15, 8.2)
        camera.fov = 48
      }
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // 9. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchstart", handleTouchMove)
      window.removeEventListener("scroll", handleScroll)
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
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#030206]"
      aria-hidden="true"
    >
      {/* Textured Ethereal Royal Purple Velvet Atmosphere extracted directly from authentic NewLogo.png */}
      <div 
        className="absolute inset-0 pointer-events-none bg-cover bg-center transition-opacity duration-1000 opacity-70"
        style={{
          backgroundImage: "url('/mercian-purple-atmosphere.webp')",
          backgroundPosition: "center 30%",
        }}
      />

      {/* Atmospheric Radial Gradient Blend */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 90% 75% at 65% 35%, rgba(68, 22, 110, 0.35) 0%, rgba(35, 12, 60, 0.40) 35%, rgba(14, 6, 26, 0.85) 70%, #030206 100%)
          `
        }}
      />

      {/* Soft Amethyst Silk Mist Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen bg-cover bg-center"
        style={{
          backgroundImage: "radial-gradient(circle at 60% 40%, rgba(139, 92, 246, 0.30) 0%, rgba(76, 29, 149, 0.15) 50%, transparent 80%)"
        }}
      />

      {/* Subtle Atmospheric Plus Crosshairs in Amethyst Gold */}
      <div className="absolute top-[22%] left-[34%] font-mono text-[10px] text-[#b794f6]/25 select-none pointer-events-none">+</div>
      <div className="absolute top-[22%] right-[34%] font-mono text-[10px] text-[#b794f6]/25 select-none pointer-events-none">+</div>
      <div className="absolute top-[78%] left-[34%] font-mono text-[10px] text-[#b794f6]/20 select-none pointer-events-none">+</div>
      <div className="absolute top-[78%] right-[34%] font-mono text-[10px] text-[#b794f6]/20 select-none pointer-events-none">+</div>
    </div>
  )
}
