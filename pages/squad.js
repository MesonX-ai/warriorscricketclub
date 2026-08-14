import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

export default function Squad() {
  return (
    <>
      <Seo
        title="Warriors Cricket Club Squad | Team Roster & Players"
        description="Warriors Cricket Club squad and player roster from Herndon, Virginia. Join the team founded by Shiva Dhanuskodi and the Mesonsoft cricket community."
        canonical="/squad"
        keywords="Warriors Cricket Club squad, Shiva Dhanuskodi, Mesonsoft, AniShiv, cricket players Herndon Virginia, WCC roster"
      />
      <Layout
        footerProps={{
          facebookHref: 'https://mesonsoft.com/go/facebook/',
          emailHref: 'https://www.mesonsoft.com/misc/contact/',
          twitterHref: 'http://mesonsoft.com/go/twitter/',
          googleplusHref: 'http://mesonsoft.com/go/googleplus/',
        }}
      >
        <div id="adbox">
          <img src="/images/squad1.PNG" className="banner" alt="Warriors Cricket Club squad photo 1" />
          <img src="/images/squad2.PNG" className="banner" alt="Warriors Cricket Club squad photo 2" />
        </div>
      </Layout>
    </>
  );
}