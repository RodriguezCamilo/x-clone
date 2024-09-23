"use client";
import { IconX } from "@tabler/icons-react";
import { XIcon } from "../icons/x";
import { signup } from "../../auth/login/actions";
import { RegisterModalProps, LoginModalProps } from "./types";
import { useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";

export function RegisterModal({
  isRegisterOpen,
  closeModal,
}: RegisterModalProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isRegisterOpen) return null;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const { error, success } = await signup(formData);

    if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="absolute h-full w-full self-center flex flex-1 place-content-center items-center bg-blue-200/20">
      <form
        className="relative h-full md:h-2/3 w-full md:w-7/12 xl:w-1/3 flex flex-col items-left pt-4 gap-10 p-10 md:p-20 bg-black rounded-2xl"
        onSubmit={handleSubmit}
      >
        <IconX
          className="cursor-pointer absolute top-4 left-4"
          onClick={closeModal}
        />
        <div className="self-center">
          <XIcon size={"8"} />
        </div>
        <h2 className="font-bold text-4xl">Crea tu cuenta</h2>
        <input
          className="bg-black h-14 border rounded border-zinc-500/50 p-2 text-zinc-500/50 outline-sky-500 "
          id="name"
          name="name"
          type="text"
          required
          placeholder="Nombre"
        />
        <input
          className="bg-black h-14 border rounded border-zinc-500/50 p-2 text-zinc-500/50 outline-sky-500 "
          id="user"
          name="user"
          type="text"
          required
          placeholder="Usuario"
        />
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
          minLength={8}
          required
          placeholder="Contraseña"
        />
        <button
          type="submit"
          className="bg-sky-500 rounded-full self-center p-4 px-10 font-medium"
          onClick={() => setLoading(true)}
        >
          {loading ? <IconLoader2 className="animate-spin" /> : "Crear cuenta"}
        </button>
        {errorMessage && (
          <p className="text-red-600 self-center">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
