import Head from 'next/head';

class HeadElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUrl: '',
      title: ''
    };
    this.setTitle = this.setTitle.bind(this);
    this.resetZoom = this.resetZoom.bind(this);
  }

  pathToTitle(pathStr) {
    const kebabTitle = pathStr.split('/').pop();
    if (!kebabTitle) return 'MYNA Home';

    const title = 'MYNA | ' + kebabTitle
          .split('-')
          .map(x => x[0].toUpperCase() + x.slice(1))
          .join(' ');

    return title;
  }

  setTitle () {
    let cpn = window.location.pathname;

    this.setState({ currentUrl: cpn });
    this.setState({ title: this.pathToTitle(cpn) });
  }

  resetZoom () {}

  componentDidMount() {
    setTimeout(this.setTitle, 250);
  }

  render() {
    return <Head>
      <title>{ this.state.title }</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
}

export default HeadElement
