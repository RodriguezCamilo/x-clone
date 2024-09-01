"use client"

import { signOut } from "@/app/login/actions"

export default async function SignOut() {
    return (
        <button onClick={async () => { await signOut() }}>Desconectar</button>
    )
}