# Clean Architecture TypeScript

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![ESLint](https://img.shields.io/badge/ESLint-9.32-4B32C3.svg)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.6-F7B93E.svg)](https://prettier.io/)
[![Jest](https://img.shields.io/badge/Jest-30.0-C21325.svg)](https://jestjs.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A user management application demonstrating **Clean Architecture** principles in TypeScript. Features multiple user interfaces (CLI and React) with configurable storage backends.

## Features

- **Clean Architecture** - Domain-centric design with clear layer separation
- **Multiple UIs** - CLI and React web interfaces
- **Configurable Storage** - In-memory or file-based persistence
- **Value Objects** - Email and Password with built-in validation
- **Ports & Adapters** - Flexible, testable architecture

## Quick Start

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run with CLI (default)
npm start

# Run with React UI
npm start -- --view=react
```

## Usage

### CLI Arguments

| Argument | Values | Default | Description |
|----------|--------|---------|-------------|
| `--view` | `cli`, `react` | `cli` | User interface |
| `--repo` | `memory`, `file` | `memory` | Data storage |

### Examples

```bash
# CLI with in-memory storage (default)
npm start

# CLI with file persistence
npm start -- --repo=file

# React UI with in-memory storage
npm start -- --view=react

# React UI with file persistence
npm start -- --view=react --repo=file
```

### Ports

- **React UI**: http://localhost:5173
- **API Server** (React mode): http://localhost:3001

## Architecture

```
src/
├── domain/           # Business entities and value objects
│   ├── User.ts
│   ├── Email.ts
│   └── Password.ts
├── useCases/         # Application business rules
│   ├── addUser.ts
│   ├── listUsers.ts
│   ├── ports/        # Repository interfaces
│   └── adapters/     # Repository implementations
├── presenter/        # Interface adapters
│   ├── presenter.ts          # CLI presenter
│   ├── apiPresenter.ts       # REST API presenter
│   └── httpDeclarativePresenter.ts  # React HTTP presenter
├── view/             # UI implementations
│   ├── view.ts       # CLI view
│   └── apiView.ts    # Express REST API
├── react/            # React components
└── config/           # Configuration
```

### Layer Dependencies

```
View → Presenter → Use Cases → Domain
         ↓
      Adapters (Repositories)
```

Dependencies point inward only. The domain layer has no external dependencies.

---

## About This Template

This project is based on a template from [Software Crafters](https://softwarecrafters.io) courses:

- Testing Sostenible
- Diseño Sostenible
- Refactoring Sostenible

## Development Scripts

```bash
npm run build           # Clean and compile TypeScript
npm run compile         # Type-check without emitting
npm run lint            # Run ESLint
npm run lint:fix        # ESLint with auto-fix
npm test                # Run tests
npm run test:watch      # Tests in watch mode
npm run validate        # Full check: compile + lint + test
```

## Husky & lint-staged

- **pre-commit**: Runs ESLint, Prettier, and TypeScript type-checking on staged files
- **pre-push**: Runs full validation (compile + lint + test)

## License

MIT
