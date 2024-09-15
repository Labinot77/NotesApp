"use client";
 
import { UploadDropzone } from "@/utils/uploadthing"; 
 
const Uploader = ({ onUploadCompleted }: { onUploadCompleted: (res: string) => void }) => {
  return (
    <main className="">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          onUploadCompleted(res[0].url);

          console.log("Files: ", res[0].url);
        }}
        onUploadError={(error: Error) => {
          
          alert(`Please try again! ${error.message}`);
        }}
      />
    </main>
  );
}

export default Uploader;