'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sphere, MeshDistortMaterial, Line, Box, Torus, Environment, ContactShadows, Html } from '@react-three/drei';
import { useRef, useState, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

// --- Shared Components ---

function Tooltip({ children, visible }: { children: React.ReactNode, visible: boolean }) {
    return (
        <Html distanceFactor={10} zIndexRange={[100, 0]}>
            <div className={cn(
                "bg-black/90 text-white text-xs px-2 py-1 rounded border border-white/20 whitespace-nowrap transition-opacity duration-200 pointer-events-none select-none",
                visible ? "opacity-100" : "opacity-0"
            )}>
                {children}
            </div>
        </Html>
    );
}

// --- Interactive Virtual DOM ---

function InteractiveVirtualDOM() {
    // State to track which node is dirty/re-rendering
    const [dirtyNode, setDirtyNode] = useState<number | null>(null);
    const [diffing, setDiffing] = useState(false);

    // Simulate reconciliation process
    const triggerUpdate = (id: number) => {
        if (diffing) return;
        setDirtyNode(id);
        setDiffing(true);
        setTimeout(() => setDiffing(false), 1500); // Reset after animation
    };

    return (
        <group>
            {/* Header Labels */}
            <Text position={[-2.5, 3, 0]} fontSize={0.3} color="#60a5fa">Virtual DOM (State)</Text>
            <Text position={[2.5, 3, 0]} fontSize={0.3} color="#f87171">Real DOM (UI)</Text>

            {/* Trees */}
            <NodeTree position={[-2.5, 0, 0]} color="#3b82f6" dirtyId={dirtyNode} onInteract={triggerUpdate} isVirtual />
            <NodeTree position={[2.5, 0, 0]} color="#ef4444" dirtyId={diffing ? dirtyNode : null} delay={0.8} />

            {/* Arrow Animation */}
             <group position={[0, 1, 0]}>
                 <Text fontSize={0.8} color={diffing ? "white" : "#333"}>→</Text>
                 {diffing && (
                     <Html position={[0, -0.5, 0]} center>
                         <div className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                             Reconciliation...
                         </div>
                     </Html>
                 )}
             </group>
        </group>
    );
}

function NodeTree({ position, color, dirtyId, onInteract, isVirtual, delay = 0 }: any) {
    const nodes = [
        { id: 0, pos: [0, 2, 0], parent: null },
        { id: 1, pos: [-1, 0.5, 0], parent: 0 },
        { id: 2, pos: [1, 0.5, 0], parent: 0 },
        { id: 3, pos: [-1.5, -1, 0], parent: 1 },
        { id: 4, pos: [-0.5, -1, 0], parent: 1 },
    ];

    return (
        <group position={position}>
            {nodes.map(node => (
                <group key={node.id}>
                    {node.parent !== null && (
                         <Line
                            points={[node.pos as any, nodes[node.parent].pos as any]}
                            color={color}
                            lineWidth={1}
                            transparent
                            opacity={0.3}
                        />
                    )}
                    <InteractiveNode
                        position={node.pos}
                        baseColor={color}
                        id={node.id}
                        isDirty={dirtyId === node.id}
                        onClick={onInteract}
                        isVirtual={isVirtual}
                        delay={delay}
                    />
                </group>
            ))}
        </group>
    )
}

function InteractiveNode({ position, baseColor, id, isDirty, onClick, isVirtual, delay }: any) {
    const [hovered, setHover] = useState(false);
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
             // Pulse animation if dirty
            if (isDirty) {
                const t = state.clock.getElapsedTime();
                const scale = 1 + Math.sin((t - delay) * 10) * 0.2;
                meshRef.current.scale.setScalar(scale);
                // Color flash
                (meshRef.current.material as THREE.MeshStandardMaterial).color.set(isVirtual ? "#fbbf24" : "#4ade80");
            } else {
                meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
                 (meshRef.current.material as THREE.MeshStandardMaterial).color.lerp(new THREE.Color(baseColor), 0.1);
            }
        }
    });

    return (
        <group position={position}>
             <mesh
                ref={meshRef}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    if(isVirtual && onClick) onClick(id);
                }}
            >
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color={baseColor} />
            </mesh>
            {isVirtual && hovered && (
                <Tooltip visible={true}>Click to update state</Tooltip>
            )}
            {/* ID label for clarity */}
            <Text position={[0, 0, 0.4]} fontSize={0.15} color="white">{id}</Text>
        </group>
    );
}

// --- Interactive Sorting ---

function InteractiveSorting() {
    const [array, setArray] = useState([5, 2, 8, 1, 9, 3, 7, 4, 6]);
    const [compareIdx, setCompareIdx] = useState<number[]>([]);
    const [sorting, setSorting] = useState(false);

    // Bubble Sort Step Logic
    useEffect(() => {
        if (!sorting) return;

        let i = 0;
        let j = 0;
        const arr = [...array];

        const interval = setInterval(() => {
            if (i >= arr.length) {
                setSorting(false);
                setCompareIdx([]);
                clearInterval(interval);
                return;
            }

            if (j >= arr.length - 1 - i) {
                i++;
                j = 0;
                return;
            }

            // Compare visual
            setCompareIdx([j, j + 1]);

            if (arr[j] > arr[j + 1]) {
                // Swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                setArray([...arr]);
            }
            j++;
        }, 300); // Speed of animation

        return () => clearInterval(interval);
    }, [sorting]);

    return (
        <group position={[0, -1, 0]}>
             <Text position={[0, 4, 0]} fontSize={0.3} color="white">
                 {sorting ? "Sorting..." : "Click bar or 'Reset' to start"}
             </Text>

             {array.map((val, idx) => {
                 const isComparing = compareIdx.includes(idx);
                 return (
                     <group key={idx} position={[(idx - 4) * 0.8, val * 0.25, 0]}>
                         <mesh>
                             <boxGeometry args={[0.6, val * 0.5, 0.6]} />
                             <meshStandardMaterial color={isComparing ? "#eab308" : `hsl(${val * 30}, 70%, 50%)`} />
                         </mesh>
                         <Text position={[0, val * 0.25 + 0.3, 0]} fontSize={0.2} color="white">{val}</Text>
                     </group>
                 )
             })}

            <Html position={[0, -2, 0]} center>
                <div className="flex gap-2">
                    <button
                        onClick={() => setSorting(true)}
                        disabled={sorting}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded shadow disabled:opacity-50"
                    >
                        Start Sort
                    </button>
                    <button
                         onClick={() => {
                             setSorting(false);
                             setArray([5, 2, 8, 1, 9, 3, 7, 4, 6].sort(() => Math.random() - 0.5));
                         }}
                         className="px-3 py-1 bg-slate-700 text-white text-xs rounded shadow"
                    >
                        Shuffle
                    </button>
                </div>
            </Html>
        </group>
    );
}

function ConceptNode({ position, title, color }: { position: [number, number, number], title: string, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, hovered ? 0.5 : 0, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, hovered ? 0.5 : 0, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[2, 2, 2]} />
        <MeshDistortMaterial color={color} speed={2} distort={0.2} radius={1} />
        <Text position={[0, 0, 1.2]} fontSize={0.3} color="white" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#000000">
          {title}
        </Text>
      </mesh>
    </Float>
  );
}

function ConnectionLine({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
    return (
        <Line
            points={[start, end]}
            color="#ccc"
            lineWidth={1}
        />
    );
}

function DependencyInjectionGraph() {
    return (
        <group>
            {/* Container */}
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                <mesh>
                    <sphereGeometry args={[1, 32, 32]} />
                    <MeshDistortMaterial color="#8b5cf6" speed={2} distort={0.3} radius={1} />
                </mesh>
                <Text position={[0, 0, 1.2]} fontSize={0.2} color="white">IoC Container</Text>
            </Float>

            {/* Modules */}
            {[0, 1, 2, 3].map(i => {
                const angle = (i / 4) * Math.PI * 2;
                const x = Math.cos(angle) * 3;
                const z = Math.sin(angle) * 3;
                return (
                    <group key={i} position={[x, 0, z]}>
                        <Line points={[[0, 0, 0], [-x * 0.8, 0, -z * 0.8]]} color="#8b5cf6" dashed dashSize={0.2} gapSize={0.1} />
                        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                            <mesh>
                                <boxGeometry args={[0.8, 0.8, 0.8]} />
                                <meshStandardMaterial color="#ec4899" wireframe />
                            </mesh>
                            <Text position={[0, 0.6, 0]} fontSize={0.2} color="white">Service {i+1}</Text>
                        </Float>
                    </group>
                )
            })}
        </group>
    );
}

export default function TechViz3D({ type }: { type: string }) {
  // Determine title based on type mapping
  let title = "Visual Guide";
  if (type === 'virtual-dom') title = "Virtual DOM vs Real DOM";
  if (type === 'sorting') title = "Sorting Algorithm Visualization";
  if (type === 'di-graph') title = "Dependency Injection Flow";
  if (type === 'routing-tree') title = "File System Routing";

  return (
    <VizWrapper title={title}>
        {type === 'virtual-dom' ? (
            <InteractiveVirtualDOM />
        ) : type === 'sorting' ? (
            <InteractiveSorting />
        ) : type === 'di-graph' ? (
            <DependencyInjectionGraph />
        ) : type === 'routing-tree' ? (
            <group position={[0, 1, 0]}>
                <ConceptNode position={[0, 2, 0]} title="app/" color="#3b82f6" />
                <ConnectionLine start={[0, 2, 0]} end={[-2, 0, 0]} />
                <ConceptNode position={[-2, 0, 0]} title="about/" color="#10b981" />
                <ConnectionLine start={[0, 2, 0]} end={[2, 0, 0]} />
                <ConceptNode position={[2, 0, 0]} title="dashboard/" color="#8b5cf6" />

                <ConnectionLine start={[2, 0, 0]} end={[2, -2, 0]} />
                <ConceptNode position={[2, -2, 0]} title="settings/" color="#ec4899" />
            </group>
        ) : (
            <group>
                <Torus args={[1, 0.4, 16, 100]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#6366f1" wireframe />
                </Torus>
                <Text position={[0, -2, 0]} color="white" fontSize={0.3}>Visualization: {type}</Text>
            </group>
        )}
    </VizWrapper>
  );
}

function VizWrapper({ children, title }: { children: React.ReactNode, title: string }) {
    return (
       <div className="w-full h-[500px] bg-slate-950 rounded-3xl overflow-hidden relative shadow-2xl">
            <div className="absolute top-4 left-6 z-10 pointer-events-none">
                <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Interactive Learning</div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Environment preset="city" />
                {children}
                <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                <OrbitControls makeDefault />
            </Canvas>
       </div>
    )
}
