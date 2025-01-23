import pool from "@/libs/db";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name:firstName, lastName, email, password, confirmPassword } = req.body;
  console.log(req.body);
    
      // Check if all required fields are present
       if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }
    
    if (password !== confirmPassword) {
      return res.status(404).json({ message: "Password do not match" });
    }

    //check already exist
    try {
        // Check if user already exists
        const [existingUser] = await pool.query(
          "SELECT * FROM users WHERE email = ?",
          [email]
        );
        if (existingUser.length > 0) {
          return res.status(400).json({ message: "User already exists" });
        }
       
          // encrypt the passsword
          const saltRound=10;
          const hashPasssword =await bcrypt.hash(password, saltRound);
     
  
        // Insert the new user
        const [result] = await pool.query(
          "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
          [firstName, lastName, email, hashPasssword]
        );
  
        return res
          .status(201)
          .json({ message: "User registered successfully", userId: result.insertId });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
  } else {
    res.status(405).status({ message: "Method not allowed" });
  }
}
