'use client';

import { commentPost } from '../../actions/compose-post-action';
import { useRef, useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { IconUser } from '@tabler/icons-react';

export function ComentPost({
  avatarUrl,
  post_id,
}: {
  avatarUrl: string;
  post_id: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { pending } = useFormStatus();
  const [canPost, setCanPost] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 280;

  useEffect(() => {
    const textarea = textareaRef.current;

    const adjustTextareaHeight = () => {
      if (textarea) {
        textarea.style.height = 'auto'; 
        textarea.style.height = `${textarea.scrollHeight}px`; 
      }
    };

    const handleInput = () => {
      const content = textarea?.value.trim();
      const length = content?.length || 0;
      setCharCount(length);
      setCanPost(!!content && length <= maxChars);
      adjustTextareaHeight();
    };

    if (textarea) {
      textarea.addEventListener('input', handleInput);
      adjustTextareaHeight();
    }

    return () => {
      textarea?.removeEventListener('input', handleInput);
    };
  }, []);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        const content = formData.get('content')?.toString().trim();
        if (!content || content.length > maxChars) {
          setCanPost(false);
          return;
        }
        await commentPost(formData, post_id);
        formRef.current?.reset();
        setCharCount(0);
        setCanPost(false);
      }}
      className="flex h-auto flex-row w-full p-4 gap-2 border-b-2 border-zinc-700"
    >
      {avatarUrl ? (
        <img src={avatarUrl} className="rounded-full size-10" alt="" />
      ) : (
        <div className="rounded-full bg-zinc-500/50 size-10 flex items-center justify-center">
          <IconUser />
        </div>
      )}
      <div className="flex flex-1 flex-col w-full">
        <textarea
          ref={textareaRef}
          name="content"
          rows={1}
          maxLength={maxChars}
          className="w-full text-xl font-light p-2 bg-transparent placeholder-white/50 resize-none focus:border-0 focus:outline-none"
          placeholder="Postea tu respuesta"
        ></textarea>
        <div className="text-white/50 text-sm self-end p-2">
          {charCount}/{maxChars}
        </div>
        <button
          disabled={!canPost}
          type="submit"
          className="bg-sky-500 disabled:opacity-40 disabled:pointer-events-none rounded-full px-5 py-2 font-bold self-end"
        >
          {pending ? 'Posteando...' : 'Responder'}
        </button>
      </div>
    </form>
  );
}
