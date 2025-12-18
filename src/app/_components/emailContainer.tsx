"use client"

import { useState } from "react"
import OpenedThread from "./openedThread";
import "./emailContainer.css";
import type { Thread } from "~/types/types";
import UnderHeaderOptions from "./underHeaderOptions";

interface prop {
    threads: Thread[]
}

export default function EmailContainer(emailContainerProp: prop) {
    const [ThreadOpened, setThreadOpened] = useState<boolean>(false);
    const [selectedThread, setSelectedThread] = useState<Thread | null>(null)
    function clickButton(thread: Thread) {
        setSelectedThread(thread)
        setThreadOpened(true)
    }
    const height = window.innerHeight - 64; 
    return (
    <div style={{borderRadius: "10px", width: "calc(100% - 187px - 56px)", height: `${height}px`, display: "flex", flexDirection: "column"}}>
        <UnderHeaderOptions />
        <div style={{width: "100%", height: `calc(${height}px - 100px)`,overflowY: "auto", display: "flex", flexDirection: "column"}}>
            <div style={{ flex: "1 1 auto", overflowY: "auto", width: "100%"}}>
                {ThreadOpened && selectedThread
                    ? <OpenedThread thread={selectedThread}/>
                    : (emailContainerProp.threads).map((thread) => {
                        return (
                            <button className="thread" onClick={() => clickButton(thread)} key={thread.id}>Name:{thread.displayName} Subject:{thread.subjectLine}</button>
                        )
                    })
                }
            </div>
        </div>
    </div>
        
    )
}