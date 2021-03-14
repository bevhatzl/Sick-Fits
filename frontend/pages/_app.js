import NProgress from 'nprogress';
import Router from 'next/router';
import Page from "../components/Page";

// To display progress bar when loading
// import 'nprogress/nprogress.css';    
// Instead of the above line, using own custom styles 
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


export default function MyApp( {Component, pageProps} ) {
  return (
    <Page>
      <Component {...pageProps} />

    </Page>
  );
}