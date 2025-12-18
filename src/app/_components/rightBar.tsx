"use client"

import "./rightBar.css";


export default function RightBar() {
    const height = window.innerHeight - 64; 
    return (
        <div style={{width: "56px", height: `${height}px`, background: "#F8FAFD", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", gap: "20px"}}>
            <button className="rightBarOption"><img src="googleCalendarLogo.svg" style={{width: "20px", height: "20px"}}></img></button>
            <button className="rightBarOption"><img src="lightBulb.svg" style={{width: "20px", height: "20px"}}></img></button>
            <button className="rightBarOption"><img src="blueTick.svg" style={{width: "20px", height: "20px"}}></img></button>
            <button className="rightBarOption"><img src="profile.svg" style={{width: "20px", height: "20px"}}></img></button>
            <div style={{borderBottom: "solid grey 1px", height: "1px", width: "100%"}}></div>
            <button className="rightBarOption"><img src="plus.svg" style={{width: "20px", height: "20px"}}></img></button>
        </div>
    )
}