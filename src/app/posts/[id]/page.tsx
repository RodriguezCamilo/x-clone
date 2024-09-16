import { createClient } from '@/app/utils/supabase/server'
import Link from 'next/link'
import { IconMessageCircle, IconRepeat, IconArrowLeft, IconUser } from '@tabler/icons-react'
import LikeButton from '@/app/components/like/like'
import { ComentPost } from '@/app/components/posts/coment-post'
import { formattedExpecificDate, formattedTime } from '@/app/utils/format-date'
import { fetchLikeStatus } from '@/app/actions/like-action'
import { fetchRepostStatus } from '@/app/actions/repost-action'
import { RepostCard } from '@/app/components/posts/repost-card'
import DataUser from '@/app/utils/supabase/user'
import RepostDropdown from '@/app/components/repost/repost'

interface PostPageProps {
  params: {
    id: string
  }
}


export default async function PostPage({ params }: PostPageProps) {

  const supabase = createClient()

  const { id } = params

  const { data: post } = await supabase
    .from('posts')
    .select('*, user:users(name, user_name, avatar_url), likes_count, created_at, repost, repost_count')
    .eq('id', id)
    .single()

  const postAvatar = post.user.avatar_url
  const LikeStatus = await fetchLikeStatus({ post_id: post.id });
  const isReposted = await fetchRepostStatus({ post_id: id })

  const user = await DataUser()
  const userAvatar = user?.user?.user_metadata.avatar_url

  const formattedCreatedAt = formattedExpecificDate(post.created_at)
  const formattedCreatedTime = formattedTime(post.created_at)

  return (
    <article className="text-left flex flex-col w-full bg-black p-4 border border-t-0 border-zinc-700 ">
      <div className='flex flex-row items-center gap-6 pb-4'>
        <Link className='rounded-full size-8 hover:bg-zinc-700 transition flex items-center justify-center z-0' href={'/'}><IconArrowLeft /></Link>
        <h2 className='text-xl font-semibold'>Post</h2>
      </div>
      <header className='flex flex-row gap-2 '>
        <Link href={`/perfil/${post.user.user_name}`} className="flex flex-row">
          { postAvatar ? <img src={post.user.avatar_url} className="rounded-full size-10" alt="Imagen de perfil del usuario" /> : <div className='rounded-full bg-zinc-500/50 size-10 flex items-center justify-center'><IconUser /></div>}
        </Link>
        <div className="flex flex-col">
          <Link href={`/perfil/${post.user.user_name}`} className="font-bold hover:underline">{post.user.name}</Link>
          <p className="font-light text-white/50">@{post.user.user_name}</p>
        </div>
      </header>
      <main className="flex flex-col border border-x-0 border-t-0 pb-4 border-zinc-700">
        <p className='text-wrap text-lg py-4'>
          {post.content}
          {post.repost && <RepostCard repost={post.repost} />}
        </p>
        <div className='flex flex-row gap-2'>
          <p className='font-light text-white/50'>{formattedCreatedTime}</p>
          <p className='text-white/50'>·</p>
          <p className='font-light text-white/50'>{formattedCreatedAt}</p>
        </div>
      </main>
      <footer className="flex flex-row justify-start gap-24 p-2 border border-x-0 border-t-0 border-zinc-700">
        <button>
          <IconMessageCircle className="size-5 text-white/50" />
        </button>
        <button>
        <RepostDropdown post_id={id} repost_count={post.repost_count} is_reposted={isReposted}  />
        </button>
        <LikeButton like_status={LikeStatus} post_id={id} likes_count={post.likes_count} />
      </footer>
      {!user.user??<ComentPost avatarUrl={userAvatar} />}
    </article >
  )
}
