"use client";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { RemoveImageButton } from "../../../../components/Buttons/Buttons";

interface ImageUploadProps {
  uploadedImageUrl: string;
  setUploadedImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; // Accept startTransition
}

const ImageUpload = ({
  uploadedImageUrl,
  setUploadedImageUrl,
  setLoading,
}: ImageUploadProps) => {
  return (
    <div
      className={`h-[20vh] mb-2 relative bg-gray-500 dark:bg-neutral-300 w-full rounded-md group`}
    >
      <h1 className="lg:text-6xl text-4xl absolute left-[32%] top-[32%] text-neutral-400 opacity-35">
        Add an image
      </h1>
      {uploadedImageUrl && (
        <Image
          src={uploadedImageUrl as string}
          alt="Note Image"
          className="object-cover rounded-md transition-opacity opacity-0 duration-200"
          onLoad={(e) => {
            const image = e.currentTarget as HTMLImageElement;
            image.classList.remove("opacity-0");
          }}
          fill
        />
      )}

      {uploadedImageUrl && (
        <RemoveImageButton
          classes="absolute bottom-5 left-5 w-fit opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          event={() => setUploadedImageUrl("")}
        />
      )}
      <UploadButton
        onUploadProgress={() => {
          setLoading(true);
        }}
        onClientUploadComplete={(res) => {
          setUploadedImageUrl(res[0].url);
          setLoading(false);
        }}
        onUploadError={(error: Error) => {
          alert(`Please try again: ${error.message}`);
          setLoading(false);
        }}
        endpoint="imageUploader"
        className="absolute bottom-5 right-5 w-fit ut-allowed-content:hidden ut-uploading:cursor-not-allowed ut-button:bg-black hover:ut-button:text-black dark:hover:ut-button:bg-slate-300 ut-button:text-slate-200 dark:ut-button:bg-slate-200 ut-button:hover:bg-slate-300 dark:ut-button:text-neutral-800 ut-uploading:opacity-100 ut-button:active:border-neutral-500 ut-button:transition-colors opacity-0 group-hover:opacity-100 duration-500 ut-button:w-[7rem] ut-button:h-[2rem] ut-button:text-sm"
      />
    </div>
  );
};


export default ImageUpload;
