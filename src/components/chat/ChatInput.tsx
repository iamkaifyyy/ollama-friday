import { useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  onSend: (input: string) => void;
  loading: boolean;
}

export function ChatInput({ onSend, loading }: ChatInputProps) {
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim() || loading) return;
    onSend(input);
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="border-t border-gray-800 px-4 py-4 max-w-3xl mx-auto w-full">
      <div className="flex gap-2 items-end">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about code..."
          rows={1}
          className="flex-1 bg-gray-800 border-gray-700 rounded-xl resize-none focus-visible:ring-blue-500 text-sm"
        />
        <Button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          size="icon"
          className="bg-blue-600 hover:bg-blue-500 rounded-xl h-10 w-10 shrink-0"
        >
          <SendHorizonal className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-xs text-gray-600 mt-2 text-center">
        Running locally · No data leaves your machine
      </p>
    </div>
  );
}
