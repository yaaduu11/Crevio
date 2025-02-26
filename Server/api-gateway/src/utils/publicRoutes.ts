import { Request } from "express";

const public_routes: {method: string, path: string}[] = [
    {method: 'POST', path: '/auth/register'},
    {method: 'POST', path: '/auth/verifyOtp'},
    {method: 'POST', path: '/auth/resendOtp'},
    {method: 'POST', path: '/auth/login'},
    {method: 'POST', path: '/auth/google-auth'},
    {method: 'POST', path: '/auth/forgot-password'},    
    {method: 'POST', path: '/auth/verifyOtpFP'},
    {method: 'PATCH', path: '/auth/new-password'},
    {method: 'POST', path: '/auth/refreshToken'}
]

export function isPublic(req: Request): boolean {
    return public_routes.some(route => route.method===req.method && route.path===req.path)
}