import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; // This path should match your structure

export default async function getSession() {
    return await getServerSession(authOptions);
}
