
"use client";


const HABITS = [
  { id: "sleep", title: "Sleep earlier", example: "Screens off. Now." },
  { id: "move", title: "Move daily", example: "Go outside for five minutes." },
  { id: "focus", title: "Focus block", example: "Close the inbox." },
  { id: "eat", title: "Eat lighter", example: "Stop eating." },
];

export default function SetupPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <a href="/" style={{ textDecoration: "none" }}>← Back</a>

      <h1 style={{ fontSize: 32, marginTop: 16 }}>Choose one habit</h1>
      <p style={{ fontSize: 16, lineHeight: 1.5 }}>
        Pick one. Keep it simple. We’ll add reminders next.
      </p>

      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        {HABITS.map((h) => (
          <div
            key={h.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 12,
              padding: 14,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 600 }}>{h.title}</div>
            <div style={{ marginTop: 6, color: "#444" }}>
              Example: “{h.example}”
            </div>

            <button
              style={{
                marginTop: 12,
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #ccc",
                background: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                localStorage.setItem("habitId", h.id);
                localStorage.setItem("habitTitle", h.title);
                window.location.href = "/time";
                }}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
