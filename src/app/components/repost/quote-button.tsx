import { useState, useEffect, useRef } from "react";
import { IconPencilMinus } from "@tabler/icons-react";
import PostModal from "../modal/PostModal";
import type { RepostButtonProps } from "./types";

export default function QuoteButton({ post_id }: RepostButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleButtonClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <button className="flex flex-row gap-2" onClick={handleButtonClick}>
        <IconPencilMinus />
        <p>Citar</p>
      </button>
      {isDropdownOpen && (
          <PostModal post_id={post_id} />
      )}
    </>
  );
}
