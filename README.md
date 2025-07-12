# T3 Stack / Next.js / React File Generator

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/imgildev.vscode-nextjs-generator?style=for-the-badge&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nextjs-generator)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/imgildev.vscode-nextjs-generator?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nextjs-generator)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/imgildev.vscode-nextjs-generator?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nextjs-generator)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/imgildev.vscode-nextjs-generator?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nextjs-generator&ssr=false#review-details)
[![GitHub Repo stars](https://img.shields.io/github/stars/ManuelGil/vscode-nextjs-generator?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-nextjs-generator)
[![GitHub license](https://img.shields.io/github/license/ManuelGil/vscode-nextjs-generator?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-nextjs-generator/blob/main/LICENSE)

<p align="center">
<a href="https://www.producthunt.com/posts/t3-stack-next-and-react-file-generator?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-t3&#0045;stack&#0045;next&#0045;and&#0045;react&#0045;file&#0045;generator" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge?post_id=431311&theme=light&period=daily" alt="T3&#0032;Stack&#0044;&#0032;Next&#0032;and&#0032;React&#0032;File&#0032;Generator - Effortless&#0032;file&#0032;generation | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</p>

> A Visual Studio Code extension to automate file and boilerplate generation for T3 Stack, Next.js, and React projects.

## Introduction

Modern fullstack applications often require repetitive setup of folders, files, and boilerplate code. The T3 Stack / Next.js / React File Generator simplifies these tasks by integrating common generation commands directly into your editor. This extension is compatible with all VSCode-based editors, including VSCode, VSCodium, WindSurf, Cursor, and others, and supports Next.js (v13 & v14), React, Prisma, Drizzle, Tailwind CSS, i18next, Zod, and other popular frameworks.

![demo](https://raw.githubusercontent.com/ManuelGil/vscode-nextjs-generator/main/docs/images/demo.gif)

Ready to transcend your development experience?

Boost your efficiency with this VSCode extension, designed to streamline file generation for your T3 Stack project. Whether crafting individual components or kickstarting a new venture, the extension simplifies tasks through intuitive commands. Additionally, initiate your NextJS server effortlessly, enabling swift previews of your application.

![preview](https://raw.githubusercontent.com/ManuelGil/vscode-nextjs-generator/main/docs/images/preview.png)

## Index

- [T3 Stack / Next.js / React File Generator](#t3-stack--nextjs--react-file-generator)
  - [Introduction](#introduction)
  - [Index](#index)
  - [Key Features](#key-features)
  - [Getting Started](#getting-started)
  - [Example: Project Configuration](#example-project-configuration)
  - [Create a New Project](#create-a-new-project)
  - [Documentation](#documentation)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [Authors](#authors)
  - [Follow Me](#follow-me)
  - [Other Extensions](#other-extensions)
  - [Recommended Browser Extension](#recommended-browser-extension)
  - [License](#license)

## Key Features

- **Automated File Generation**
  Scaffold components, pages, API routes, utilities, and tests with a single command.
- **Framework Snippets**
  Ready-to-use code snippets for Next.js, React, Prisma, Drizzle, Tailwind CSS, i18next, Zod, and more.
- **Customizable Settings**
  Define import aliases, file extensions, folder watches, and naming patterns.
- **Integrated Commands**
  Context menus and palette commands for project creation, file scaffolding, and CLI invocations.
- **Multi-Version Support**
  Full compatibility with Next.js 13 and 14, TypeScript, and modern fullstack workflows.

## Getting Started

- Open the **Command Palette** (Ctrl+Shift+P or ⌘+Shift+P) and enter `T3:` to view all available commands.
- Right-click in the Explorer to access context-menu generation options.
- Configure workspace settings in `.vscode/settings.json` to tailor file structure, import aliases, and naming conventions.

## Example: Project Configuration

Add or update `.vscode/settings.json` in your project root:

```jsonc
{
  "nextjs.files.alias": "~",               // Import alias (e.g., "~", "@", "#")
  "nextjs.files.extension": "tsx",         // Default file extension
  "nextjs.files.showType": true,           // Append type to filename (e.g., "component")
  "nextjs.files.include": ["js","jsx","ts","tsx"],
  "nextjs.files.exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "**/.*/**"
  ],
  "nextjs.files.watch": ["components","pages","api"],
  "nextjs.files.showPath": true,           // Display path in file name labels
  "nextjs.server.turbo": true,             // Enable Turbo mode (Next.js 14+)
  "nextjs.server.experimentalHttps": true  // Enable HTTPS (Next.js 14+)
}
```

Reload VS Code to apply these settings.

## Create a New Project

Use the built-in T3 Stack / Vite CLI integration:

1. Open the **Command Palette** and type `T3: Create Project`.
2. Follow the interactive prompts to select templates, routes, and features.
3. The extension will generate a fully configured T3 Stack or Next.js project in your chosen directory.

## Documentation

Detailed feature and usage documentation is available in the `docs` folder:

- [Commands to Generate Files](./docs/generate-files.md)
- [CLI Commands Reference](./docs/cli-commands.md)
- [Snippet Reference](./docs/snippets.md)
- [Context Menu Guide](./docs/context-menu.md)

## Contributing

T3 Stack / Next.js / React File Generator is open-source and welcomes community contributions:

1. Fork the [GitHub repository](https://github.com/ManuelGil/vscode-nextjs-generator).
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes, commit them, and push to your fork.
4. Submit a Pull Request against the `main` branch.

Before contributing, please review the [Contribution Guidelines](https://github.com/ManuelGil/vscode-nextjs-generator/blob/main/CONTRIBUTING.md) for coding standards, testing, and commit message conventions. Open an Issue if you find a bug or want to request a new feature.

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all, regardless of gender, sexual orientation, disability, ethnicity, religion, or other personal characteristic. Please review our [Code of Conduct](https://github.com/ManuelGil/vscode-nextjs-generator/blob/main/CODE_OF_CONDUCT.md) before participating in our community.

## Changelog

For a complete list of changes, see the [CHANGELOG.md](https://github.com/ManuelGil/vscode-nextjs-generator/blob/main/CHANGELOG.md).

## Authors

- **Manuel Gil** - _Owner_ - [@ManuelGil](https://github.com/ManuelGil)

See also the list of [contributors](https://github.com/ManuelGil/vscode-angular-generator/contributors) who participated in this project.

## Follow Me

- **GitHub**: [![GitHub followers](https://img.shields.io/github/followers/ManuelGil?style=for-the-badge\&logo=github)](https://github.com/ManuelGil)
- **X (formerly Twitter)**: [![X Follow](https://img.shields.io/twitter/follow/imgildev?style=for-the-badge\&logo=x)](https://twitter.com/imgildev)

## Other Extensions

- **[Auto Barrel](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel)**
  Automatically generates and maintains barrel (`index.ts`) files for your TypeScript projects.

- **[Angular File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)**
  Generates boilerplate and navigates your Angular (9→20+) project from within the editor, with commands for components, services, directives, modules, pipes, guards, reactive snippets, and JSON2TS transformations.

- **[NestJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nestjs-generator)**
  Simplifies creation of controllers, services, modules, and more for NestJS projects, with custom commands and Swagger snippets.

- **[NestJS Snippets](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nestjs-snippets-extension)**
  Ready-to-use code patterns for creating controllers, services, modules, DTOs, filters, interceptors, and more in NestJS.

- **[T3 Stack / NextJS / ReactJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nextjs-generator)**
  Automates file creation (components, pages, hooks, API routes, etc.) in T3 Stack (Next.js, React) projects and can start your dev server from VSCode.

- **[Drizzle ORM Snippets](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-drizzle-snippets)**
  Collection of code snippets to speed up Drizzle ORM usage, defines schemas, migrations, and common database operations in TypeScript/JavaScript.

- **[CodeIgniter 4 Spark](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark)**
  Scaffolds controllers, models, migrations, libraries, and CLI commands in CodeIgniter 4 projects using Spark, directly from the editor.

- **[CodeIgniter 4 Snippets](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-snippets)**
  Snippets for accelerating development with CodeIgniter 4, including controllers, models, validations, and more.

- **[CodeIgniter 4 Shield Snippets](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-shield-snippets)**
  Snippets tailored to CodeIgniter 4 Shield for faster authentication and security-related code.

- **[Mustache Template Engine - Snippets & Autocomplete](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-mustache-snippets)**
  Snippets and autocomplete support for Mustache templates, making HTML templating faster and more reliable.

## Recommended Browser Extension

For developers who work with `.vsix` files for offline installations or distribution, the complementary [**One-Click VSIX**](https://chromewebstore.google.com/detail/imojppdbcecfpeafjagncfplelddhigc?utm_source=item-share-cb) extension is recommended, available for both Chrome and Firefox.

> **One-Click VSIX** integrates a direct "Download Extension" button into each VSCode Marketplace page, ensuring the file is saved with the `.vsix` extension, even if the server provides a `.zip` archive. This simplifies the process of installing or sharing extensions offline by eliminating the need for manual file renaming.

- [Get One-Click VSIX for Chrome &rarr;](https://chromewebstore.google.com/detail/imojppdbcecfpeafjagncfplelddhigc?utm_source=item-share-cb)
- [Get One-Click VSIX for Firefox &rarr;](https://addons.mozilla.org/es-ES/firefox/addon/one-click-vsix/)

## License

This project is licensed under the **MIT License**. See the [LICENSE](https://github.com/ManuelGil/vscode-nextjs-generator/blob/main/LICENSE) file for details.
