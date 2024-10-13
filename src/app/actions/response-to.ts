'use server';

import { createClient } from "@/app/utils/supabase/server";

export async function responseTo(post_id: string) {
  const supabase = createClient();

  const { data: posts, error: postError } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", post_id)
    .single();

  if (postError || !posts) {
    console.error(postError || "Post no encontrado");
    return null;
  }

  const user_id = posts.user_id;

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("user_name")
    .eq("id", user_id) 
    .single(); 

  if (userError || !user) {
    console.error(userError || "Usuario no encontrado");
    return null;
  }
  return user;
}
