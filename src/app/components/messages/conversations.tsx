import Link from "next/link";
import ConversationCard from "./conversation-card";

function Conversations({
  conversations,
  currentUserId,
  onSelectConversation,
}: {
  conversations: any[];
  currentUserId: string | undefined;
  onSelectConversation: (conversationId: string) => void;
}) {
  if (!Array.isArray(conversations)) {
    return <p>No conversations found.</p>;
  }

  return (
    <>
      {conversations.map((con: any) => {
        const { id, user_1, user_2, last_message } = con;
        const otherUserId = user_1 === currentUserId ? user_2 : user_1;

        return (
          <>
            <button
              className="hidden lg:block"
              key={id}
              onClick={() => onSelectConversation(con)}
            >
              <ConversationCard
                user={otherUserId}
                last_message={last_message}
              />
            </button>
            <Link className="lg:hidden" key={id} href={`/mensajes/${id}`}>
              <ConversationCard
                user={otherUserId}
                last_message={last_message}
              />
            </Link>
          </>
        );
      })}
    </>
  );
}

export default Conversations;
