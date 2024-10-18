"use server";

import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import { DataUser } from "../utils/supabase/user";

const supabase = createClient();

export const getConversations = async (userId: string | undefined) => {
  const { data, error } = await supabase
    .from("conversations")
    .select("id, user_1, user_2, last_message")
    .or(`user_1.eq.${userId},user_2.eq.${userId}`)
    .order("created_at", { ascending: false });

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
  conversationId: string | undefined,
  reciver: string | undefined
) => {
  const content = formData.get("content")?.toString().trim();
  const imageFile = formData.get("image") as File | null;

  if (!content && !imageFile) return;

  const userData = await DataUser()
  if (!userData?.user) {
    return;
  }

  let imageUrl = null;

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
      conversation_id: conversationId,
    })
    .select("*")
    .single();

  if (postError) return console.error(postError);

  const { error: updateError } = await supabase
    .from("conversations")
    .update({ last_message: postData.id }) 
    .eq("id", conversationId);

  if (updateError)
    return console.error("Error updating last_message:", updateError);

  return postData;
};

export const getConversation = async (otherUser: string) => {
  const userId = await DataUser();

  const { data, error } = await supabase
    .from("conversations")
    .select("id, user_1, user_2, last_message")
    .or(
      `user_1.eq.${userId.user?.id}.and(user_2.eq.${otherUser}),user_1.eq.${otherUser}.and(user_2.eq.${userId.user?.id})`
    )
    .single();

  if (error) return console.error(error);
  return data;
};

export const addConversation = async (
  user_1: string | undefined,
  user_2: string
) => {
  const { data, error } = await supabase.from("conversations").insert({
    user_1,
    user_2,
    last_message: null,
  });
  if (error) return console.error(error);
  console.log(data);
  return data;
};

export const newConversation = async (otherUserID: string) => {
  const userId = await DataUser();
  const existConver = await getConversation(otherUserID);

  if (existConver) {
    redirect("/mensajes");
    return;
  }

  await addConversation(userId.user?.id, otherUserID);
  redirect("/mensajes");
  return;
};
