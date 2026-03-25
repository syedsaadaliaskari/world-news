"use client";

import newsClient from "@/utils/axios";
import { useEffect, useState } from "react";

export function NewsCard({ article }: any) {
  return (
    <>
      <div className="flex flex-col rounded-xl shadow-sm hover:shadow-md h-full overflow-hidden bg-white">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />

        <div className="flex flex-col p-4">
          <h2 className="font-bold text-lg line-clamp-2 mb-2 text-gray-900">
            {article.title}
          </h2>

          <p className="text-gray-900 text-sm line-clamp-3 mb-4 ">
            {article.description || "No description availble for this article."}
          </p>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto bg-yellow-600 text-black font-semibold text-sm hover:underline rounded w-40 text-center h-10 m-auto py-3"
          >
            Read Full Article →
          </a>
        </div>
      </div>
    </>
  );
}
