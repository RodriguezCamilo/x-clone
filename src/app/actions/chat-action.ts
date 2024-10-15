"use server";

import { createClient } from "@/app/utils/supabase/server";

const supabase = createClient();

export const getConversations = async (userId: string | undefined) => {
  const { data, error } = await supabase
    .from("conversations")
    .select("id, user_1, user_2, last_message")
    .or(`user_1.eq.${userId},user_2.eq.${userId}`);

  if (error) {
    console.error("Error obteniendo las conversaciones:", error);
    return [];
  }
  return data;
};

export const getUserConversation = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("name, user_name, avatar_url")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error obteniendo el usuario:", error);
    return null;
  }
  return data;
};

export const getLastMessage = async (lastId: string) => {
  const { data, error } = await supabase
    .from("messages")
    .select("content, created_at")
    .eq("id", lastId)
    .single();

  if (error) {
    console.error("Error obteniendo el mensaje:", error);
    return null;
  }
  return data;
};

export const getMessagesByConversation = async (conversationId: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });
  
    if (error) {
      console.error("Error obteniendo los mensajes:", error);
      return [];
    }
    return data;
  };
