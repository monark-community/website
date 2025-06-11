import fs from "fs";
import path from "path";
import { locales } from "@/i18n.config";
import { createOpenAIClient, translateTextGeneric, processDirectoryGeneric } from "../utils/translate.utils";

const openai = createOpenAIClient();

const systemPrompt = (locale: string) => `You are a translator. Translate the following MDX content from English to ${locale}.
Do not translate code blocks, JSX elements, or Markdown syntax like #, **, \` \`, etc.
Only translate human-readable text, preserving all formatting. Do not translate the metadata except for the title and description.
Return only the translated MDX content.\n`;

const translateText = async (text: string, locale: string) =>
  translateTextGeneric({
    openai,
    text,
    locale,
    systemPrompt: systemPrompt(locale),
  });

const baseDir = path.join(__dirname, "../content/en/project");

// Updated processDirectory to handle asynchronous operations
const processDirectory = async (
  sourceDir: string,
  destinationDir: string,
  locale: string
): Promise<void> =>
  processDirectoryGeneric({
    sourceDir,
    destinationDir,
    locale,
    translateFn: translateText,
  });

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
