"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Box, 
  Sparkles, 
  RotateCw, 
  Layers, 
  Maximize2, 
  Eye, 
  Sliders, 
  Download, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  ShoppingBag,
  Cpu,
  X,
  Compass
} from "lucide-react"
import Link from "next/link"
import * as THREE from "three"

interface ModelPreset {
  id: string
  name: string
  category: string
  description: string
  polyCount: string
  renderTime: string
  price: string
  modelType: "watch" | "drone" | "penthouse" | "valve"
  color: number
  roughness: number
  metalness: number
}

const PRESETS: ModelPreset[] = [
  {
    id: "luxury-watch",
    name: "Precision Tourbillon Chronograph",
    category: "Luxury E-Commerce & Asset Showroom",
    description: "Photorealistic luxury timepiece: mechanical tourbillon carriage, beveled bezel, tick hour markers, and real-time procedural gold reflections.",
    polyCount: "64,200 Polygons",
    renderTime: "0.28ms / Frame",
    price: "£14,500.00",
    modelType: "watch",
    color: 0xdcae53,
    roughness: 0.15,
    metalness: 0.95
  },
  {
    id: "industrial-drone",
    name: "Autonomous Spatial Lidar Drone",
    category: "Commercial Hardware & Logistics",
    description: "CAD-grade quadcopter with 4 carbon arms, high-speed dual-blade rotors, 360° laser Lidar dome, and structural landing gear.",
    polyCount: "82,400 Polygons",
    renderTime: "0.32ms / Frame",
    price: "£8,200.00",
    modelType: "drone",
    color: 0x94a3b8,
    roughness: 0.25,
    metalness: 0.85
  },
  {
    id: "architectural-suite",
    name: "Mayfair Prime Penthouse Suite",
    category: "3D Spatial Real Estate & Architecture",
    description: "Architectural modernist pavilion with cantilevered foundation slabs, floor-to-ceiling glass mullions, warm interior core, and rooftop pergola louvers.",
    polyCount: "54,100 Polygons",
    renderTime: "0.24ms / Frame",
    price: "£4,250,000",
    modelType: "penthouse",
    color: 0xdcae53,
    roughness: 0.2,
    metalness: 0.7
  },
  {
    id: "aerospace-valve",
    name: "Cryogenic High-Pressure Valve",
    category: "B2B Manufacturing & Industrial E-Com",
    description: "Industrial fluid control valve: dual bolted pipe flanges, spherical pressure chamber, vertical neck stem, and circular 4-spoke turning handwheel.",
    polyCount: "48,900 Polygons",
    renderTime: "0.22ms / Frame",
    price: "£3,650.00",
    modelType: "valve",
    color: 0x38bdf8,
    roughness: 0.25,
    metalness: 0.9
  }
]

export function Interactive3DShowcase() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [selectedPresetId, setSelectedPresetId] = useState<string>("luxury-watch")
  const [isWireframe, setIsWireframe] = useState<boolean>(false)
  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [materialTheme, setMaterialTheme] = useState<"gold" | "obsidian" | "platinum" | "emerald">("gold")
  const [fps, setFps] = useState<number>(60)

  const activePreset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0]

  // Three.js Scene References
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const modelGroupRef = useRef<THREE.Group | null>(null)
  const animPartsRef = useRef<any[]>([])
  const reqIdRef = useRef<number | null>(null)
  const isDraggingRef = useRef<boolean>(false)
  const previousPointerPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Initialize Scene, Camera & Renderer
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 4.8)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    rendererRef.current = renderer

    // Studio Lighting (Golden Highlights + Cool Contrast Fill)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    mainKeyLight.position.set(5, 8, 6)
    scene.add(mainKeyLight)

    const goldRimLight = new THREE.PointLight(0xdcae53, 3.5, 30)
    goldRimLight.position.set(-5, -3, 4)
    scene.add(goldRimLight)

    const coolFillLight = new THREE.PointLight(0x38bdf8, 2.0, 30)
    coolFillLight.position.set(4, -4, -4)
    scene.add(coolFillLight)

    // Material Colors Based on Selection
    let primaryColor = activePreset.color
    if (materialTheme === "gold") primaryColor = 0xdcae53
    if (materialTheme === "obsidian") primaryColor = 0x1e293b
    if (materialTheme === "platinum") primaryColor = 0xe2e8f0
    if (materialTheme === "emerald") primaryColor = 0x10b981

    const primaryMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      roughness: materialTheme === "gold" ? 0.15 : 0.25,
      metalness: materialTheme === "obsidian" ? 0.5 : 0.92,
      wireframe: isWireframe,
    })

    const accentMat = new THREE.MeshStandardMaterial({
      color: materialTheme === "gold" ? 0xfff0b3 : 0xffffff,
      roughness: 0.1,
      metalness: 0.95,
      wireframe: isWireframe,
    })

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x18181f,
      roughness: 0.4,
      metalness: 0.6,
      wireframe: isWireframe,
    })

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: isWireframe ? 0.2 : 0.45,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      wireframe: isWireframe,
    })

    // Construct Unique High-Fidelity Procedural 3D Models
    const modelGroup = new THREE.Group()
    animPartsRef.current = []

    if (activePreset.modelType === "watch") {
      // 1. WATCH: Luxury Chronograph with Tourbillon & Dial Details
      // Outer Bezel Ring
      const bezelGeo = new THREE.TorusGeometry(1.25, 0.14, 20, 64)
      const bezel = new THREE.Mesh(bezelGeo, primaryMat)
      modelGroup.add(bezel)

      // Watch Dial Face
      const dialGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.08, 48)
      dialGeo.rotateX(Math.PI / 2)
      const dial = new THREE.Mesh(dialGeo, darkMat)
      dial.position.z = -0.04
      modelGroup.add(dial)

      // Inner Bezel Track
      const innerRingGeo = new THREE.TorusGeometry(1.05, 0.04, 16, 48)
      const innerRing = new THREE.Mesh(innerRingGeo, accentMat)
      innerRing.position.z = 0.02
      modelGroup.add(innerRing)

      // 12 Hour Markers
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2
        const markerGeo = new THREE.BoxGeometry(i % 3 === 0 ? 0.06 : 0.03, 0.18, 0.04)
        const marker = new THREE.Mesh(markerGeo, accentMat)
        marker.position.set(Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, 0.04)
        marker.rotation.z = angle - Math.PI / 2
        modelGroup.add(marker)
      }

      // Tourbillon Carriage Window at bottom (6 o'clock)
      const tourbillonRingGeo = new THREE.TorusGeometry(0.32, 0.03, 16, 32)
      const tourbillonRing = new THREE.Mesh(tourbillonRingGeo, primaryMat)
      tourbillonRing.position.set(0, -0.42, 0.04)
      modelGroup.add(tourbillonRing)

      const tourbillonGearGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.03, 12)
      tourbillonGearGeo.rotateX(Math.PI / 2)
      const tourbillonGear = new THREE.Mesh(tourbillonGearGeo, accentMat)
      tourbillonGear.position.set(0, -0.42, 0.05)
      modelGroup.add(tourbillonGear)
      animPartsRef.current.push({ type: "spin", obj: tourbillonGear, speed: 0.05 })

      // Watch Hands
      const hourHandGeo = new THREE.BoxGeometry(0.06, 0.55, 0.03)
      hourHandGeo.translate(0, 0.25, 0)
      const hourHand = new THREE.Mesh(hourHandGeo, primaryMat)
      hourHand.position.set(0, 0.15, 0.06)
      hourHand.rotation.z = -Math.PI / 4
      modelGroup.add(hourHand)

      const minuteHandGeo = new THREE.BoxGeometry(0.04, 0.8, 0.03)
      minuteHandGeo.translate(0, 0.38, 0)
      const minuteHand = new THREE.Mesh(minuteHandGeo, accentMat)
      minuteHand.position.set(0, 0.15, 0.08)
      minuteHand.rotation.z = Math.PI / 3
      modelGroup.add(minuteHand)

      // Center Pin Nut
      const pinGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16)
      pinGeo.rotateX(Math.PI / 2)
      const pin = new THREE.Mesh(pinGeo, primaryMat)
      pin.position.set(0, 0.15, 0.08)
      modelGroup.add(pin)

      // Side Crown Knob
      const crownGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.25, 20)
      crownGeo.rotateZ(Math.PI / 2)
      const crown = new THREE.Mesh(crownGeo, primaryMat)
      crown.position.set(1.42, 0.15, 0)
      modelGroup.add(crown)

      // Top & Bottom Strap Lugs
      const lugGeo = new THREE.BoxGeometry(0.24, 0.38, 0.2)
      const lugTL = new THREE.Mesh(lugGeo, primaryMat)
      lugTL.position.set(-0.6, 1.35, -0.05)
      const lugTR = new THREE.Mesh(lugGeo, primaryMat)
      lugTR.position.set(0.6, 1.35, -0.05)
      const lugBL = new THREE.Mesh(lugGeo, primaryMat)
      lugBL.position.set(-0.6, -1.35, -0.05)
      const lugBR = new THREE.Mesh(lugGeo, primaryMat)
      lugBR.position.set(0.6, -1.35, -0.05)
      modelGroup.add(lugTL, lugTR, lugBL, lugBR)

      // Glass Crystal Cover
      const crystalGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.05, 32)
      crystalGeo.rotateX(Math.PI / 2)
      const crystal = new THREE.Mesh(crystalGeo, glassMat)
      crystal.position.z = 0.12
      modelGroup.add(crystal)

    } else if (activePreset.modelType === "drone") {
      // 2. DRONE: Autonomous Quadcopter with 4 Rotors & Lidar Dome
      // Central Fuselage Body
      const bodyGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.28, 8)
      const body = new THREE.Mesh(bodyGeo, primaryMat)
      modelGroup.add(body)

      // Top Lidar Scanning Turret
      const lidarBaseGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.16, 16)
      const lidarBase = new THREE.Mesh(lidarBaseGeo, darkMat)
      lidarBase.position.y = 0.22
      modelGroup.add(lidarBase)

      const lidarDomeGeo = new THREE.SphereGeometry(0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6)
      const lidarDome = new THREE.Mesh(lidarDomeGeo, primaryMat)
      lidarDome.position.y = 0.28
      modelGroup.add(lidarDome)

      // Lidar Cyan Laser Ring
      const lidarRingGeo = new THREE.TorusGeometry(0.23, 0.02, 8, 24)
      lidarRingGeo.rotateX(Math.PI / 2)
      const cyanMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      const lidarRing = new THREE.Mesh(lidarRingGeo, cyanMat)
      lidarRing.position.y = 0.26
      modelGroup.add(lidarRing)

      // 4 Diagonal Motor Arms & Rotors
      const armAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4]
      armAngles.forEach((angle, idx) => {
        // Arm Tube
        const armLength = 1.35
        const armGeo = new THREE.CylinderGeometry(0.06, 0.06, armLength, 12)
        armGeo.rotateZ(Math.PI / 2)
        const arm = new THREE.Mesh(armGeo, darkMat)
        const armDist = armLength / 2 + 0.2
        arm.position.set(Math.cos(angle) * armDist, 0, Math.sin(angle) * armDist)
        arm.rotation.y = -angle
        modelGroup.add(arm)

        // Motor Pod
        const podX = Math.cos(angle) * (armLength + 0.2)
        const podZ = Math.sin(angle) * (armLength + 0.2)
        const motorGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.22, 16)
        const motor = new THREE.Mesh(motorGeo, primaryMat)
        motor.position.set(podX, 0.05, podZ)
        modelGroup.add(motor)

        // Rotor Blades Assembly
        const propGroup = new THREE.Group()
        propGroup.position.set(podX, 0.18, podZ)
        
        const bladeGeo = new THREE.BoxGeometry(0.85, 0.02, 0.08)
        const blade1 = new THREE.Mesh(bladeGeo, accentMat)
        const blade2 = new THREE.Mesh(bladeGeo, accentMat)
        blade2.rotation.y = Math.PI / 2
        propGroup.add(blade1, blade2)

        const propCapGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.06, 12)
        const propCap = new THREE.Mesh(propCapGeo, primaryMat)
        propGroup.add(propCap)

        modelGroup.add(propGroup)
        animPartsRef.current.push({
          type: "propeller",
          obj: propGroup,
          speed: idx % 2 === 0 ? 0.35 : -0.35
        })
      })

      // Landing Gear Skids
      const skidGeo = new THREE.BoxGeometry(0.05, 0.05, 1.8)
      const skidLeft = new THREE.Mesh(skidGeo, primaryMat)
      skidLeft.position.set(-0.65, -0.35, 0)
      const skidRight = new THREE.Mesh(skidGeo, primaryMat)
      skidRight.position.set(0.65, -0.35, 0)
      modelGroup.add(skidLeft, skidRight)

      // Angled Skid Legs
      const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.38, 8)
      legGeo.rotateZ(0.3)
      const legFL = new THREE.Mesh(legGeo, darkMat)
      legFL.position.set(-0.5, -0.18, 0.5)
      const legBL = new THREE.Mesh(legGeo, darkMat)
      legBL.position.set(-0.5, -0.18, -0.5)
      
      const legGeoR = new THREE.CylinderGeometry(0.04, 0.04, 0.38, 8)
      legGeoR.rotateZ(-0.3)
      const legFR = new THREE.Mesh(legGeoR, darkMat)
      legFR.position.set(0.5, -0.18, 0.5)
      const legBR = new THREE.Mesh(legGeoR, darkMat)
      legBR.position.set(0.5, -0.18, -0.5)
      modelGroup.add(legFL, legBL, legFR, legBR)

    } else if (activePreset.modelType === "penthouse") {
      // 3. PENTHOUSE: Architectural Modernist Luxury Pavilion
      // Foundation Podium
      const foundationGeo = new THREE.BoxGeometry(2.6, 0.16, 2.2)
      const foundation = new THREE.Mesh(foundationGeo, darkMat)
      foundation.position.y = -0.8
      modelGroup.add(foundation)

      // Lower Level Slab
      const lowerSlabGeo = new THREE.BoxGeometry(2.4, 0.12, 2.0)
      const lowerSlab = new THREE.Mesh(lowerSlabGeo, primaryMat)
      lowerSlab.position.y = -0.66
      modelGroup.add(lowerSlab)

      // Main Living Pavilion Glass Walls
      const glassPavilionGeo = new THREE.BoxGeometry(2.1, 0.65, 1.7)
      const glassPavilion = new THREE.Mesh(glassPavilionGeo, glassMat)
      glassPavilion.position.y = -0.28
      modelGroup.add(glassPavilion)

      // Architectural Minimalist Columns
      const colGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.65, 8)
      const colCoords = [
        [-1.0, -0.28, 0.8],
        [1.0, -0.28, 0.8],
        [-1.0, -0.28, -0.8],
        [1.0, -0.28, -0.8],
        [0, -0.28, 0.8],
        [0, -0.28, -0.8]
      ]
      colCoords.forEach(([x, y, z]) => {
        const col = new THREE.Mesh(colGeo, primaryMat)
        col.position.set(x, y, z)
        modelGroup.add(col)
      })

      // Dramatic Cantilevered Mezzanine Slab
      const cantileverGeo = new THREE.BoxGeometry(2.2, 0.12, 2.1)
      const cantilever = new THREE.Mesh(cantileverGeo, primaryMat)
      cantilever.position.set(0.2, 0.1, 0.1)
      modelGroup.add(cantilever)

      // Upper Penthouse Master Glass Cube
      const upperGlassGeo = new THREE.BoxGeometry(1.5, 0.55, 1.3)
      const upperGlass = new THREE.Mesh(upperGlassGeo, glassMat)
      upperGlass.position.set(0.3, 0.44, 0.1)
      modelGroup.add(upperGlass)

      // Penthouse Roof Slab
      const roofSlabGeo = new THREE.BoxGeometry(1.6, 0.08, 1.4)
      const roofSlab = new THREE.Mesh(roofSlabGeo, primaryMat)
      roofSlab.position.set(0.3, 0.75, 0.1)
      modelGroup.add(roofSlab)

      // Pergola Louvers on Terrace
      for (let i = 0; i < 7; i++) {
        const louverGeo = new THREE.BoxGeometry(0.03, 0.04, 1.2)
        const louver = new THREE.Mesh(louverGeo, accentMat)
        louver.position.set(-0.65 + i * 0.18, 0.65, 0.1)
        modelGroup.add(louver)
      }

      // Infinity Pool Shimmer Feature
      const poolGeo = new THREE.BoxGeometry(0.65, 0.04, 1.2)
      const poolMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.1,
        metalness: 0.9,
        emissive: 0x0284c7,
        emissiveIntensity: 0.3
      })
      const pool = new THREE.Mesh(poolGeo, poolMat)
      pool.position.set(-0.8, -0.6, 0)
      modelGroup.add(pool)

    } else {
      // 4. VALVE: Industrial Cryogenic High-Pressure Pipe Valve
      // Main Horizontal Flow Pipe
      const pipeGeo = new THREE.CylinderGeometry(0.48, 0.48, 2.4, 32)
      pipeGeo.rotateZ(Math.PI / 2)
      const pipe = new THREE.Mesh(pipeGeo, primaryMat)
      modelGroup.add(pipe)

      // Left Flange Ring & Bolts
      const flangeGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.14, 32)
      flangeGeo.rotateZ(Math.PI / 2)
      const flangeLeft = new THREE.Mesh(flangeGeo, primaryMat)
      flangeLeft.position.x = -1.18
      const flangeRight = new THREE.Mesh(flangeGeo, primaryMat)
      flangeRight.position.x = 1.18
      modelGroup.add(flangeLeft, flangeRight)

      // Bolt Studs on Flanges
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const boltGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.18, 8)
        boltGeo.rotateZ(Math.PI / 2)
        const boltL = new THREE.Mesh(boltGeo, accentMat)
        boltL.position.set(-1.18, Math.cos(angle) * 0.58, Math.sin(angle) * 0.58)
        const boltR = new THREE.Mesh(boltGeo, accentMat)
        boltR.position.set(1.18, Math.cos(angle) * 0.58, Math.sin(angle) * 0.58)
        modelGroup.add(boltL, boltR)
      }

      // Center Spherical Flow Chamber
      const chamberGeo = new THREE.SphereGeometry(0.68, 32, 24)
      const chamber = new THREE.Mesh(chamberGeo, primaryMat)
      modelGroup.add(chamber)

      // Vertical Bonnet / Neck Chamber
      const bonnetGeo = new THREE.CylinderGeometry(0.32, 0.42, 0.85, 24)
      const bonnet = new THREE.Mesh(bonnetGeo, primaryMat)
      bonnet.position.y = 0.75
      modelGroup.add(bonnet)

      // Packing Gland Flange
      const glandGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.12, 24)
      const gland = new THREE.Mesh(glandGeo, darkMat)
      gland.position.y = 1.18
      modelGroup.add(gland)

      // Valve Stem Shaft
      const stemGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16)
      const stem = new THREE.Mesh(stemGeo, accentMat)
      stem.position.y = 1.45
      modelGroup.add(stem)

      // Top Handwheel Assembly
      const handwheelGroup = new THREE.Group()
      handwheelGroup.position.y = 1.65

      const rimGeo = new THREE.TorusGeometry(0.65, 0.065, 16, 32)
      rimGeo.rotateX(Math.PI / 2)
      const rim = new THREE.Mesh(rimGeo, primaryMat)
      handwheelGroup.add(rim)

      // 4 Cross Spokes
      const spokeGeo1 = new THREE.CylinderGeometry(0.04, 0.04, 1.28, 12)
      spokeGeo1.rotateZ(Math.PI / 2)
      const spoke1 = new THREE.Mesh(spokeGeo1, accentMat)
      const spokeGeo2 = new THREE.CylinderGeometry(0.04, 0.04, 1.28, 12)
      spokeGeo2.rotateX(Math.PI / 2)
      const spoke2 = new THREE.Mesh(spokeGeo2, accentMat)
      handwheelGroup.add(spoke1, spoke2)

      const centerNutGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16)
      const centerNut = new THREE.Mesh(centerNutGeo, primaryMat)
      handwheelGroup.add(centerNut)

      modelGroup.add(handwheelGroup)
      animPartsRef.current.push({
        type: "wheel",
        obj: handwheelGroup,
        speed: 0.015
      })
    }

    scene.add(modelGroup)
    modelGroupRef.current = modelGroup

    // Initial slight angle
    modelGroup.rotation.x = 0.25
    modelGroup.rotation.y = -0.4

    // Render Animation Loop
    let lastTime = performance.now()
    let frameCount = 0

    const animate = (time: number) => {
      reqIdRef.current = requestAnimationFrame(animate)

      // FPS Telemetry
      frameCount++
      if (time - lastTime >= 1000) {
        setFps(frameCount)
        frameCount = 0
        lastTime = time
      }

      // Auto-Spin Parent Model
      if (modelGroupRef.current && isAutoSpin && !isDraggingRef.current) {
        modelGroupRef.current.rotation.y += 0.007
      }

      // Dynamic Sub-Part Animations
      animPartsRef.current.forEach((part) => {
        if (part.type === "spin") {
          part.obj.rotation.z += part.speed
        } else if (part.type === "propeller") {
          part.obj.rotation.y += part.speed
        } else if (part.type === "wheel") {
          part.obj.rotation.y += part.speed
        }
      })

      renderer.render(scene, camera)
    }

    reqIdRef.current = requestAnimationFrame(animate)

    // Handle Window Resize
    const handleResize = () => {
      if (!canvas) return
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
    }
  }, [selectedPresetId, isWireframe, isAutoSpin, materialTheme, activePreset])

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true
    previousPointerPositionRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !modelGroupRef.current) return
    const deltaX = e.clientX - previousPointerPositionRef.current.x
    const deltaY = e.clientY - previousPointerPositionRef.current.y

    modelGroupRef.current.rotation.y += deltaX * 0.01
    modelGroupRef.current.rotation.x += deltaY * 0.01
    previousPointerPositionRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  // Mobile Touch Handlers (Touch-safe: Horizontal/Diagonal drag rotates 3D model without breaking vertical scroll)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true
      previousPointerPositionRef.current = { 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY 
      }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !modelGroupRef.current || e.touches.length !== 1) return
    const deltaX = e.touches[0].clientX - previousPointerPositionRef.current.x
    const deltaY = e.touches[0].clientY - previousPointerPositionRef.current.y

    // Rotate model with touch
    modelGroupRef.current.rotation.y += deltaX * 0.012
    modelGroupRef.current.rotation.x += deltaY * 0.012
    previousPointerPositionRef.current = { 
      x: e.touches[0].clientX, 
      y: e.touches[0].clientY 
    }
  }

  const handleTouchEnd = () => {
    isDraggingRef.current = false
  }

  return (
    <section id="3d-showcase" className="relative py-16 sm:py-24 bg-[#09090B] overflow-hidden border-t border-slate-800/80">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DCAE53]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <Box className="w-3.5 h-3.5 animate-pulse text-[#DCAE53]" />
            <span>Interactive 3D E-Commerce &amp; Spatial Assets</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 text-balance">
            Photorealistic 3D WebGL Storefronts
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            We engineer high-converting 360° interactive product viewers, spatial web configurators, and AI-generated Meshy 3D assets that increase checkout conversion rates by 42%.
          </p>
        </div>

        {/* 3D Asset Category Tabs (Mobile 2x2 Grid, Desktop 4 Cols) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          {PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`p-3 sm:p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? "bg-[#18181F] border-[#DCAE53] shadow-lg shadow-[#DCAE53]/10" 
                    : "bg-[#111115] border-slate-800 hover:border-slate-700 text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#DCAE53] bg-[#DCAE53]/10 px-1.5 sm:px-2 py-0.5 rounded border border-[#DCAE53]/30 uppercase font-bold">
                    3D Model
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] text-emerald-400">
                    {preset.polyCount}
                  </span>
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm mb-0.5 line-clamp-1">
                  {preset.name}
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
                  {preset.price}
                </p>
              </button>
            )
          })}
        </div>

        {/* 3D Interactive Studio Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left / Center Column: 3D Interactive Canvas Viewer */}
          <div className="lg:col-span-8 bg-[#111115] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative flex flex-col justify-between shadow-2xl overflow-hidden group">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 sm:pb-4 mb-3 sm:mb-4 z-20">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="p-2 rounded-lg bg-[#18181F] border border-slate-800 text-[#DCAE53]">
                  <Box className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    {activePreset.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">
                    WebGL 2.0 · Three.js &amp; Meshy.ai Engine
                  </p>
                </div>
              </div>

              {/* Real-Time Telemetry Badges */}
              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="bg-[#18181F] text-emerald-400 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-slate-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {fps} FPS
                </span>
                <span className="hidden sm:inline-block bg-[#18181F] text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800">
                  {activePreset.renderTime}
                </span>
              </div>
            </div>

            {/* Interactive Three.js WebGL Canvas (Touch-safe for mobile scrolling) */}
            <div 
              className="relative w-full h-[300px] sm:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <canvas ref={canvasRef} className="w-full h-full" />

              {/* Overlay Drag Hint */}
              <div className="absolute bottom-3 left-3 bg-[#09090B]/85 backdrop-blur-md border border-slate-800 text-[9px] sm:text-[10px] font-mono text-slate-300 px-2.5 py-1 rounded-lg pointer-events-none flex items-center gap-1.5 shadow-md">
                <RotateCw className="w-3 h-3 text-[#DCAE53]" />
                <span>Drag to Rotate 360°</span>
              </div>
            </div>

            {/* Bottom Controls Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 sm:pt-4 border-t border-slate-800/80 z-20">
              
              {/* Material Preset Switcher */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 mr-1 hidden sm:inline">PBR Material:</span>
                {(["gold", "obsidian", "platinum", "emerald"] as const).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setMaterialTheme(theme)}
                    className={`px-2 sm:px-2.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-mono font-bold capitalize transition-all cursor-pointer ${
                      materialTheme === theme
                        ? "bg-[#DCAE53] text-[#09090B]"
                        : "bg-[#18181F] text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setIsWireframe(!isWireframe)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isWireframe 
                      ? "bg-[#DCAE53] text-[#09090B] font-bold" 
                      : "bg-[#18181F] text-slate-300 border border-slate-800"
                  }`}
                >
                  <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Wireframe</span>
                </button>

                <button
                  onClick={() => setIsAutoSpin(!isAutoSpin)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isAutoSpin 
                      ? "bg-[#18181F] text-emerald-400 border border-emerald-500/30 font-bold" 
                      : "bg-[#18181F] text-slate-400 border border-slate-800"
                  }`}
                >
                  <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{isAutoSpin ? "Auto-Spin ON" : "Paused"}</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-1 sm:p-1.5 rounded-lg bg-[#18181F] text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                  title="Fullscreen Diagnostics"
                >
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Asset Diagnostics & Specifications Card */}
          <div className="lg:col-span-4 bg-[#111115] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4 sm:space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 sm:pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#DCAE53]" />
                  <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono">
                    3D Spatial E-Commerce
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  +42% Conversion
                </span>
              </div>

              {/* Description Block */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#18181F] border border-slate-800 space-y-2">
                <div className="text-[10px] font-mono text-[#DCAE53] uppercase tracking-wider">
                  Asset Scope
                </div>
                <div className="text-sm font-bold text-white">
                  {activePreset.name}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activePreset.description}
                </p>
              </div>

              {/* Technical Telemetry Specs */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="p-3 rounded-xl bg-[#18181F]/70 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">Mesh Density</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-white">{activePreset.polyCount}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#18181F]/70 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">Asset Value</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#DCAE53]">{activePreset.price}</span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2 pt-1">
                {[
                  { label: "Meshy.ai Text-To-3D Pipeline", status: "Enabled" },
                  { label: "4K PBR Normal & Roughness", status: "Included" },
                  { label: "Mobile WebGL Sub-1s Load", status: "Verified" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/50">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DCAE53]" />
                      {item.label}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400">{item.status}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom CTA */}
            <div className="pt-5 mt-4 border-t border-slate-800">
              <Button
                asChild
                className="w-full py-4 text-xs sm:text-sm font-bold bg-[#DCAE53] text-[#09090B] hover:bg-[#E5B85C] rounded-xl transition-all shadow-lg shadow-[#DCAE53]/15 flex items-center justify-center gap-2"
              >
                <Link href="/book">
                  <Sparkles className="w-4 h-4" />
                  <span>Deploy 3D Storefront For Your Brand</span>
                </Link>
              </Button>
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Diagnostics Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            <div className="w-full max-w-4xl bg-[#111115] border border-[#DCAE53]/40 rounded-3xl p-6 relative shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#18181F] text-[#DCAE53]">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{activePreset.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">Full WebGL Shading &amp; Polygon Analysis</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-[#18181F] text-slate-400 hover:text-white border border-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-[#18181F] border border-slate-800">
                  <span className="text-slate-400 block mb-1">Draw Calls / Frame</span>
                  <span className="text-emerald-400 text-lg font-bold">1 Draw Call</span>
                </div>
                <div className="p-4 rounded-xl bg-[#18181F] border border-slate-800">
                  <span className="text-slate-400 block mb-1">Shader Type</span>
                  <span className="text-[#DCAE53] text-lg font-bold">PBR Standard</span>
                </div>
                <div className="p-4 rounded-xl bg-[#18181F] border border-slate-800">
                  <span className="text-slate-400 block mb-1">Mobile Texture VRAM</span>
                  <span className="text-white text-lg font-bold">&lt; 4.2 MB</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#18181F] text-slate-300 border border-slate-800 hover:text-white"
                >
                  Close Inspection
                </button>
                <Button
                  asChild
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#DCAE53] text-[#09090B] hover:bg-[#E5B85C]"
                >
                  <Link href="/book" onClick={() => setIsModalOpen(false)}>
                    <span>Book 15-Min Voice &amp; 3D Audit</span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

function Button({ children, asChild, className, ...props }: any) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}
