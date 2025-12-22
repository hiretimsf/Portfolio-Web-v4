import { searchPosts } from "@/actions/search";
import { getIdentifier, rateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { type NextRequest, NextResponse } from "next/server";

// Rate limiter: 20 requests per minute per IP
const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function GET(request: NextRequest) {
  try {
    // Rate limiting check
    const identifier = getIdentifier(request);
    try {
      await limiter.check(20, identifier); // 20 requests per minute
    } catch {
      logger.warn("Rate limit exceeded", {
        context: "search-api",
        meta: { ip: identifier },
      });
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 },
      );
    }

    const results = await searchPosts(query);
    return NextResponse.json(results);
  } catch (error) {
    logger.error("Search error", error, { context: "search-api" });
    return NextResponse.json(
      { error: "An error occurred while searching" },
      { status: 500 },
    );
  }
}
