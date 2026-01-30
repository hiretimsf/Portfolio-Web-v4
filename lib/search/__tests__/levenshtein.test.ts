import { describe, it, expect } from "vitest";
import { levenshtein } from "../levenshtein";

describe("levenshtein", () => {
  it("should return 0 for identical strings", () => {
    expect(levenshtein("hello", "hello")).toBe(0);
  });

  it("should return length of second string if first is empty", () => {
    expect(levenshtein("", "hello")).toBe(5);
  });

  it("should return length of first string if second is empty", () => {
    expect(levenshtein("hello", "")).toBe(5);
  });

  it("should calculate distance for single character difference", () => {
    expect(levenshtein("hello", "hallo")).toBe(1);
  });

  it("should calculate distance for insertion", () => {
    expect(levenshtein("cat", "cats")).toBe(1);
  });

  it("should calculate distance for deletion", () => {
    expect(levenshtein("cats", "cat")).toBe(1);
  });

  it("should calculate distance for substitution", () => {
    expect(levenshtein("cat", "bat")).toBe(1);
  });

  it("should calculate distance for multiple operations", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
  });

  it("should be case-sensitive", () => {
    expect(levenshtein("Hello", "hello")).toBe(1);
  });

  it("should handle completely different strings", () => {
    expect(levenshtein("abc", "xyz")).toBe(3);
  });
});
