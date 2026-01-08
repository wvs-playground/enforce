"use client";

import { useEffect, useState } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

export default function PushPage() {
  const [habitTitle, setHabitTitle] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<string>("");

  const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";

  useEffect(() => {
    setHabitTitle(localStorage.getItem("habitTitle") || "");
    setTime(localStorage.getItem("reminderTime") || "");
  }, []);

  async function enablePush() {
    try {
      setStatus("Requesting permission…");

      if (!("serviceWorker" in navigator)) {
        setStatus("Service workers not supported in this browser.");
        return;
      }

      if (!VAPID_PUBLIC_KEY) {
        setStatus("Missing public key. Check .env.local and restart npm run dev.");
        return;
      }

      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setStatus("Permission not granted.");
        return;
      }

      setStatus("Registering background helper…");
      const reg = await navigator.serviceWorker.register("/sw.js");

      setStatus("Creating push subscription…");
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      localStorage.setItem("pushSubscription", JSON.stringify(sub));
      setStatus("✅ Push enabled. Now you can send a test push.");
    } catch (e: any) {
      setStatus(`Error: ${e?.message || String(e)}`);
    }
  }

  async function sendTestPush() {
    try {
      setStatus("Sending test notification…");

      const subRaw = localStorage.getItem("pushSubscription");
      if (!subRaw) {
        setStatus("No subscription found. Click Enable push first.");
        return;
      }

      const subscription = JSON.parse(subRaw);

      const res = await fetch("/api/push/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription,
          title: "ENFORCE",
          body: "This is your first push.",
        }),
      });

      const data = await res.json();
      if (!data.ok) {
        setStatus(`Error: ${data.error}`);
        return;
      }

      setStatus("✅ Test push sent. Check your notifications.");
    } catch (e: any) {
      setStatus(`Error: ${e?.message || String(e)}`);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <a href="/time" style={{ textDecoration: "none" }}>
        ← Back
      </a>

      <h1 style={{ fontSize: 32, marginTop: 16 }}>Enable push notifications</h1>

      <p style={{ fontSize: 16, lineHeight: 1.5 }}>
        Habit: <strong>{habitTitle || "…"}</strong>
        <br />
        Time: <strong>{time || "…"}</strong>
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
        <button
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
          }}
          onClick={enablePush}
        >
          Enable push
        </button>

        <button
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
          }}
          onClick={sendTestPush}
        >
          Send test push
        </button>
      </div>

      <p style={{ marginTop: 12 }}>{status}</p>

      <p style={{ marginTop: 18, fontSize: 14, color: "#444" }}>
        Note: On iPhone, push works after installing the web app to your Home Screen (PWA).
      </p>
    </main>
  );
}
