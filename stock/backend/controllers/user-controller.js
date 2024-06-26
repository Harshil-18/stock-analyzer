const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async(req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.log(err);
    }
    if (existingUser) {
        return res.status(400).json({message: "User already exists! Login Please"})
    }
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedPassword,
    });

    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }

    return res.status(201).json({message:user})
}

const login = async(req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch  (err) {
        return new Error(err);
    }
    if (!existingUser){
        return res.status(400).json({message:"User not found. Signup Please"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({message:"Invalid Email/Password"})
    }
    const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: "30s"
    });

    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: 'lax'
    });

    return res.status(200).json({message:"User Successfully Logged In", user: existingUser, token })
}

const verifyToken = async(req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    console.log(token);
    if (!token) {
        res.status(404).json({message:"No token found"})
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(400).json({message:"Invalid Token"})
        }
        console.log(user.id);
        req.id = user.id;    
    });
    next();
}

const getUser = async(req, res, next) => {
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, "-password");
    } catch (err) {
        return new Error(err);
    }
    if (!user){
        return res.status(404).json({message:"User Not Found"})
    }
    return res.status(200).json({user})
}

const logout = (req, res, next) => {
    const cookies = req.headers.cookies;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return res.status(400).json({message:"Couldnt find token"});
    }
    jwt.verify(String(prevtoken), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({mssage:"Authentication failed"});
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({message:"User Successfully Logout"});
    });
}

exports.logout= logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;