"use client";

import { useEffect, useState } from "react";

export default function TimePage() {
  const [habitTitle, setHabitTitle] = useState<string>("");
  const [time, setTime] = useState<string>("21:30");

  useEffect(() => {
    const title = localStorage.getItem("habitTitle") || "";
    setHabitTitle(title);
  }, []);

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <a href="/setup" style={{ textDecoration: "none" }}>← Back</a>

      <h1 style={{ fontSize: 32, marginTop: 16 }}>Choose a reminder time</h1>
      <p style={{ fontSize: 16, lineHeight: 1.5 }}>
        Habit: <strong>{habitTitle || "…"}</strong>
      </p>

      <div style={{ marginTop: 18 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Reminder time
        </label>

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
      </div>

      <button
        style={{
          marginTop: 18,
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid #ccc",
          background: "white",
          cursor: "pointer",
        }}
        onClick={() => {
          localStorage.setItem("reminderTime", time);
          window.location.href = "/push";
        }}
      >
        Continue
      </button>
    </main>
  );
}
