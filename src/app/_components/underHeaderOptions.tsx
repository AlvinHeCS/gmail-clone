"use client"

import "./underHeaderOptions.css";

export default function UnderHeaderOptions() {
    return(
        <div style={{display: "flex", flexDirection: "column", height: "80px", width: "100%", borderRadius: "10px", padding: "5px", paddingTop: "10px"}}>
            <div style={{display: "flex", gap: "5px", height: "50%"}}>
                <button className="underHeaderOptionsButton">
                    <span>From</span>
                    <img src="/arrowD.svg" style={{height: "15px", width: "15px"}}></img>
                </button>
                <button className="underHeaderOptionsButton">
                    <span>Any time</span>
                    <img src="/arrowD.svg" style={{height: "15px", width: "15px"}}></img>
                </button>
                <button className="underHeaderOptionsButton">
                    <span>Has attachment</span>
                </button>
                <button className="underHeaderOptionsButton">
                    <span>To</span>
                    <img src="/arrowD.svg" style={{height: "15px", width: "15px"}}></img>
                </button>
                <button className="underHeaderOptionsButton">
                    <span>Is unread</span>
                    <img src="/arrowD.svg" style={{height: "15px", width: "15px"}}></img>
                </button>
                <button className="advancedSearchButton">Advanced search</button>
            </div>
            <div style={{height: "50%", display: "flex", alignItems: "center", gap: "20px"}}>
                <div style={{display: "flex"}}>
                    <img src="/square.svg" style={{width: "17px", height: "17px", marginLeft: "7px"}}></img>
                    <img src="/arrowD.svg" style={{width: "17px", height: "17px"}}></img>
                </div>
                <img src="/reload.svg" style={{width: "12px", height: "12px"}}></img>
                <img src="/dots.svg" style={{width: "12px", height: "12px"}}></img>
            </div>
        </div>
    )
}