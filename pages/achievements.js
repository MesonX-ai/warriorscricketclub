import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

export default function Achievements() {
  return (
    <>
      <Seo
        title="Warriors Cricket Club Achievements | Shiva Dhanuskodi & WCC Honors"
        description="Warriors Cricket Club achievements, including runner-up finishes in the Herndon Cricket League and championship highlights, founded by Shiva Dhanuskodi."
        canonical="/achievements"
        keywords="Warriors Cricket Club achievements, Shiva Dhanuskodi, Mesonsoft, AniShiv, Herndon Cricket League, WCC trophies"
      />
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
          <img src="/images/achievements.png" className="banner" alt="Warriors Cricket Club achievements" />
        </div>
      </Layout>
    </>
  );
}