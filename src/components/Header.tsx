import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ME_ADDRESS } from '../constants';

type THeadElementProps = {
  description?: string
  path?: string
};

export default function HeadElement(
  {
    description = 'landing-and-default',
    path,
  }: THeadElementProps,
) {
  const router = useRouter();
  const { t } = useTranslation('meta-tags');

  function pathToTitle(pathStr: string) {
    const kebabTitle = pathStr.split('/').pop();
    if (!kebabTitle) return 'MYNA Home';

    const title = 'MYNA | ' + kebabTitle
      .split('-')
      .map(x => x[0].toUpperCase() + x.slice(1))
      .join(' ');

    return title;
  }

  const title = pathToTitle(path || router.pathname);

  return <Head>
    <title>{title}</title>
    <meta httpEquiv="Content-Type" content="text/html" charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={t(description)} />
    <meta property="og:description" content={t(description)} />
    <meta property="og:title" content={title} />
    <meta property="og:image" content={`${ME_ADDRESS}/social_media_1.jpg`} />
    <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="true"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossOrigin="true"></script>
    <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="true"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8D4K06TM96"></script>
    <script dangerouslySetInnerHTML={{
      __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-8D4K06TM96');`
    }}
    />
  </Head>
}

