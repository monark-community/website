import fs from 'fs';
import path from 'path';
import techLinks from './data/tech-urls';

// Helper to get all .mdx files in content/LOCALE/project/PROJECT_ID/page.mdx
function getAllProjectMdxFiles(contentDir: string): string[] {
  const locales = fs.readdirSync(contentDir).filter(f => fs.statSync(path.join(contentDir, f)).isDirectory());
  const files: string[] = [];
  for (const locale of locales) {
    const projectsDir = path.join(contentDir, locale, 'project');
    if (!fs.existsSync(projectsDir)) continue;
    const projectIds = fs.readdirSync(projectsDir).filter(f => fs.statSync(path.join(projectsDir, f)).isDirectory());
    for (const projectId of projectIds) {
      const mdxPath = path.join(projectsDir, projectId, 'page.mdx');
      if (fs.existsSync(mdxPath)) files.push(mdxPath);
    }
  }
  return files;
}

// Replace tech names with Markdown links
function linkTechNames(content: string, techMap: Record<string, string>): string {
  // Sort keys by length descending to avoid partial matches
  const techNames = Object.keys(techMap).sort((a, b) => b.length - a.length);
  for (const name of techNames) {
    // Regex to match tech name not already inside a Markdown link
    // Negative lookbehind for [ and ( to avoid [Name](...) and [Name]: ...
    // Negative lookahead for ]( to avoid [Name](...)
    // Also avoid autolinks <Name>
    const regex = new RegExp(
      `(?<!\\[|\\(|\\<)\\b${name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b(?!\\]|\\(|\\>)`,
      'g'
    );
    // Replace only if not already linked
    content = content.replace(regex, (match, offset) => {
      // Check if inside a Markdown link: [text](url)
      // Find the nearest [ before and ]( after
      const before = content.lastIndexOf('[', offset);
      const after = content.indexOf('](', offset);
      if (before !== -1 && after !== -1 && before < offset && offset < after) {
        return match; // Already linked
      }
      return `[${match}](${techMap[name]})`;
    });
  }
  return content;
}

function main() {
  const contentDir = path.resolve(__dirname, '../content');
  const files = getAllProjectMdxFiles(contentDir);
  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    const updated = linkTechNames(original, techLinks);
    if (original !== updated) {
      fs.writeFileSync(file, updated, 'utf8');
      console.log(`Updated: ${file}`);
    }
  }
}

main();
