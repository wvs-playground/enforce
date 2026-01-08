import webpush from "web-push";

export async function POST(req: Request) {
  try {
    const { subscription, title, body } = await req.json();

    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;
    const subject = process.env.VAPID_SUBJECT;

    if (!publicKey || !privateKey || !subject) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing VAPID env vars." }),
        { status: 500 }
      );
    }

    webpush.setVapidDetails(subject, publicKey, privateKey);

    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: title || "ENFORCE",
        body: body || "Test notification",
      })
    );

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e?.message || String(e) }),
      { status: 500 }
    );
  }
}
