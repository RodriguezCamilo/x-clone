"use server";

import { v4 as uuidv4 } from "uuid";
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

export const addMessage = async (
  formData: FormData,
  conversationId: string,
  reciver: string
) => {
  const content = formData.get("content")?.toString().trim();
  const imageFile = formData.get("image") as File | null;

  if (!content && !imageFile) return;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return;
  }

  let imageUrl = null;
  console.log(conversationId)

  if (imageFile) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return;
    }

    const { data: imageUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    imageUrl = imageUrlData?.publicUrl || null;
  }

  const { data: postData, error: postError } = await supabase
    .from("messages")
    .insert({
      content,
      sender: userData.user.id,
      image_url: imageUrl,
      reciver: reciver,
      conversation_id: conversationId
    });

  if (postError) return console.error(postError);
};
