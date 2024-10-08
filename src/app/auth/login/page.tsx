"use client";

import { useState } from "react";
import { XIcon } from "../../components/icons/x";
import { GitHubButton } from "../../components/login/github-signin";
import { LoginModal } from "../../components/login/login-modal";
import { RegisterModal } from "@/app/components/login/register-modal";
import { Suspense } from "react";
import { IconLoader } from "@tabler/icons-react";

export default function LoginPage() {
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);

  return (
    <main className="relative flex flex-col flex-1 m-0 h-screen w-screen items-center overflow-hidden bg-black">
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full">
            <IconLoader className="animate-spin" />
          </div>
        }
      >
        <section className="flex gap-20 lg:flex-row flex-1 items-center text-wrap bg-black">
          <div className="p-20 pr-32 w-full hidden md:block">
            <XIcon height={"96"} weight={"96"} />
          </div>
          <div className="flex w-full flex-col gap-6 md:gap-10 items-center md:items-start p-20">
            <h1 className="font-bold text-3xl sm:text-6xl text-center md:text-left text-wrap">
              Lo que está pasando ahora
            </h1>
            <h2 className="font-bold text-xl sm:text-3xl">Únete Hoy</h2>
            <GitHubButton />
            <div className="flex flex-row items-center gap-2">
              <div className="h-[1px] bg-zinc-500/50 w-32"></div>o
              <div className="h-[1px] bg-zinc-500/50 w-32"></div>
            </div>
            <button
              className="font-bold bg-sky-500 rounded-full p-2 w-72 hover:bg-sky-500/90 transition"
              onClick={() => setIsModalRegisterOpen(true)}
            >
              Crear cuenta
            </button>
            <p className="text-xs text-zinc-500/90 w-72 text-wrap">
              Al registrarte, aceptas los Términos de servicio y la Política de
              privacidad, incluida la política de Uso de Cookies.
            </p>
            <h3 className="font-bold text-xl">¿Ya tienes una cuenta?</h3>
            <button
              className="font-bold text-sky-500 bg-black border border-zinc-500/90 rounded-full p-2 w-72 hover:bg-sky-500/10 transition"
              onClick={() => setIsModalLoginOpen(true)}
            >
              Iniciar sesión
            </button>
          </div>
        </section>
      </Suspense>
      <footer className="col-span-2 hidden lg:flex flex-col text-xs gap-2 items-center px-10 mb-4 text-zinc-500/90">
        <div className="flex flex-1 gap-4 flex-wrap">
          <p> Información</p>
          <p>Descarga la app de X</p>
          <p>Centro de Ayuda</p>
          <p>Condiciones de Servicio</p>
          <p>Política de Privacidad</p>
          <p>Política de cookies</p>
          <p>Accesibilidad</p>
          <p>Información de anuncios</p>
          <p>Blog</p>
          <p>Empleos</p>
          <p>Recursos para marcas</p>
          <p>Publicidad</p>
          <p>Marketing</p>
          <p>X para empresas</p>
          <p>Desarrolladores</p>
          <p>Guía</p>
          <p>Configuración</p>
        </div>
        <a
          className="hover:underline"
          href="https://kamdev-portfolio.netlify.app/"
          target="_blank"
        >
          © 2024 MasterKam Corp.
        </a>
      </footer>
      <RegisterModal
        isRegisterOpen={isModalRegisterOpen}
        closeModal={() => setIsModalRegisterOpen(false)}
      />
      <LoginModal
        isLoginOpen={isModalLoginOpen}
        closeModal={() => setIsModalLoginOpen(false)}
      />
    </main>
  );
}
