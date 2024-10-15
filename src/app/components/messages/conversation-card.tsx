import { getLastMessage, getUserConversation } from "@/app/actions/chat-action";
import { formattedDateMobile } from "@/app/utils/format-date";
import { IconUser } from "@tabler/icons-react";
import Link from "next/link";

async function ConversationCard({ id, user, last_message }: any) {
  const otherUser = await getUserConversation(user);
  const lastMessage = await getLastMessage(last_message);

  const formattedTime = await formattedDateMobile(lastMessage?.created_at)

  return (
    <article
      className="w-full p-4 mt-4 hover:bg-zinc-700 transition flex gap-2"
      key={id}
    >
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
      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          <p className="font-semibold">{otherUser?.name}</p>
          <p className="font-light text-white/70">
            @{otherUser?.user_name}
          </p>
          <p className="text-white/70 font-light">·</p>
          <p className="text-white/70 font-light">{formattedTime}</p>

        </div>
        <div className="font-light text-white/70">
            {lastMessage?.content}
        </div>
      </div>
    </article>
  );
}

export default ConversationCard;
