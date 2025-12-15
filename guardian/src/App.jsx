import React from 'react'
import DriveSimulator from './DriveSimulator'


export default function App() {
    return (
        <div style={{
        fontFamily: "'Lucida Sans', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
        background: "#000",
        minHeight: "100vh",
        padding: "20px 0",
      }}>
            <h1 style={{
          maxWidth: 900,
          margin: "0 auto 20px auto",
          padding: "0 20px",
          color: "#ccc",
        }}>Guardian</h1>
            <p style={{
            margin: 0,
            marginTop: 4,
            fontSize: "0.95rem",
            textAlign: "center",
            color: "#ccc",
          }}>Move your mouse on the canvas after starting.  
          Stop anytime to analyze your driving pattern.</p>
            <DriveSimulator />
        </div>
    )
}