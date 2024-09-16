'use client'

import { useState } from "react";

import NewPostModal from "../modal/newpost-modal";

export default function PostButton({ userAvatar }: {userAvatar: any}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="text-center text-lg font-bold bg-sky-500 p-3 rounded-full" onClick={handleButtonClick}>
        Postear
      </button>
      {isModalOpen && (
        <NewPostModal userAvatar={userAvatar} onClose={handleCloseModal} />
      )}
    </>
  );
}
