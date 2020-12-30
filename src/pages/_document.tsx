import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    const GTM_ID = 'GTM-KX7F82Z'
    return (
      <Html lang="en">
        <Head>
          {/* Google Tag Manager - Global base code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${GTM_ID}');
              `,
            }}
          />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
          {/* Facebook Messenger の設置 */}
          <div id="fb-root"></div>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  xfbml            : true,
                  version          : 'v9.0'
                });
              };
              (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/ja_JP/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `,
            }}
          ></script>
          {/* Your Chat Plugin code */}
          <div
            className="fb-customerchat"
            // @ts-ignore
            attribution="setup_tool"
            page_id="100406295340921"
            theme_color="#6699cc"
            logged_in_greeting="何かご質問はあるでしょうか。お気軽に送信していただいて構いません。"
            logged_out_greeting="何かご質問はあるでしょうか。お気軽に送信していただいて構いません。"
          ></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
