"use client";

import { NewsCard } from "@/components/NewsCard";
import newsClient from "@/utils/axios";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [news, setNews] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const params = useParams();
  const category = params.category as string;

  useEffect(() => {
    const fetchCategoryData = async () => {
      setIsLoading(true);
      try {
        const response = await newsClient.get("/top-headlines", {
          params: {
            category: category,
          },
        });
        setNews(response.data.articles);
      } catch (error: any) {
        // Fix typo: .message (not .mesage)
        console.error("Fetch category failed", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (category) {
      fetchCategoryData();
    }
  }, [category]);

  if (isloading)
    return (
      <div className="animate-spin">
        <Loader2 />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold capitalize mb-6 border-b pb-2">
        {category} Headlines
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item: any) => (
          <NewsCard key={item.url} article={item} />
        ))}
      </div>
    </div>
  );
}
