"use client";

import { useState, useEffect, useRef } from "react";
import { IconRepeat, IconPencilMinus } from "@tabler/icons-react";
import RepostButton from "./repost-button";

export default function RepostDropdown() {
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
    <div className="relative inline-block text-left">
      <button
        className="flex items-center size-8 group hover:bg-emerald-600/10 rounded-full justify-center"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <IconRepeat className="size-5 text-white/50 group-hover:text-emerald-600" />
      </button>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute border border-white/50 text-white/90 w-36 rounded-xl shadow-lg bg-black ring-1 ring-black ring-opacity-5 z-50"
        >
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className=" px-4 py-3 font-bold  hover:bg-white/5 w-full text-left flex flex-row gap-2"
              role="menuitem"
            >
              <IconRepeat />
              <RepostButton />
            </button>
            <button
              className=" px-4 py-3 font-bold  hover:bg-white/5 w-full text-left flex flex-row gap-2"
              role="menuitem"
            >
              <IconPencilMinus />
              <p>Cita</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
