import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
                return res.data.user;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});
