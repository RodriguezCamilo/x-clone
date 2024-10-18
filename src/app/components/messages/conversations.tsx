
import ConversationCard from "./conversation-card";
import { Conversation } from "@/app/types/messages";

function Conversations({
  conversations,
  currentUserId,
  onSelectConversation,
}: {
  conversations: Conversation[];
  currentUserId: string | undefined;
  onSelectConversation: (conversation: Conversation) => void;
}) {
  if (!Array.isArray(conversations)) {
    return <p>No conversations found.</p>;
  }

  return (
    <>
      {conversations.map((con) => {
        const { id, user_1, user_2, last_message } = con;
        const otherUserId = user_1 === currentUserId ? user_2 : user_1;

        return (
          <button
            key={id}
            onClick={() => onSelectConversation(con)}
          >
            <ConversationCard user={otherUserId} last_message={last_message} />
          </button>
        );
      })}
    </>
  );
}

export default Conversations;
