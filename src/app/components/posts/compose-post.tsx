'use client'

import { addPost } from '../../actions/compose-post-action'
import { useRef, useState, useEffect } from 'react'
import { useFormStatus } from "react-dom"
import { IconUser } from '@tabler/icons-react'

export function ComposePost({
    avatarUrl
}: {
    avatarUrl: string
}) {
    const formRef = useRef<HTMLFormElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { pending } = useFormStatus()
    const [canPost, setCanPost] = useState(false)

    useEffect(() => {
        const textarea = textareaRef.current

        const adjustTextareaHeight = () => {
            if (textarea) {
                textarea.style.height = `${textarea.scrollHeight}px`
            }
        }

        const handleInput = () => {
            const content = textarea?.value.trim()
            setCanPost(!!content)
            adjustTextareaHeight()
        }

        if (textarea) {
            textarea.addEventListener('input', handleInput)
            adjustTextareaHeight();
        }
        return () => {
            if (textarea) {
                textarea.removeEventListener('input', handleInput)
            }
        }
    }, []);

    return (
        <form
            ref={formRef}
            onSubmit={async (event) => {
                event.preventDefault()
                const formData = new FormData(formRef.current!)
                const content = formData.get('content')?.toString().trim()
                if (!content) {
                    setCanPost(false)
                    return
                }
                await addPost(formData)
                formRef.current?.reset()
                setCanPost(false)
                if (textareaRef.current) {
                    textareaRef.current.style.height = 'auto'
                }
            }}
            className="flex flex-1 flex-row h-auto w-full p-4 gap-2 border-b-2 border-zinc-700"
        >
            {avatarUrl ? (
                <img src={avatarUrl} className="rounded-full size-10" alt="Imagen de perfil" />
            ) : (
                <div className="rounded-full bg-zinc-500/50 size-10 flex items-center justify-center">
                    <IconUser />
                </div>
            )}
            <div className="flex flex-1 flex-col h-auto w-full">
                <textarea
                    ref={textareaRef}
                    name="content"
                    rows={1}
                    className="w-full text-xl font-light p-2 bg-transparent placeholder-white/50 resize-none focus:border-0 focus:outline-none"
                    placeholder="¿¡Qué está pasando!?"
                ></textarea>

                <button
                    disabled={!canPost}
                    type="submit"
                    className="bg-sky-500 disabled:opacity-40 disabled:pointer-events-none rounded-full px-5 py-2 font-bold self-end"
                >
                    {pending ? 'Posteando...' : 'Post'}
                </button>
            </div>
        </form>
    );
}
