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
          <button key={id} onClick={() => onSelectConversation(id)}>
            <ConversationCard user={otherUserId} last_message={last_message} />
          </button>
        );
      })}
    </>
  );
}

export default Conversations;
