import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, useProgress } from '@react-three/drei';
import Grid from './Decoration/Grid';
import Map from './Map/Map';
import countValuesZJ from './assets/values.json';
import geoJsonZJ from './assets/ZheJiang.json';
import { Suspense, memo, useEffect, useState } from 'react';
import Loading from './Loading';

const baseHeight = 0.2;
const midHeightScale = 4;
const topHeightScale = 0.01;
const center = [120.99, 29.56];
const geoJson = geoJsonZJ;
const countValues = countValuesZJ;

function App() {
	const [loaded, setLoaded] = useState(false);
	const MemoGrid = memo(Grid);

	const { progress } = useProgress();

	useEffect(() => {
		if (progress === 100) setLoaded(true);
	}, [progress]);

	return (
		<Suspense fallback={<Loading />}>
			{loaded && (
				<div
					style={{
						position: 'absolute',
						top: '10px',
						zIndex: 1,
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
						padding: '0 20px',
						boxSizing: 'border-box',
					}}
				>
					
					
				</div>
			)}
			<Canvas camera={{ position: [0, 12, 16], fov: 50 }}>
				<ambientLight intensity={2} />
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					maxPolarAngle={Math.PI * 0.48}
					minPolarAngle={Math.PI * 0.2}
					maxAzimuthAngle={Math.PI * 0.3}
					minAzimuthAngle={-Math.PI * 0.1}
				/>
				<ContactShadows
					opacity={0.8}
					scale={30}
					blur={1}
					far={10}
					resolution={256}
					position={[0, -0.0001, 0]}
					color="#006afe"
				/>
				<MemoGrid baseHeight={baseHeight} values={countValues} />
				<Map
					baseHeight={baseHeight}
					midHeightScale={midHeightScale}
					topHeightScale={topHeightScale}
					values={countValues}
					geoJson={geoJson}
					mapCenter={center}
				/>
			</Canvas>
		</Suspense>
	);
}

export default App;
