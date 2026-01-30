import { describe, it, expect } from "vitest";
import { slugify } from "../slug";

describe("slugify", () => {
  it("should convert text to lowercase", () => {
    expect(slugify("UPPERCASE TEXT")).toBe("uppercase-text");
  });

  it("should replace spaces with hyphens", () => {
    expect(slugify("hello world")).toBe("hello-world");
  });

  it("should remove special characters", () => {
    expect(slugify("hello@world#test")).toBe("helloworldtest");
  });

  it("should handle multiple consecutive spaces", () => {
    expect(slugify("hello    world")).toBe("hello-world");
  });

  it("should remove dots", () => {
    expect(slugify("hello.world")).toBe("helloworld");
  });

  it("should handle accented characters", () => {
    expect(slugify("café résumé")).toBe("cafe-resume");
  });

  it("should trim whitespace", () => {
    expect(slugify("  hello world  ")).toBe("hello-world");
  });

  it("should collapse multiple hyphens", () => {
    expect(slugify("hello---world")).toBe("hello-world");
  });

  it("should handle empty string", () => {
    expect(slugify("")).toBe("");
  });
});
