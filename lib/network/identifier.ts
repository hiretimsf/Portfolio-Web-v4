/**
 * Extracts the best possible identifier (IP) from request headers
 */
export function getIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  return (
    cfConnectingIp || realIp || forwarded?.split(",")[0]?.trim() || "anonymous"
  );
}
