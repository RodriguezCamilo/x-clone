import SignOut from "@/app/components/login/sign-out";
import { redirect } from 'next/navigation'
import PostsList from "@/app/components/posts/posts-list";
import { ComposePost } from "./components/posts/compose-post";
import { createClient } from '@/app/utils/supabase/server'
import DataUser from "./utils/supabase/user";
import { Suspense } from 'react'
import { IconLoader } from "@tabler/icons-react";


export default async function Home() {

  const supabase = createClient()

  const data = await DataUser()

  if (data.user == null) {
    redirect('/auth/login')
  }

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, user:users(name, user_name, avatar_url), likes_count, created_at, repost, repost_count')
    .order('created_at', { ascending: false })


  return (
    <main className="w-full bg-black">
      <section className="flex h-full w-full flex-col items-center pt-4 border border-y-0 border-zinc-700">
        <Suspense fallback={<IconLoader/>}>
          <ComposePost avatarUrl={data?.user?.user_metadata.avatar_url} />
          <PostsList posts={posts} />
          <SignOut />
        </Suspense>
      </section>
    </main>
  )
}
