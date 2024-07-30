import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const communities = await prisma.community.findMany();
        return NextResponse.json(communities, { status: 200 });
    } catch (error) {
        console.error("Error fetching communities:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

export async function POST(req: any) {
    const body = await req.json();
    const { name, description, image} = body;
    
    try {
        const res = await prisma.community.create({
        data: {
            name,
            description,
            image,
        },
        });
        return NextResponse.json(res, { status: 201 });
    } catch (error) {
        console.error("Error creating community entry:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
    }