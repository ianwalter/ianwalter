import Document, { Html, Head, Main, NextScript } from 'next/document'
import clsx from 'clsx'

export default class SiteDocument extends Document {
  render () {
    return (
      <Html
        lang="en"
        className={clsx('bg-zinc-900 text-zinc-100 leading-10')}
      >
        <Head>
          <link
            rel="preload"
            href="/fonts/Inter-roman.var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/fonts.css" />
          <link rel="stylesheet" href="/eostrix.css" />
          <script
            async
            defer
            data-domain="ianwalter.dev"
            src="https://plausible.io/js/plausible.js"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
