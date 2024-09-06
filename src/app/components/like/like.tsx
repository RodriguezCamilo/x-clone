'use client'

import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { handleLike, fetchLikeStatus } from '@/app/actions/like-action';

export default function LikeButton({ post_id }: any) {

    const [like, setLike] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const likeData = await fetchLikeStatus({ post_id })
            setLike(!!likeData)
        }
        fetchData()
    }, [post_id])

    return (
        <button
            onClick={async () => {
                await handleLike({ post_id })
                setLike(!like)
            }}
            className='rounded-full size-8 flex items-center justify-center hover:bg-pink-600/20 transition group'
        >
            {like ? <IconHeartFilled className='size-5 text-pink-600' /> : <IconHeart className="size-5 text-white/50 group-hover:text-pink-600 transition" />}
        </button>
    )
}
