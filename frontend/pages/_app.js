import NProgress from 'nprogress';
import Router from 'next/router';
import Page from "../components/Page";
// To display progress bar when loading
// import 'nprogress/nprogress.css';    
// Instead of the above line, using own custom styles 
import '../components/styles/nprogress.css';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp( {Component, pageProps, apollo} ) {
  console.log(apollo);
  return (
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
  );
}

// getInitialProps is a nextjs async method. ctx is the context.
MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);    
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);