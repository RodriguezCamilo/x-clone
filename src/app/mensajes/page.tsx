"use server"

import MenssagesContainer from "../components/messages/messages-container";
import NavBar from "../components/navbar/navbar";

export default async function Mensajes() {

  return (
    <body className="min-h-screen w-full flex flex-col-reverse md:flex-row text-white bg-black">
      <header className="z-30 md:w-[8%] md:min-w-[8%] xl:min-w-[30%]">
        <NavBar />
      </header>
      <main className="bg-black flex w-full">
        <MenssagesContainer/>
      </main>
    </body>
  );
}
