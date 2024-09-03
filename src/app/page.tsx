import SignOut from "@/app/components/SignOut";
import { redirect } from 'next/navigation'
import  PostsList  from "@/app/components/posts/posts-list";
import { ComposePost } from "./components/posts/compose-post";
import { createClient } from '@/app/utils/supabase/server'

const supabase = createClient()

export default async function Home() {

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }


  const { data: posts } = await supabase
    .from('posts')
    .select('*, user:users(name, user_name, avatar_url)')
    .order('created_at', {
      ascending: false
    })

  return (
    <main className="w-full">
      <section className="flex h-full flex-col items-center border border-y-0 border-zinc-700">
        <ComposePost avatarUrl={data.user.user_metadata.avatar_url}/>
        <PostsList posts={posts}/>
        <SignOut />
      </section>
    </main>
  );
}
