import { describe, it, expect } from "vitest";
import { truncate, truncateTitle, truncateDescription } from "../truncate";

describe("truncate", () => {
  it("should return text unchanged if within max length", () => {
    expect(truncate("Short text", 20)).toBe("Short text");
  });

  it("should truncate text longer than max length", () => {
    const longText = "This is a very long text that should be truncated";
    expect(truncate(longText, 20)).toBe("This is a very lo...");
  });

  it("should use default max length of 160", () => {
    const text = "a".repeat(200);
    const result = truncate(text);
    expect(result.length).toBe(160);
    expect(result.endsWith("...")).toBe(true);
  });

  it("should handle edge case of empty string", () => {
    expect(truncate("", 10)).toBe("");
  });

  it("should handle exact length match", () => {
    const text = "Exactly twenty chars";
    expect(truncate(text, 20)).toBe(text);
  });
});

describe("truncateTitle", () => {
  it("should truncate titles to 60 chars by default", () => {
    const longTitle = "a".repeat(100);
    const result = truncateTitle(longTitle);
    expect(result.length).toBe(60);
    expect(result.endsWith("...")).toBe(true);
  });

  it("should accept custom max length", () => {
    const title = "This is a title";
    expect(truncateTitle(title, 10)).toBe("This is...");
  });
});

describe("truncateDescription", () => {
  it("should truncate descriptions to 160 chars by default", () => {
    const longDesc = "a".repeat(200);
    const result = truncateDescription(longDesc);
    expect(result.length).toBe(160);
    expect(result.endsWith("...")).toBe(true);
  });

  it("should accept custom max length", () => {
    const desc = "This is a description";
    expect(truncateDescription(desc, 10)).toBe("This is...");
  });
});
