# ollama-friday

# Ollama Friday

A local AI coding assistant built with React, TypeScript, and Vite — powered by [Ollama](https://ollama.com). No API keys, no cloud, no data leaving your machine.

## Features

- Streaming responses in real time
- Full multi-turn conversation history
- Clean chat UI with auto-scroll and "Thinking…" indicator
- `Enter` to send, `Shift+Enter` for a new line
- Built with shadcn/ui components

## Prerequisites

- Node.js v18+
- [Ollama](https://ollama.com) installed and running locally

## Getting Started

```bash
# Pull the default model
ollama pull qwen2.5-coder:3b

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with ESLint |

## Using a Different Model

Change the model name in `src/hooks/useOllama.ts`:

```ts
model: "llama3.2",  // any model you've pulled via Ollama
```

Then pull it:

```bash
ollama pull llama3.2
```

## Tech Stack

React 19 · TypeScript 6 · Vite 8 · Tailwind CSS 4 · shadcn/ui · Lucide React · Ollama

## License

MIT
