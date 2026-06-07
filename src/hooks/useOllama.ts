import { useState } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export function useOllama() {
  const [loading, setLoading] = useState(false);

  async function sendMessage(messages: Message[], onChunk: (chunk: string) => void) {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen2.5-coder:3b",
          messages,
          stream: true,
        }),
      });

      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");

        // Retain the last incomplete line in the buffer
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const chunk = JSON.parse(line);
            if (chunk.message?.content) onChunk(chunk.message.content);
          } catch (err) {
            console.error("Failed to parse chunk:", err, "Line was:", line);
          }
        }
      }

      // Parse any remaining content left in the buffer after the stream ends
      if (buffer.trim()) {
        try {
          const chunk = JSON.parse(buffer);
          if (chunk.message?.content) onChunk(chunk.message.content);
        } catch (err) {
          console.error("Failed to parse remaining buffer:", err);
        }
      }
    } catch (err) {
      console.error(err);
      onChunk("\n\nError: Failed to connect to Ollama. Make sure Ollama is running locally and the 'qwen2.5-coder:3b' model is installed (run `ollama pull qwen2.5-coder:3b` in your terminal).");
    } finally {
      setLoading(false);
    }
  }

  return { sendMessage, loading };
}