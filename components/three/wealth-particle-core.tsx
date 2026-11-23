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

    // 1. Scene, Camera & Atmospheric Sunset Fog Setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x120c0a, 0.038)

    const isMobileInitial = window.innerWidth < 768
    const camera = new THREE.PerspectiveCamera(
      isMobileInitial ? 52 : 50,
      container.clientWidth / container.clientHeight,
      0.1,
      120
    )
    camera.position.set(0, isMobileInitial ? 0.35 : 0.15, isMobileInitial ? 11.0 : 8.0)

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

    // 2. Multi-Stage Shape Geometries for Seamless Morphing
    const isMobile = window.innerWidth < 768
    const knightCount = isMobile ? 3800 : 9200
    const ambientCount = isMobile ? 500 : 1200
    const totalCount = knightCount + ambientCount

    // Stage Shape Coordinate Buffers
    const stageKnight = new Float32Array(knightCount * 3)
    const stageBrowser = new Float32Array(knightCount * 3)
    const stageGears = new Float32Array(knightCount * 3)
    const stageSpark = new Float32Array(knightCount * 3)
    const stageRing = new Float32Array(knightCount * 3)
    const stageTile = new Float32Array(knightCount * 3)

    const currentPositions = new Float32Array(totalCount * 3)
    const renderPositions = new Float32Array(totalCount * 3)
    const initialScatter = new Float32Array(totalCount * 3)
    const colors = new Float32Array(totalCount * 3)

    // Luminous Sunset Palette: Incandescent White-Gold, Amber, Peach, Terracotta
    const colorHotGold = new THREE.Color(0xfffbe8)
    const colorLiquidGold = new THREE.Color(0xf6ba59)
    const colorAmber = new THREE.Color(0xe08a68)
    const colorTerracotta = new THREE.Color(0xc25e34)
    const tempColor = new THREE.Color()

    // 2.1 POPULATE STAGE: 3D CHESS KNIGHT (HORSE)
    // Refined polygon outline matching media_1795443961668_5cbd9f82.jpg
    const knightProfile: Array<[number, number]> = [
      // Pedestal base
      [-0.65, -1.25], [-0.75, -1.15], [-0.60, -1.0], [-0.52, -0.85],
      // Scalloped mane along arched neck back
      [-0.58, -0.55], [-0.68, -0.3], [-0.58, -0.15],
      [-0.72, 0.05], [-0.60, 0.2],
      [-0.68, 0.4], [-0.55, 0.55],
      [-0.62, 0.75], [-0.48, 0.9],
      [-0.52, 1.1], [-0.35, 1.25],
      [-0.22, 1.38],
      // Pointed Ears
      [-0.15, 1.62], [-0.02, 1.65], [0.08, 1.42],
      [0.15, 1.66], [0.26, 1.64], [0.28, 1.38],
      // Brow ridge & Forehead slope
      [0.48, 1.18], [0.65, 0.98], [0.85, 0.82], [0.98, 0.65],
      // Muzzle & Mouth & Chin
      [0.96, 0.48], [0.85, 0.42], [0.72, 0.48], [0.58, 0.42],
      // Throat inward curve & Chest swell
      [0.32, 0.22], [0.22, 0.0], [0.28, -0.28], [0.40, -0.55],
      [0.50, -0.85],
      // Base right side
      [0.58, -1.0], [0.72, -1.15], [0.65, -1.25]
    ]

    function pointInKnightPoly(x: number, y: number, p: Array<[number, number]>): boolean {
      let inside = false
      for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
        const xi = p[i][0], yi = p[i][1]
        const xj = p[j][0], yj = p[j][1]
        const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        if (intersect) inside = !inside
      }
      return inside
    }

    const knightScale = 0.96
    const edgeCount = Math.floor(knightCount * 0.52)

    for (let i = 0; i < knightCount; i++) {
      let x = 0, y = 0, z = 0

      if (i < edgeCount) {
        // Bright glowing rim & silhouette contour
        const segIdx = Math.floor(Math.random() * (knightProfile.length - 1))
        const p1 = knightProfile[segIdx]
        const p2 = knightProfile[segIdx + 1]
        const t = Math.random()
        x = (p1[0] + (p2[0] - p1[0]) * t + (Math.random() - 0.5) * 0.08) * knightScale
        y = (p1[1] + (p2[1] - p1[1]) * t + (Math.random() - 0.5) * 0.08) * knightScale
        
        // Elliptical 3D depth based on height
        const depthFactor = y < -0.7 ? 0.7 : y > 1.3 ? 0.22 : 0.48
        z = (Math.random() - 0.5) * depthFactor * 1.6

        // Rim points are incandescent white-gold
        tempColor.lerpColors(colorHotGold, colorLiquidGold, Math.random() * 0.35)
      } else {
        // Internal glowing volume
        let found = false
        for (let attempt = 0; attempt < 35; attempt++) {
          const rx = -0.75 + Math.random() * 1.75
          const ry = -1.25 + Math.random() * 2.92
          if (pointInKnightPoly(rx, ry, knightProfile)) {
            x = (rx + (Math.random() - 0.5) * 0.05) * knightScale
            y = (ry + (Math.random() - 0.5) * 0.05) * knightScale
            const depthFactor = ry < -0.7 ? 0.75 : ry > 1.3 ? 0.25 : 0.52
            z = (Math.random() - 0.5) * depthFactor * 1.45
            found = true
            break
          }
        }
        if (!found) {
          x = (Math.random() - 0.5) * 0.6
          y = (Math.random() - 0.5) * 1.2
          z = (Math.random() - 0.5) * 0.3
        }
        // Interior points are warm liquid gold to terracotta
        tempColor.lerpColors(colorLiquidGold, colorTerracotta, Math.random() * 0.75)
      }

      stageKnight[i * 3] = x
      stageKnight[i * 3 + 1] = y
      stageKnight[i * 3 + 2] = z

      // Initial Scatter for Intro Gathering Animation
      const scatterDist = 12 + Math.random() * 16
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

    // 2.2 POPULATE STAGE: 3D BROWSER WINDOW (Facing Camera Frontally)
    for (let i = 0; i < knightCount; i++) {
      let bx = 0, by = 0, bz = (Math.random() - 0.5) * 0.25
      const ratio = i / knightCount
      if (ratio < 0.55) {
        // Outer frame (w=3.4, h=2.3)
        const side = (Math.random() * 4) | 0
        if (side === 0) { bx = (Math.random() - 0.5) * 3.4; by = 1.15; }
        else if (side === 1) { bx = (Math.random() - 0.5) * 3.4; by = -1.15; }
        else if (side === 2) { bx = -1.7; by = (Math.random() - 0.5) * 2.3; }
        else { bx = 1.7; by = (Math.random() - 0.5) * 2.3; }
      } else if (ratio < 0.72) {
        // Top browser tab bar & 3 control dots
        if (Math.random() < 0.35) {
          const btn = (Math.random() * 3) | 0
          bx = -1.35 + btn * 0.26 + (Math.random() - 0.5) * 0.08
          by = 0.9 + (Math.random() - 0.5) * 0.08
        } else {
          bx = (Math.random() - 0.5) * 3.4
          by = 0.78
        }
      } else {
        // Inner grid layout blocks
        const col = Math.random() < 0.5 ? -0.75 : 0.75
        bx = col + (Math.random() - 0.5) * 1.2
        by = -0.2 + (Math.random() - 0.5) * 1.2
      }
      stageBrowser[i * 3] = bx
      stageBrowser[i * 3 + 1] = by
      stageBrowser[i * 3 + 2] = bz
    }

    // 2.3 POPULATE STAGE: INTERLOCKING ROTATING GEARS (Facing Camera Frontally)
    for (let i = 0; i < knightCount; i++) {
      const isGearA = i < knightCount * 0.62
      const cx = isGearA ? -0.7 : 0.9
      const cy = isGearA ? 0.3 : -0.45
      const rBase = isGearA ? 1.25 : 0.82
      const numTeeth = isGearA ? 12 : 8

      const angle = Math.random() * Math.PI * 2
      const toothAmp = 0.28 * Math.max(0, Math.sin(angle * numTeeth))
      const r = rBase + toothAmp + (Math.random() - 0.5) * 0.08

      stageGears[i * 3] = cx + Math.cos(angle) * r
      stageGears[i * 3 + 1] = cy + Math.sin(angle) * r
      stageGears[i * 3 + 2] = (Math.random() - 0.5) * 0.32
    }

    // 2.4 POPULATE STAGE: 3 SPARKLING 4-POINT AI STARS
    for (let i = 0; i < knightCount; i++) {
      const starIdx = (Math.random() * 3) | 0
      const starCenters: Array<[number, number, number]> = [
        [0.0, 0.35, 1.1],
        [-1.2, -0.5, 0.7],
        [1.2, -0.45, 0.8]
      ]
      const sc = starCenters[starIdx]
      const arm = (Math.random() * 4) | 0
      const t = Math.pow(Math.random(), 1.7)
      const len = 1.7 * sc[2] * (1 - t)
      const width = 0.45 * sc[2] * t * (1 - t)
      let sx = 0, sy = 0

      const perp = (Math.random() - 0.5) * width
      if (arm === 0) { sx = perp; sy = len; }
      else if (arm === 1) { sx = perp; sy = -len; }
      else if (arm === 2) { sx = len; sy = perp; }
      else { sx = -len; sy = perp; }

      stageSpark[i * 3] = sc[0] + sx
      stageSpark[i * 3 + 1] = sc[1] + sy
      stageSpark[i * 3 + 2] = (Math.random() - 0.5) * 0.3
    }

    // 2.5 POPULATE STAGE: SWEEPING RING ORBIT / VORTEX
    for (let i = 0; i < knightCount; i++) {
      const isInner = i < knightCount * 0.45
      const r = isInner ? 1.4 : 2.2
      const angle = Math.random() * Math.PI * 2
      const rx = Math.cos(angle) * r
      const rz = Math.sin(angle) * r
      const ry = (Math.random() - 0.5) * 0.15

      const tilt = 0.88
      stageRing[i * 3] = rx
      stageRing[i * 3 + 1] = ry * Math.cos(tilt) - rz * Math.sin(tilt)
      stageRing[i * 3 + 2] = ry * Math.sin(tilt) + rz * Math.cos(tilt)
    }

    // 2.6 POPULATE STAGE: ANGLED 3D GEOMETRIC TILE / CARD
    for (let i = 0; i < knightCount; i++) {
      const tx = (Math.random() - 0.5) * 3.0
      const ty = (Math.random() - 0.5) * 2.0
      const tz = (Math.random() - 0.5) * 0.16
      const tiltX = -0.32
      const tiltY = 0.42
      
      const x1 = tx * Math.cos(tiltY) + tz * Math.sin(tiltY)
      const z1 = -tx * Math.sin(tiltY) + tz * Math.cos(tiltY)
      const y1 = ty * Math.cos(tiltX) - z1 * Math.sin(tiltX)
      const z2 = ty * Math.sin(tiltX) + z1 * Math.cos(tiltX)

      stageTile[i * 3] = x1
      stageTile[i * 3 + 1] = y1
      stageTile[i * 3 + 2] = z2
    }

    // 2.7 POPULATE AMBIENT FLOATING DUST MOTES
    for (let i = knightCount; i < totalCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const radius = 2.6 + Math.random() * 4.8
      const x = Math.cos(theta) * radius + (Math.random() - 0.5) * 1.5
      const y = (Math.random() - 0.5) * 7.5
      const z = (Math.random() - 0.5) * 5.0

      currentPositions[i * 3] = x
      currentPositions[i * 3 + 1] = y
      currentPositions[i * 3 + 2] = z

      initialScatter[i * 3] = x
      initialScatter[i * 3 + 1] = y
      initialScatter[i * 3 + 2] = z

      tempColor.lerpColors(colorAmber, colorTerracotta, Math.random())
      colors[i * 3] = tempColor.r
      colors[i * 3 + 1] = tempColor.g
      colors[i * 3 + 2] = tempColor.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(renderPositions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    // 3. Circular Luminous Particle Texture
    const particleCanvas = document.createElement("canvas")
    particleCanvas.width = 64
    particleCanvas.height = 64
    const pctx = particleCanvas.getContext("2d")
    if (pctx) {
      const gradient = pctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.25, "rgba(255, 225, 170, 0.95)")
      gradient.addColorStop(0.6, "rgba(224, 138, 104, 0.35)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      pctx.fillStyle = gradient
      pctx.fillRect(0, 0, 64, 64)
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas)

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.085 : 0.065,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(geometry, material)
    // Initial hero position: centered in the right half of the screen
    particleSystem.position.set(isMobile ? 0.0 : 0.75, 0.05, 0)
    scene.add(particleSystem)

    // 4. Distant Layered Mountain Silhouettes Across Horizon
    const waterLevel = -1.35

    // Mountain Range Layer 1 (Far background)
    const farMountGeom = new THREE.BufferGeometry()
    const farMountVerts: number[] = []
    const farMountSegs = 40
    const farMountWidth = 52
    for (let i = 0; i <= farMountSegs; i++) {
      const x = (i / farMountSegs) * farMountWidth - farMountWidth / 2
      const peakY = -0.15 + Math.sin(i * 0.45) * 0.55 + Math.cos(i * 1.1) * 0.4 + Math.sin(i * 2.3) * 0.18
      farMountVerts.push(x, peakY, -16)
      farMountVerts.push(x, waterLevel, -16)
    }
    farMountGeom.setAttribute("position", new THREE.Float32BufferAttribute(farMountVerts, 3))
    const farMountMat = new THREE.MeshBasicMaterial({
      color: 0x18100e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    })
    const farMountains = new THREE.Mesh(farMountGeom, farMountMat)
    scene.add(farMountains)

    // Mountain Range Layer 2 (Mid-ground craggy peaks)
    const midMountGeom = new THREE.BufferGeometry()
    const midMountVerts: number[] = []
    const midMountSegs = 45
    const midMountWidth = 48
    for (let i = 0; i <= midMountSegs; i++) {
      const x = (i / midMountSegs) * midMountWidth - midMountWidth / 2
      const centerDip = Math.exp(-Math.pow((x - 0.75) / 3.2, 2)) * 0.45
      const peakY = -0.55 + Math.sin(i * 0.75 + 1.2) * 0.6 + Math.cos(i * 1.45) * 0.32 - centerDip
      midMountVerts.push(x, peakY, -13)
      midMountVerts.push(x, waterLevel, -13)
    }
    midMountGeom.setAttribute("position", new THREE.Float32BufferAttribute(midMountVerts, 3))
    const midMountMat = new THREE.MeshBasicMaterial({
      color: 0x100b09,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    })
    const midMountains = new THREE.Mesh(midMountGeom, midMountMat)
    scene.add(midMountains)

    // 5. Golden Reeds & Tall Grass Shoreline Band
    const reedBladeCount = isMobile ? 350 : 800
    const reedGeom = new THREE.BufferGeometry()
    const reedPositions = new Float32Array(reedBladeCount * 2 * 3)
    const reedColors = new Float32Array(reedBladeCount * 2 * 3)

    const colorReedTop = new THREE.Color(0xe5a958)
    const colorReedBottom = new THREE.Color(0x381e12)

    for (let i = 0; i < reedBladeCount; i++) {
      const rx = (Math.random() - 0.5) * 36
      const rz = -6.0 + (Math.random() - 0.5) * 4.0
      const bladeHeight = 0.45 + Math.random() * 0.4
      const by = waterLevel - 0.05
      const ty = by + bladeHeight

      const idx = i * 6
      reedPositions[idx] = rx
      reedPositions[idx + 1] = by
      reedPositions[idx + 2] = rz
      reedColors[idx] = colorReedBottom.r
      reedColors[idx + 1] = colorReedBottom.g
      reedColors[idx + 2] = colorReedBottom.b

      reedPositions[idx + 3] = rx + (Math.random() - 0.5) * 0.1
      reedPositions[idx + 4] = ty
      reedPositions[idx + 5] = rz
      reedColors[idx + 3] = colorReedTop.r
      reedColors[idx + 4] = colorReedTop.g
      reedColors[idx + 5] = colorReedTop.b
    }
    reedGeom.setAttribute("position", new THREE.BufferAttribute(reedPositions, 3))
    reedGeom.setAttribute("color", new THREE.BufferAttribute(reedColors, 3))
    const reedMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      linewidth: 1,
    })
    const reeds = new THREE.LineSegments(reedGeom, reedMat)
    scene.add(reeds)

    // 6. Planar Reflective Water Surface
    const floorGeometry = new THREE.PlaneGeometry(50, 30, 32, 32)
    const floorMaterial = new THREE.MeshBasicMaterial({
      color: 0x090605,
      transparent: true,
      opacity: 0.94,
    })
    const waterPlane = new THREE.Mesh(floorGeometry, floorMaterial)
    waterPlane.rotation.x = -Math.PI / 2
    waterPlane.position.y = waterLevel
    scene.add(waterPlane)

    // Mirror Inverted Reflection System (Luminous Upside-Down Reflection)
    const mirrorGeometry = geometry.clone()
    const mirrorMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.078 : 0.058,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.68,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const mirrorSystem = new THREE.Points(mirrorGeometry, mirrorMaterial)
    mirrorSystem.position.set(particleSystem.position.x, waterLevel * 2 - particleSystem.position.y, 0)
    mirrorSystem.scale.y = -1
    scene.add(mirrorSystem)

    // 7. Interactive Mouse & Touch Tracking with Natural Parallax
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

    // 8. Scroll Progress Tracking
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

    // 9. Animation Loop
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
      const camParallaxX = isMobileScreen ? 0.2 : 0.55
      const camParallaxY = isMobileScreen ? 0.18 : 0.38
      const baseCamY = isMobileScreen ? 0.35 : 0.15

      camera.position.x = -mouse.current.x * camParallaxX
      camera.position.y = baseCamY - mouse.current.y * camParallaxY
      camera.lookAt(isMobileScreen ? 0.0 : 0.3, isMobileScreen ? 0.2 : 0.05, 0)

      // Calculate Synchronized Active Stage across 8 Sections:
      const p = scrollState.progress
      const heroPosX = isMobileScreen ? 0.0 : 0.75
      const maxGliderX = isMobileScreen ? 0.0 : 2.05
      let targetBufA = stageKnight
      let targetBufB = stageKnight
      let stageLerp = 0
      let targetPosX = heroPosX

      // Stable 3/4 profile angle with gentle organic breathing motion (NEVER turns edge-on!)
      let baseRotY = 0.15 + Math.sin(time * 0.35) * 0.08

      if (p < 0.12) {
        // SEC 01 Hero: Right half center -> Glides slightly further right
        targetBufA = stageKnight
        targetBufB = stageKnight
        targetPosX = heroPosX + (p / 0.12) * (maxGliderX - heroPosX)
        stageLerp = 0
      } else if (p < 0.26) {
        // SEC 02 Approach: Knight steady on right
        targetBufA = stageKnight
        targetBufB = stageKnight
        targetPosX = maxGliderX
        stageLerp = 0
      } else if (p < 0.40) {
        // SEC 03 Storefronts: Knight -> 3D Browser Window (Facing Front)
        targetBufA = stageKnight
        targetBufB = stageBrowser
        targetPosX = maxGliderX
        stageLerp = (p - 0.26) / 0.14
        baseRotY = 0 // Face front
      } else if (p < 0.54) {
        // SEC 04 Automation: Browser -> Interlocking Gears (Facing Front)
        targetBufA = stageBrowser
        targetBufB = stageGears
        targetPosX = maxGliderX
        stageLerp = (p - 0.40) / 0.14
        baseRotY = 0 // Face front
      } else if (p < 0.68) {
        // SEC 05 Speed-to-Lead: Gears -> 3 Spark AI Stars
        targetBufA = stageGears
        targetBufB = stageSpark
        targetPosX = maxGliderX
        stageLerp = (p - 0.54) / 0.14
        baseRotY = 0
      } else if (p < 0.82) {
        // SEC 06 Selected Work: Spark -> Ring Orbit Vortex
        targetBufA = stageSpark
        targetBufB = stageRing
        targetPosX = maxGliderX - ((p - 0.68) / 0.14) * (maxGliderX * 0.45)
        stageLerp = (p - 0.68) / 0.14
      } else if (p < 0.90) {
        // SEC 07 Method: Ring -> 3D Angled Tile
        targetBufA = stageRing
        targetBufB = stageTile
        targetPosX = (maxGliderX * 0.55) - ((p - 0.82) / 0.08) * (maxGliderX * 0.55)
        stageLerp = (p - 0.82) / 0.08
      } else {
        // SEC 08 Closing CTA: Return to full center facing viewer as Knight
        targetBufA = stageKnight
        targetBufB = stageKnight
        targetPosX = 0.0
        stageLerp = 0
        baseRotY = 0.15
      }

      particleSystem.position.x += (targetPosX - particleSystem.position.x) * 0.06
      mirrorSystem.position.x = particleSystem.position.x

      // Particle Position Interpolation + Cursor Proximity Repulsion
      const mWorldX = mouse.current.worldX
      const mWorldY = mouse.current.worldY
      const hasMouseMoved = mouse.current.hasMoved
      const sysPosX = particleSystem.position.x
      const sysPosY = particleSystem.position.y

      for (let i = 0; i < knightCount; i++) {
        const ax = targetBufA[i * 3]
        const ay = targetBufA[i * 3 + 1]
        const az = targetBufA[i * 3 + 2]

        const bx = targetBufB[i * 3]
        const by = targetBufB[i * 3 + 1]
        const bz = targetBufB[i * 3 + 2]

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
      for (let i = knightCount; i < totalCount; i++) {
        renderPositions[i * 3] = currentPositions[i * 3] + Math.sin(time * 0.4 + i) * 0.08
        renderPositions[i * 3 + 1] = currentPositions[i * 3 + 1] + Math.cos(time * 0.35 + i) * 0.08
        renderPositions[i * 3 + 2] = currentPositions[i * 3 + 2]
      }

      geometry.attributes.position.needsUpdate = true

      // Tilts and levitation of the 3D Particle Sculpture
      const mobileElevation = isMobileScreen ? 0.3 : 0.0
      particleSystem.rotation.y = baseRotY + mouse.current.x * 0.32
      particleSystem.rotation.x = Math.sin(time * 0.25) * 0.05 - mouse.current.y * 0.2
      particleSystem.position.y = 0.05 + mobileElevation + Math.sin(time * 0.8) * 0.06

      // Mirror reflection synchronizes rotation & position inverted
      mirrorSystem.rotation.y = particleSystem.rotation.y
      mirrorSystem.rotation.x = -particleSystem.rotation.x
      mirrorSystem.position.y = waterLevel * 2 - particleSystem.position.y

      // Sinusoidal wave ripple on reflection points
      const mirrorPos = mirrorGeometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < knightCount; i += 3) {
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

    // 10. Resize Handler
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      const isMobileNow = width < 768
      camera.aspect = width / height
      if (isMobileNow) {
        camera.position.z = 11.0
        camera.fov = 52
      } else {
        camera.position.z = 8.0
        camera.fov = 50
      }
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // 11. Cleanup
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
      farMountGeom.dispose()
      midMountGeom.dispose()
      reedGeom.dispose()
      floorGeometry.dispose()
      material.dispose()
      mirrorMaterial.dispose()
      farMountMat.dispose()
      midMountMat.dispose()
      reedMat.dispose()
      floorMaterial.dispose()
      particleTexture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 62% 38%, rgba(215, 115, 70, 0.32) 0%, rgba(98, 44, 24, 0.2) 30%, rgba(22, 14, 12, 0.88) 65%, #0d0908 100%)
        `,
        opacity: 0.98
      }}
      aria-hidden="true"
    >
      {/* Subtle Atmospheric Plus Crosshairs matching benchmark */}
      <div className="absolute top-[22%] left-[34%] font-mono text-[10px] text-[#e08a68]/25 select-none pointer-events-none">+</div>
      <div className="absolute top-[22%] right-[34%] font-mono text-[10px] text-[#e08a68]/25 select-none pointer-events-none">+</div>
      <div className="absolute top-[78%] left-[34%] font-mono text-[10px] text-[#e08a68]/20 select-none pointer-events-none">+</div>
      <div className="absolute top-[78%] right-[34%] font-mono text-[10px] text-[#e08a68]/20 select-none pointer-events-none">+</div>
    </div>
  )
}
