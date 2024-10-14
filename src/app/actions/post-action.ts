"use server";

import { createClient } from "@/app/utils/supabase/server";

export const fetchMorePosts = async (limit = 10, offset = 0) => {
  const supabase = createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, user:users(id, name, user_name, avatar_url)")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
    

  if (error) return { posts: [], error };
  return { posts, error: null };
};

export const fetchMoreResponses = async (
  limit = 10,
  offset = 0,
  postId: string
) => {
  const supabase = createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, user:users(id, name, user_name, avatar_url)")
    .eq("response_to", postId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return { error };
  return { posts, error: null };
};
