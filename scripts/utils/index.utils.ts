import fs from "fs";
import crypto from "crypto";

export function getMetadataFromFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  // Updated regex to match export const metadata = { ... };
  const metadataMatch = fileContent.match(/export const metadata\s*=\s*{([\s\S]*?)};/);
  if (metadataMatch) {
    return eval('({' + metadataMatch[1] + '})'); // Parse the metadata object
  }
  return null;
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
