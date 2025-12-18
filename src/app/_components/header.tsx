"use client"

import "./header.css";

export default function Header() {

    return (
        <div className="headerContainer">
            <div style={{display: "flex", gap: "200px", alignItems: "center"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <button className="headerHamburger"><img src="/hamburger.svg" style={{width: "18px", height: "18px"}}></img></button>
                    <div style={{fontSize: "25px", display: "flex", gap: "2px", alignItems: "center"}}>
                        <img src="/gmailLogo.svg" style={{width: "40px", height: "40px"}}></img>
                        <span style={{ fontFamily: "var(--font-roboto), sans-serif" }}>Gmail</span>
                    </div>
                </div>
                <div className="headerSearchBar">
                    <img src="/searchIcon.svg" className="searchBarIcons"></img>
                    <input type="text" placeholder="Search mail" className="searchBarInput"></input>
                    <img src="/filters.svg" className="searchBarIcons"></img>
                </div>
            </div>
            <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                <button><img className="optionIcon" src="/questionMarkCircle.svg"></img></button>
                <button><img className="optionIcon" style={{width: "40px", height: "40px"}} src="/setting.svg"></img></button>
                <button><img className="optionIcon" src="/gemini.svg"></img></button>
                <button><img className="dotGridIcon" src="/dotGrid.svg"></img></button>
                <button style={{width: "30px", height: "30px", background: "rgba(197, 197, 197, 1)", borderRadius: "50%", color: "white"}}>A</button>
            </div>

        </div>
    )
}