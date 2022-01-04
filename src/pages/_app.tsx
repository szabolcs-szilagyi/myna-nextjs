import '../styles.scss';
import 'reflect-metadata';

type TMyAppProps = {
  Component?: any,
  pageProps?: any,
};
export default function MyApp({ Component, pageProps }: TMyAppProps) {
  return <Component {...pageProps} />;
}
