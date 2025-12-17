"use client"

import { api } from "~/trpc/react"
import { useEffect } from "react";
import Header from "../_components/header";
import LeftBar from "../_components/leftBar";
import RightBar from "../_components/rightBar";
import EmailContainer from "../_components/emailContainer";

export default function Dashboard() {
    const { mutateAsync: mutateAsyncInitalSync } = api.gmail.initialSync.useMutation({
     
    });
    const { data: threads, isLoading: loadingEmails } = api.gmail.getThreads.useQuery();
    
    useEffect(() => {
        mutateAsyncInitalSync();
    }, [])



    if (loadingEmails) return (<div>Emails are being loaded...</div>);
    if (!threads) return (<div>return no threads</div>);

    return (
        <div style={{width: "100%", height: "100vh", display: "flex", flexDirection: "column"}}>
            <Header/>
            <div style={{width: "100%", display: "flex"}}>
                <LeftBar/>
                <EmailContainer threads={threads}/>
                <RightBar/>
            </div>
        </div>
    )
}