import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import db from "./db";
import bcrypt from 'bcrypt';
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Email", type: "text", placeholder: "Enter a Valid email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req): Promise<User | null> {
            console.log("Authorize function called");
            if (!credentials?.username || !credentials?.password) {
                console.log("Missing credentials");
                return null;
            }
            const user = await db.user.findUnique({
                where: {
                    email: credentials.username
                }
            });
            if (!user) {
                console.log("User not found");
                return null;
            }
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) {
                console.log("Invalid password");
                return null;
            }
            console.log("User authenticated successfully");
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
                password: user.password,
                image: user.image,
                noblogs: user.noblogs,
                noeventsattended: user.noeventsattended,
                noeventscreated: user.noeventscreated,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
          }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
            }
            return session;
        }
    }
};
