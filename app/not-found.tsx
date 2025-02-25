import { redirect } from "next/navigation";

const NotFound = () => {
  redirect("/error/404");
  return null;
};

export default NotFound;
