'use client'

import { useEffect, useState } from 'react';
import { getMessagesByConversation } from '@/app/actions/chat-action';
import ChatCard from './chat-card';

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
    <div className="p-4 h-full flex flex-col justify-end gap-2">
      {messages.length > 0 ? (
        messages.map((message) => (
          <ChatCard message={message}/>
        ))
      ) : (
        <p>No hay mensajes en esta conversación.</p>
      )}
    </div>
  );
}

export default Chat;
