import jwt from "jsonwebtoken";
import User from '../model/User.js';

const createToken = (payload) => {
    console.log('payload');
    console.log(payload);
    return jwt.sign(payload, "secret_key", { expiresIn: '30d' });
};

const maxAge = 2 * 24 * 60 * 60;

class AuthController {
    async register(req, res, next) {
        let data = req.body;
        try {
            const existedUser = await User.findOne({ email: data.email });
            if (existedUser) {
                throw new Error("Email already exists");
            }

            const user = await User.create(data);
            const payload = {
                id: user._id,
                role: user.role,
            }
            const token = createToken(payload);
            // res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });
            const body = {
                success: true,
                message: "Registration successfully",
                token: token,
            }
            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message,
            }

            res.status(400).json(body);
            next();
        }
    }

    async login(req, res) {
        // res.status(201).json(34354);
        const { email, password } = req.body;
        try {
            res.clearCookie("token");
            const user = await User.login(email, password);
            const payload = {
                id: user._id,
                role: user.role
            }
            const token = createToken(payload);
            res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });

            const body = {
                success: true,
                message: "login success",
                token: token,
                role: user.role,
            }

            res.status(200).json(body);
        } catch (err) {

            const body = {
                success: false,
                message: err.message,
            }

            res.status(401).json(body);
        }
    }

    test(req, res, next) {
        const cookie = req.cookies;
        // const currentUser= req.locals.user.username;
        const token = res.locals.currentUser;
        console.log(token._id);
        res.status(201).json({
            user: token.username,
            status: true,
            token: cookie.token,
        });
    }

    logout(req, res) {
        res.clearCookie("token");
        res.clearCookie("loginJwt");

        const token = res.cookies;
        res.locals.currentUser = null;

        console.log(token);
        res.status(200).json({
            message: "Clear successful",
            token: token,
        });
    }

    test_admin(req, res) {
        const cookie = req.cookies;
        // const currentUser= req.locals.user.username;
        const token = res.locals.currentUser;
        console.log(token._id);
        res.status(201).json({
            user: token.username,
            status: true,
            token: cookie.token,
        });
    }


}

export default new AuthController();
