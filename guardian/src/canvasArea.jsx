export default function CanvasArea({ canvasRef, isDriving, handleMouseMove }) {
    return (
        <div style={{ flex: 2 }}>
            <canvas
                ref={canvasRef}
                width={900}
                height={600}
                style={{
                    border: "2px solid rgba(0,0,0,0.12)",
                    background: "#fafafa",
                    cursor: isDriving ? "crosshair" : "pointer",
                    display: "block",
                    width: "100%",
                }}
                onMouseMove={handleMouseMove}
            />
        </div>
    );
}
