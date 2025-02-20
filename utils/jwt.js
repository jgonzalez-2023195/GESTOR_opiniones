'use strict'

import jwt from 'jsonwebtoken'

export const generateTokenJWT = async(payload)=> {
    try {
        return jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: '1h',
                algorithm: 'HS256'
            }
        )
    } catch (e) {
        
    }
}