
import Link from "next/link"
import { IconMessageCircle, IconHeart, IconRepeat } from '@tabler/icons-react'
import { IconUser } from "@tabler/icons-react"
import LikeButton from "../like/like"

export function PostCard({
    userName,
    avatarUrl,
    fullName,
    content,
    likesCount,
    id
}: {
    userName: string,
    avatarUrl: string,
    fullName: string,
    content: string,
    likesCount: number,
    id: string,
})

{
    return (
        <article className="text-left flex flex-row w-full p-4 pb-2 border-b-2 border-zinc-700 gap-2 bg-gray/0 transition hover:bg-zinc-300/5 cursor-pointer relative">
            <Link className="absolute inset-0 z-0 " aria-hidden="true" href={`/posts/${id}`}></Link>
            <Link href={`/perfil/${userName}`} className="flex flex-row z-10">
                {avatarUrl != 'Unknown' ? <img src={avatarUrl} className="rounded-full size-10" alt="" /> : <div className='rounded-full bg-zinc-500/50 size-10 flex items-center justify-center'><IconUser /></div>}
            </Link>
            <main className="flex flex-col w-full">
                <div className="flex flex-row gap-2">
                    <Link href={`/perfil/${userName}`} className="font-bold hover:underline z-10">{fullName}</Link>
                    <Link href={`/perfil/${userName}`} className="font-light text-white/50">@{userName}</Link>
                </div>
                <p>
                    {content}
                </p>
                <footer className="flex flex-row w-full justify-between pt-2">
                    <button>
                        <IconMessageCircle className="size-5 text-white/50" />
                    </button>
                    <button>
                        <IconRepeat className="size-5 text-white/50" />
                    </button>
                    <div className='z-10'>
                        <LikeButton likes_count={likesCount} post_id={id} />
                    </div>
                </footer>
            </main>
        </article >
    )
}