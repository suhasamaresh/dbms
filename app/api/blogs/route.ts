import prisma from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany();
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, author,image } = body;
    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        image,
        author,
        published: false, 
        authorId: "", 
        likes: 0, 
        reads: 0, 
      },
      
    });
    return NextResponse.json({ blog: newBlog, message: "Blog created successfully" }, { status: 201  })
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
