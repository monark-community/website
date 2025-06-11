import fs from "fs";
import path from "path";
import { locales } from "@/i18n.config";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const baseDir = path.join(__dirname, "../content/en/project");

// Updated translateText to handle asynchronous translation
export const translateText = async (
  text: string,
  locale: string
): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a translator. Translate the following MDX content from English to ${locale}.
Do not translate code blocks, JSX elements, or Markdown syntax like #, **, \` \`, etc.
Only translate human-readable text, preserving all formatting. Do not translate the metadata except for the title and description.
Return only the translated MDX content.\n`,
        },
        { role: "user", content: text },
      ],
    });

    return completion.choices[0]?.message?.content?.trim() || "";
  } catch (error) {
    console.error("Error during translation:", error);
    throw new Error("Translation failed");
  }
};

// Updated processDirectory to handle asynchronous operations
const processDirectory = async (
  sourceDir: string,
  destinationDir: string,
  locale: string
): Promise<void> => {
  console.log(`Processing directory: ${sourceDir}`);
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const destinationPath = path.join(destinationDir, entry.name);

    if (entry.isDirectory()) {
      console.log(`Entering subdirectory: ${entry.name}`);
      fs.mkdirSync(destinationPath, { recursive: true });
      await processDirectory(sourcePath, destinationPath, locale);
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      console.log(`Translating file: ${entry.name}`);
      const content = fs.readFileSync(sourcePath, "utf-8");
      const translatedContent = await translateText(content, locale); // Translate content
      console.log(
        `Translation request for file: ${entry.name}, locale: ${locale}`
      );
      console.log(`Original text: ${content}`);
      console.log(`Translated text: ${translatedContent}`);
      fs.writeFileSync(destinationPath, translatedContent, "utf-8");
      console.log(`Translation completed for file: ${entry.name}`);
    }
  }
};

// Updated locales.forEach to handle async/await
(async () => {
  for (const locale of locales) {
    if (locale === "en") continue; // Skip English as it's the source language

    console.log(`Starting translation for locale: ${locale}`);
    const targetDir = path.join(
      __dirname,
      `../content/${locale}/project`
    );
    fs.mkdirSync(targetDir, { recursive: true });

    await processDirectory(baseDir, targetDir, locale);
  }

  console.log("Translation completed for all locales.");
})();
