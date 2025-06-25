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
