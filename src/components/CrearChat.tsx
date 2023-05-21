import React from "react";
import {ConversacionI} from "@/interfaces/ConversacionI";
import {useRouter} from "next/router";
import {useSigninCheck} from "reactfire";
import {getAuth, signInAnonymously} from 'firebase/auth';
import {FiPlus, FiUser} from "react-icons/fi";

type Props = {
    mutate: () => Promise<any>;
}

export default function CrearChat({mutate}: Props) {


    const router = useRouter();
    const {data: signInCheckResult} = useSigninCheck();
    const auth = getAuth();

    const createChat = async () => {
        const token = await auth.currentUser?.getIdToken();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversaciones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({}),
        });

        if (response.ok) {
            mutate();
            const conversacion: ConversacionI = await response.json();
            await router.push(`/chat/${conversacion.id}`);
        }
    };


    const anonymousSignIn = async () => {
        await signInAnonymously(auth);
        return router.push("/");
    }

    if (signInCheckResult?.signedIn) {
        return (
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                <li>
                    <button onClick={createChat}
                            className="flex w-full justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        <FiPlus className="w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                        <span className="ml-3">Nuevo Chat</span>
                    </button>
                </li>
            </ul>
        )
    }

    return (
        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
                <button onClick={anonymousSignIn}
                        className="flex w-full justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <FiUser className="w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                    <span className="ml-3">Iniciar sesión</span>
                </button>
            </li>
        </ul>
    )
}