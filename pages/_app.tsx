import { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeError = (err: any, url: string) => {
      if (err.cancelled) return;
      router.push(`/error/500`);
    };

    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
