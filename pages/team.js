import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

export default function Team() {
  return (
    <>
      <Seo
        title="Warriors Cricket Club Team | Players and Squad"
        description="Explore the Warriors Cricket Club team roster, squad photos, and player lineup from recent seasons."
        canonical="/team"
        keywords="Warriors Cricket Club team, Warriors squad, cricket players Herndon VA, WCC roster"
      />
      <Layout
        footerProps={{
          facebookHref: 'https://mesonsoft.com/go/facebook/',
          emailHref: 'https://www.mesonsoft.com/misc/contact/',
          twitterHref: 'http://mesonsoft.com/go/twitter/',
          googleplusHref: 'http://mesonsoft.com/go/googleplus/',
        }}
      >
        <center>
          <a href="/squad" className="player-list">Warriors Squad - Player List</a>
        </center>
        <div id="adbox">
          <img src="/images/Warriors_Team_2018.png" className="banner" alt="Warriors Cricket Club team photo from 2018" />
        </div>
        <div id="adbox">
          <img src="/images/Warriors2019_1.png" width="896" className="banner team-vignette" alt="Warriors Cricket Club squad photo from 2019" />
        </div>
        <div id="adbox">
          <img src="/images/Warriors2019_2.png" width="896" className="banner team-vignette" alt="Warriors Cricket Club players in action" />
        </div>
        <div id="adbox">
          <img src="/images/Warriors2019_3.png" width="896" className="banner team-vignette" alt="Warriors Cricket Club cricket team group photo" />
        </div>
        <div id="adbox">
          <img src="/images/Warriors2019_4.png" width="896" className="banner team-vignette" alt="Warriors Cricket Club official team image" />
        </div>
        <div id="adbox">
          <img src="/images/Warriors2019_5.png" width="896" className="banner team-vignette" alt="Warriors Cricket Club team photo featuring players" />
        </div>
        <div id="adbox">
          <img src="/images/Warriors_Squad_2018_1.png" width="896" className="banner team-vignette" alt="Warriors Cricket Club squad photo from the 2018 season" />
        </div>
        <div id="adbox">
          <img src="/images/Warriors_Squad_2018_2.png" width="896" className="banner team-vignette" alt="Warriors Cricket Club players line-up for 2018" />
        </div>
        <div id="adbox">
          <img src="/images/Warriors_Squad_2018_3.png" width="896" className="banner team-vignette" alt="Warriors Cricket Club squad details and team photo" />
        </div>
      </Layout>
    </>
  );
}