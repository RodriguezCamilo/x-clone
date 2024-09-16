import type { RepostButtonProps } from "./types";
import { IconRepeat } from "@tabler/icons-react";
import {handleRepost} from "@/app/actions/repost-action"


export default function RepostButton({ post_id, content }: RepostButtonProps) {

    const handleClick = () => { 
        const repost = handleRepost({post_id, content})
    }

  return(
    <button className="flex flex-row gap-2" onClick={handleClick}>
        <IconRepeat />
        <p>Repostear</p>
    </button>
  )
}
