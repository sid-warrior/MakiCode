import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models/User';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          await dbConnect();
          
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              providerId: account.providerAccountId,
              stats: {
                testsCompleted: 0,
                bestWpm: 0,
                avgAccuracy: 0,
              },
            });
          }
        } catch (error) {
          console.error('Database error during sign in:', error);
          // Still allow sign in even if DB fails
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        try {
          await dbConnect();
          const dbUser = await User.findOne({ email: session.user.email });
          if (dbUser) {
            session.user.id = dbUser._id.toString();
            session.user.stats = dbUser.stats;
          }
        } catch (error) {
          console.error('Database error during session:', error);
          // Return session without DB stats if DB fails
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
});

