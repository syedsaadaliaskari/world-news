"use client";

import { NewsCard } from "@/compoents/NewsCard";
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
        const response = await newsClient.get("/top-headlines", {
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
    return <div className="p-10 text-center">Loading news..</div>;
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
