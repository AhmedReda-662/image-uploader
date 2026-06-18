function Spinner() {
  return (
    <div className="h-full flex justify-center items-center px-4 bg-gray-100 dark:bg-black">
      <div className="py-8 px-20 bg-white dark:bg-gray-300 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] w-125">
        <h2 className="text-[17px] mb-5 tracking-wide text-center">
          <span className="font-semibold text-gray-400 dark:text-gray-500">Loading,</span>
          <span className="text-gray-200 dark:text-gray-500"> please wait..</span>
        </h2>
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-400 border-t-primary-blue rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
