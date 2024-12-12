import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Mock database function (replace with your database logic)
const findUserByEmail = async (email) => {
  // Example user data (replace with your DB query)
  const users = [
    { id: 1, email: "test@example.com", password: "password123", name: "Test User" },
  ];
  return users.find((user) => user.email === email);
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate user credentials
        const user = await findUserByEmail(credentials.email);

        if (user && user.password === credentials.password) {
          // If credentials are valid, return user object
          return { id: user.id, name: user.name, email: user.email };
        }

        // If credentials are invalid, return null
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page (optional)
  },
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to the token (if available)
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token info to the session
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
};

export default NextAuth(authOptions);
