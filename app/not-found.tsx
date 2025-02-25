import NotFoundClientWrapper from "@/components/shared/error/not-found/not-found-client-wrapper";
import { NextPage, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

const NotFound: NextPage = () => {
  return <NotFoundClientWrapper />;
};

export default NotFound;
