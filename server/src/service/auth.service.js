// import User from '../models/User.js'
import { registerSchema,loginSchema} from '../validations/auth.validation.js'
import { hashPassword } from './password.service.js';
import { generateToken } from '../utils/generateToken.js';
import { verifyPassword } from './password.service.js';


class AuthService{

constructor(userModel) {
    this.User = userModel;
  }
    // create user service
    async createUser(userData){

    //   Validation
    const {error}=registerSchema.validate(userData)
    if (error) {
      throw new Error(error.details[0].message);
    }

    // value destructure
    const {name,email,password,role,phone,profileImg} = userData;

    // Normalize Email
    const normalizedEmail = email.toLowerCase().trim();

    // Check Existing User
    const existingUser = await this.User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash Password
    const hashedPassword = await hashPassword(password);

    // Create User
    const user = await this.User.create({
      name:name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
      phone,
      profileImg,
    });


    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      profileImg: user.profileImg,
      isActive: user.isActive,
    };

    }

// login user service
 async loginUser(loginData) {

  const { email, password } = loginData;

  const { error } = loginSchema.validate(loginData);

  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await this.User.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!user) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  if (!user.isActive) {
    const err = new Error("Account is inactive");
    err.statusCode = 403;
    throw err;
  }

  const isPasswordValid = await verifyPassword(
    user.password,
    password
  );

  if (!isPasswordValid) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  await this.User.findByIdAndUpdate(
    user._id,
    {
      lastLogin: new Date(),
    }
  );

  const token = generateToken({
    userId: user._id,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      profileImg: user.profileImg,
    },
  };
}

}

export default AuthService;