import { getConversations } from "../actions/chat-action";
import Chat from "../components/messages/chat";
import Conversations from "../components/messages/conversations";
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
        <section className="text-left max-w-[500px] flex flex-col h-auto w-full bg-black pt-2 border border-t-0 border-zinc-700">
          <h1 className="font-bold text-xl mx-4">Mensajes</h1>
          <Conversations conversations={conversations} currentUserId={user.user?.id} />
        </section>
        <aside className="bg-black hidden lg:block w-full">
          <Chat />
        </aside>
      </main>
    </body>
  );
}
