"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    "general",
    "business",
    "sports",
    "technology",
    "health",
    "science",
    "entertainment",
  ];

  return (
    <>
      <nav className="gap-4 bg-gray-800 shadow-md sticky z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex">
              <Link href="/">
                <h1 className="capitalize hover:text-yellow-500 text-gray-200 text-3xl">
                  WorldNews
                </h1>
              </Link>
            </div>

            <div className="hidden md:flex gap-6">
              {categories.map((cat) => (
                <Link
                  href={`/${cat}`}
                  key={cat}
                  className="capitalize hover:text-yellow-500 text-gray-200"
                >
                  {cat}
                </Link>
              ))}
            </div>

            {/* MOBILE BUTTON: Hamburger (Hidden on Desktop) */}

            <div className="md:hidden ">
              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU: (Dropdown) */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-700 pb-4 px-4 space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/${cat}`}
                onClick={() => setIsMenuOpen(false)} // Close menu when link is clicked
                className="block capitalize text-gray-300 hover:text-white py-2 text-base font-medium"
              >
                {cat}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
