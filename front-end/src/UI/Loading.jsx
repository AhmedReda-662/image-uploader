function Loading() {
  return (
    <div className="h-full flex justify-center items-center px-4 bg-gray-100 dark:bg-black">
      <div className="py-8 px-20 bg-white dark:bg-gray-300 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] w-125">
        <h2 className="text-[17px] mb-5 tracking-wide text-center">
          <span className="font-semibold text-gray-400 dark:text-gray-500">Uploading,</span>
          <span className="text-gray-200 dark:text-gray-500"> please wait..</span>
        </h2>
        <div className="w-full h-1.5 bg-gray dark:bg-gray-200 rounded-full overflow-hidden relative">
          <div className="absolute top-0 bottom-0 bg-primary-blue rounded-full w-[25%] animate-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
