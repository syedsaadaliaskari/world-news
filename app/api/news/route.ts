import { NextRequest, NextResponse } from "next/server";
import newsClient from "@/utils/axios";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "general";
    const country = searchParams.get("country") || "us";

    const API_KEY = process.env.API_KEY;

    const data = await newsClient.get("/top-headlines", {
      params: {
        category: category,
        country: country,
        apiKey: API_KEY,
      },
    });

    return NextResponse.json(
      {
        data: data.data,
      },
      {
        status: data.status || 200,
      },
    );
  } catch (err: any) {
    console.error("Api results failed", err.message);

    const statusMessage = err.response?.status || 500;
    const errorMessage = err.response?.data?.message || "Failed to fetch news";

    return NextResponse.json(
      {
        error: errorMessage,
      },
      {
        status: statusMessage,
      },
    );
  }
}
