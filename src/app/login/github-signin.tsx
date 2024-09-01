"use client";

import { gitHubSignIn } from "./actions"

export function GitHubButton() {
    return (
        <button onClick={async () => { await gitHubSignIn() }}>Registrarse con GitHub</button>
    )
}