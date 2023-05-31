import { parseToken } from '../utils/JwtVerifier.js'


const AdminAuthorization = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Bearer token missing or invalid',
        });
    }

    const token = authorizationHeader.split(' ')[1];
    
    const { id, role } = parseToken(token);
    if (role === "ADMIN") {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Access denied"
        })
    }
}

export default AdminAuthorization;