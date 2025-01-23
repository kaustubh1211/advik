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
          console.log(email,password)
          
        const [user] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
          );

          if (!user || user.length === 0) {
            throw new Error("No user found with this email.");
          }

    
           // Compare the plain-text password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
      
              // Return the user object
              return {
                id: user[0].id,
                name: `${user[0].first_name} ${user[0].last_name}`,
                email: user[0].email,
              };
      },
    }),
  
    
  ],
  session: {
    strategy: "jwt",
  },
  secret: "mySuperSecretKey123", // Replace this with an environment variable


  callbacks: {
    async jwt({ token, account, profile }) {
      // Add Google-specific fields to token
      if (account?.provider === "google") {
        token.id = profile.id;
        token.picture = profile.picture;
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
