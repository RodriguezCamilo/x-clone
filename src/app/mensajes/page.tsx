"use server"

import { getConversations } from "../actions/chat-action";
import MenssagesContainer from "../components/messages/messages-container";
import NavBar from "../components/navbar/navbar";
import { DataUser } from "../utils/supabase/user";

export default async function Mensajes() {
  const user = await DataUser();
  const conversations = await getConversations(user.user?.id);
  

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
