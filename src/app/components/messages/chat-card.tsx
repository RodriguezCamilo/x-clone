import { IconLoader2 } from "@tabler/icons-react";
import { Suspense } from "react";
import { Message } from "@/app/types/messages";

function ChatCard({ message, formatted, user }: {message: Message, formatted: string, user: any}) {
  return (
    <Suspense fallback={<IconLoader2 className="animate-spin text-sky-500" />}>
      <div
        key={message?.id}
        className={`w-full flex flex-col mb-2 ${
          user?.id === message?.sender ? "items-end" : "items-start"
        }`}
      >
        {message.image_url && (
          <img
            src={message.image_url}
            alt="Imagen del usuario"
            className="w-[90%] lg:max-w-sm m-2 rounded-xl"
          />
        )}
        <div
          className={`p-3 rounded-full ${
            user?.id === message?.sender ? "bg-sky-600" : "bg-zinc-700"
          }`}
        >
          <p className="text-wrap">{message?.content}</p>
        </div>
        <p className="font-light text-sm text-white/50">{formatted}</p>
      </div>
    </Suspense>
  );
}

export default ChatCard;
