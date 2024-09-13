"use server";

import { createClient } from "@/app/utils/supabase/server";
import DataUser from "@/app/utils/supabase/user";

export async function handleRepost({ post_id }: { post_id: string }) {
  const supabase = createClient();
  const user = await DataUser();

  if (user?.user?.id) {
    // Insertar el repost en la tabla 'posts'
    const { error: insertError } = await supabase
      .from("posts")
      .insert({ user_id: user.user.id, repost: post_id, content: " " });

    if (insertError) {
      console.error("Error al insertar en posts:", insertError.message);
      return;
    }

    // Insertar el repost en la tabla 'user_reposts'
    const { error: repostError } = await supabase
      .from("user_reposts")
      .insert({ user_id: user.user.id, post_id: post_id });

    if (repostError) {
      console.error("Error al insertar en user_reposts:", repostError.message);
      return;
    }

    // Obtener el conteo actual de reposts
    const { data: postData, error: fetchError } = await supabase
      .from("posts")
      .select("repost_count")
      .eq("id", post_id)
      .single();

    if (fetchError) {
      console.error("Error al obtener repost_count:", fetchError.message);
      return;
    }

    const newRepostCount = (postData?.repost_count) + 1;
    console.log(newRepostCount)
    // Actualizar el conteo de reposts en la tabla 'posts'
    const { error: updateError } = await supabase
      .from("posts")
      .update({ repost_count: newRepostCount })
      .eq("id", post_id);



    if (updateError) {
      console.error("Error al actualizar repost_count:", updateError.message);
    }
  } else {
    return "No hay sesión.";
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
