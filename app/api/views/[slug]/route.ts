import { incrementView } from "@/features/blog/lib/stats.server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  // Get IP address
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? 
             request.headers.get("x-real-ip") ?? 
             "127.0.0.1";

  try {
    const stats = await incrementView(slug, ip);
    return NextResponse.json({ views: stats.views });
  } catch (error) {
    console.error("Failed to increment view:", error);
    return NextResponse.json(
      { error: "Failed to increment view" },
      { status: 500 }
    );
  }
}
