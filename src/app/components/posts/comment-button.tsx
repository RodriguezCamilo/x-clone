"use client";

import { IconMessageCircle } from "@tabler/icons-react";
import { useState } from "react";
import CommentModal from "../modal/comment-modal";

export default function CommentButton({
  post_id,
  userAvatar,
}: {
  post_id: string;
  userAvatar: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="z-20">
      <button className="size-8 rounded-full flex items-center justify-center group transition hover:bg-blue-600/50 gap-2" onClick={handleButtonClick}>
        <IconMessageCircle className="size-5 text-white/50 hover:text-blue-600" />
      </button>
      {isModalOpen && (
        <CommentModal
          userAvatar={userAvatar}
          post_id={post_id}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
