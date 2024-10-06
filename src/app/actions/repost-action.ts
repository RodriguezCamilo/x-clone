"use server";

import { createClient } from "@/app/utils/supabase/server";
import {DataUser} from "@/app/utils/supabase/user";

export async function handleRepost({
  post_id,
  content,
}: {
  post_id: string;
  content: any;
}) {
  const supabase = createClient();
  const user = await DataUser();
  let contentPost = " ";

  if (content != null) {
    contentPost = content;
  }

  if (!user?.user?.id) return "No hay sesion";

  const { error: insertError } = await supabase
    .from("posts")
    .insert({ user_id: user.user.id, repost: post_id, content: contentPost });

  if (insertError) {
    console.error("Error al insertar en posts:", insertError.message);
    return;
  }

  const { error: repostError } = await supabase
    .from("user_reposts")
    .insert({ user_id: user.user.id, post_id: post_id });

  if (repostError) {
    console.error("Error al insertar en user_reposts:", repostError.message);
    return;
  }
}


export const handleQuote = async ({
  formData,
  post_id,
}: {
  formData: FormData;
  post_id: string;
}) => {
  const content = formData.get("content")?.toString().trim();
  let contentPost = " ";

  if (content != null) {
    contentPost = content;
  }

  const supabase = createClient();
  const user = await DataUser();

  if (!user?.user) return "No hay sesion";

  const { error: insertError } = await supabase
    .from("posts")
    .insert({ user_id: user.user.id, repost: post_id, content: contentPost });

  if (insertError) {
    console.error("Error al insertar en posts:", insertError.message);
    return;
  }

  const { error: repostError } = await supabase
    .from("user_reposts")
    .insert({ user_id: user.user.id, post_id: post_id });

  if (repostError) {
    console.error("Error al insertar en user_reposts:", repostError.message);
    return;
  }
};

export async function handleUnpost({ post_id }: { post_id: string }) {
  const supabase = createClient();
  const user = await DataUser();

  if (!user?.user?.id) return "No hay sesion";

  const { data: repostData, error: repostFetchError } = await supabase
    .from("posts")
    .select("id")
    .eq("repost", post_id)
    .eq("user_id", user.user.id)
    .single();

  if (repostFetchError) {
    console.error("Error al obtener repost:", repostFetchError.message);
    return;
  }

  if (!repostData) {
    console.error("Este usuario no hizo un repost.");
    return;
  }

  const { error: deletePostError } = await supabase
    .from("posts")
    .delete()
    .eq("id", repostData.id);

  if (deletePostError) {
    console.error(
      "Error al borrar el repost en posts:",
      deletePostError.message
    );
    return;
  }

  const { error: deleteRepostError } = await supabase
    .from("user_reposts")
    .delete()
    .eq("post_id", post_id)
    .eq("user_id", user.user.id);

  if (deleteRepostError) {
    console.error(
      "Error al borrar el repost en user_reposts:",
      deleteRepostError.message
    );
    return;
  }
}

export async function fetchRepostStatus({ post_id }: { post_id: string }) {
  const supabase = createClient();
  const user = await DataUser();

  if (user?.user?.id) {
    const { data, error } = await supabase
      .from("user_reposts")
      .select("*")
      .eq("post_id", post_id)
      .eq("user_id", user.user.id);

    if (error) {
      console.error("Error:", error.message);
      return false;
    }

    return data.length > 0;
  }
  return false;
}


export async function repostFetch(repost: string) {
  const supabase = createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, user:users(name, user_name, avatar_url), created_at, content")
    .order("created_at", { ascending: false })
    .eq("id", repost)
    .single();

  return posts;
}