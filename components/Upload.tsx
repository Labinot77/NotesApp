"use client";
 
import { UploadButton } from "@/utils/uploadthing"; 
 
const Uploader = ({ onUploadCompleted }: { onUploadCompleted: (res: string) => void }) => {

  return (
    <main className="">
      <UploadButton
      className="text-sm ut-button:h-6 ut-button:w-18 ut-allowed-content:hidden ut-button:bg-neutral-200 ut-button:hover:bg-neutral-300 ut-button:text-neutral-800 ut-button:transition-colors"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          onUploadCompleted(res[0].url);
          // console.log(res[0].url);
        }}
        onUploadError={(error: Error) => {
          
          alert(`Please try again! ${error.message}`);
        }}
      />
    </main>
  );
}

export default Uploader;