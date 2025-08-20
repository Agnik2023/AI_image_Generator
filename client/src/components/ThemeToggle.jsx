// import { useEffect, useState } from "react";
// import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

// const ThemeToggle = () => {
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") || "light"
//   );

//   useEffect(() => {
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <button
//       onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//       className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
//     >
//       {theme === "light" ? (
//         <MoonIcon className="w-6 h-6 text-gray-800" />
//       ) : (
//         <SunIcon className="w-6 h-6 text-yellow-400" />
//       )}
//     </button>
//   );
// };

// export default ThemeToggle;
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="inline-flex items-center gap-2 rounded-full px-3 py-2
                 bg-gray-200 dark:bg-gray-700
                 text-gray-800 dark:text-gray-100
                 transition-colors duration-300"
      aria-label="Toggle theme"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className="text-sm font-medium">{theme === "light" ? "Light" : "Dark"}</span>
      <span>{theme === "light" ? "🌙" : "☀️"}</span>
    </button>
  );
}
