"use server";

import { redirect } from "next/navigation";
import MenssagesContainer from "../components/messages/messages-container";
import NavBar from "../components/navbar/navbar";
import { DataUser } from "../utils/supabase/user";

export default async function Mensajes() {
  const data = await DataUser();

  if (data.user == null || !data.user) {
    redirect("/auth/login");
  }

  return (
    <body className="min-h-screen w-full flex flex-col md:flex-row text-white bg-black overflow-hidden">
      <header className="z-30 md:w-[8%] md:min-w-[8%] xl:min-w-[30%]">
        <NavBar />
      </header>
      <main className="bg-black flex w-full">
        <MenssagesContainer />
      </main>
    </body>
  );
}
