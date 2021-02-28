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
    setTitle () {
      let title;
      let cpn = window.location.pathname;
      if (cpn == '/') { title = 'MYNA Home'; }
      if (cpn == '/my-account') { title = 'MYNA My Account'; }
      if (cpn == '/checkout') { title = 'MYNA Checkout'; }
      if (cpn == '/size-measurement') { title = 'MYNA Sizes and Measurements'; }
      if (cpn == '/privacy-contact') { title = 'MYNA Privacy and Contact'; }
      if (cpn == '/sustainability') { title = 'MYNA Sustainability'; }
      if (cpn == '/shipping') { title = 'MYNA Shipping'; }
      if (cpn == '/love-and-light') { title = 'MYNA Love & Light'; }
      if (cpn == '/lookbook') { title = 'MYNA Lookbook'; }
      if (cpn == '/our-story') { title = 'MYNA Our Story'; }
      if (cpn == '/nolia-dustpink') { title = 'MYNA | Nolia Dustpink'; }
      if (cpn == '/lotus-sand') { title = 'MYNA | Lotus Sand'; }
      if (cpn == '/aster-sand') { title = 'MYNA | Aster Sand'; }
      if (cpn == '/aster-green') { title = 'MYNA | Aster Green'; }
      if (cpn == '/calla-cream') { title = 'MYNA | Calla Cream'; }
      if (cpn == '/ivy-cream') { title = 'MYNA | Ivy Cream'; }
      if (cpn == '/gea-cream') { title = 'MYNA | Gea Cream'; }
      if (cpn == '/autumn-collection') { title = 'MYNA Autumn Collection'; }
      if (cpn == '/alyss-dress') { title = 'MYNA | Alyss Dress'; }
      if (cpn == '/tilja-top') { title = 'MYNA | Tilia Top'; }
      if (cpn == '/magna-scarf') { title = 'MYNA | Magna Scarf'; }
      this.setState({ currentUrl: cpn });
      this.setState({ title: title });
    }
    resetZoom () {
    }
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
