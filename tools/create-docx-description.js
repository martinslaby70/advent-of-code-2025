#!/usr/bin/env node

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} = require("docx");
const fs = require("fs");
const path = require("path");

/**
 * Configuration for DOCX generation
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
      foundFiles.push(matchingFile);
    }
  }

  return foundFiles;
}

/**
 * Create DOCX document for a specific day
 */
function createDayDocument(dayNumber, foundFiles) {
  const problemLink = `https://adventofcode.com/${CONFIG.year}/day/${dayNumber}`;

  const doc = new Document({
    sections: [
      {
        children: [
          // Title
          new Paragraph({
            text: `Advent of Code ${CONFIG.year} - Day ${dayNumber}`,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),

          // Problem Link
          new Paragraph({
            children: [
              new TextRun({
                text: "Problem Link: ",
                bold: true,
              }),
              new TextRun({
                text: problemLink,
                color: "0563C1",
              }),
            ],
          }),

          new Paragraph({ text: "" }),

          // Problem Description Section
          new Paragraph({
            text: "Problem Description",
            heading: HeadingLevel.HEADING_1,
          }),

          new Paragraph({
            text:
              `This solution implements the problem from Advent of Code ${CONFIG.year}, Day ${dayNumber}. ` +
              "The problem details and requirements can be found at the link above.",
          }),

          new Paragraph({ text: "" }),

          // Files Section
          new Paragraph({
            text: "Solution Files",
            heading: HeadingLevel.HEADING_1,
          }),

          new Paragraph({
            text: `The following solution files were created for this problem:`,
          }),

          ...foundFiles.map(
            (file) =>
              new Paragraph({
                text: `• ${file}`,
                bullet: {
                  level: 0,
                },
              })
          ),

          new Paragraph({ text: "" }),

          // Implementation Note
          new Paragraph({
            text: "Implementation Note",
            heading: HeadingLevel.HEADING_1,
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Important: ",
                bold: true,
              }),
              new TextRun({
                text:
                  "All code for the solution files listed above was created entirely without any AI assistance, " +
                  "LLM (Large Language Model) usage, or external help. The solutions were developed independently " +
                  "through manual problem analysis, algorithmic thinking, and personal coding skills.",
              }),
            ],
          }),

          new Paragraph({ text: "" }),

          // Technical Details
          new Paragraph({
            text: "Technical Details",
            heading: HeadingLevel.HEADING_1,
          }),

          new Paragraph({
            text: "The solution implementation:",
          }),

          new Paragraph({
            text: "• Uses JavaScript/TypeScript for implementation",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "• Processes input from a separate input file",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "• Follows clean code principles and best practices",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "• Implements efficient algorithms to solve the problem requirements",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({ text: "" }),

          // Additional Notes
          new Paragraph({
            text: "Additional Notes",
            heading: HeadingLevel.HEADING_1,
          }),

          new Paragraph({
            text:
              "For detailed problem description, examples, and input data, please refer to the " +
              "Advent of Code website using the link provided above.",
          }),
        ],
      },
    ],
  });

  return doc;
}

/**
 * Main function
 */
async function main() {
  console.log("Starting DOCX generation...");
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

  for (const dayDir of dayDirs) {
    const foundFiles = findMatchingFiles(dayDir.path);

    if (foundFiles.length === 0) {
      console.log(`Skipping Day ${dayDir.number}: No matching files found`);
      continue;
    }

    console.log(`Processing Day ${dayDir.number}...`);
    console.log(`  Found files: ${foundFiles.join(", ")}`);

    try {
      const doc = createDayDocument(dayDir.number, foundFiles);
      const buffer = await Packer.toBuffer(doc);

      const outputPath = path.join(
        dayDir.path,
        `day${String(dayDir.number).padStart(2, "0")}_description.docx`
      );
      fs.writeFileSync(outputPath, buffer);

      console.log(`  ✓ Created: ${outputPath}`);
    } catch (error) {
      console.error(
        `  ✗ Error creating DOCX for Day ${dayDir.number}:`,
        error.message
      );
    }

    console.log("");
  }

  console.log("DOCX generation completed!");
}

// Run the script
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
