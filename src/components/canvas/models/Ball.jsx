import { Sphere } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody, vec3 } from '@react-three/rapier'
import { forwardRef, useRef } from 'react'
import * as THREE from 'three'

const Ball = forwardRef(function Ball({ controlsRef, ...props }, ref) {
  const { camera, controls } = useThree()
  const pushBall = (ballRef) => {
    if (ballRef.current && controlsRef.current) {
      const forward = new THREE.Vector3()
      forward.subVectors(controlsRef.current.target, camera.position).normalize().multiplyScalar(0.05)
      ballRef.current.applyImpulse(forward, true)
    }
  }

  return (
    <RigidBody ref={ref} colliders='ball'>
      <Sphere
        onClick={() => pushBall(ref)}
        args={[0.2, 128, 128]}
        position={[-4.324, 13.431, -1.033]}
        castShadow
        receiveShadow
      >
        <meshBasicMaterial color={'red'} />
      </Sphere>
    </RigidBody>
  )
})

export default Ball
