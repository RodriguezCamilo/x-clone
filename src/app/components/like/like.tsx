'use client'

import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import { handleLike, fetchLikeStatus } from '@/app/actions/like-action'
import { LikeButtonProps } from './types'

export default function LikeButton({ post_id, likes_count}: LikeButtonProps) {

    const [like, setLike] = useState(false)
    const [manyLikes, setManyLikes] = useState(likes_count)

    useEffect(() => {
        const fetchData = async () => {
            const likeData = await fetchLikeStatus({ post_id })
            setLike(!!likeData)
        }
        fetchData()
    }, [post_id])


    return (
        <div className='flex flex-row'>
            <button
                onClick={async () => {
                    const wasLiked = like
                    setLike(!wasLiked)

                    const isLiked = await handleLike({ post_id })

                    setManyLikes(prevLikes => isLiked ? prevLikes + 1 : prevLikes - 1)

                }}
                className='rounded-full size-8 flex items-center justify-center hover:bg-pink-600/20 transition group'
            >
                {like ? <IconHeartFilled className='size-5 text-pink-600 group-active:size-8 transition-all' /> : <IconHeart className="size-5 text-white/50 group-active:size-8 active:fill-text-pink-600 group-hover:text-pink-600 transition-all" />}
            </button>
            <span className={`font-light ${like ? "text-pink-600" : "text-white/50" }  self-center justify-center text-sm `}>{manyLikes > 0 && manyLikes}</span>
        </div>
    )
}
