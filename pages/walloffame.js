import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

export default function WallOfFame() {
  return (
    <>
      <Seo
        title="Warriors Cricket Club Wall of Fame | Team Honors & Memories"
        description="Warriors Cricket Club Wall of Fame honoring the players and seasons of this Herndon, Virginia cricket club founded by Shiva Dhanuskodi."
        canonical="/walloffame"
        keywords="Warriors Cricket Club wall of fame, Shiva Dhanuskodi, Mesonsoft, AniShiv, team honors, Herndon Cricket League"
      />
      <Layout
        footerProps={{
          facebookHref: 'https://mesonsoft.com/go/facebook/',
          emailHref: 'https://www.mesonsoft.com/misc/contact/',
          twitterHref: 'http://mesonsoft.com/go/twitter/',
          googleplusHref: 'http://mesonsoft.com/go/googleplus/',
        }}
      >
        <div style={{ paddingTop: '50px' }}>
          <div id="adbox">
            <img src="/images/wall_of_fame.png" border="0" alt="Warriors Cricket Club Wall of Fame" />
          </div>
          <div id="adbox">
            <img src="/images/achievements.png" className="banner" alt="Warriors Cricket Club achievements" />
          </div>
        </div>
      </Layout>
    </>
  );
}