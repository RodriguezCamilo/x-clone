'use client'
import { IconX } from "@tabler/icons-react"
import { XIcon } from "../icons/x"
import {  emailLogin } from '../../auth/login/actions'
import { LoginModalProps } from './types'




export function LoginModal({ isLoginOpen, closeModal }: LoginModalProps) {
    const loginOpen = isLoginOpen
    if (!loginOpen) return null

    return (
        <div className="absolute h-full w-full self-center flex flex-1 place-content-center items-center bg-blue-200/20">
            <form className="relative h-4/6 w-1/3 flex flex-col items-left pt-4 gap-8 p-20 bg-black rounded-2xl">
                <IconX className="cursor-pointer absolute top-4 left-4" onClick={closeModal} />
                <div className="self-center">
                    <XIcon size={'8'} />
                </div>
                <h2 className="font-bold text-4xl">Inicia sesión</h2>
                <input className="bg-black h-14 border rounded border-zinc-500/50 p-2 text-zinc-500/50 outline-sky-500 " id="email" name="email" type="email" required placeholder="Email" />
                <input className="bg-black h-14 border rounded border-zinc-500/50 p-2 text-zinc-500/50 outline-sky-500 " id="password" name="password" type="password" required placeholder="Contraseña" />
                <button className="bg-sky-500 rounded-full w-1/2 self-center p-4 px-10 font-medium" formAction={emailLogin}>Iniciar sesión</button>
            </form>
        </div>
    )
}