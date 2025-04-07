'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchFromGemini } from "@/lib/gemini";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askGemini = async () => {
    setLoading(true);
    setAnswer("");
    const res = await fetchFromGemini(question);
    setLoading(false);
    if (res.error) {
      setAnswer("Error: " + res.error);
    } else {
      setAnswer(res.response);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sonic AI – Powered by Gemini</h1>
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Ask something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button onClick={askGemini} disabled={loading}>
          {loading ? "Loading..." : "Ask"}
        </Button>
      </div>
      {answer && (
        <div className="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
          <p className="whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </main>
  );
}
