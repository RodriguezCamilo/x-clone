'use client'

import { addPost } from '../../actions/compose-post-action'
import { useRef } from 'react'
import { useFormStatus } from "react-dom";

export function ComposePost({
    avatarUrl
}: {
    avatarUrl: string
}) {
    const formRef = useRef<HTMLFormElement>(null)
    const { pending } = useFormStatus()

    return (
        <form ref={formRef} action={async (formData) => {
            await addPost(formData)
            formRef.current?.reset()
        }} className='flex flex-1 flex-row max-h-40 w-full p-4 gap-2 border-b-2 border-zinc-700'>
            <img className='rounded-full size-10' src={avatarUrl} alt="perfil image" />
            <div className='flex flex-1 flex-col w-full'>

                <textarea name="content" rows={4} className='w-full text-xl font-light p-2 bg-transparent placeholder-white/50 resize-none focus:border-0 focus:outline-none' placeholder='¿¡Qué esta pasando!?' id=""></textarea>

                <button disabled={pending} type='submit' className='bg-sky-500 disabled:opacity-40 disabled:pointer-events-none rounded-full px-5 py-2 font-bold self-end'>
                    {pending ? 'Posteando...' : 'Post'}
                </button>

            </div>

        </form>
    )

}