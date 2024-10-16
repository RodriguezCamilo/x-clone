'use client'

import { newConversation } from "@/app/actions/chat-action"
import { IconMail } from "@tabler/icons-react"

function MessageButton({user_id}:{user_id: string}) {

  const newConver = () => {
    newConversation(user_id)
  }
  
  return (
    <button onClick={()=>newConver()} className="p-2 rounded-full border boreder border-zinc-700 hover:bg-white/10 hover:cursor-pointer">
        <IconMail/>
    </button>
  )
}

export default MessageButton