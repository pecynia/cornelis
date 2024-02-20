'user server'

import bcrypt from 'bcryptjs'
import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'

export async function registerNewUser(name: string, email: string, password: string) {
    /**
     * This function is used to register a new user
     * 
     * @param {string} name - The name of the user
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * 
     * @returns {object} - A JSON object with the success status and a message or an error
     */
    try {
        // Check if name, email and password are provided
        if (!name || !email || !password) {
            return { success: false, message: "Name, email and password are required" }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Save the user to the database with the hashed password
        await connectMongoDB()
        await User.create({ name, email, hashedPassword })

        return { success: true, message: "User registered successfully" }   
    } catch (error) {
        return { success: false, error }
    }
}

export async function userExists(email: string) {
    /**
     * This function is used to check if a user exists
     * 
     * @param {string} email - The email of the user
     * 
     * @returns {object} - A JSON object with the success status and a message or an error
    */
    try {
        await connectMongoDB();
        const user = await User.findOne({ email }).select("_id");
        return { success: true, userExists: !!user };
    } catch (error) {
        return { success: false, userExists: false, error };
    }
}