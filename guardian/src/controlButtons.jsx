export default function ControlButtons({ isDriving, startDriving, stopDriving, resetCanvas }) {
    return (
        <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
            {!isDriving ? (
                <button
                    onClick={startDriving}
                    style={{
                        padding: "10px 14px",
                        borderRadius: 8,
                        border: "none",
                        background: "#16a34a",
                        color: "white",
                    }}
                >
                    Start Driving
                </button>
            ) : (
                <button
                    onClick={stopDriving}
                    style={{
                        padding: "10px 14px",
                        borderRadius: 8,
                        border: "none",
                        background: "#dc2626",
                        color: "white",
                    }}
                >
                    Stop & Analyze
                </button>
            )}

            <button
                onClick={resetCanvas}
                style={{ padding: "10px 14px", borderRadius: 8 }}
            >
                Reset
            </button>
        </div>
    );
}
