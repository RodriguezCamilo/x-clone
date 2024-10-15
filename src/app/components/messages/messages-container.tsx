"use client";

import { useEffect, useState } from "react";
import { getConversations } from "@/app/actions/chat-action";
import { DataUser } from "@/app/utils/supabase/user";
import { IconLoader2 } from "@tabler/icons-react";
import Conversations from "./conversations";
import Chat from "./chat";

export default function MenssagesContainer() {
  const [user, setUser] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const currentUser = await DataUser();
      setUser(currentUser);

      if (currentUser?.user?.id) {
        const convos = await getConversations(currentUser.user.id);
        setConversations(convos);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="bg-black flex w-full">
      <section className="text-left max-w-[500px] flex flex-col h-auto w-full bg-black pt-2 border border-t-0 border-zinc-700">
        <h1 className="font-bold text-xl mx-4">Mensajes</h1>
        {loading ? (
          <div className="flex justify-center items-center w-full p-4">
            <IconLoader2 className="animate-spin text-sky-500" />
          </div>
        ) : (
          <Conversations
            conversations={conversations}
            currentUserId={user?.user?.id}
            onSelectConversation={setActiveConversation}
          />
        )}
        <Conversations
          conversations={conversations}
          currentUserId={user?.user?.id}
          onSelectConversation={setActiveConversation}
        />
      </section>
      <aside className="bg-black hidden lg:block w-full">
        {activeConversation ? (
          <Chat conversationId={activeConversation} />
        ) : (
          <p className="text-gray-400">Selecciona una conversación</p>
        )}
      </aside>
    </section>
  );
}
