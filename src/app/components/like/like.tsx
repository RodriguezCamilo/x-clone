'use client'

import { IconHeart, IconHeartFilled} from '@tabler/icons-react'
import { useState} from 'react'
import { handleLike } from '@/app/actions/like-action'
import { LikeButtonProps } from './types'

export default function LikeButton({ post_id, likes_count, like_status }: LikeButtonProps) {

    const [like, setLike] = useState(like_status)
    const [manyLikes, setManyLikes] = useState(likes_count)

    return (
        <div className='flex flex-row z-10'>
            <button
                onClick={async () => {
                    const wasLiked = like
                    setLike(!wasLiked)

                    const isLiked = await handleLike({ post_id })

                    setManyLikes(prevLikes => isLiked ? prevLikes + 1 : prevLikes - 1)

                }}
                className={`rounded-full hover:bg-pink-600/10 size-8 flex items-center justify-center transition group`}
            >
                {
                    like ?
                        <IconHeartFilled className='size-5 text-pink-600 group-active:size-8 transition-all' />
                        :
                        <IconHeart className="size-5 text-white/50 group-active:size-8 active:fill-text-pink-600 group-hover:text-pink-600 transition-all" />
                }
            </button>
            <span className={`font-light ${like ? "text-pink-600" : "text-white/50"}  self-center justify-center text-sm `}>{manyLikes > 0 ? manyLikes : '\u00A0'}</span>
        </div>
    )
}
