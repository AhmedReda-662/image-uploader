import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../services/uploadService";
import Loading from "../UI/Loading";
import { useNavigate } from "react-router-dom";

function ImageUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) {
        setError("Please select a valid file to upload.");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const { data } = await uploadFile(file);
        setError(null);
        console.log("Upload successful:", data);
        navigate(`/image/${data._id}`);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (isLoading && !error) {
    return <Loading />;
  }

  return (
    <div className="h-full flex justify-center items-center bg-gray-100 dark:bg-black">
      <div className="p-3 bg-white dark:bg-gray-300 rounded-lg shadow-2xl flex justify-center items-center">
        <div
          {...getRootProps()}
          className="w-xl h-96 p-4 border-2 border-gray dark:border-gray-200 border-dashed rounded-lg flex flex-col justify-center items-center text-center cursor-pointer dark:text-gray-500"
        >
          <input {...getInputProps()} />
          <img src="/exit.svg" alt="Upload" className="mb-4" />
          <p className="font-medium dark:text-gray-500">
            Drag & drop a file or{" "}
            <span className="text-blue-500">browse files</span>
          </p>
          <p className="mt-2 text-sm text-gray-200 dark:text-gray-500">
            JPG, PNG or GIF - Max file size 2MB
          </p>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
