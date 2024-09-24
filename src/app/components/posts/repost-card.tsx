'use server'
import Link from "next/link";
import { IconUser } from "@tabler/icons-react";
import { formattedDate, formattedDateMobile } from "@/app/utils/format-date";
import { createClient } from "@/app/utils/supabase/server";

export async function RepostCard( {repost}: {repost: string} ) {

  const supabase = createClient()

  const { data: posts, error } = await supabase
  .from('posts')
  .select('*, user:users(name, user_name, avatar_url), created_at, content')
  .order('created_at', { ascending: false })
  .eq('id', repost)
  .single()

  const formattedCreatedAt = formattedDate(posts.created_at);
  const formattedCreatedAtMobile = formattedDateMobile(posts.created_at);

  return (
    <article className="text-left flex flex-row w-full mt-2 rounded-2xl p-4 pb-2 border border-zinc-700 gap-2 bg-gray/0 transition hover:bg-zinc-300/5 cursor-pointer relative">
      <Link
        className="absolute inset-0 z-0 "
        aria-hidden="true"
        href={`/posts/${posts.id}`}
      ></Link>
      <Link href={`/perfil/${posts.user.user_name}`} className="flex flex-row">
        {posts.user.avatar_url ? (
          <img src={posts.user.avatar_url} className="rounded-full size-4 md:size-10" alt="Foto de perfil del reposteante" />
        ) : (
          <div className="rounded-full bg-zinc-500/50 size-6 md:size-10 flex items-center justify-center">
            <IconUser />
          </div>
        )}
      </Link>
      <div className="flex flex-col w-full">
        <main className="flex flex-col w-full">
          <div className="flex flex-row gap-1 md:gap-2">
            <Link
              href={`/perfil/${posts.user.user_name}`}
              className="font-bold hover:underline overflow-hidden whitespace-nowrap max-w-20 md:max-w-full"
            >
              {posts.user.user_name}
            </Link>
            <Link
              href={`/perfil/${posts.user.user_name}`}
              className="font-light text-white/50 overflow-hidden whitespace-nowrap max-w-20 md:max-w-full"
            >
              @{posts.user.user_name}
            </Link>
            <p className="text-white/50">·</p>
            <p className="font-light text-white/50 hidden md:inline whitespace-nowrap">{formattedCreatedAt}</p>
            <p className="font-light text-white/50 md:hidden whitespace-nowrap">{formattedCreatedAtMobile}</p>
          </div>
          <p>{posts.content}</p>
        </main>
      </div>
    </article>
  );
}
