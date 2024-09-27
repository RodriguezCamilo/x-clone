"use server";

import { createClient } from "@/app/utils/supabase/server";

export const fetchMorePosts = async (limit = 10, offset = 0) => {
  const supabase = createClient()

  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "*, user:users(name, user_name, avatar_url), likes_count, created_at, repost, repost_count, response_to"
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return { posts: [], error };
  return { posts, error: null };
};

