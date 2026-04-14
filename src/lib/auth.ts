import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "@/lib/auth.config";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // Override providers with full DB-backed Credentials
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await connectDB();
        const user = await User.findOne({ email: credentials.email }).select("+password");
        if (!user || !user.password) return null;
        const isValid = await user.comparePassword(credentials.password as string);
        if (!isValid) return null;
        return { id: user._id.toString(), name: user.name, email: user.email, image: user.image, role: user.role };
      },
    }),
  ],

  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        const existing = await User.findOne({ email: user.email });
        if (!existing) {
          await User.create({ name: user.name, email: user.email, image: user.image, role: "USER" });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "USER";
      }
      if (token.email && !user) {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) { token.id = dbUser._id.toString(); token.role = dbUser.role; }
      }
      return token;
    },
  },
});
