import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    try {
        const events = await prisma.events.findMany();
        return NextResponse.json({ events });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

export async function POST(req: any) {
    try {
        const body = await req.json();
        const { title, description, organizer, deadline, location, isOnline ,registrationLink, sponsors } = body;
        
        // Convert the deadline to a Unix timestamp
        const deadlineTimestamp = new Date(deadline).getTime().toString();
        
        let check: boolean = false;
        if (isOnline === true) {
            check = true;
        }
        console.log(registrationLink);
        console.log(sponsors);
        
        const res = await prisma.events.create({
            data: {
                title,
                description,
                organizer,
                Deadline: deadlineTimestamp,
                location,
                Online: check,
                registrationLink,
                sponsors, 
            }
        });

        return NextResponse.json(res);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
