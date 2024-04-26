import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import db from "./db";
import bcrypt from 'bcrypt';
import { User } from "@prisma/client";

export const authOptions:NextAuthOptions = {
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
            username: { label: "email", type: "text", placeholder: "Enter a Valid email" },
            password: {  label: "Password", type: "password" }
          },
        async authorize(credentials, req): Promise<User | null> {
            if(!(credentials as any).username || !(credentials as any).password) {
                return null;
            }
            const user = await db.user.findUnique({
                where: {
                    email: (credentials as any).username
                }
            })
            if (!user) {
                return null
            }
            const isValid = await bcrypt.compare((credentials as any).password, user.password);
            if (!isValid) {
                return null;
            }
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                emailVerified: null,
                password: user.password,
                image: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        }
        })
      ]
}


