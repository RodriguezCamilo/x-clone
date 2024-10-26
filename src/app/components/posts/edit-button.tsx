"use client";

import { useState } from "react";
import { IconEdit } from "@tabler/icons-react";
import EditPostModal from "../modal/editpost-modal";

export default function EditButton({
  post_id,
  userAvatar,
  user_id
}: {
  post_id: string;
  userAvatar: string;
  user_id: string;
}) {
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
        <IconEdit />
        <p>Editar</p>
      </button>
      {isModalOpen && (
        <EditPostModal
          userAvatar={userAvatar}
          post_id={post_id}
          user_id={user_id}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
