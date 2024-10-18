"use client";

import { useEffect, useState } from "react";
import { getMessagesByConversation } from "@/app/actions/chat-action";
import ChatCard from "./chat-card";
import { formattedChat } from "@/app/utils/format-date";
import { IconLoader2 } from "@tabler/icons-react";
import { DataUser } from "@/app/utils/supabase/user";
import { getUser } from "@/app/actions/user-action";
import { Message } from "@/app/types/messages";

function Chat({
  conversationId,
  messages,
}: {
  conversationId: string;
  messages: Message[];
}) {
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function getAuthUser() {
      const data = await DataUser();
      const u = await getUser(data.user?.id);
      setUser(u);
    }
    getAuthUser();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const data = await getMessagesByConversation(conversationId);
      setLocalMessages(data);
      setLoading(false);
    };

    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setLocalMessages((prevMessages) => {
        const newMessages = messages.filter(
          (msg) => !prevMessages.some((prevMsg) => prevMsg.id === msg.id)
        );
        return [...prevMessages, ...newMessages];
      });
    }
  }, [messages]);

  return (
    <div className="h-full overflow-auto flex flex-col justify-end gap-2 mb-20">
      <div className="p-2 pt-12 lg:p-4 overflow-auto max-h-full scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800" >
        {loading ? (
          <IconLoader2 className="animate-spin text-sky-500" />
        ) : (
          <>
            {localMessages.length > 0 ? (
              localMessages.map((message) => {
                const formatted = formattedChat(message.created_at);
                return (
                  <ChatCard
                    key={message?.id}
                    message={message}
                    formatted={formatted}
                    user={user}
                  />
                );
              })
            ) : (
              <p>No hay mensajes en esta conversación.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;
