import React, { useRef, useState, useEffect } from "react";
import CanvasArea from "./canvasArea.jsx";
import ControlButtons from "./controlButtons.jsx";
import LiveStats from "./LiveStats";
import AnalysisBox from "./AnalysisBox.jsx";

export default function DriveSimulator() {
    const canvasRef = useRef(null);

    const [isDriving, setIsDriving] = useState(false);
    const [data, setData] = useState([]);
    const [results, setResults] = useState(null);
    const [lastPoint, setLastPoint] = useState(null);

    // Draw when lastPoint changes
    useEffect(() => {
        if (!isDriving || !lastPoint) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (data.length === 0) return;
        const prev = data[data.length - 1];

        ctx.strokeStyle = "#1e40af";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(lastPoint.x, lastPoint.y);
        ctx.stroke();
    }, [lastPoint]);

    const handleMouseMove = (e) => {
        if (!isDriving) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const now = performance.now();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (lastPoint) {
            const dx = x - lastPoint.x;
            const dy = y - lastPoint.y;
            const dt = now - lastPoint.t;

            const dist = Math.sqrt(dx * dx + dy * dy);
            const speed = dist / (dt / 1000);

            setData((p) => [...p, { x, y, speed, t: now }]);
        }

        setLastPoint({ x, y, t: now });
    };

    const startDriving = () => {
        setData([]);
        setResults(null);
        setLastPoint(null);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        setIsDriving(true);
    };

    const stopDriving = () => {
        setIsDriving(false);
        if (data.length < 2) return;

        let speedViolations = 0;
        let unstableSpeedEvents = 0;
        let harshBrakeCount = 0;
        let rapidAccelCount = 0;

        for (let i = 1; i < data.length; i++) {
            const curr = data[i].speed;
            const prev = data[i - 1].speed;
            const dv = curr - prev;

            if (curr > 1000) speedViolations++;
            if (dv < -500) harshBrakeCount++;
            if (dv > 500) rapidAccelCount++;
            if (Math.abs(dv) > 400) unstableSpeedEvents++;
        }

        const avgSpeed =
            data.reduce((s, p) => s + p.speed, 0) / data.length;

        setResults({
            avgSpeed,
            maxSpeed: Math.max(...data.map((p) => p.speed)),
            speedViolations,
            unstableSpeedEvents,
            harshBrakeCount,
            rapidAccelCount,
            samples: data.length,
        });
    };

    const resetCanvas = () => {
        setData([]);
        setResults(null);
        setLastPoint(null);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", gap: 20 }}>
                
                {/* LEFT: CANVAS */}
                <CanvasArea
                    canvasRef={canvasRef}
                    isDriving={isDriving}
                    handleMouseMove={handleMouseMove}
                />

                {/* RIGHT SIDE BOXES */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
                    <LiveStats data={data} />
                    <AnalysisBox results={results} />
                </div>
            </div>

            {/* BUTTONS */}
            <ControlButtons
                isDriving={isDriving}
                startDriving={startDriving}
                stopDriving={stopDriving}
                resetCanvas={resetCanvas}
            />
        </div>
    );
}
