import { useState } from "react";

export default function AiChat() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendPrompt(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (res.ok) setReply(data.text || JSON.stringify(data));
      else setReply(data.error || "Unknown error");
    } catch (err) {
      setReply("Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 680, margin: "1.5rem auto" }}>
      <form onSubmit={sendPrompt}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          placeholder="Ask the AI something..."
          style={{ width: "100%", padding: 12, fontSize: 16 }}
        />
        <div style={{ marginTop: 8 }}>
          <button type="submit" disabled={loading || !prompt.trim()}>
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </form>

      {reply && (
        <div style={{ marginTop: 16, background: "#f8fafc", padding: 12, borderRadius: 8 }}>
          <strong>AI reply:</strong>
          <div style={{ marginTop: 8 }}>{reply}</div>
        </div>
      )}
    </div>
  );
}
