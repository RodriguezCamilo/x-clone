import { IconX } from "@tabler/icons-react";

export default function PostModal({ post_id }: { post_id: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-500">
          <IconX size={24} />
        </button>
        <h2 className="text-lg font-bold mb-4">Edit Repost Content</h2>
        <textarea className="w-full h-40 p-2 border border-gray-300 rounded-lg" />
        <div className="flex justify-end gap-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Confirm
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
