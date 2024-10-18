"use client";

import { useEffect, useRef, useState } from "react";
import { IconX, IconPhoto, IconSend2 } from "@tabler/icons-react";
import { addMessage } from "@/app/actions/chat-action";
import { DataUser } from "@/app/utils/supabase/user";
import { getUser } from "@/app/actions/user-action";

export function ComposeMessage({ conversation, addNewMessage }: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [canMessage, setCanMessage] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [reciver, setReciver] = useState<string | undefined>();

  useEffect(() => {
    async function getAuthUser() {
      if (!conversation) return;
      const data = await DataUser();
      const u = await getUser(data.user?.id);
      u.id === conversation.user_1
        ? setReciver(conversation.user_2)
        : setReciver(conversation.user_1);
    }
    getAuthUser();
  }, [conversation]);

  useEffect(() => {
    const textarea = textareaRef.current;

    const adjustTextareaHeight = () => {
      if (textarea) {
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    const handleInput = () => {
      const content = textarea?.value.trim() || "";
      setCanMessage(!!content && content.length > 0);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const content = formData.get("content")?.toString().trim();

    if (!content || content.length < 0) {
      setCanMessage(false);
      return;
    }

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const newMessage = await addMessage(formData, conversation.id, reciver);

      addNewMessage(newMessage);

      formRef.current.reset();
      setCanMessage(false);
      setSelectedImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-1 flex-row w-full p-1 items-center gap-2 border-b-2 bg-zinc-800 border-zinc-700 rounded-2xl"
    >
      <div className="flex flex-1 flex-col h-auto w-full">
        {previewUrl && (
          <div className="relative h-40 w-full mt-2">
            <img
              src={previewUrl}
              alt="Previsualización"
              className="w-full h-40 object-cover rounded-lg"
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
        <div className="flex flex-row items-center">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full z-10 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
            <IconPhoto className="size-5 text-sky-500 z-0" />
          </div>
          <textarea
            ref={textareaRef}
            name="content"
            rows={1}
            className="w-full p-2 bg-transparent placeholder-white/50 resize-none focus:border-0 focus:outline-none"
            placeholder="Escribe un mensaje"
          ></textarea>

          <button
            disabled={!canMessage}
            type="submit"
            className={`disabled:opacity-40 disabled:pointer-events-none rounded-full font-bold`}
          >
            <IconSend2 />
          </button>
        </div>
      </div>
    </form>
  );
}
