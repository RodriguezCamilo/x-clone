"use client";
import { IconX } from "@tabler/icons-react";
import { XIcon } from "../icons/x";
import { emailLogin } from "../../auth/login/actions";
import { LoginModalProps } from "./types";
import { useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";

export function LoginModal({ isLoginOpen, closeModal }: LoginModalProps) {
  const loginOpen = isLoginOpen;
  const [loading, setLoading] = useState(false);

  if (!loginOpen) return null;

  return (
    <div className="absolute h-full w-full self-center flex flex-1 place-content-center items-center bg-blue-200/20">
      <form className="relative h-full md:h-1/2 w-full md:w-7/12 lg:w-1/3 flex flex-col items-left pt-4 gap-12 md:gap-8 p-10 xl:p-20 bg-black rounded-2xl">
        <IconX
          className="cursor-pointer absolute top-4 left-4"
          onClick={closeModal}
        />
        <div className="self-center">
          <XIcon size={"8"} />
        </div>
        <h2 className="font-bold text-4xl">Inicia sesión</h2>
        <input
          className="bg-black h-14 border rounded border-zinc-500/50 p-2 text-zinc-500/50 outline-sky-500 "
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email"
        />
        <input
          className="bg-black h-14 border rounded border-zinc-500/50 p-2 text-zinc-500/50 outline-sky-500 "
          id="password"
          name="password"
          type="password"
          required
          placeholder="Contraseña"
        />
        <button
          className="bg-sky-500 rounded-full self-center p-4 px-10 font-medium"
          formAction={emailLogin}
          onClick={() => setLoading(true)}
        >
          {loading ? (
            <IconLoader2 className="animate-spin" />
          ) : (
            "Iniciar sesión"
          )}
        </button>
      </form>
    </div>
  );
}
