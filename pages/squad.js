import Layout from '@/components/Layout';

export default function Squad() {
  return (
    <Layout
      footerProps={{
        facebookHref: 'https://mesonsoft.com/go/facebook/',
        emailHref: 'https://www.mesonsoft.com/misc/contact/',
        twitterHref: 'http://mesonsoft.com/go/twitter/',
        googleplusHref: 'http://mesonsoft.com/go/googleplus/',
      }}
    >
      <div id="adbox">
        <img src="/images/squad1.PNG" className="banner" alt="banner" />
        <img src="/images/squad2.PNG" className="banner" alt="banner" />
      </div>
    </Layout>
  );
}