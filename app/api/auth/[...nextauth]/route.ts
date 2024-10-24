import { authOptions } from "@/app/libs/auth"; // Ensure you're importing correctly
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
