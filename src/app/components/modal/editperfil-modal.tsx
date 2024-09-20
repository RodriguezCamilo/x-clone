"use client";
import { IconX, IconUser } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { handleEdit } from "@/app/actions/edit-perfil-action";


export default function EditModal({
  user,
  onClose,
}: {
  user: any;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [contentLength, setContentLength] = useState(0);
  const maxCharacters = 160;

  return (
    <form
      ref={formRef}
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current!);
        await handleEdit(formData, user.id, user.user_name );
        formRef.current?.reset();
        setContentLength(0);
        window.location.reload()
      }}
      className="fixed inset-0 flex justify-center z-50 bg-zinc-700/50"
    >
      <div className="bg-black my-12 h-2/3 p-4 rounded-lg shadow-lg w-1/3 flex flex-col">
        <div className="flex flex-row items-center justify-between w-full">
          <button onClick={onClose}>
            <IconX size={22} />
          </button>
          <h2 className="text-2xl font-bold">Editar perfil</h2>
          <button
            type="submit"
            className="bg-white text-black rounded-full hover:bg-white/95 px-5 py-2 font-bold"
          >
            Guardar
          </button>
        </div>
        <div className="w-full flex flex-row mt-4">
          {user.userAvatar ? (
            <img
              src={user.userAvatar.avatar_url}
              className="rounded-full size-10"
              alt="Imagen de perfil"
            />
          ) : (
            <div className="rounded-full bg-zinc-500/50 size-10 flex items-center justify-center">
              <IconUser />
            </div>
          )}
          <div className="w-full h-full flex flex-col p-2 gap-4">
            <div className="relative">
              <input
                type="text"
                className="border border-zinc-700 bg-black rounded h-14 w-full px-3 pt-5 pb-1 focus:outline-sky-500 placeholder-transparent peer"
                name="name"
                id="name"
                placeholder=" "
                defaultValue={user.name || ""}
              />
              <label
                htmlFor="name"
                className="absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:text-sky-500"
              >
                Nombre
              </label>
            </div>
            <div className="relative">
              <textarea
                ref={textareaRef}
                name="bio"
                id="bio"
                rows={3}
                maxLength={160}
                className="border border-zinc-700 bg-black rounded w-full px-3 pt-5 pb-1 focus:outline-sky-500 placeholder-transparent peer resize-none"
                placeholder=" "
                defaultValue={user.bio || ""}
              ></textarea>
              <label
                htmlFor="bio"
                className="absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-sky-500"
              >
                Biografía
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                className="border border-zinc-700 bg-black rounded h-14 w-full px-3 pt-5 pb-1 focus:outline-sky-500 placeholder-transparent peer"
                name="location"
                id="location"
                placeholder=" "
                defaultValue={user.location || ""}
              />
              <label
                htmlFor="location"
                className="absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:text-sky-500"
              >
                Ubicación
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
