"use client"

import "./leftBar.css";

export default function LeftBar() {
    const height = window.innerHeight - 64; 
    return (
        <div style={{height: `${height}px`, width: "187px", backgroundColor: "#F8FAFD", display: "flex", gap: "30px", flexDirection: "column"}}>
            <button className="composeButton">
                <img src="/pen.svg" style={{width: "17px", height: "17px"}}></img>
                <span>Compose</span>
            </button>
            <div>
                <button className="leftBarOption" style={{fontWeight: "500"}}><img src="/inbox.svg" style={{width: "15px", height: "15px"}}></img> Inbox</button>
                <button className="leftBarOption"><img src="/starred.svg" style={{width: "15px", height: "15px"}}></img> Starred</button>
                <button className="leftBarOption"><img src="/snoozed.svg" style={{width: "15px", height: "15px"}}></img> Snoozed</button>
                <button className="leftBarOption"><img src="/sent.svg" style={{width: "15px", height: "15px"}}></img> Sent</button>
                <button className="leftBarOption"><img src="/draft.svg" style={{width: "15px", height: "15px"}}></img> Draft</button>
                <button className="leftBarOption"><img src="/purchases.svg" style={{width: "15px", height: "15px"}}></img> Purchases</button>
                <button className="leftBarOption"><img src="/arrowD.svg" style={{width: "15px", height: "15px"}}></img> More</button>
            </div>
        </div>
    )
}