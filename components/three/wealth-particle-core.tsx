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
    camera.position.set(0, isMobileInitial ? 0.35 : 0.15, isMobileInitial ? 10.8 : 8.2)

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

    // Stage Shape Coordinate Buffers — All Rooted in the New MW Logo
    const stageCrestBase = new Float32Array(crestCount * 3)
    const stageDispersed = new Float32Array(crestCount * 3)
    const stagePulsed = new Float32Array(crestCount * 3)
    const stageOrbital = new Float32Array(crestCount * 3)
    const stageFacets = new Float32Array(crestCount * 3)
    const stageElevated = new Float32Array(crestCount * 3)

    const currentPositions = new Float32Array(totalCount * 3)
    const renderPositions = new Float32Array(totalCount * 3)
    const initialScatter = new Float32Array(totalCount * 3)
    const colors = new Float32Array(totalCount * 3)

    // Mercian Wealth Royal Purple & Champagne Gold Luxury Palette
    const colorChampagneGold = new THREE.Color(0xfff5d8)
    const colorMetallicGold = new THREE.Color(0xd4af37)
    const colorSoftAmethyst = new THREE.Color(0xb794f6)
    const colorRichViolet = new THREE.Color(0x7c3aed)
    const colorDeepPurple = new THREE.Color(0x31134f)
    const tempColor = new THREE.Color()

    // 2.1 POPULATE STAGE: AUTHENTIC MERCIAN WEALTH CREST
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

      // Stage 02: Dispersed Dynamic Golden Streams Across Purple Space
      const flowRadius = Math.sqrt(x * x + y * y) + 0.1
      const flowAngle = Math.atan2(y, x) + (flowRadius * 1.6)
      const disperseDist = 1.4 + (i % 9) * 0.35
      stageDispersed[i * 3] = Math.cos(flowAngle) * (flowRadius + disperseDist) + ((i % 5) - 2) * 0.15
      stageDispersed[i * 3 + 1] = Math.sin(flowAngle) * (flowRadius + disperseDist * 0.7) + Math.sin(flowRadius * 3.0) * 0.4
      stageDispersed[i * 3 + 2] = z + Math.sin(flowAngle * 2.0) * 1.8

      // Stage 03: Conversion / Dense Volumetric Focus
      stagePulsed[i * 3] = x * 1.08
      stagePulsed[i * 3 + 1] = y * 1.08
      stagePulsed[i * 3 + 2] = z * 0.55

      // Stage 04: Automation / Concentric Kinetic Rings Around MW Crest Core
      if (i % 3 === 0) {
        const ringAngle = (i / (crestCount / 3)) * Math.PI * 2
        const ringR = 2.1 + (i % 7) * 0.18
        const tilt = 0.52
        const rx = Math.cos(ringAngle) * ringR
        const rz = Math.sin(ringAngle) * ringR
        const ry = ((i % 5) - 2) * 0.08
        stageOrbital[i * 3] = rx
        stageOrbital[i * 3 + 1] = ry * Math.cos(tilt) - rz * Math.sin(tilt)
        stageOrbital[i * 3 + 2] = ry * Math.sin(tilt) + rz * Math.cos(tilt)
      } else {
        stageOrbital[i * 3] = x
        stageOrbital[i * 3 + 1] = y
        stageOrbital[i * 3 + 2] = z
      }

      // Stage 05: Intelligence / Architectural Lattice & Center Gold Orb
      const isCoreOrb = Math.abs(x) < 0.35 && Math.abs(y + 0.1) < 0.45
      stageFacets[i * 3] = isCoreOrb ? x * 1.25 : x * 1.02
      stageFacets[i * 3 + 1] = isCoreOrb ? y * 1.25 : y * 1.02
      stageFacets[i * 3 + 2] = isCoreOrb ? z * 1.5 : z * 1.1

      // Stage 06 to 09: Elevated Metallic Hold
      stageElevated[i * 3] = x * 0.95
      stageElevated[i * 3 + 1] = y * 0.95 + 0.35
      stageElevated[i * 3 + 2] = z * 1.1

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

    // 2.2 POPULATE AMBIENT FLOATING AMETHYST & GOLD DUST MOTES
    for (let i = crestCount; i < totalCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const radius = 2.4 + Math.random() * 5.4
      const x = Math.cos(theta) * radius + (Math.random() - 0.5) * 1.5
      const y = (Math.random() - 0.5) * 7.5
      const z = (Math.random() - 0.5) * 5.0

      currentPositions[i * 3] = x
      currentPositions[i * 3 + 1] = y
      currentPositions[i * 3 + 2] = z

      initialScatter[i * 3] = x
      initialScatter[i * 3 + 1] = y
      initialScatter[i * 3 + 2] = z

      // Ambient particles: mix of amethyst, rich violet and champagne
      const rPick = Math.random()
      if (rPick < 0.4) {
        tempColor.copy(colorSoftAmethyst)
      } else if (rPick < 0.7) {
        tempColor.copy(colorRichViolet)
      } else {
        tempColor.copy(colorChampagneGold)
      }
      colors[i * 3] = tempColor.r
      colors[i * 3 + 1] = tempColor.g
      colors[i * 3 + 2] = tempColor.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(renderPositions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    // 3. Circular Luminous Particle Texture (Gold & Amethyst Glow)
    const particleCanvas = document.createElement("canvas")
    particleCanvas.width = 64
    particleCanvas.height = 64
    const pctx = particleCanvas.getContext("2d")
    if (pctx) {
      const gradient = pctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, "rgba(255, 255, 250, 1)")
      gradient.addColorStop(0.25, "rgba(243, 225, 170, 0.95)")
      gradient.addColorStop(0.65, "rgba(183, 148, 246, 0.35)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      pctx.fillStyle = gradient
      pctx.fillRect(0, 0, 64, 64)
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas)

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.082 : 0.062,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.96,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(geometry, material)
    const heroPosX = isMobile ? 0.0 : 1.7
    particleSystem.position.set(heroPosX, 0.05, 0)
    scene.add(particleSystem)

    // 4. Sleek Obsidian Reflective Surface with Subtle Purple Sheen (NO mountains, NO grass!)
    const waterLevel = -1.35
    const floorGeometry = new THREE.PlaneGeometry(50, 30, 32, 32)
    const floorMaterial = new THREE.MeshBasicMaterial({
      color: 0x030206, // Deepest obsidian purple floor
      transparent: true,
      opacity: 0.95,
    })
    const waterPlane = new THREE.Mesh(floorGeometry, floorMaterial)
    waterPlane.rotation.x = -Math.PI / 2
    waterPlane.position.y = waterLevel
    scene.add(waterPlane)

    // Mirror Inverted Reflection System (Luminous Upside-Down Specular Floor Reflection)
    const mirrorGeometry = geometry.clone()
    const mirrorMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.076 : 0.056,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const mirrorSystem = new THREE.Points(mirrorGeometry, mirrorMaterial)
    mirrorSystem.position.set(particleSystem.position.x, waterLevel * 2 - particleSystem.position.y, 0)
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

    // 6. Scroll Progress Tracking Across 11 Sections
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

      // Natural camera & element parallax (moving left moves left, moving right moves right)
      const isMobileScreen = window.innerWidth < 768
      const mouseParallaxX = mouse.current.x * (isMobileScreen ? 0.08 : 0.22)
      const mouseParallaxY = mouse.current.y * (isMobileScreen ? 0.06 : 0.16)
      const baseCamY = isMobileScreen ? 0.35 : 0.15

      camera.position.x = mouseParallaxX * 0.4
      camera.position.y = baseCamY + mouseParallaxY * 0.3
      camera.lookAt(isMobileScreen ? 0.0 : 0.45, isMobileScreen ? 0.2 : 0.05, 0)

      // Calculate Synchronized Active Stage across 11 Sections
      const p = scrollState.progress
      const rightAnchorX = isMobileScreen ? 0.0 : 1.7
      const maxGliderX = isMobileScreen ? 0.0 : 1.95

      let targetBufA = stageCrestBase
      let targetBufB = stageCrestBase
      let stageLerp = 0
      let targetPosX = rightAnchorX

      let baseRotY = 0.12 + Math.sin(time * 0.35) * 0.06

      if (p < 0.10) {
        targetBufA = stageCrestBase
        targetBufB = stageCrestBase
        targetPosX = rightAnchorX
        stageLerp = 0
      } else if (p < 0.20) {
        targetBufA = stageCrestBase
        targetBufB = stageDispersed
        targetPosX = rightAnchorX + (p - 0.10) / 0.10 * (maxGliderX - rightAnchorX)
        const subP = (p - 0.10) / 0.10
        stageLerp = Math.sin(subP * Math.PI)
      } else if (p < 0.30) {
        targetBufA = stageCrestBase
        targetBufB = stagePulsed
        targetPosX = maxGliderX
        stageLerp = (p - 0.20) / 0.10
      } else if (p < 0.40) {
        targetBufA = stagePulsed
        targetBufB = stageFacets
        targetPosX = maxGliderX
        stageLerp = (p - 0.30) / 0.10
      } else if (p < 0.50) {
        targetBufA = stageFacets
        targetBufB = stageElevated
        targetPosX = maxGliderX
        stageLerp = (p - 0.40) / 0.10
      } else if (p < 0.60) {
        targetBufA = stageElevated
        targetBufB = stageOrbital
        targetPosX = maxGliderX
        stageLerp = (p - 0.50) / 0.10
      } else if (p < 0.70) {
        targetBufA = stageOrbital
        targetBufB = stageCrestBase
        targetPosX = maxGliderX - ((p - 0.60) / 0.10) * (maxGliderX * 0.2)
        stageLerp = (p - 0.60) / 0.10
      } else if (p < 0.80) {
        targetBufA = stageCrestBase
        targetBufB = stageFacets
        targetPosX = maxGliderX * 0.8
        stageLerp = (p - 0.70) / 0.10
      } else if (p < 0.90) {
        targetBufA = stageFacets
        targetBufB = stageElevated
        targetPosX = (maxGliderX * 0.8) - ((p - 0.80) / 0.10) * (maxGliderX * 0.4)
        stageLerp = (p - 0.80) / 0.10
      } else {
        targetBufA = stageElevated
        targetBufB = stageCrestBase
        targetPosX = 0.0
        stageLerp = (p - 0.90) / 0.10
        baseRotY = 0.0
      }

      const baseTargetX = targetPosX + mouseParallaxX
      particleSystem.position.x += (baseTargetX - particleSystem.position.x) * 0.06
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

      // Tilts and levitation of the 3D Crest Particle Sculpture
      const mobileElevation = isMobileScreen ? 0.3 : 0.0
      particleSystem.rotation.y = baseRotY + mouse.current.x * 0.32
      particleSystem.rotation.x = Math.sin(time * 0.25) * 0.05 - mouse.current.y * 0.2
      particleSystem.position.y = 0.05 + mobileElevation + Math.sin(time * 0.8) * 0.06 + mouseParallaxY * 0.35

      // Mirror reflection synchronizes rotation & position inverted
      mirrorSystem.rotation.y = particleSystem.rotation.y
      mirrorSystem.rotation.x = -particleSystem.rotation.x
      mirrorSystem.position.y = waterLevel * 2 - particleSystem.position.y

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
        camera.position.z = 10.8
        camera.fov = 52
      } else {
        camera.position.z = 8.2
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
      floorGeometry.dispose()
      material.dispose()
      mirrorMaterial.dispose()
      floorMaterial.dispose()
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
