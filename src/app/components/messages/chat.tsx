import { useEffect, useState } from 'react';
import { getMessagesByConversation } from '@/app/actions/chat-action';

function Chat({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessagesByConversation(conversationId);
      setMessages(data);
    };
    
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  return (
    <div className="chat-container">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id} className="message">
            <p>{message.content}</p>
            <span>{new Date(message.created_at).toLocaleTimeString()}</span>
          </div>
        ))
      ) : (
        <p>No hay mensajes en esta conversación.</p>
      )}
    </div>
  );
}

export default Chat;
