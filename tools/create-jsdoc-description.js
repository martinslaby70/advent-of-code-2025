#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

/**
 * Configuration for JSDoc generation
 */
const CONFIG = {
  year: 2025,
  filePatterns: ["part1.js", "part1.ts", "part2.js", "part2.ts"],
  daysDirectory: path.join(__dirname, "..", "days"),
};

/**
 * Get all day directories
 */
function getDayDirectories() {
  const daysDir = CONFIG.daysDirectory;
  if (!fs.existsSync(daysDir)) {
    console.error(`Days directory not found: ${daysDir}`);
    return [];
  }

  const entries = fs.readdirSync(daysDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && /^\d+$/.test(entry.name))
    .map((entry) => ({
      number: parseInt(entry.name, 10),
      path: path.join(daysDir, entry.name),
    }))
    .sort((a, b) => a.number - b.number);
}

/**
 * Check if files matching patterns exist in a directory
 */
function findMatchingFiles(dayPath) {
  const files = fs.readdirSync(dayPath);
  const foundFiles = [];

  for (const pattern of CONFIG.filePatterns) {
    const matchingFile = files.find((file) => file === pattern);
    if (matchingFile) {
      foundFiles.push({
        name: matchingFile,
        path: path.join(dayPath, matchingFile),
      });
    }
  }

  return foundFiles;
}

/**
 * Check if file already has JSDoc comment at the top
 */
function hasJSDoc(content) {
  return content.trim().startsWith("/**");
}

/**
 * Remove existing JSDoc comment from file content
 */
function removeJSDoc(content) {
  const trimmed = content.trim();

  if (!trimmed.startsWith("/**")) {
    return content;
  }

  // Find the end of the JSDoc block (closing */)
  const endIndex = trimmed.indexOf("*/");
  if (endIndex === -1) {
    return content; // Malformed JSDoc, return as-is
  }

  // Get content after JSDoc, removing leading whitespace/newlines
  const afterJSDoc = trimmed.substring(endIndex + 2).trimStart();

  // If there's a newline after JSDoc, remove it
  return afterJSDoc.startsWith("\n") ? afterJSDoc.substring(1) : afterJSDoc;
}

/**
 * Generate JSDoc comment for a solution file
 */
function generateJSDoc(dayNumber, fileName) {
  const problemLink = `https://adventofcode.com/${CONFIG.year}/day/${dayNumber}`;
  const partNumber = fileName.includes("part1") ? "1" : "2";

  return `/**
 * Advent of Code ${CONFIG.year}
 *
 * @description 
 * Solution for Advent of Code ${CONFIG.year}, Day ${dayNumber}, Part ${partNumber}.
 * Problem details and requirements can be found at: ${problemLink}
 *
 * @note
 * This code was created entirely without any AI usage, outside help or any coding assistant. 
 * The solution was developed independently through manual problem analysis, algorithmic thinking,
 * and personal coding skills.
 */
`;
}

/**
 * Add JSDoc to a file if it doesn't already have one
 */
function addJSDocToFile(filePath, dayNumber, fileName, override = false) {
  let content = fs.readFileSync(filePath, "utf8");
  const hadJSDoc = hasJSDoc(content);

  // Skip if file already has JSDoc and override is not enabled
  if (hadJSDoc && !override) {
    return { skipped: true, reason: "JSDoc already exists" };
  }

  // Remove existing JSDoc if override is enabled
  if (hadJSDoc && override) {
    content = removeJSDoc(content);
  }

  const jsdoc = generateJSDoc(dayNumber, fileName);
  // Ensure there's proper spacing between JSDoc and content
  const trimmedContent = content.trimStart();
  const newContent = jsdoc + (trimmedContent ? "\n" + trimmedContent : "");

  fs.writeFileSync(filePath, newContent, "utf8");
  return { skipped: false, overridden: hadJSDoc && override };
}

/**
 * Parse command-line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  return {
    override:
      args.includes("--override") ||
      args.includes("--force") ||
      args.includes("-o"),
  };
}

/**
 * Main function
 */
function main() {
  const args = parseArgs();
  const overrideMode = args.override;

  console.log("Starting JSDoc generation...");
  if (overrideMode) {
    console.log("⚠️  Override mode enabled - existing JSDoc will be replaced");
  }
  console.log(`Year: ${CONFIG.year}`);
  console.log(`File patterns: ${CONFIG.filePatterns.join(", ")}`);
  console.log("");

  const dayDirs = getDayDirectories();

  if (dayDirs.length === 0) {
    console.error("No day directories found.");
    process.exit(1);
  }

  console.log(`Found ${dayDirs.length} day directory(ies)`);
  console.log("");

  let totalProcessed = 0;
  let totalSkipped = 0;
  let totalAdded = 0;

  for (const dayDir of dayDirs) {
    const foundFiles = findMatchingFiles(dayDir.path);

    if (foundFiles.length === 0) {
      console.log(`Skipping Day ${dayDir.number}: No matching files found`);
      continue;
    }

    console.log(`Processing Day ${dayDir.number}...`);

    for (const file of foundFiles) {
      try {
        const result = addJSDocToFile(
          file.path,
          dayDir.number,
          file.name,
          overrideMode
        );
        totalProcessed++;

        if (result.skipped) {
          console.log(`  ⊘ Skipped: ${file.name} (${result.reason})`);
          totalSkipped++;
        } else {
          if (result.overridden) {
            console.log(`  ↻ Overridden JSDoc in: ${file.name}`);
          } else {
            console.log(`  ✓ Added JSDoc to: ${file.name}`);
          }
          totalAdded++;
        }
      } catch (error) {
        console.error(`  ✗ Error processing ${file.name}:`, error.message);
      }
    }

    console.log("");
  }

  console.log("JSDoc generation completed!");
  console.log(`  Total processed: ${totalProcessed}`);
  console.log(`  Added: ${totalAdded}`);
  console.log(`  Skipped: ${totalSkipped}`);
}

// Run the script
main();
