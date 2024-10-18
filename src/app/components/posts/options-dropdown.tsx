"use client";

import { deletePost } from "@/app/actions/delete-post-action";
import { DataUser } from "@/app/utils/supabase/user";
import { IconDots, IconTrash } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";

interface OptionsDropdownProps {
  postId: string;
  userId: string;
}

export default function OptionsDropdown({
  postId,
  userId,
}: OptionsDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOwner, setisOwner] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const AuthUser = await DataUser();
      if (userId == AuthUser.user?.id) {
        setisOwner(true);
      }
    };
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    fetchUser();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = () => {
    deletePost(postId);
  };

  return (
    <div className="relative group flex flex-row">
      {isOwner && (
        <button
          className="hover:bg-sky-600/50 hover:text-sky-600/50 rounded-full w-8 h-8 transition-all"
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <IconDots className="w-5 text-white/70 m-auto" />
        </button>
      )}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute border right-0 border-white/50 text-nowrap text-white/90 min-w-36 rounded-xl shadow-lg bg-black ring-1 ring-black ring-opacity-5 z-50"
        >
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className="text-red-600 font-bold py-3 px-4 hover:bg-white/5 w-full text-left flex flex-row gap-2 items-center"
              onClick={handleDelete}
            >
              <IconTrash /> Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
