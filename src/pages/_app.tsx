import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {FirebaseAppProvider} from "reactfire";
import BaseLayout from "@/layouts/BaseLayout";
import CheckLayout from "@/layouts/CheckLayout";

const firebaseConfig = {
    apiKey: "AIzaSyAMKbJ0kin4InHNuiKFZypKpRGA9q1BIDI",
    authDomain: "chat-app-c4a31.firebaseapp.com",
    projectId: "chat-app-c4a31",
    storageBucket: "chat-app-c4a31.appspot.com",
    messagingSenderId: "688007949994",
    appId: "1:688007949994:web:50b95effe8a977fbd92ad3"
};

export default function App({Component, pageProps}: AppProps) {
    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <BaseLayout>
                <CheckLayout>
                    <Component {...pageProps} />
                </CheckLayout>
            </BaseLayout>
        </FirebaseAppProvider>
    )
}
