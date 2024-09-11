"use server";

import { createClient } from "@/app/utils/supabase/server";
import DataUser from "@/app/utils/supabase/user";

export async function handleRepost({ post_id }: any) {
  const supabase = createClient();
  const user = await DataUser();

  if (user?.user?.id) {
    const { error } = await supabase
      .from("posts")
      .insert({ user_id: user.user.id, repost: post_id, content: " " });

    if (error) {
      console.error("Error:", error.message);
    }
  } else {
    return "No hay sesion."
  }
}
