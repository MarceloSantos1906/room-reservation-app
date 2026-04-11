import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    const data = await res.json();

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}