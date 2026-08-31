


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
}

export default UserService;