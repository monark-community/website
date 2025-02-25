import { NextPageContext } from "next";
import ErrorPage from "@/app/[locale]/error/[code]/page";

function CustomError({ statusCode }: { statusCode: number }) {
  return <ErrorPage params={Promise.resolve({ locale: "en", code: statusCode.toString() })} />;
}

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
