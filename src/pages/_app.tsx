import '../styles.scss';

type TMyAppProps = {
  Component?: any,
  pageProps?: any,
};
export default function MyApp({ Component, pageProps }: TMyAppProps) {
  return <Component {...pageProps} />;
}
