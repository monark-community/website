import fs from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export function createOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function translateTextGeneric({
  openai,
  text,
  systemPrompt,
}: {
  openai: OpenAI;
  text: string;
  locale: string;
  systemPrompt: string;
}): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
    });
    return completion.choices[0]?.message?.content?.trim() || "";
  } catch (error) {
    console.error("Error during translation:", error);
    throw new Error("Translation failed");
  }
}

export async function processDirectoryGeneric({
  sourceDir,
  destinationDir,
  locale,
  translateFn,
}: {
  sourceDir: string;
  destinationDir: string;
  locale: string;
  translateFn: (text: string, locale: string) => Promise<string>;
}): Promise<void> {
  console.log(`Processing directory: ${sourceDir}`);
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const destinationPath = path.join(destinationDir, entry.name);
    if (entry.isDirectory()) {
      console.log(`Entering subdirectory: ${entry.name}`);
      fs.mkdirSync(destinationPath, { recursive: true });
      await processDirectoryGeneric({
        sourceDir: sourcePath,
        destinationDir: destinationPath,
        locale,
        translateFn,
      });
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      console.log(`Translating file: ${entry.name}`);
      const content = fs.readFileSync(sourcePath, "utf-8");
      const translatedContent = await translateFn(content, locale);
      fs.writeFileSync(destinationPath, translatedContent, "utf-8");
      console.log(`Translation completed for file: ${entry.name}`);
    }
  }
}
