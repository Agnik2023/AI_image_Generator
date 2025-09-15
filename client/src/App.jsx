
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';

import { Home, CreatePost } from './page';
import ThemeToggle from './components/ThemeToggle'; // ✅ add your toggle

import { Home, CreatePost, ImageToPrompt } from './page';


const App = () => (
  <BrowserRouter>
    <header
      className="w-full flex justify-between items-center
                 bg-white dark:bg-gray-900
                 text-gray-900 dark:text-gray-100
                 border-b border-gray-200 dark:border-gray-800
                 sm:px-8 px-4 py-4
                 transition-colors duration-300"
    >
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>

      <div className="flex items-center gap-4">

        <Link
          to="/create-post"
          className="font-inter font-medium
                     bg-indigo-600 hover:bg-indigo-700
                     text-white px-4 py-2 rounded-md
                     transition-colors duration-300"
        >
          Create
        </Link>
        <ThemeToggle /> {/* ✅ toggle here */}

        <Link to="/image-to-prompt" className="font-inter font-medium bg-[#10b981] text-white px-4 py-2 rounded-md hover:bg-[#059669]">
          Image to Prompt
        </Link>
        <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-[#5a5fd8]">
          Create
        </Link>

      </div>
    </header>

    <main
      className="sm:p-8 px-4 py-8 w-full
                 bg-[#f9fafe] dark:bg-gray-950
                 text-gray-900 dark:text-gray-100
                 min-h-[calc(100vh-73px)]
                 transition-colors duration-300"
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/image-to-prompt" element={<ImageToPrompt />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
