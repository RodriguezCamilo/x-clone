"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";

const supabase = createClient();

export const addPost = async (formData: FormData) => {
  const content = formData.get("content")?.toString().trim();
  if (!content) return;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return;
  }

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert({ content, user_id: userData.user.id });
    
  revalidatePath("/");
};
