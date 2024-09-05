"use client";

import { gitHubSignIn } from "../../auth/login/actions"
import {IconBrandGithubFilled} from '@tabler/icons-react'


export function GitHubButton() {
    return (
        <button className="bg-white rounded-full text-black p-2 w-72 font-medium flex flex-row justify-center gap-2 hover:bg-white/95 transition" onClick={async () => { await gitHubSignIn() }}> <IconBrandGithubFilled/> Registrarse con GitHub</button>
    )
}