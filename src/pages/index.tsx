import React from "react";
import {useSigninCheck} from "reactfire";

export default function HomePage() {

    const {data: signInCheckResult} = useSigninCheck();

    if (signInCheckResult?.signedIn) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-200">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Inicio</h1>
                    <p className="text-lg text-gray-800 mb-8">Selecciona o crea un nuevo chat</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">No autenticado</h1>
                <p className="text-lg text-gray-800 mb-8">Por favor, inicia sesión para acceder.</p>
            </div>
        </div>
    )
}
