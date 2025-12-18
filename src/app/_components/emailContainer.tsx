"use client"

import { useState } from "react"
import OpenedThread from "./openedThread";
import "./emailContainer.css";
import type { Thread } from "~/types/types";

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

    return (
        <div style={{width: "calc(100% - 187px - 56px)", border: "solid green 1px", overflowY: "auto", display: "flex", flexDirection: "column"}}>
            {ThreadOpened && selectedThread
                ? <OpenedThread thread={selectedThread}/>
                : (emailContainerProp.threads).map((thread) => {
                    return (
                        <button className="thread" onClick={() => clickButton(thread)}style={{display: "flex", gap: "10px", border: "solid black 1px", height: "40px", overflowX: "hidden"}} key={thread.id}>Name:{thread.displayName} Subject:{thread.subjectLine}</button>
                    )
                })
            }
        </div>
        
    )
}