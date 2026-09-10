import { verifyPassword } from "./password.service.js";
import { hashPassword } from "./password.service.js";
class UserService{

    constructor(userModel){
        this.User=userModel
    }

    // Get logged-in user profile constructor
    async getProfile(userId){
        const user = await this.User.findById(userId).select("-password");

        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        return user;
    }

    // Change Password 
    async changePassword(userId, passwordData){
      console.log("THis data send by password", passwordData)

      const {currentPassword, newPassword}=passwordData;

      if (currentPassword === newPassword) {
        const error = new Error("New password must be different from current password");
        error.statusCode = 400;
        throw error;
        }

      const user = await this.User.findById(userId);

      if(!user){
        const error= new Error("User not found");
        error.statusCode=404;
        throw error;
      }
      const isMatch = await verifyPassword(user.password, currentPassword);

      if (!isMatch) {
    const error = new Error("Current password is incorrect");
    error.statusCode = 400;
    throw error;
  }
    //   hashed new password
    const hashed= await hashPassword(newPassword);
    user.password=hashed;

    await user.save();

    return{
        message:"Password Chnaged successfully"
    }

    }

    // get user distribution
    async getUserDistribution() {

    const totalStudents =
      await this.User.countDocuments({
        role: "student",
      });

    const totalTeachers =
      await this.User.countDocuments({
        role: "teacher",
      });

    const totalAdmins =
      await this.User.countDocuments({
        role: "admin",
      });

      const totalUsers =
    await this.User.countDocuments();

      const activeUsers =
    await this.User.countDocuments({
      isActive: true,
    });

  const blockedUsers =
    await this.User.countDocuments({
      isActive: false,
    });

    return {
      totalUsers,
      totalStudents,
      totalTeachers,
      totalAdmins,
      activeUsers,
      blockedUsers,
    };
  }
  

  // delete user
  async deleteUser(userId) {

  const user = await this.User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  await this.User.findByIdAndDelete(userId);

  return true;
}


// update user role
async updateUserRole(userId, role) {

  const user = await this.User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.role = role;

  await user.save();

  return user;
}

// update user status
async updateUserStatus(userId) {

  const user = await this.User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.isActive = !user.isActive;

  await user.save();

  return user;
}

async getUsers(role) {

    const filter = {};

    if (role) {
      filter.role = role;
    }

    const users = await this.User.find(filter)
      .select(
        "name email role phone isActive lastLogin createdAt"
      );

    return users;
  }

}

export default UserService;