import {
  HandlerError,
  handleAuth,
  handleLogin,
  handleLogout,
} from "@auth0/nextjs-auth0/edge";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// https://community.auth0.com/t/logging-out-completely/118940/5
const logoutUrl = [
  `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?`,
  `returnTo=${process.env.AUTH0_BASE_URL}`,
  `&client_id=${process.env.AUTH0_CLIENT_ID}`,
];

// https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md
export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      connection: "github",
      audience: process.env.AUTH0_AUDIENCE,
      scope: "openid profile email offline_access",
    },
  }),
  logout: handleLogout({ returnTo: logoutUrl.join("") }),
  onError: (req: NextRequest, error: HandlerError) => {
    console.error(error);
    if (error.status && [401, 400].includes(error.status)) {
      return redirect("/unauthorized");
    }
    redirect("/api/auth/login");
  },
});
