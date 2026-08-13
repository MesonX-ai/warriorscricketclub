import Layout from '@/components/Layout';

export default function WallOfFame() {
  return (
    <Layout
      footerProps={{
        facebookHref: 'https://mesonsoft.com/go/facebook/',
        emailHref: 'https://www.mesonsoft.com/misc/contact/',
        twitterHref: 'http://mesonsoft.com/go/twitter/',
        googleplusHref: 'http://mesonsoft.com/go/googleplus/',
      }}
    >
        <h1>Wall Of Fame</h1>
      <div id="adbox">
        <img src="/images/wall_of_fame.png" border="0" alt="Wall of Fame" />
      </div>
      <div id="adbox">
        <img src="/images/achievements.png" className="banner" alt="banner" />
      </div>
    </Layout>
  );
}