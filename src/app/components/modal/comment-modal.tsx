"use client";
import ReactDOM from "react-dom";
import { IconX, IconUser } from "@tabler/icons-react";
import { useRef, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { commentPost } from "@/app/actions/compose-post-action";

export default function CommentModal({
  post_id,
  userAvatar,
  onClose,
}: {
  post_id: string;
  userAvatar: any;
  onClose: () => void;
}) {
    const formRef = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { pending } = useFormStatus();
    const [canPost, setCanPost] = useState(false);
    const [contentLength, setContentLength] = useState(0);
    const maxCharacters = 280; 
  
    useEffect(() => {
      const textarea = textareaRef.current;
      const adjustTextareaHeight = () => {
        if (textarea) {
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      };
  
      const handleInput = () => {
        if (textarea) {
          const content = textarea.value.slice(0, maxCharacters);
          textarea.value = content;
          setContentLength(content.length); 
          setCanPost(content.trim().length > 0);
          adjustTextareaHeight();
        }
      };
  
      if (textarea) {
        textarea.addEventListener("input", handleInput);
        adjustTextareaHeight();
      }
      return () => {
        if (textarea) {
          textarea.removeEventListener("input", handleInput);
        }
      };
    }, []);
  
    return ReactDOM.createPortal(
      <form
        ref={formRef}
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(formRef.current!);
          const content = formData.get("content")?.toString().trim();
          if (!content) {
            setCanPost(false);
            return;
          }
          await commentPost(formData, post_id);
          formRef.current?.reset();
          setContentLength(0);
          setCanPost(false);
          onClose()
        }}
        className="fixed inset-0 z-50 flex justify-center bg-zinc-700/50"
      >
        <div className="bg-black my-12 h-2/3 lg:h-1/3 p-4 rounded-2xl shadow-lg w-full md:w-2/3 lg:w-1/3 flex flex-col">
          <button onClick={onClose}>
            <IconX size={22} />
          </button>
          <div className="w-full flex flex-row mt-4">
            {userAvatar ? (
              <img src={userAvatar.avatar_url} className="rounded-full size-10" alt="Imagen de perfil" />
            ) : (
              <div className="rounded-full bg-zinc-500/50 min-h-10 min-w-10 h-10 w-10 flex items-center justify-center">
                <IconUser />
              </div>
            )}
            <div className="w-full h-full flex flex-col p-2">
              <textarea
                ref={textareaRef}
                name="content"
                rows={2}
                className="w-full text-xl font-light p-2 bg-transparent placeholder-white/50 resize-none focus:border-0 focus:outline-none"
                placeholder="Postea tu respuesta"
              ></textarea>
              <div className="text-right text-sm text-gray-400 p-2">
                {contentLength}/{maxCharacters}
              </div>
              <button
                disabled={!canPost}
                type="submit"
                className="bg-sky-500 disabled:opacity-40 disabled:pointer-events-none rounded-full px-5 py-2 font-bold self-end"
              >
                {pending ? "Posteando..." : "Postear"}
              </button>
            </div>
          </div>
        </div>
      </form>,
      document.body
  );
}
