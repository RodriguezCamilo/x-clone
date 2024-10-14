"use client";
import ReactDOM from "react-dom";
import { IconX, IconUser, IconPhoto } from "@tabler/icons-react";
import { useRef, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { addPost } from "@/app/actions/compose-post-action";

export default function NewPostModal({
  userAvatar,
  onClose,
}: {
  userAvatar: any;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { pending } = useFormStatus();
  const [canPost, setCanPost] = useState(false);
  const [contentLength, setContentLength] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

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
        if (selectedImage) {
          formData.append("image", selectedImage);
        }
        await addPost(formData);
        formRef.current?.reset();
        setCanPost(false);
        setSelectedImage(null);
        setPreviewUrl(null);
      }}
      className="fixed inset-0 flex justify-center z-40 bg-zinc-700/50"
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
              rows={2}
              className="w-full text-xl font-light p-2 bg-transparent placeholder-white/50 resize-none focus:border-0 focus:outline-none"
              placeholder="¿¡Qué está pasando!?"
            ></textarea>
            <div className="text-right text-sm text-gray-400 p-2">
              {contentLength}/{maxCharacters}
            </div>
            {previewUrl && (
              <div className="relative w-full mt-2">
                <img
                  src={previewUrl}
                  alt="Previsualización"
                  className="w-full object-cover rounded-lg max-h-80 "
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute flex items-center justify-center top-2 right-2 bg-black/70 size-8 rounded-full p-1"
                >
                  <IconX className="text-white size-5" />
                </button>
              </div>
            )}

            <div className="flex w-full justify-between mt-2">
              <div className="size-10 relative flex items-center justify-center cursor-pointer hover:bg-sky-500/10 rounded-full">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full z-10 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
                <IconPhoto className="size-5 text-sky-500 z-0" />
              </div>

              <button
                disabled={!canPost}
                type="submit"
                className="bg-sky-500 disabled:opacity-40 disabled:pointer-events-none rounded-full px-5 py-2 font-bold self-end"
              >
                {pending ? "Posteando..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>,
    document.body
  );
}
