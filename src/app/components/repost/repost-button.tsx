import React from "react";
import type { RepostButtonProps } from "./types";
import { IconRepeat } from "@tabler/icons-react";
import {handleRepost} from "@/app/actions/repost-action"


export default function RepostButton({ post_id }: RepostButtonProps) {

    const handleClick = () => {
        const repost = handleRepost(post_id)
        console.log(repost)
    }

  return(
    <button className="flex flex-row gap-2" onClick={handleClick}>
        <IconRepeat />
        <p>Repost</p>
    </button>
  )
}
