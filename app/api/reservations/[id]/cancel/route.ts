import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const token = request.cookies.get("token")?.value;
    const body = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reservas/${id}/cancelar`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Proxy cancel error:", error);

    return NextResponse.json(
      { error: "Erro interno no proxy" },
      { status: 500 }
    );
  }
}