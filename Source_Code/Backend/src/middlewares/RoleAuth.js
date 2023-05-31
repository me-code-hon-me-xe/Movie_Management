import User from '../model/User.js';

const RoleAuth = (req,res,next) => {
    const user = res.locals.currentUser;
    const role = user.role;

    if (role) {
        next();
    }

    else {
        res.status(401).json({
            success: false, 
            message: "Invalid token"
        })
    }

    
}

const AdminAuth = (req,res,next) => {
    const user = res.locals.currentUser;
    const role = user.role;

    if (role !== "ADMIN") {
        res.status(403).json({
            success: false, 
            message: "Access denied"
        })
    } else {
        next();
    }
}

const StaffAuth = (req, res, next) => {
    const user = res.locals.currentUser;
    const role = user.role;

    if (role !== "STAFF") {
        res.status(403).json({
            success: false,
            message: "Access denied"
        })
    }
}

module.exports = {RoleAuth, AdminAuth};