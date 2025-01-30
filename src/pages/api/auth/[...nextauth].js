import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/libs/db";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
          try {
            const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
              email,
            ]);
        
            if (!user || user.length === 0) {
                return null;// Return null to indicate invalid credentials
            }
        
            const isPasswordValid = await bcrypt.compare(password, user[0].password);
            if (!isPasswordValid) {
                return null
            }
        
            // Return the user object
            return {
              id: user[0].id,
              name: `${user[0].first_name} ${user[0].last_name}`,
              email: user[0].email,
            };
          } catch (error) {
            console.error("Error during login:", error);
            return null; // Return null for any unexpected errors
          }
    
      },
    }),
  
    
  ],
  session: {
    strategy: "jwt",
  },
  secret: "mySuperSecretKey123", // Replace this with an environment variable


  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Ensure `id` is included in the token
      }
      return token;
    },
    async session({ session, token }) {
        // Add custom fields to the session
        session.user.id = token.id;
        session.user.picture = token.picture;
        return session;
      },
}

});
