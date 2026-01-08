const EXAMPLES = {
  Sleep: ["Go to bed.", "Screens off.", "You already decided this."],
  Health: ["Stand up.", "Go outside for five minutes.", "Stop eating."],
  Focus: ["Close the inbox.", "This can wait.", "You’re done for today."],
};

export default function ExamplesPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <a href="/" style={{ textDecoration: "none" }}>← Back</a>

      <h1 style={{ fontSize: 32, marginTop: 16 }}>Examples</h1>
      <p style={{ fontSize: 16, lineHeight: 1.5 }}>
        Short. Calm. Final.
      </p>

      <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
        {Object.entries(EXAMPLES).map(([group, lines]) => (
          <div
            key={group}
            style={{ border: "1px solid #ccc", borderRadius: 12, padding: 14 }}
          >
            <div style={{ fontSize: 18, fontWeight: 600 }}>{group}</div>
            <ul style={{ marginTop: 10, paddingLeft: 18 }}>
              {lines.map((t) => (
                <li key={t} style={{ marginBottom: 6 }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
