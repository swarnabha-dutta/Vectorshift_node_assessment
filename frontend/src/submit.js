export async function submitPipeline(nodes, edges) {
    const payload = {
        nodes: nodes.map((n) => ({
            id: n.id,
            type: n.type,
            data: n.data,
        })),
        edges: edges.map((e) => ({
            source: e.source,
            target: e.target,
        })),
    };

    const res = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Failed to submit pipeline");
    }

    return res.json();
}
