# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm install          # Install dependencies
npm test             # Run tests with Jest
npm run test:watch   # Run tests in watch mode
npm run build        # Clean and compile TypeScript
npm run compile      # Type-check without emitting files
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run validate     # Full check: compile + lint + test
npm start            # Run the compiled application
```

## Usage

The application supports different views and repositories via CLI arguments:

```bash
# CLI view with in-memory repository (default)
npm start

# CLI view with file persistence
npm start -- --repo=file

# React view with in-memory repository
npm start -- --view=react

# React view with file persistence
npm start -- --view=react --repo=file
```

### CLI Arguments

| Argument | Values | Default | Description |
|----------|--------|---------|-------------|
| `--view` | `cli`, `react` | `cli` | UI to use |
| `--repo` | `memory`, `file` | `memory` | Data storage backend |

### Views

- **CLI**: Interactive terminal interface with menu-driven navigation
- **React**: Web UI running on http://localhost:5173 (uses Vite dev server)

### Repositories

- **memory**: In-memory storage (data lost on restart)
- **file**: JSON file persistence at `data/users.json`

### Architecture with React View

When using `--view=react`, the app starts:
1. **API server** on port 3001 (`ApiView` + `ApiPresenter`)
2. **Vite dev server** on port 5173 (React UI)

React communicates with the backend via HTTP, ensuring CLI and React share the same data when using the same repository.

## Architecture Overview

This is a Clean Architecture implementation in TypeScript for a user management CLI application.

### Layer Structure

```
src/
├── domain/           # Enterprise Business Rules (innermost layer)
│   ├── User.ts       # User entity with factory method
│   ├── Email.ts      # Email value object with validation
│   └── Password.ts   # Password value object with validation
├── useCases/         # Application Business Rules
│   ├── addUser.ts    # AddUser use case
│   ├── listUsers.ts  # ListUsers use case
│   ├── ports/        # Input/output port interfaces
│   │   └── IUsersRepository.ts
│   └── adapters/     # Output port implementations
│       └── inMemoryUsersRepository.ts
├── presenter/        # Interface Adapters
│   ├── presenter.ts  # Presenter orchestrating use cases
│   └── ports/
│       └── userViewInterface.ts
└── view/             # Frameworks & Drivers (outermost layer)
    └── view.ts       # CLI implementation of UserView
```

### Dependency Rule

Dependencies point inward only:
- `view/` depends on `presenter/ports/`
- `presenter/` depends on `useCases/` and `domain/`
- `useCases/` depends on `domain/` and defines ports (interfaces)
- `domain/` has no dependencies (pure business logic)

### Key Patterns

- **Value Objects**: `Email` and `Password` encapsulate validation and equality logic with private constructors and static factory methods
- **Factory Methods**: Entities and value objects use `create()` static methods for validated instantiation
- **Ports & Adapters**: `IUsersRepository` is a port interface; `InMemoryUsersRepository` is its adapter
- **Presenter Pattern**: `Presenter` coordinates between use cases and the view interface
