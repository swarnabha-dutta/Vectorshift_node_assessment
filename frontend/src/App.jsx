import React from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Background,
    Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import TextNode from "./TestNode";
import { submitPipeline } from "./submit";

// 🔥 Register custom node types
const nodeTypes = {
    text: TextNode,
};

function App() {
    // ---------- Initial Graph ----------
    const initialNodes = [
        {
            id: "text_1",
            type: "text",
            data: { text: "Hello VectorShift" },
            position: { x: 100, y: 200 },
        },
        {
            id: "output_1",
            type: "output",
            data: {},
            position: { x: 500, y: 200 },
        },
    ];

    const initialEdges = [
        {
            id: "e1",
            source: "text_1",
            target: "output_1",
        },
    ];

    // ---------- ReactFlow State ----------
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // ---------- Submit Pipeline (PDF Spec) ----------
    const handleRun = async () => {
        try {
            const result = await submitPipeline(nodes, edges);

            alert(
                `Pipeline Analysis ✅

Nodes: ${result.num_nodes}
Edges: ${result.num_edges}
Is DAG: ${result.is_dag ? "Yes" : "No"}`
            );
        } catch (error) {
            console.error(error);
            alert("Error submitting pipeline ❌");
        }
    };

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            {/* Run Button */}
            <button
                onClick={handleRun}
                style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 10,
                    padding: "8px 14px",
                    fontWeight: "bold",
                }}
            >
                Run Pipeline
            </button>

            {/* React Flow Canvas */}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default App;
