"use client";

import { useState, useEffect, useRef } from "react";
import { IconRepeat, IconPencilMinus } from "@tabler/icons-react";
import RepostButton from "./repost-button";
import type { RepostDropdownProps } from "./types";
import QuoteButton from "./quote-button";
import UnpostButton from "./unpost-button";

export default function RepostDropdown({
  post_id,
  repost_count,
  is_reposted,
  userAvatar,
}: RepostDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [manyRepost, setManyRepost] = useState(repost_count);
  const [reposted, setReposted] = useState(is_reposted);

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

  const handleRepostClick = () => {
    if (reposted) {
      setIsDropdownOpen(false);
      setManyRepost((prevRepost) => prevRepost - 1);
      setReposted(false);
    } else {
      setIsDropdownOpen(false);
      setManyRepost((prevRepost) => prevRepost + 1);
      setReposted(true);
    }
  };


  return (
    <div className="relative group flex flex-row">
      {reposted ? (
        <button
          type="button"
          className="flex items-center size-8  group-hover:bg-emerald-600/10  rounded-full justify-center"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <IconRepeat
            className={`size-5 rounded-full text-emerald-600 group-hover:text-emerald-600`}
          />
        </button>
      ) : (
        <button
          type="button"
          className="flex items-center size-8  group-hover:bg-emerald-600/10  rounded-full justify-center"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <IconRepeat
            className={`size-5 rounded-full ${
              reposted && "text-emerald-600"
            }  text-white/50 group-hover:text-emerald-600`}
          />
        </button>
      )}

      <span
        className={
          "font-light text-white/50 self-center justify-center text-sm "
        }
      >
        {manyRepost > 0 ? manyRepost : '\u00A0'}
      </span>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute border border-white/50 text-nowrap text-white/90 min-w-36 rounded-xl shadow-lg bg-black ring-1 ring-black ring-opacity-5 z-50"
        >
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {reposted ? (
              <>
                <div
                  className=" rounded-t-xl px-4 py-3 font-bold  hover:bg-white/5 w-full text-left flex flex-row gap-2"
                  role="menuitem"
                  onClick={handleRepostClick}
                >
                  <UnpostButton post_id={post_id} />
                </div>
              </>
            ) : (
              <>
                <div
                  className=" rounded-t-xl px-4 py-3 font-bold  hover:bg-white/5 w-full text-left flex flex-row gap-2"
                  role="menuitem"
                  onClick={handleRepostClick}
                >
                  <RepostButton post_id={post_id} />
                </div>
                <div
                  className=" rounded-b-xl px-4 py-3 font-bold  hover:bg-white/5 w-full text-left flex flex-row gap-2"
                  role="menuitem"
                >
                  <QuoteButton userAvatar={userAvatar} post_id={post_id} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
