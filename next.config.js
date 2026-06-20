/** @type {import('next').NextConfig} */

// Baseline security headers applied to every route. These are safe defaults
// that do not affect how the app renders. The Content-Security-Policy is left
// commented out because this app injects inline styles and marked()-rendered
// HTML, which a strict CSP would break without 'unsafe-inline'. Enable it only
// after testing, and keep the Supabase origin in connect-src.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Uncomment and test before enabling. Replace the Supabase origin if it changes.
  // {
  //   key: "Content-Security-Policy",
  //   value: [
  //     "default-src 'self'",
  //     "script-src 'self' 'unsafe-inline'",
  //     "style-src 'self' 'unsafe-inline'",
  //     "img-src 'self' data: blob:",
  //     "font-src 'self' data:",
  //     "connect-src 'self' https://meosdrvquwybipqjrzwv.supabase.co wss://meosdrvquwybipqjrzwv.supabase.co",
  //     "frame-ancestors 'none'",
  //   ].join("; "),
  // },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
