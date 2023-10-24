'use client'

import Cable from '@/components/canvas/Cable'
import { Lights } from '@/components/canvas/Common'
import Island from '@/components/canvas/Island'
import Ball from '@/components/canvas/models/Ball'
import CharacterModel from '@/components/canvas/models/CharacterModel'
import { Map } from '@/components/canvas/models/Map'
import { setGlobalVH, updateGlobalVH } from '@/helpers/global'
import {
  Box,
  Circle,
  Environment,
  KeyboardControls,
  OrbitControls,
  Plane,
  QuadraticBezierLine,
  Sphere,
  useProgress,
} from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import Ecctrl from 'ecctrl'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

/**
 * Keyboard control preset
 */
const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['Shift'] },
]

const islands = [
  [0, 0, 0],
  [30, 10, 10],
  [-30, 10, 10],
]
const PageContent = ({ data, ...props }) => {
  useEffect(() => {
    // Set variable height for mobile browsers
    setGlobalVH()
    window.addEventListener('resize', updateGlobalVH)

    return () => {
      window.removeEventListener('resize', updateGlobalVH)
    }
  }, [])

  const ballRef = useRef()
  const controlsRef = useRef()
  const islandsRef = useRef()
  const [lines, setLines] = useState([])

  const { progress } = useProgress()

  return (
    <>
      {/* UI */}
      <div className='pointer-events-none absolute left-0 top-0 z-10 h-fit-height w-full'>
        <p className='flex w-full items-center justify-center'>Hello there</p>
      </div>
      {/* Canvas */}
      <View
        onPointerDown={(e) => {
          e.target.requestPointerLock()
        }}
        className='absolute left-0 top-0 h-fit-height w-full'
      >
        <Environment preset='forest' />
        <Suspense fallback={null}>
          <Physics timeStep='vary' debug>
            {/* --- Character ---  */}
            <KeyboardControls map={keyboardMap}>
              <group position={[0, 2, 0]}>
                <Ecctrl debug>
                  <CharacterModel />
                </Ecctrl>
              </group>
            </KeyboardControls>
            {/* --- Props, Map, etc ---  */}
            <Ball ref={ballRef} controlsRef={controlsRef} />
            <group ref={islandsRef} name='islands'>
              {islands.map((island, i) => (
                <Island key={'island' + i} initPos={island} float={i > 0} />
              ))}
            </group>

            <Lights />
            {/* <RigidBody type='fixed' colliders='trimesh'>
                <Map />
              </RigidBody> */}
          </Physics>
          {islands.length > 1 &&
            islands.map((island, i) => {
              if (i === 0) return null
              const prevIsland = islands[i - 1]
              const midPoint = [
                (prevIsland[0] + island[0]) / 2,
                (prevIsland[1] + island[1]) / 2 - 20,
                (prevIsland[2] + island[2]) / 2,
              ]
              // return <Cable key={'cable' + i} start={prevIsland} end={island} />
            })}
        </Suspense>
      </View>
    </>
  )
}

export default PageContent
