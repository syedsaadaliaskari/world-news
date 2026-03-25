"use client";

import { NewsCard } from "@/components/NewsCard";
import newsClient from "@/utils/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [news, setNews] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [country, setCountry] = useState("us");

  const params = useParams();
  const category = params.category as string;

  const countries = [
    { code: "ae", name: "United Arab Emirates" },
    { code: "ar", name: "Argentina" },
    { code: "at", name: "Austria" },
    { code: "au", name: "Australia" },
    { code: "be", name: "Belgium" },
    { code: "bg", name: "Bulgaria" },
    { code: "br", name: "Brazil" },
    { code: "ca", name: "Canada" },
    { code: "ch", name: "Switzerland" },
    { code: "cn", name: "China" },
    { code: "co", name: "Colombia" },
    { code: "cu", name: "Cuba" },
    { code: "cz", name: "Czech Republic" },
    { code: "de", name: "Germany" },
    { code: "eg", name: "Egypt" },
    { code: "fr", name: "France" },
    { code: "gb", name: "United Kingdom" },
    { code: "gr", name: "Greece" },
    { code: "hk", name: "Hong Kong" },
    { code: "hu", name: "Hungary" },
    { code: "id", name: "Indonesia" },
    { code: "ie", name: "Ireland" },
    { code: "in", name: "India" },
    { code: "it", name: "Italy" },
    { code: "jp", name: "Japan" },
    { code: "kr", name: "South Korea" },
    { code: "lt", name: "Lithuania" },
    { code: "lv", name: "Latvia" },
    { code: "ma", name: "Morocco" },
    { code: "mx", name: "Mexico" },
    { code: "my", name: "Malaysia" },
    { code: "ng", name: "Nigeria" },
    { code: "nl", name: "Netherlands" },
    { code: "no", name: "Norway" },
    { code: "nz", name: "New Zealand" },
    { code: "ph", name: "Philippines" },
    { code: "pl", name: "Poland" },
    { code: "pt", name: "Portugal" },
    { code: "ro", name: "Romania" },
    { code: "rs", name: "Serbia" },
    { code: "ru", name: "Russia" },
    { code: "sa", name: "Saudi Arabia" },
    { code: "se", name: "Sweden" },
    { code: "sg", name: "Singapore" },
    { code: "si", name: "Slovenia" },
    { code: "sk", name: "Slovakia" },
    { code: "th", name: "Thailand" },
    { code: "tr", name: "Turkey" },
    { code: "tw", name: "Taiwan" },
    { code: "ua", name: "Ukraine" },
    { code: "us", name: "United States" },
    { code: "ve", name: "Venezuela" },
    { code: "za", name: "South Africa" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await newsClient.get("/news", {
          params: {
            country: country,
            category: category,
          },
        });
        setNews(response.data.articles || []);
      } catch (error: any) {
        console.error("Fetch failed", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (category) {
      fetchData();
    }
  }, [category, country]);

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

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Page Header */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-serif font-bold capitalize mb-2">
          {category} News
        </h1>
        <p className="text-gray-500 italic">
          Latest updates from around the world
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-gray-100 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">
            Presenting news from
          </span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-white border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="h-6 w-1 bg-gray-300 mx-2 hidden md:block"></div>

        <div className="text-sm">
          Category:{" "}
          <span className="font-bold capitalize text-blue-600">{category}</span>
        </div>

        <div className="ml-auto text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          {news.length} results found
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.length > 0 ? (
          news.map((item: any) => <NewsCard key={item.url} article={item} />)
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400">
            No articles found for this selection.
          </div>
        )}
      </div>
    </div>
  );
}
