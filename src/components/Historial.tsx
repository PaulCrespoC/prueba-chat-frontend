import useSWR from "swr";
import {ConversacionI} from "@/interfaces/ConversacionI";
import {useRouter} from "next/router";
import React from "react";
import CrearChat from "@/components/CrearChat";
import {getAuth} from "firebase/auth";
import ChatHistorial from "@/components/ChatHistorial";

export default function Historial() {


    const {isLoading, data, mutate} = useSWR<ConversacionI[]>('conversaciones')

    if (isLoading) return (
        <>
            <CrearChat mutate={mutate}/>
        </>
    );

    if (data && data.length > 0) {
        return (
            <>
                <CrearChat mutate={mutate}/>
                {data.map(conversacion => <ChatHistorial conversacion={conversacion} key={conversacion.id} mutate={mutate}/>)}
            </>
        )
    }

    return <CrearChat mutate={mutate}/>
}