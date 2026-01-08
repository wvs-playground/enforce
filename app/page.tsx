export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 40, marginBottom: 12 }}>ENFORCE</h1>
      <p style={{ fontSize: 18, lineHeight: 1.5 }}>
        External discipline for people who don’t need motivation.
      </p>

      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <a
          href="/setup"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ccc",
            textDecoration: "none",
          }}
        >
          Start enforcing one habit
        </a>

        <a
          href="/examples"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ccc",
            textDecoration: "none",
          }}
        >
          See examples
        </a>
      </div>
    </main>
  );
}
