import { Instances, Instance, Text3D } from '@react-three/drei';
import '../shader/lightSweep.js';


const textConfig = {
  curveSegments: 35,
  bevelEnabled: true,
  bevelSize: 0,
  bevelThickness: 0,
  height: 0,
  letterSpacing: 0,
  size: 1.2,
};

const Grid = ({ baseHeight, values }) => {
  const number = 23,
    lineWidth = 0.026;

  return (
    <>
      <Text3D
        font={'./MFTianLiNoncommercial_Regular.json'}
        position={[-18, 0, -7]}
        rotation={[-Math.PI * 0.2, 0, 0]}
        scale={1.2}
        {...textConfig}
      >
        {values.title}
        <meshBasicMaterial color={'#3d3d3d'} />
      </Text3D>
      <Instances position={[0, -0.01, 0]} scale={3}>
        <planeGeometry args={[lineWidth, baseHeight]} />
        <meshBasicMaterial color="#999" />
        {Array.from({ length: number }, (_, y) =>
          Array.from({ length: number }, (_, x) => (
            <group
              key={x + ':' + y}
              position={[
                x * 2 - Math.floor(number / 2) * 2,
                -0.01,
                y * 2 - Math.floor(number / 2) * 2,
              ]}
            >
              <Instance rotation={[-Math.PI / 2, 0, 0]} />
              <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
            </group>
          ))
        )}
        <gridHelper args={[100, 100, '#bbb', '#bbb']} position={[0, -0.01, 0]} />
      </Instances>
    </>
  );
};

export default Grid;