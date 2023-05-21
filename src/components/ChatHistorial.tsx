import {ConversacionI} from "@/interfaces/ConversacionI";
import React from "react";
import {FiMessageCircle, FiX} from "react-icons/fi";
import Link from "next/link";
import {useRouter} from "next/router";
import {getAuth} from "firebase/auth";

type Props = {
    conversacion: ConversacionI,
    mutate: () => void,
}

export default function ChatHistorial({conversacion, mutate} : Props) {

    const auth = getAuth();
    const router = useRouter();
    const {id} = useRouter().query;

    const eliminarConversacion = async (id: number) => {
        const token = await auth.currentUser?.getIdToken();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversaciones/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (response.ok) {
            mutate();
            return router.push("/");
        }
    }

    return (
        <li>
            <Link href={`/chat/${conversacion.id}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiMessageCircle className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="flex-1 ml-3 whitespace-nowrap">{`${conversacion.identificador.substring(0, 12)}...`}</span>
                {typeof id === "string" && id === conversacion.id.toString() && (
                    <button type="button"
                            onClick={() => eliminarConversacion(conversacion.id)}
                            className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                        <FiX className="w-3 h-3"/>
                    </button>
                )}
            </Link>
        </li>
    )
}