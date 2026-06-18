import useTheme from "../Hooks/useTheme";

function NavBar() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="p-4 border-b border-gray dark:border-gray-300 bg-white dark:bg-gray-300">
      <nav className="flex justify-between items-center mx-8">
        <div className="logo">
            <img src="/logo.svg" alt="Logo" className="dark:invert" />
        </div>
        <div>
          <button
            className="flex justify-center items-center p-2 border border-gray dark:border-gray-200 rounded-lg cursor-pointer bg-white dark:bg-gray-400"
            onClick={() => setTheme((e) => (e === "light" ? "dark" : "light"))}
          >
            <img
              src={theme === "light" ? "/Moon_fill.svg" : "/Sun_fill.svg"}
              alt="Logo"
            />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
