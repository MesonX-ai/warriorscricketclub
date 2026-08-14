import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Seo
        title="Warriors Cricket Club | Cricket Club in Herndon, Virginia"
        description="Warriors Cricket Club is a community cricket club in Herndon, Virginia, founded in 2006 by Shiva Dhanuskodi (AniShiv) of Mesonsoft. Learn about our club, team, gallery, and events."
        canonical="/"
        keywords="Warriors Cricket Club, Shiva Dhanuskodi, AniShiv, Mesonsoft, cricket club Herndon Virginia, WCC, Herndon Cricket League, community cricket team"
      />
      <Layout>
        <div id="adbox">
          <img src="/images/banner.png" className="banner" alt="Warriors Cricket Club team banner in Herndon, Virginia" />
        </div>
        <div id="featured">
          <p>
            Warriors Cricket Club, formerly known as Lagaan Cricket Club, was founded in 2006 by a group of friends who share a passion for cricket - {' '}
            <a href="https://shiva-dhanuskodi.us" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
              Shiva Dhanuskodi
            </a>
            {' '}(aka AniShiv) of <a href="https://www.mesonsoft.com" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>Mesonsoft</a>.
            <div
              className="fb-like"
              style={{ width: '330px!important', color: '#aa9387!important' }}
              data-href="http://www.warriorscricketclub.us"
              data-layout="standard"
              data-action="like"
              data-show-faces="true"
              data-share="true"
            ></div>
          </p>
        </div>
      <br></br>
      <br></br>
      <div id="adbox">
        <iframe
          width="896"
          height="504"
          src="https://www.youtube.com/embed/K-427lQw7ow?autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <br></br>
      <br></br>
      <style>{`
        #u_0_3 {
          color: #aa9387;
          font-size: 13px;
          line-height: 24px;
          margin: 0 auto;
          padding: 0 0 24px;
          text-align: justify;
        }
      `}</style>
      <Script
        strategy="lazyOnload"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&appId=180208425345520&version=v2.3"
      />
      </Layout>
    </>
  );
}