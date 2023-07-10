import mongoose from "mongoose";
import userModel from "../models/userModel";

export default class UserService {
    constructor(){

    }

    public async getUserById(id: string): Promise<any> {
        try {
            const user = await userModel.findById(id)
            if (!user) throw new Error(`user not found!`)
            
            return user
        } catch (error) {
            throw error
        }
    }

    public async getAllUser(): Promise<any> {
        try {
            const user = await userModel.find()
            if (user.length < 1) throw new Error(`user not found!`)
            
            return user
        } catch (error) {
            throw error
        }
    }

    public async createUser(userData: any): Promise<any> {
        try {
            const user = await userModel.findOne({ username : userData.username})
            if (user) throw new Error(`username ${user.username} is already`)
            const new_user = new userModel();
            new_user.username = userData.username
            new_user.age = userData.age
            return await new_user.save()
        } catch (error) {
            throw error
        }
    }

    public async updeateUser(userData: any): Promise<any> {
        try {
            const user = await this.getUserById(userData.id)
            user.username = userData.username
            user.age = userData.age
            user.update_at = Date.now()
            return await user.save()
        } catch (error) {
            throw error
        }
        
    }

    public async deleteUser(id: string): Promise<any> {
        try {
            const user = await this.getUserById(id)
            return await userModel.findOneAndDelete({ _id : new mongoose.Types.ObjectId(id)})
        } catch (error) {
            throw error
        }
    }

    // Other methods for updating, deleting, etc.
}
