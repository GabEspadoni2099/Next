// lib/auth.ts
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET not defined');


export function signToken(payload: object, expiresIn = '7d') {
return jwt.sign(payload, JWT_SECRET, { expiresIn });
}


export function verifyToken(token: string | undefined) {
if (!token) return null;
try {
return jwt.verify(token, JWT_SECRET);
} catch (err) {
return null;
}
}