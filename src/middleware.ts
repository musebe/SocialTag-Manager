// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const accessCodeCookie = request.cookies.get('accessCode');

    if (!accessCodeCookie) {
        return NextResponse.redirect(new URL('/access-code', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/',
};

