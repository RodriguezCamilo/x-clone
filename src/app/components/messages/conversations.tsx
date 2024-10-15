import ConversationCard from "./conversation-card";

function Conversations({conversations, currentUserId}: {conversations:any[], currentUserId:string | undefined}) {
  if (!Array.isArray(conversations)) {
    return <p>No conversations found.</p>;
  }
  return (
    <>
      {conversations.map((con: any) => {
        const { id, user_1, user_2, last_message } = con;
        const otherUserId = user_1 === currentUserId ? user_2 : user_1;

        return (
          <ConversationCard
            key={id}
            user={otherUserId}
            last_message={last_message}
          />
        );
      })}
    </>
  );
}

export default Conversations;
