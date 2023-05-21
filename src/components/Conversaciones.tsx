import {ConversacionDetalleI} from "@/interfaces/ConversacionDetalleI";
import Conversacion from "@/components/Conversacion";
import React from "react";

type Props = {
    isLoading: boolean;
    data: ConversacionDetalleI[] | undefined;
}

export default function Conversaciones({isLoading, data}: Props) {
    if (isLoading) {
        return (
            <>
                <h1>Cargando...</h1>
            </>
        )
    }

    if (data && data.length > 0) {
        return (
            <>
                {data.map((detalle) => <Conversacion key={detalle.id} detalle={detalle}/>)}
            </>
        )
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Sin conversaciones</h1>
                <p className="text-lg text-gray-800 mb-8">Escribe algo para comenzar</p>
            </div>
        </div>
    )
}