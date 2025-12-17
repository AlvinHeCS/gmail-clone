

export type Message = {
     id: string;
     threadId: string;     
     labelIds: string[];    
     snippet:  string;
     historyId: string;
     internalDate: string;
     sizeEstimate: number;
     runId: string;  
}

export type Thread = {
    id: string;
    userId: string;
    snippet: string;
    historyId: string;
    messages: Message[];
    runId: string;
    displayName: string;
    subjectLine: string;
}