import { Handle, Position } from "reactflow";
import { useEffect, useRef, useState } from "react";

export default function TextNode({ data }) {
    const [text, setText] = useState(data.text || "");
    const textareaRef = useRef(null);
    const [variables, setVariables] = useState([]);

    // 🔥 IMPORTANT: sync text → data.text
    useEffect(() => {
        data.text = text;
    }, [text]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
    }, [text]);

    useEffect(() => {
        const matches = [...text.matchAll(/{{\s*([a-zA-Z_$][\w$]*)\s*}}/g)];
        const vars = matches.map((m) => m[1]);
        setVariables([...new Set(vars)]);
    }, [text]);

    return (
        <div
            style={{
                padding: 10,
                minWidth: 180,
                background: "#1e1e1e",
                border: "1px solid #555",
                borderRadius: 6,
                color: "#fff",
            }}
        >
            {variables.map((v, i) => (
                <Handle
                    key={v}
                    id={v}
                    type="target"
                    position={Position.Left}
                    style={{ top: 40 + i * 20 }}
                />
            ))}

            <strong>Text</strong>

            <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type text... use {{ variable }}"
                style={{
                    width: "100%",
                    marginTop: 8,
                    resize: "none",
                    background: "#111",
                    color: "#fff",
                    border: "1px solid #444",
                    borderRadius: 4,
                    padding: 6,
                    fontSize: 12,
                    overflow: "hidden",
                }}
            />

            <Handle type="source" position={Position.Right} />
        </div>
    );
}
