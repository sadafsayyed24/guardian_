export default function AnalysisBox({ results }) {
    return (
        <div
            style={{
                padding: 16,
                border: "1px solid #ccc",
                borderRadius: 8,
                background: "white",
            }}
        >
            <h4 style={{ margin: "0 0 10px" }}>Driving Analysis</h4>

            {!results ? (
                <div style={{ opacity: 0.6 }}>No analysis yet</div>
            ) : (
                <>
                    <div>Samples: {results.samples}</div>
                    <div>Average speed: {results.avgSpeed.toFixed(1)} px/s</div>
                    <div>Max speed: {results.maxSpeed.toFixed(1)} px/s</div>
                    <div>Overspeed events: {results.speedViolations}</div>
                    <div>Unstable fluctuations: {results.unstableSpeedEvents}</div>
                    <div>Harsh brakes: {results.harshBrakeCount}</div>
                    <div>Rapid accelerations: {results.rapidAccelCount}</div>
                </>
            )}
        </div>
    );
}
