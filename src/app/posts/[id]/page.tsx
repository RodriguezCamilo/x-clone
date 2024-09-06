import { createClient } from '@/app/utils/supabase/server'
import Link from 'next/link'
import { IconMessageCircle, IconRepeat, IconArrowLeft } from '@tabler/icons-react'
import LikeButton from '@/app/components/like/like'

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
    .select('*, user:users(name, user_name, avatar_url)')
    .eq('id', id)
    .single();


  return (
    <article className="text-left flex flex-col w-full bg-black p-4 border border-y-0 border-zinc-700 ">
      <div className='flex flex-row items-center gap-6 pb-4'>
        <Link className='rounded-full size-8 hover:bg-zinc-700 transition flex items-center justify-center' href={'/'}><IconArrowLeft /></Link>
        <h2 className='text-xl font-semibold'>Post</h2>
      </div>
      <header className='flex flex-row gap-2'>
        <Link href={`/perfil/${post.user.user_name}`} className="flex flex-row">
          <img src={post.user.avatar_url} className="rounded-full size-10" alt="Imagen de perfil del usuario" />
        </Link>
        <div className="flex flex-col">
          <Link href={`/perfil/${post.user.user_name}`} className="font-bold hover:underline">{post.user.name}</Link>
          <p className="font-light text-white/50">@{post.user.user_name}</p>
        </div>
      </header>
      <main className="flex flex-col">
        <p className='text-wrap text-lg py-4'>
          {post.content}
        </p>
        <footer className="flex flex-row justify-between pt-2">
          <button>
            <IconMessageCircle className="size-5 text-white/50" />
          </button>
          <button>
            <IconRepeat className="size-5 text-white/50" />
          </button>
            <LikeButton post_id={id} />
        </footer>
      </main>
    </article >
  )
}
