import { Circle } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { forwardRef, useRef } from 'react'
import { DoubleSide } from 'three'

const Island = forwardRef(function Island({ initPos = [0, 0, 0], float = false, ...props }, ref) {
  const islandRef = useRef()
  useFrame(({ clock }, delta) => {
    if (islandRef.current && float) {
      islandRef.current.setTranslation({
        x: initPos[0],
        y: initPos[1] + Math.sin(clock.getElapsedTime()) * 1,
        z: initPos[2],
      })
    }
  })

  return (
    <RigidBody ref={islandRef} position={initPos} type='kinematicPosition' colliders='cuboid'>
      <Circle receiveShadow args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial side={DoubleSide} color={'lightGreen'} />
      </Circle>
    </RigidBody>
  )
})
export default Island
