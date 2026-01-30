import { describe, it, expect } from "vitest";
import { cn } from "../cn";

describe("cn", () => {
  it("should merge class names", () => {
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
  });

  it("should handle conditional classes", () => {
    expect(cn("base", true && "conditional", false && "not-included")).toBe(
      "base conditional"
    );
  });

  it("should deduplicate tailwind classes", () => {
    // Tailwind merge should keep the last one
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("should handle arrays of classes", () => {
    expect(cn(["text-sm", "font-bold"])).toBe("text-sm font-bold");
  });

  it("should handle objects with boolean values", () => {
    expect(cn({ "text-red-500": true, "bg-blue-500": false })).toBe(
      "text-red-500"
    );
  });

  it("should handle undefined and null", () => {
    expect(cn("base", undefined, null, "end")).toBe("base end");
  });

  it("should merge conflicting tailwind classes correctly", () => {
    // Latest wins
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });
});
