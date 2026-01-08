export async function runPipeline(pipeline) {
    const res = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pipeline),
    });

    return res.json();
}
