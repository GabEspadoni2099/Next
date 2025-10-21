// middleware/withAuth.ts
import { verifyToken } from '../lib/auth';


export function getTokenFromHeaderOrCookie(req: Request) {
const auth = req.headers.get('authorization');
if (auth?.startsWith('Bearer ')) return auth.split(' ')[1];
// cookie fallback (server-side): Next's Request doesn't parse cookies manually here; you can use req.headers.get('cookie')
const cookieHeader = req.headers.get('cookie');
if (!cookieHeader) return null;
const match = cookieHeader.match(/(?:^|; )token=([^;]+)/);
return match ? match[1] : null;
}


export function requireAuth(req: Request, roles?: string[]) {
const token = getTokenFromHeaderOrCookie(req);
const payload = verifyToken(token || undefined) as any;
if (!payload) throw new Error('Unauthorized');
if (roles && !roles.includes(payload.role)) throw new Error('Forbidden');
return payload;
}