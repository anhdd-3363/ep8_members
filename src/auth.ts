import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import type { NextAuthConfig, Session } from "next-auth";

export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    // async signIn({ account }) {
    //   if (account && account.id_token) {
    //     try {
    //       const response = await fetch("http://localhost:3002/verify", {
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ id_token: account.id_token }),
    //         method: "POST",
    //       });

    //       if (!response.ok) throw new Error("Failed to verify id_token");

    //       const data = await response.json();
    //       // Add any additional logic based on backend response here

    //       return true; // Allow sign in
    //     } catch (error) {
    //       console.error("Error verifying id_token:", error);
    //       return false; // Deny sign in
    //     }
    //   }
    //   return false; // Deny sign in if no account or id_token
    // },

    // async jwt({ token, user, account }) {
    //   // Initial sign in
    //   if (account && user) {
    //     console.log("Account info: ", account);
    //     return {
    //       ...token,
    //       access_token: account.access_token,
    //       issued_at: Date.now(),
    //       expires_at: Date.now() + Number(account.expires_in) * 1000, // 3600 seconds
    //       refresh_token: account.refresh_token,
    //       id_token: account.id_token,
    //     };
    //   } else if (Date.now() < Number(token.expires_at)) {
    //     return token;
    //   } else {
    //     console.log("Access token expired getting new one");
    //     try {
    //       const response = await fetch("https://oauth2.googleapis.com/token", {
    //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //         body: new URLSearchParams({
    //           client_id: process.env.GOOGLE_CLIENT_ID as string, // Type assertion
    //           client_secret: process.env.GOOGLE_CLIENT_SECRET as string, // Type assertion
    //           grant_type: "refresh_token",
    //           refresh_token: token.refresh_token as string, // Type assertion
    //         }),
    //         method: "POST",
    //       });

    //       const tokens = await response.json();

    //       if (!response.ok) throw tokens;

    //       return {
    //         ...token, // Keep the previous token properties
    //         access_token: tokens.access_token,
    //         expires_at: Date.now() + Number(tokens.expires_in) * 1000,
    //         // Fall back to old refresh token, but note that
    //         // many providers may only allow using a refresh token once.
    //         refresh_token: tokens.refresh_token ?? token.refresh_token,
    //       }; // updated inside our session-token cookie
    //     } catch (error) {
    //       console.error("Error refreshing access token", error);
    //       // The error property will be used client-side to handle the refresh token error
    //       return { ...token, error: "RefreshAccessTokenError" as const };
    //     }
    //   }
    // },
    // async session({ session, token }) {
    //   // This will be accessible in the client side using useSession hook
    //   // So becareful what you return here. Don't return sensitive data.
    //   // The auth() function should return jwt response but instead it returns
    //   // the session object. This is a bug in next-auth.
    //   // Follow this bug https://github.com/nextauthjs/next-auth/issues/9329
    //   return {
    //     ...session,
    //     accessToken: String(token.access_token),
    //     refreshToken: String(token.refresh_token),
    //     accessTokenIssuedAt: Number(token.issued_at),
    //     accessTokenExpiresAt: Number(token.expires_at),
    //   } satisfies EnrichedSession;
    // },

    async jwt(token, user, account, profile, isNewUser) {
      // Khi người dùng đăng nhập lần đầu, sẽ có account và token
      if (account?.provider === "google" && account?.id_token) {
        try {
          // Gửi id_token đến backend để xác thực và lấy thông tin người dùng
          const response = await axios.post(
            "https://your-backend-api.com/auth/google",
            {
              id_token: account.id_token,
            }
          );

          // Nếu xác thực thành công, lưu thông tin user vào token
          token.user = response.data.user;
        } catch (error) {
          console.error("Error authenticating with backend", error);
        }
      }

      return token;
    },
    async session(session, token) {
      // Gán thông tin người dùng từ token vào session
      session.user = token.user;
      return session;
    },
  },
} satisfies NextAuthConfig;

export interface EnrichedSession extends Session {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  accessTokenIssuedAt: number;
}

export const { handlers, auth, signIn, signOut } = NextAuth(config);
