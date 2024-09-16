'use client'

import { useState } from "react";
import { IconPencilMinus } from "@tabler/icons-react";
import PostModal from "../modal/repost-modal";

export default function QuoteButton({ post_id, userAvatar }: {post_id: string, userAvatar: any}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="flex flex-row gap-2" onClick={handleButtonClick}>
        <IconPencilMinus />
        <p>Citar</p>
      </button>
      {isModalOpen && (
        <PostModal userAvatar={userAvatar} post_id={post_id} onClose={handleCloseModal} />
      )}
    </>
  );
}
