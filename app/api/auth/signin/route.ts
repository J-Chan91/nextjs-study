export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ data: "Hello" });
}

export async function POST() {
  return new Response(JSON.stringify("Herllo"), {
    status: 200,
    headers: { "Set-Cookie": "token=haha" },
  });
}
