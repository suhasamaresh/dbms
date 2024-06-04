// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      noblogs: number;
      noblogsread: number;
      noeventsattended: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    noblogs: number;
    noblogsread: number;
    noeventsattended: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    noblogs: number;
    noblogsread: number;
    noeventsattended: number;
  }
}
