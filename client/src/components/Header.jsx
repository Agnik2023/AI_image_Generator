// import ThemeToggle from "./ThemeToggle";

// function Header() {
//   return (
//     <header className="flex justify-between p-4 bg-white dark:bg-gray-900 dark:text-gray-100">
//       <h1 className="text-xl font-bold">AI Image Generator</h1>
//       <ThemeToggle />
//     </header>
//   );
// }

// export default Header;
import ThemeToggle from "./ThemeToggle"; // adjust path if your header lives elsewhere

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800
                       bg-white dark:bg-gray-900
                       text-gray-900 dark:text-gray-100
                       transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* your logo */}
          <span className="font-semibold">AI Image Generator</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
