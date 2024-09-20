"use client";

import { useState } from "react";
import EditModal from "../modal/editperfil-modal";

export default function EditButton({ user }: { user: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="p-2 px-4 rounded-full font-semibold border border-zinc-700 transition hover:bg-white/10" onClick={handleButtonClick}>
        Editar perfil
      </button>
      {isModalOpen && (
        <EditModal user={user} onClose={handleCloseModal} />
      )}
    </>
  );
}
