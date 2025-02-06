import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/libs/db";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

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
  
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const { email, name } = profile;
        const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        // If user doesn't exist in the DB, create a new one
        if (existingUser.length === 0) {
          try {
            const [result] = await pool.query(
              "INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)",
              [name.split(' ')[0], name.split(' ')[1] || '', email]
            );
            return {
              id: result.insertId,
              name,
              email,
            };
          } catch (error) {
            console.error("Error creating Google user:", error);
            throw new Error("Failed to register new user");
          }
        }

        // If user exists, return their profile
        return {
          id: existingUser[0].id,
          name: existingUser[0].first_name + " " + existingUser[0].last_name,
          email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Session valid for 24 hours
    updateAge: 60 * 60, 
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
