import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  var response = NextResponse.next({ request });

  var supabase = createServerClient(
    // biome-ignore lint/style/noNonNullAssertion: it is required env
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // biome-ignore lint/style/noNonNullAssertion: it is required env
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (let { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }

          // re-assigning response is in a supabase example,
          // but it looks like it is not needed
          // response = NextResponse.next({ request })
          for (let { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // refreshing the auth token
  var {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  (error || !user) && (await supabase.auth.signInAnonymously());

  return response;
}
