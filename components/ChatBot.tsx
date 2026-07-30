"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Projects } from "@/config/projects";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "안녕하세요! Minchan의 프로젝트에 대해 궁금한 걸 물어보세요.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          projectContext: Projects,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("API error:", res.status, errText);
        throw new Error("응답 실패");
      }

      const data = await res.json();

      // Azure OpenAI(GPT-5.6) Chat Completions 응답 형식
      const reply =
        data?.choices?.[0]?.message?.content ??
        "답변을 가져오지 못했어요. 다시 시도해주세요.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "오류가 발생했어요. 잠시 후 다시 시도해주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col w-[90vw] max-w-md h-[420px] rounded-xl border border-border bg-background shadow-xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-sm font-semibold">프로젝트 챗봇</span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="닫기"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-3 py-2 text-sm bg-muted text-muted-foreground animate-pulse">
                  생각 중...
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="프로젝트에 대해 물어보세요..."
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50"
            >
              전송
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "챗봇 닫기" : "챗봇 열기"}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
