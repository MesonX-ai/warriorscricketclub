import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import Slideshow from '@/components/Slideshow';

export default function Gallery() {
  const slides = [
    { src: '/images/2019-1.png', alt: 'Warriors Cricket Club 2019 team photo', title: '2019' },
    { src: '/images/2019-2.png', alt: 'Warriors Cricket Club players at practice', title: '2019' },
    { src: '/images/2019-3.png', alt: 'Warriors Cricket Club team action shot', title: '2019' },
    { src: '/images/2019-4.png', alt: 'Warriors Cricket Club team celebration photo', title: '2019' },
    { src: '/images/2019-5.png', alt: 'Warriors Cricket Club team photo for 2019', title: '2019' },
    { src: '/images/2019-6.png', alt: 'Warriors Cricket Club 2019 squad photo', title: '2019' },
    { src: '/images/2019-7.png', alt: 'Warriors Cricket Club team lineup photo', title: '2019' },
    { src: '/images/2019-8.png', alt: 'Warriors Cricket Club team photo 2019', title: '2019' },
    { src: '/images/2018-1.png', alt: 'Warriors Cricket Club 2018 team photo', title: '2018' },
    { src: '/images/2018-2.png', alt: 'Warriors Cricket Club players in 2018', title: '2018' },
    { src: '/images/2018-3.png', alt: 'Warriors Cricket Club squad photo from 2018', title: '2018' },
    { src: '/images/2018-4.png', alt: 'Warriors Cricket Club team action from 2018', title: '2018' },
    { src: '/images/2017-1.png', alt: 'Warriors Cricket Club team photo from 2017', title: '2017' },
    { src: '/images/2017-2.png', alt: 'Warriors Cricket Club squad from 2017', title: '2017' },
    { src: '/images/2016-1.png', alt: 'Warriors Cricket Club team photo from 2016', title: '2016' },
    { src: '/images/2016-2.png', alt: 'Warriors Cricket Club players from 2016', title: '2016' },
    { src: '/images/2016-3.png', alt: 'Warriors Cricket Club squad photo from 2016', title: '2016' },
    { src: '/images/2013.png', alt: 'Warriors Cricket Club team photo from 2013', title: '2013' },
    { src: '/images/2012-1.png', alt: 'Warriors Cricket Club team photo from 2012', title: '2012' },
    { src: '/images/2011-1.png', alt: 'Warriors Cricket Club squad from 2011', title: '2011' },
    { src: '/images/2010-1.png', alt: 'Warriors Cricket Club team photo from 2010', title: '2010' },
    { src: '/images/2010-2.png', alt: 'Warriors Cricket Club players from 2010', title: '2010' },
    { src: '/images/2011-2.png', alt: 'Warriors Cricket Club team photo from 2011', title: '2011' },
    { src: '/images/2012-2.png', alt: 'Warriors Cricket Club squad from 2012', title: '2012' },
  ];

  return (
    <>
      <Seo
        title="Warriors Cricket Club Gallery | Photos and Videos"
        description="Browse the Warriors Cricket Club photo gallery, team images, and video highlights from recent seasons."
        canonical="/gallery"
        keywords="Warriors Cricket Club gallery, cricket photos Herndon Virginia, WCC gallery, team photos"
      />
      <Layout
        footerProps={{
          facebookHref: 'https://mesonsoft.com/go/facebook/',
          emailHref: 'https://www.mesonsoft.com/misc/contact/',
          twitterHref: 'http://mesonsoft.com/go/twitter/',
          googleplusHref: 'http://mesonsoft.com/go/googleplus/',
        }}
      >
        <div className="gallery-page">
          <div id="adbox" className="gallery">
            <div id="slides" className="slider-style">
              <div className="theme-default">
                <Slideshow images={slides} interval={4000} />
              </div>
            </div>
          </div>
          <div id="adbox" className="gallery-video">
            <iframe
              width="896"
              height="504"
              src="https://www.youtube.com/embed/K-427lQw7ow?autoplay=1"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div id="featured" className="gallery-link">
            <p>
              <a href="/hclphotogallery" target="_blank">Herndon Cricket League - Photo Gallery</a>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}
