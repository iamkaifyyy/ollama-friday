import { useState } from "react";
import { useOllama, type Message } from "@/hooks/useOllama";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content: "Hey! I'm your local coding assistant powered by qwen2.5-coder. Ask me anything 🚀",
  },
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const { sendMessage, loading } = useOllama();

  async function handleSend(input: string) {
    const userMsg: Message = { role: "user", content: input };
    const updatedMessages: Message[] = [...messages, userMsg, { role: "assistant", content: "" }];

    setMessages(updatedMessages);

    const messagesForOllama = updatedMessages.slice(0, -1);

    await sendMessage(messagesForOllama, (chunk) => {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: updated[updated.length - 1].content + chunk,
        };
        return updated;
      });
    });
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} loading={loading} />
    </div>
  );
}