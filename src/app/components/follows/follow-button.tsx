'use client';

import { useState } from "react";
import { handleFollow } from "@/app/actions/follow-action";
import { FollowButtonProps } from "./types";

export default function FollowButton({ user_id, follow_status }: FollowButtonProps) {
  const [follow, setFollow] = useState(follow_status);

  const handleFollowClick = async () => {
    const isFollowing = await handleFollow(user_id);
    setFollow(isFollowing);
  };

  return (
    <button
      onClick={handleFollowClick}
      className={`p-2 px-4 rounded-full font-semibold text-nowrap  ${follow ? "bg-black text-white border border-zinc-700 hover:bg-red-600/10 hover:border-red-600/20 hover:text-red-600": "bg-white text-black hover:bg-white/95"}  transition`}
    >
      {follow ? 'Dejar de seguir' : 'Seguir'}
    </button>
  );
}
