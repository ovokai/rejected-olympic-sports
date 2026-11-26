// Rejected Olympic Sports — one-line entry writer.
// The whole entry is a single funny line naming a sport the Olympics
// turned down; this program validates it and writes it to the output
// file the grader reads.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Competitive parallel parking: rejected after the gold-medal final " +
  "lasted six hours, both drivers still circling the block insisting " +
  "they could find a bigger space.";

const MAX_CHARS = 200;

function validate(line: string): string {
  const text = line.trim();
  if (text.length === 0) {
    throw new Error("entry is empty");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars, over the ${MAX_CHARS} limit`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  return text;
}

function writeEntry(text: string): string {
  const primary = "/output/entry.txt";
  try {
    writeFileSync(primary, text, "utf8");
    return primary;
  } catch {
    const fallbackDir = join(process.cwd(), "output");
    mkdirSync(fallbackDir, { recursive: true });
    const fallback = join(fallbackDir, "entry.txt");
    writeFileSync(fallback, text, "utf8");
    return fallback;
  }
}

function describe(text: string): string {
  const headroom = MAX_CHARS - text.length;
  return `${text.length}/${MAX_CHARS} chars (${headroom} to spare)`;
}

function main(): void {
  const text = validate(ENTRY);
  const path = writeEntry(text);
  console.log(`entry: ${describe(text)}`);
  console.log(`wrote to ${path}`);
  console.log(text);
}

main();
