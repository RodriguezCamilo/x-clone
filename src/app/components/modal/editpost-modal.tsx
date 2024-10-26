"use client";
import { IconX, IconUser } from "@tabler/icons-react";
import { useRef, useEffect, useState } from "react";
import { updatePost } from "@/app/actions/post-action";
import { getPost } from "@/app/actions/post-action";

export default function EditPostModal({
  post_id,
  userAvatar,
  user_id,
  onClose,
}: {
  post_id: string;
  userAvatar: string;
  user_id: string;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [contentLength, setContentLength] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<any>(null);
  const [content, setContent] = useState<string>("");
  const maxCharacters = 280;

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPost(post_id);
      setPost(fetchedPost);
    };
    fetchPost();
  }, [post_id]);

  useEffect(() => {
    if (post && post.post?.content) {
      setContent(post.post.content);
    }
  }, [post]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value.slice(0, maxCharacters);
    setContent(newContent); 
    setContentLength(newContent.length); 
  };

  useEffect(() => {
    const textarea = textareaRef.current;

    const adjustTextareaHeight = () => {
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    if (textarea) {
      adjustTextareaHeight();
    }
  }, [content]);

  return (
    <form
      ref={formRef}
      onSubmit={async (event) => {
        if (user_id != post.post.user_id) return
        setLoading(true);
        event.preventDefault();
        const formData = new FormData(formRef.current!);
        await updatePost(formData, post_id);
        formRef.current?.reset();
        setContentLength(0);
        setLoading(false);
        onClose();
      }}
      className="fixed inset-0 flex justify-center z-50 bg-zinc-700/50"
    >
      <div className="bg-black my-12 h-fit max-h-screen min-h-1/3 lg:min-h-1/3 p-4 rounded-2xl shadow-lg w-full md:w-2/3 lg:w-1/3 flex flex-col">
        <button onClick={onClose}>
          <IconX size={22} />
        </button>
        <div className="w-full flex flex-row mt-4">
          {userAvatar ? (
            <img
              src={userAvatar}
              className="rounded-full size-10"
              alt="Imagen de perfil"
            />
          ) : (
            <div className="rounded-full bg-zinc-500/50 min-h-10 min-w-10 h-10 w-10 flex items-center justify-center">
              <IconUser />
            </div>
          )}
          <div className="w-full h-full flex flex-col p-2">
            <textarea
              ref={textareaRef}
              name="content"
              rows={1}
              className="w-full text-xl font-light p-2 bg-transparent placeholder-white/50 resize-none focus:border-0 focus:outline-none"
              value={content}
              placeholder="Editar el post"
              onChange={handleTextareaChange}
            ></textarea>
            <div className="text-right text-sm font-normal text-gray-400 p-2">
              {contentLength}/{maxCharacters}
            </div>
            <button
              disabled={loading}
              type="submit"
              className="bg-sky-500 disabled:opacity-40 disabled:pointer-events-none rounded-full px-5 py-2 font-bold self-end"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
