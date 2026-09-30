# Scripts Documentation

This project provides several scripts to automate and accelerate development tasks. These scripts are defined in `package.json` and implemented in the `scripts/` directory.

## Available Scripts

### Project Scripts

- **generate:project-index**  
  Runs: `bun scripts/project/project-index.script.ts`  
  Generates or updates the project index. Run this after adding or modifying project content to keep the project listing up-to-date.

- **generate:project-tech-links**  
  Runs: `bun scripts/link-tech-names.ts`  
  Links technology names to their URLs. Use this when updating technology references in a project.

- **generate:project-translations**  
  Runs: `bun scripts/project/project-translate.script.ts`  
  Generates or updates translations for project-related content. Run this after editing **english** project description or adding new projects to populate other supported languages. Note that translations are powered by AI and may not be completely accurate, always double-check metadata at the very least.

### News Scripts

- **generate:news-index**  
  Runs: `bun scripts/news/news-index.script.ts`  
  Generates or updates the news index. Use this after adding or editing news articles to keep the news listing current.

- **generate:news-translations**  
  Runs: `bun scripts/news/news-translate.script.ts`  
  Generates or updates translations for news content. Run this after making changes to news articles in multiple languages.

### Brand Scripts

- **generate:brand-kit**  
  Runs: `bun scripts/brand/brand-kit.script.ts`  
  Rebuilds the downloads of the `/brand` page under `public/brand/`: SVG copies of the logos in `public/vectors/brand/` (renamed by the background they are for), transparent PNGs at 512, 1024 and 2048px (rendered with sharp), the "Built with Monark" credit badges, and `monark-brand-kit.zip` with a README.txt of usage rules and colours. Pass `--tokens <dir>` (for example `--tokens ../brand-2026/tokens`) to refresh the design token files from the Monark Brand 2026 kit; without it the committed copies in `public/brand/tokens/` are kept. File names, PNG sizes and colours live in `components/pages/brand/brand-assets.ts`, shared with the page. The zip never contains font files. Run it after changing a logo, a colour or the page's English copy, and commit the output.

## Usage

Run scripts with:

```sh
pnpm run <script-name>
# or
npm run <script-name>
```

Example:
```sh
pnpm run generate:project-index
```

## Benefits

- **Automation**: Reduces manual work and errors by automating repetitive tasks.
- **Consistency**: Keeps indexes and translations up-to-date and consistent.
- **Localization**: Simplifies maintaining multilingual content.
- **Efficiency**: Lets developers focus on core features instead of manual content management.

For more details, see the corresponding files in the `scripts/` directory.
