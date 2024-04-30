import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client"; // Import Request from Prisma client

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: email}
        });

        if (existingUserByEmail) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: await bcrypt.hash(password, 10),
            } as Prisma.UserCreateInput,
        });

        return NextResponse.json(
            { user: newUser, message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating user:", error); // Log the error
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
