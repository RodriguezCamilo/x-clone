"use client";
import { IconX, IconUser } from "@tabler/icons-react";
import { useRef, useEffect } from "react";
import { handleQuote } from "@/app/actions/repost-action";

export default function PostModal({
  post_id,
  userAvatar,
  onClose,
}: {
  post_id: any;
  userAvatar: any;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    const adjustTextareaHeight = () => {
      if (textarea) {
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    const handleInput = () => {
      adjustTextareaHeight();
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

  return (
    <form
      ref={formRef}
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current!);
        await handleQuote({ formData, post_id });
        formRef.current?.reset();
      }}
      className="fixed inset-0 flex justify-center z-50 bg-zinc-700/50"
    >
      <div className="bg-black my-12 h-1/2 p-4 rounded-lg shadow-lg w-1/3 flex flex-col">
        <button onClick={onClose}>
          <IconX size={22} />
        </button>
        <div className="w-full flex flex-row mt-4">
          {userAvatar ? (
            <img
              src={userAvatar.avatar_url}
              className="rounded-full size-10"
              alt="Imagen de perfil"
            />
          ) : (
            <div className="rounded-full bg-zinc-500/50 size-10 flex items-center justify-center">
              <IconUser />
            </div>
          )}
          <div className="w-full h-full flex flex-col p-2">
            <textarea
              ref={textareaRef}
              name="content"
              rows={1}
              className="w-full text-xl font-light p-2 bg-transparent placeholder-white/50 resize-none focus:border-0 focus:outline-none"
              placeholder="Añadir un comentario"
            ></textarea>
            <button
              type="submit"
              className="bg-sky-500 disabled:opacity-40 disabled:pointer-events-none rounded-full px-5 py-2 font-bold self-end"
            >
              Postear
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
