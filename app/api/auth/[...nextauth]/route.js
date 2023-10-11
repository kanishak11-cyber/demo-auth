import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
  
        email: { label: "email", type: "text", placeholder: "" },
   
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter your email and password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if(!user || !user?.hashedPassword) {
          throw new Error('NO user found')
      }

       
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!passwordMatch) {
          console.log("passwordMatch failed");
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  
  },
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  //   encryption: true,
  // },

  // callbacks: {
  //   async jwt({ token, user, session }) {
  //     console.log("jwt callback", { token, user, session });
  //     if (user) {
  //       return {
  //         ...token,
  //         id: user.id,
  //         phoneNumber: user.phoneNumber,
  //       };
  //     }
  //     return token;
  //   },
  //     async session(token, session, user) {
  //       console.log("session callback", { token, session, user });
  //       return {
  //         ...session,
  //         user: {
  //           ...session.user,
  //           id: token.id,
  //           phoneNumber: token.phoneNumber,
  //         },
  //       };
  //     }
    
      
  // },
 
  debug: process.env.NODE_ENV === "development"
};
const handler = NextAuth(authOptions);
export { handler as POST, handler as GET, handler as PUT, handler as DELETE};
