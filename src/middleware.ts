import { NextResponse } from "next/server";

var USER_UUID_COOKIE_NAME = 'uuid';

export function middleware(req: Request) {
  var res = NextResponse.next();

  var cookies = req.headers.get("cookie") || "";
  if (!cookies.includes(USER_UUID_COOKIE_NAME)) {
    res.cookies.set(USER_UUID_COOKIE_NAME, crypto.randomUUID(), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return res;
}
