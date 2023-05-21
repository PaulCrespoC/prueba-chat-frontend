import {AuthProvider, useFirebaseApp} from "reactfire";
import {getAuth} from "@firebase/auth";
import React from "react";

type Props = {
    children: React.ReactNode
}

export default function BaseLayout({children}: Props) {

    const app = useFirebaseApp();
    const auth = getAuth(app);

    return (
        <AuthProvider sdk={auth}>
            {children}
        </AuthProvider>
    )
}