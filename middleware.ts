// import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

// Temporarily replaced with a simple middleware that allows all routes
export default function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
