"use client";

import { useState } from "react";
import { IconFeather } from "@tabler/icons-react";
import NewPostModal from "../modal/newpost-modal";

export default function PostButton({ userAvatar }: { userAvatar: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="text-center text-lg font-bold bg-sky-500 md:p-3 p-2 rounded-full"
        onClick={handleButtonClick}
      >
        <IconFeather className="xl:hidden" />
        <p className="hidden xl:inline">Postear</p>
      </button>
      {isModalOpen && (
        <NewPostModal userAvatar={userAvatar} onClose={handleCloseModal} />
      )}
    </>
  );
}
