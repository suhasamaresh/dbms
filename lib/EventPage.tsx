"use server";
import prisma from "./db";

export async function EventPageServer({ id }: { id: string }) {
  // Fetch the event data from the database
  const event = await prisma.events.findUnique({
    where: {
      id: Number(id),
    },
  });
  return event;
}
