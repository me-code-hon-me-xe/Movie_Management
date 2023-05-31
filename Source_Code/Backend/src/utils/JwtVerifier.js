import jwt from 'jsonwebtoken';

const parseToken = (jwtToken) => {

    if (!jwtToken) {
        return {
            id: null,
            role: null
        }
    }
    try {
        const token = jwt.verify(jwtToken, 'secret_key')
        if (!token) {
            return {
                id: null,
                role: null
            }
        } else {
            return {
                id: token.id,
                role: token.role
            }
        }
    } catch (err) {
        return {
            id: null,
            role: null
        }
    }
}

export { parseToken };