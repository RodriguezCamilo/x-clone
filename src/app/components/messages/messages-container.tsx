"use client";

import { useEffect, useState } from "react";
import { getConversations } from "@/app/actions/chat-action";
import { DataUser } from "@/app/utils/supabase/user";
import { IconArrowLeft, IconLoader2 } from "@tabler/icons-react";
import Conversations from "./conversations";
import Chat from "./chat";
import { ComposeMessage } from "./compose-message";
import { createClient } from "@/app/utils/supabase/client";
import Link from "next/link";

const supabase = createClient();

export default function MessagesContainer() {
  const [user, setUser] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);

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

  const addNewMessage = (newMessage: any) => {
    setMessages((prevMessages) => {
      const exists = prevMessages.some((msg) => msg.id === newMessage.id);
      if (!exists) {
        return [...prevMessages, newMessage];
      }
      return prevMessages;
    });
  };

  useEffect(() => {
    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          if (payload.new.conversation_id === activeConversation?.id) {
            addNewMessage(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [activeConversation]);

  return (
    <section className="bg-black flex w-full h-screen overflow-hidden">
      <section
        className={`text-left max-w-[500px] ${
          activeConversation ? "hidden" : "flex"
        } lg:flex flex-col h-auto w-full bg-black pt-2 border border-t-0 border-zinc-700`}
      >
        <header className="w-full flex ml-2">
          <Link
            className="rounded-full size-8 hover:bg-zinc-700 transition flex items-center justify-center"
            href={"/"}
          >
            <IconArrowLeft />
          </Link>
          <h1 className="font-bold text-xl mx-4">Mensajes</h1>
        </header>
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
      </section>
      <aside
        className={`bg-black w-[500px] z-50 h-full ${
          activeConversation ? "flex" : "hidden"
        } lg:flex flex-col relative border-r border-zinc-700`}
      >
        {activeConversation ? (
          <>
            <Chat conversationId={activeConversation?.id} messages={messages} />
            <div className="bg-black p-2 border-t border-zinc-700">
              <ComposeMessage
                conversation={activeConversation}
                addNewMessage={addNewMessage}
              />
            </div>
          </>
        ) : (
          <h3 className="text-white/70 font-light top-1/3 left-1/3 absolute">
            Selecciona una conversación
          </h3>
        )}
      </aside>
    </section>
  );
}