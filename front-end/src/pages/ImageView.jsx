import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { downloadFile } from "../services/uploadService";
import Loading from "../UI/Loading";
import Spinner from "../UI/Spinner";

function ImageView() {
  const { id } = useParams();
  const [imageData, setImageData] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchImageData = async () => {
      const { data } = await downloadFile(id);
      console.log("Fetched image data:", data);
      setImageData(data);
    };
    fetchImageData();
  }, [id]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleShare = async () => {
    if (imageData?.image) {
      try {
        await navigator.clipboard.writeText(imageData.image);
        showToast("Link copied to clipboard!");
      } catch (err) {
        showToast("Failed to copy link");
      }
    }
  };

  const handleDownload = async () => {
    if (imageData?.image) {
      try {
        const response = await fetch(imageData.image);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = imageData.name || "download.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        showToast("Image downloading!");
      } catch (err) {
        showToast("Failed to download image");
      }
    }
  };

  if (!imageData) {
    return <Spinner />;
  }

  return (
    <div className="h-full flex flex-col justify-center items-center px-4 relative bg-gray-100 dark:bg-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute  right-5 bottom-5 bg-white dark:bg-gray-300 text-green-400 border border-gray dark:border-gray-200 px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce font-bold">
          {toastMessage}
        </div>
      )}

      {/* Image Container */}
      <div className="p-3 bg-white dark:bg-gray-300 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] mb-8 max-w-4xl w-full">
        <img
          src={imageData.image}
          alt={imageData.name || "Uploaded image"}
          className="w-full h-auto max-h-[60vh] object-cover rounded-xl"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 bg-primary-blue text-white px-8 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm font-medium"
        >
          <img
            src="/Link.svg"
            alt="Share"
            className="w-5 h-5 invert brightness-0"
          />
          Share
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-primary-blue text-white px-8 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm font-medium"
        >
          <img
            src="/download.svg"
            alt="Download"
            className="w-5 h-5 invert brightness-0"
          />
          Download
        </button>
      </div>
    </div>
  );
}

export default ImageView;
