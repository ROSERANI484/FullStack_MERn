import jwt from "jsonwebtoken";
import User from "../db/schema/userSchema.js";

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;

        if (!token) {
            return res.status(401).json({ error: "No token found" });
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({
            _id: verifyToken._id,
            "tokens.token": token,
        });

        if (!rootUser) {
            console.log("User not found");
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (err) {
        console.log("Authenticate Error:", err.message);
        res.status(401).json({ error: "Unauthorized: No token provided" });
    }
};

export default Authenticate;   

