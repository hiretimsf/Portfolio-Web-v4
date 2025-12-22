#!/usr/bin/env tsx
/**
 * Build-time SEO validation script
 * Validates SEO configuration to ensure all required fields are present
 * Run this during CI/CD or before deployment
 */

import { AUTHOR, FAVICONS, HEAD, KEYWORDS, OPEN_GRAPH } from "@/config/seo";

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

function validateSEOConfig(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate HEAD configuration
  if (!HEAD || HEAD.length === 0) {
    errors.push("HEAD configuration is missing or empty");
  }

  // Validate KEYWORDS
  if (!KEYWORDS || KEYWORDS.length === 0) {
    warnings.push("No keywords defined for SEO");
  }

  // Validate AUTHOR information
  if (!AUTHOR?.name) {
    errors.push("Author information is missing");
  }

  // Validate FAVICONS
  if (!FAVICONS?.icon || FAVICONS.icon.length === 0) {
    warnings.push("No favicons configured");
  }

  // Validate OpenGraph configuration
  if (!OPEN_GRAPH) {
    errors.push("OpenGraph configuration is missing");
  } else {
    if (!OPEN_GRAPH.image) {
      warnings.push("OpenGraph image is missing");
    }
    if (!OPEN_GRAPH.twitterImage) {
      warnings.push("OpenGraph Twitter image is missing");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// Main execution
const result = validateSEOConfig();

console.log("\n🔍 SEO Configuration Validation\n");

if (result.warnings.length > 0) {
  console.log("⚠️  Warnings:");
  for (const warning of result.warnings) {
    console.log(`   - ${warning}`);
  }
  console.log("");
}

if (result.errors.length > 0) {
  console.log("❌ Errors:");
  for (const error of result.errors) {
    console.log(`   - ${error}`);
  }
  console.log("");
  console.log("❌ SEO validation failed!\n");
  process.exit(1);
}

console.log("✅ SEO validation passed!\n");
process.exit(0);
