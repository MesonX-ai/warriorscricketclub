import Layout from '@/components/Layout';

export default function Achievements() {
  return (
    <Layout
      showAchievements
      footerProps={{
        facebookHref: 'http://mesonsoft.com/go/facebook/',
        emailHref: 'http://www.mesonsoft.com/misc/contact/',
        twitterHref: 'http://mesonsoft.com/go/twitter/',
        googleplusHref: 'http://mesonsoft.com/go/googleplus/',
      }}
    >
      <div id="adbox">
        <img src="/images/achievements.png" className="banner" alt="banner" />
      </div>
    </Layout>
  );
}