"use client";

import { NewsCard } from "@/components/NewsCard";
import newsClient from "@/utils/axios";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

export default function NewsPage({ category = "general" }) {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        const response = await newsClient.get("/news", {
          params: {
            category: category,
            country: "us",
          },
        });

        setNews(response.data.articles);
      };

      fetchData();
    } catch (error: any) {
      console.error("Fetch failed ", error.mesage);

      const errorMessage =
        error?.response?.data.messsage || "Fetch is failed to load articles ";
      const errorStatus = error?.response?.status || 401;

      return setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  if (isloading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gray-50">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 border-t-4 border-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-r-4 border-cyan-400 rounded-full animate-[spin_1.5s_linear_infinite]"></div>
          <div className="absolute inset-4 border-b-4 border-blue-300 rounded-full animate-[spin_2s_linear_infinite]"></div>
        </div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">
          Fetching {category} news...
        </p>
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
        {news.map((items: any) => (
          <NewsCard key={items.url} article={items} />
        ))}
      </div>
    </>
  );
}
