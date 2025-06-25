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
  // Normalize Unicode/invisible spaces to regular space
  content = content.replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, ' ');
  for (const name of Object.keys(techMap).sort((a, b) => b.length - a.length)) {
    const regex = new RegExp(name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
    content = content.replace(regex, (match, offset) => {
      // Only replace if not already inside a Markdown link
      const before = content.lastIndexOf('[', offset);
      const after = content.indexOf('](', offset);
      if (before !== -1 && after !== -1 && before < offset && offset < after) {
        return match;
      }
      return `[${match}](${techMap[name]})`;
    });
  }
  return content;
}

function splitFrontmatter(content: string): { frontmatter: string; body: string } {
  if (content.startsWith('---')) {
    const end = content.indexOf('---', 3);
    if (end !== -1) {
      return {
        frontmatter: content.slice(0, end + 3),
        body: content.slice(end + 3)
      };
    }
  }
  return { frontmatter: '', body: content };
}

function main() {
  const contentDir = path.resolve(__dirname, '../content');
  const files = getAllProjectMdxFiles(contentDir);
  const techNames = Object.keys(techLinks).sort((a, b) => b.length - a.length);
  console.log('Tech names to match:', techNames);
  for (const file of files) {
    console.log('Scanning file:', file);
    const original = fs.readFileSync(file, 'utf8');
    const { frontmatter, body } = splitFrontmatter(original);
    const updatedBody = linkTechNames(body, techLinks);
    const updated = frontmatter + updatedBody;
    if (original !== updated) {
      fs.writeFileSync(file, updated, 'utf8');
      console.log(`Updated: ${file}`);
    }
  }
}

main();
