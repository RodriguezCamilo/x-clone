
import { IconCameraPlus } from "@tabler/icons-react";
import { createClient } from "@/app/utils/supabase/client";
import { handleEditBannerUrl } from "@/app/actions/edit-perfil-action";

function EditBanner({ userID }: { userID: string }) {

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const supabase = createClient();
      const fileName = `${userID}`;
      console.log(file)
      const { data, error } = await supabase.storage
        .from("banner")
        .upload(fileName, file, {
            upsert: true
        });
      if (error) {
        console.error("Error uploading banner:", error);
        return;
      }

      const bannerUrl = supabase.storage.from("banner").getPublicUrl(fileName).data.publicUrl;

      await handleEditBannerUrl(bannerUrl, userID);

      window.location.reload();
    }
  };

  return (
    <div className="absolute bottom-1/2 translate-y-1/2 left-1/2 transform -translate-x-1/2 bg-zinc-700/80 hover:bg-zinc-700/60 transition-all rounded-full p-2 cursor-pointer">
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
      <IconCameraPlus height={24} width={24} className="text-white" />
    </div>
  );
}

export default EditBanner;
