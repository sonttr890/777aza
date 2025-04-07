"use client";

import { useState } from "react";

interface Response {
  response: string;
  error: string;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setInputError(true);
      return;
    }
    setInputError(false);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmedQuestion }),
      });

      const data: Response = await res.json();
      setResponses([data, ...responses]);
    } catch (err) {
      setResponses([
        { response: "", error: `Failed to fetch response: ${err.message}` },
        ...responses,
      ]);
    } finally {
      setIsLoading(false);
      setQuestion("");
    }
  };

  return (
    <div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4 relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
            placeholder="Type your question here..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            disabled={isLoading}
          >
            Ask
            <span
              className={`loading-spinner ${isLoading ? "inline-block" : ""}`}
            ></span>
          </button>
        </div>
        {inputError && (
          <p className="text-red-500 text-sm mt-2">Please enter a question.</p>
        )}
      </form>

      {/* Responses */}
      <div className="space-y-4">
        {responses.map((res, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow response-slide-in ${
              res.error ? "bg-red-100 text-red-700" : "bg-white"
            }`}
          >
            <p className="text-sm text-blue-600 font-semibold mb-2">
              Sonic AI Response
            </p>
            <p className="text-gray-800">{res.error || res.response}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .response-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .loading-spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
          display: none;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
