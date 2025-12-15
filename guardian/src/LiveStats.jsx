export default function LiveStats({ data }) {
    return (
        <div
            style={{
                padding: 16,
                border: "1px solid #ccc",
                borderRadius: 8,
                background: "white",
            }}
        >
            <h4 style={{ margin: "0 0 10px" }}>Live</h4>
            <div>Samples: {data.length}</div>
            <div>
                Last speed:{" "}
                {data.length ? data[data.length - 1].speed.toFixed(1) : "—"} px/s
            </div>
        </div>
    );
}
