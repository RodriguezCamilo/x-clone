export interface User {
  id: string;
  name: string;
  user_name: string;
  avatar_url?: string;
}

export interface Message {
  id: string;
  content: string;
  created_at: string;
  conversation_id: string;
  sender: string;
  reciver: string;
  image_url?: string;
}

export interface Conversation {
  id: string;
  user_1: string;
  user_2: string;
  last_message: string;
}

export interface OtherUser {
  name: string;
  user_name: string;
  avatar_url?: string;
}

export interface LastMessage {
  content: string;
  created_at: string;
}