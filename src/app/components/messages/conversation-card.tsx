import { getLastMessage, getUserConversation } from "@/app/actions/chat-action";
import { formattedDateMobile } from "@/app/utils/format-date";
import { IconUser, IconLoader2 } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function ConversationCard({ id, user, last_message }: any) {
  const [otherUser, setOtherUser] = useState<any>();
  const [lastMessage, setLastMessage] = useState<any>();
  const [formattedTime, setFormattedTime] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const oUser = await getUserConversation(user);
      setOtherUser(oUser);

      const lMessage = await getLastMessage(last_message);
      setLastMessage(lMessage);

      const fTime = formattedDateMobile(lMessage?.created_at);
      setFormattedTime(fTime);

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <article
      className="w-full p-4 mt-4 hover:bg-zinc-700 transition flex gap-2"
      key={id}
    >
      {loading ? (
        <div className="flex justify-center items-center w-full p-4">
          <IconLoader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <>
          <Link href={`/perfil/${otherUser?.user_name}`}>
            {otherUser?.avatar_url ? (
              <div className="rounded-full size-10 flex items-center justify-center">
                <img
                  src={otherUser.avatar_url}
                  className="object-cover rounded-full size-10"
                  alt="Foto de perfil del usuario del post."
                />
              </div>
            ) : (
              <div className="rounded-full bg-zinc-500/50 size-10 flex items-center justify-center">
                <IconUser />
              </div>
            )}
          </Link>
          <div className="flex flex-col text-left">
            <div className="flex flex-row gap-2">
              <p className="font-semibold">{otherUser?.name}</p>
              <p className="font-light text-white/50">
                @{otherUser?.user_name}
              </p>
              <p className="text-white/50 font-light">·</p>
              <p className="text-white/50 font-light">{formattedTime}</p>
            </div>
            <div className="font-light text-white/50">
              {lastMessage?.content}
            </div>
          </div>
        </>
      )}
    </article>
  );
}

export default ConversationCard;
