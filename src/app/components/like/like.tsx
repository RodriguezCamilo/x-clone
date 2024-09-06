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
        >
            {like ? <IconHeartFilled className='size-5 text-pink-500' /> : <IconHeart className="size-5 text-white/50" />}
        </button>
    )
}
