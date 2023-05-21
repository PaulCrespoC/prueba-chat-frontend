import {useRouter} from "next/router";
import React from "react";
import Conversaciones from "@/components/Conversaciones";
import useSWR from "swr";
import {ConversacionDetalleI} from "@/interfaces/ConversacionDetalleI";
import {getAuth} from "firebase/auth";

export default function ChatPage() {

    const auth = getAuth();
    const {id} = useRouter().query;
    const {isLoading, data, mutate} = useSWR<ConversacionDetalleI[]>(`conversaciones/${id}/detalles`)
    const [message, setMessage] = React.useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = await auth.currentUser?.getIdToken();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversaciones/${id}/detalles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "mensaje": message
            }),
        });
        if (response.ok) {
            setMessage("");
            return mutate();
        }
    }

    return (
        <div className="ml-64 px-4 h-screen flex items-center justify-center">
            <div className="flex flex-col bg-white p-4 justify-end h-screen rounded-md w-screen">
                <div className="flex-1 overflow-y-scroll space-y-4 bg-gray-100 p-4 flex flex-col justify-end">
                    <Conversaciones isLoading={isLoading} data={data}/>
                </div>

                <form className="mt-4 flex gap-x-2" onSubmit={onSubmit}>
                    <input
                        type="text"
                        className="flex-grow px-4 py-2 rounded-md border-gray-300 bg-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
                        value={message}
                        onChange={handleChange}
                        placeholder="Escribe tu mensaje"
                    />
                    <button
                        type="submit"
                        disabled={!message || !id || !id.length}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>

    )
}