import { createClient } from '@/app/utils/supabase/client'
import Link from 'next/link'
import { IconMessageCircle, IconHeart, IconRepeat } from '@tabler/icons-react'

const supabase = createClient()

interface PostPageProps {
  params: {
    id: string
  }
}


export default async function PostPage({ params }: PostPageProps) {
  const { id } = params

  const { data: post } = await supabase
    .from('posts')
    .select('*, user:users(name, user_name, avatar_url)')
    .eq('id', id)
    .single();

  return (
    <article className="text-left flex flex-col w-full p-4 border-b-2 border-zinc-700 gap-2 bg-gray/0 transition hover:bg-zinc-300/5 cursor-pointer">
      <header className='flex flex-row'>
        <Link href={`/perfil/${post.user.user_name}`} className="flex flex-row">
          <img src={post.user.avatar_url} className="rounded-full size-10" alt="Imagen de perfil del usuario" />
        </Link>
        <div className="flex flex-row gap-2">
          <Link href={`/perfil/${post.user.user_name}`} className="font-bold hover:underline">{post.user.name}</Link>
          <p className="font-light text-white/50">@{post.user.user_name}</p>
        </div>
      </header>
      <main className="flex flex-col">

        <p>
          {post.content}
        </p>
        <footer className="flex flex-row justify-between pt-2">
          <button>
            <IconMessageCircle className="size-5 text-white/50" />
          </button>
          <button>
            <IconRepeat className="size-5 text-white/50" />
          </button>
          <button>
            <IconHeart className="size-5 text-white/50" />
          </button>
        </footer>
      </main>
    </article >
  )
}
