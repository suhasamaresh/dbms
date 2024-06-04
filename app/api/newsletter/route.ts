import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: any) {
  const body = await req.json();
  const { email } = body;

  try {
    const res = await prisma.newsletter.create({
      data: {
        email,
      },
    });
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.error("Error creating newsletter entry:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
