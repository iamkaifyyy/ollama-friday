import logo from "@/assets/logo-2.png";

interface ChatHeaderProps {
  model?: string;
}

export function ChatHeader({ model = "qwen2.5-coder:3b" }: ChatHeaderProps) {
  return (
    <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
      <img src={logo} alt="Ollama Friday logo" className="w-8 h-8 object-contain rounded-md" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
      <h1 className="text-lg font-semibold tracking-tight">Ollama Friday</h1>
      <span className="text-xs text-gray-500 ml-auto font-mono">
        {model} • local
      </span>
    </div>
  );
}
