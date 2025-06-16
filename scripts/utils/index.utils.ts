import fs from "fs";
import crypto from "crypto";
import matter from "gray-matter";

export function getMetadataFromFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  // Use gray-matter to parse frontmatter
  const { data } = matter(fileContent);
  return data || null;
}

export function generateHash(metadata: object): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(metadata))
    .digest("hex");
}

export function getContentSubdirectories(contentDir: string): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}
