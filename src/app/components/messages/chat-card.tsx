import { getUser } from "@/app/actions/user-action";
import { formattedChat } from "@/app/utils/format-date";
import { DataUser } from "@/app/utils/supabase/user";
import { useEffect, useState } from "react";

function ChatCard({ message }: any) {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    async function getAuthUser() {
      const data = await DataUser();
      const u = await getUser(data.user?.id);
      setUser(u);
    }
    getAuthUser();
  }, []);

  const formatted = formattedChat(message?.created_at)

  return (
    <div
      key={message.id}
      className={`w-full flex flex-col ${
        user?.id === message.sender ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`p-3 rounded-full ${
          user?.id === message.sender ? "bg-sky-600" : "bg-zinc-700"
        }`}
      >
        <p className="text-wrap">{message.content}</p>
      </div>
      <p className="font-light text-sm text-white/50">{formatted}</p>
    </div>
  );
}

export default ChatCard;
