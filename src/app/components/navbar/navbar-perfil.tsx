"use client";
import SignOut from "../login/sign-out";
import { IconUser } from "@tabler/icons-react";
import { NavPerfilProps } from "./types";
import { useState, useEffect, useRef } from "react";

export default function NavPerfil({ data }: NavPerfilProps) {
  const userName = data.user?.user_metadata.user_name || "defaultUser";
  const name = data.user?.user_metadata.full_name || "defaultUser";
  const avatarUrl = data.user?.user_metadata.avatar_url;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="h-10 md:px-4 md:py-8 md:mb-2 flex flex-row items-center text-start rounded-full hover:bg-white/5 transition gap-2"
    >
      {avatarUrl ? (
        <img src={avatarUrl} className="rounded-full size-10" alt="Imagen de perfil" />
      ) : (
        <div className="rounded-full bg-zinc-500/50 size-10 flex items-center justify-center">
          <IconUser />
        </div>
      )}
      <div className="xl:flex flex-col hidden">
        <h3 className="font-bold ">{name}</h3>
        <p className="font-light text-white/50">@{userName}</p>
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-0 left-0 transform -translate-y-full border border-white/50 text-white/90 w-auto rounded-xl shadow-lg bg-black ring-1 ring-black ring-opacity-5 z-20"
        >
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <SignOut userName={userName} />
          </div>
        </div>
      )}
    </button>
  );
}
