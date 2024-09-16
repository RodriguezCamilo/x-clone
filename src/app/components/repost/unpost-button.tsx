import { IconRepeat } from "@tabler/icons-react";
import { handleUnpost } from "@/app/actions/repost-action";

export default function UnpostButton({post_id}:{post_id: string}) {
  const handleClick = () => {
    const repost = handleUnpost({ post_id });
  };

  return (
    <button className="flex flex-row gap-2" onClick={handleClick}>
      <IconRepeat />
      <p>Deshacer repost</p>
    </button>
  );
}
