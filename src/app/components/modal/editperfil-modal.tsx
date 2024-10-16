"use client";
import { IconX, IconUser } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { handleEdit } from "@/app/actions/edit-perfil-action";
import EditAvatar from "../perfil/editavatar-button";
import EditBanner from "../perfil/editbanner-button";

export default function EditModal({
  user,
  onClose,
}: {
  user: any;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const maxNameChars = 20;
  const maxBioChars = 160;
  const maxLocationChars = 20;
  const maxWebsiteChars = 50;

  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [website, setWebsite] = useState(user.website || "");

  const [nameCharCount, setNameCharCount] = useState(user.name?.length || 0);
  const [bioCharCount, setBioCharCount] = useState(user.bio?.length || 0);
  const [locationCharCount, setLocationCharCount] = useState(user.location?.length || 0);
  const [websiteCharCount, setWebsiteCharCount] = useState(user.website?.length || 0);

  return (
    <form
      ref={formRef}
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current!);
        await handleEdit(formData, user.id, user.user_name);
        formRef.current?.reset();
        window.location.reload();
      }}
      className="fixed inset-0 flex justify-center z-50 bg-zinc-700/50"
    >
      <div className="bg-black overflow-auto lg:my-12 h-full lg:h-3/4 p-4 rounded-2xl shadow-lg w-full md:w-2/3 lg:w-1/3 flex flex-col gap-10">
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

        <div className="bg-zinc-600 h-52 w-full relative">
          {user.banner_url && (
            <img
              src={user.banner_url}
              className="w-full h-full object-cover"
              alt="Imagen de portada"
            />
          )}
          <EditBanner userID={user.id} />
          <div className="flex items-center justify-center rounded-full size-28 absolute bottom-[-31%] left-4">
            <div className="relative flex justify-center">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  className="rounded-full h-28 w-28 object-cover  border-4 border-black"
                  alt="Imagen de perfil"
                />
              ) : (
                <IconUser
                  height={28}
                  width={28}
                  className="rounded-full bg-zinc-600  border-4 border-black"
                />
              )}
              <EditAvatar userID={user.id} />
            </div>
          </div>
        </div>

        <div className="w-full h-full flex flex-col mt-4 p-2 gap-4">
          <div className="relative">
            <input
              type="text"
              className="border border-zinc-700 bg-black rounded h-14 w-full px-3 pt-5 pb-1 focus:outline-sky-500 placeholder-transparent peer"
              name="name"
              id="name"
              maxLength={maxNameChars}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameCharCount(e.target.value.length);
              }}
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute text-gray-400 duration-300 transform -translate-y-2 scale-75 top-2 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:text-sky-500"
            >
              Nombre
            </label>
            <div className="text-sm text-gray-400 p-1 absolute right-3 top-7">
              {nameCharCount}/{maxNameChars}
            </div>
          </div>

          <div className="relative">
            <textarea
              ref={textareaRef}
              name="bio"
              id="bio"
              rows={3}
              maxLength={maxBioChars}
              className="border border-zinc-700 bg-black rounded w-full px-3 pt-6 pb-1 focus:outline-sky-500 placeholder-transparent peer resize-none"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
                setBioCharCount(e.target.value.length);
              }}
              placeholder=" "
            ></textarea>
            <label
              htmlFor="bio"
              className="absolute text-gray-400 duration-300 transform -translate-y-1 scale-75 top-1 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-1 peer-focus:text-sky-500"
            >
              Biografía
            </label>
            <div className="text-sm text-gray-400 p-1 absolute right-3 top-16">
              {bioCharCount}/{maxBioChars}
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              className="border border-zinc-700 bg-black rounded h-14 w-full px-3 pt-5 pb-1 focus:outline-sky-500 placeholder-transparent peer"
              name="location"
              id="location"
              maxLength={maxLocationChars}
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setLocationCharCount(e.target.value.length);
              }}
              placeholder=" "
            />
            <label
              htmlFor="location"
              className="absolute text-gray-400 duration-300 transform -translate-y-2 scale-75 top-2 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:text-sky-500"
            >
              Ubicación
            </label>
            <div className="text-sm text-gray-400 p-1 absolute right-3 top-7">
              {locationCharCount}/{maxLocationChars}
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              className="border border-zinc-700 bg-black rounded h-14 w-full px-3 pt-5 pb-1 focus:outline-sky-500 placeholder-transparent peer"
              name="website"
              id="website"
              maxLength={maxWebsiteChars}
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
                setWebsiteCharCount(e.target.value.length);
              }}
              placeholder=" "
            />
            <label
              htmlFor="website"
              className="absolute text-gray-400 duration-300 transform -translate-y-2 scale-75 top-2 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:text-sky-500"
            >
              Sitio web
            </label>
            <div className="text-sm text-gray-400 p-1 absolute right-3 top-7">
              {websiteCharCount}/{maxWebsiteChars}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
