import Loading from "@/components/Loading";
import React from "react";
import {useSigninCheck} from "reactfire";
import Historial from "@/components/Historial";
import {SWRConfig} from "swr";
import {getAuth} from "@firebase/auth";
import {FiHome, FiLogOut} from "react-icons/fi";
import Link from "next/link";
import {useRouter} from "next/router";

type Props = {
    children: React.ReactNode
}

export default function CheckLayout({children}: Props) {

    const auth = getAuth();
    const router = useRouter();
    const {status, data: signInCheckResult} = useSigninCheck();

    const logOut = async () => {
        await auth?.signOut();
        return router.push("/");
    }

    if (status === "loading") return (
        <Loading/>
    )

    if (status === "error" || !signInCheckResult) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-200">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">No autenticado</h1>
                    <p className="text-lg text-gray-800 mb-8">Por favor, inicia sesión para acceder.</p>
                    <button onClick={() => {
                    }} className="px-6 py-3 mt-4 btn btn-wide rounded-md">Iniciar sesión
                    </button>
                </div>
            </div>
        )
    }

    return (
        <SWRConfig
            value={{
                fetcher: async (resource, init) => {
                    const token = await auth.currentUser?.getIdToken();
                    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${resource}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        ...init,
                    }).then(res => res.json())
                }
            }}
        >


            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FiHome className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                                <span className="ml-3">Inicio</span>
                            </Link>
                        </li>
                        <Historial/>
                        {signInCheckResult?.signedIn && (
                            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                                <li>
                                    <button onClick={logOut}
                                            className="flex w-full justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        <FiLogOut className="w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                                        <span className="ml-3">Cerrar sesión</span>
                                    </button>
                                </li>
                            </ul>
                        )}
                    </ul>
                </div>
            </aside>

            {children}

        </SWRConfig>
    );
}