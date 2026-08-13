import Head from 'next/head';
import ImageCarousel from '@/components/Carousel';

// Five unique HCL 2010 - Runner Up photographs.
// (The legacy MooFlow gallery listed hcl3.jpg twice — that duplicate is gone.)
const hclImages = [
  {
    src: '/images/hcl1.jpg',
    alt: 'Warriors Cricket Club HCL 2010 final match action',
    title: 'HCL 2010 - Runner Up',
  },
  {
    src: '/images/hcl2.jpg',
    alt: 'Warriors Cricket Club squad posed at HCL 2010',
    title: 'HCL 2010 - Runner Up',
  },
  {
    src: '/images/hcl3.jpg',
    alt: 'HCL 2010 Runner Up ceremony moment',
    title: 'HCL 2010 - Runner Up',
  },
  {
    src: '/images/hcl4.png',
    alt: 'Warriors Cricket Club HCL 2010 team group photo',
    title: 'HCL 2010 - Runner Up',
  },
  {
    src: '/images/hcl5.png',
    alt: 'HCL 2010 Runner Up team celebration',
    title: 'HCL 2010 - Runner Up',
  },
];

export default function HCLPhotoGallery() {
  return (
    <>
      <Head>
        <title>Warriors Cricket Club - HCL 2010 Runner Up Photo Gallery</title>
        <meta
          name="description"
          content="Browse the Warriors Cricket Club HCL 2010 Runner Up photo gallery. An autoplay slideshow of match action, squad portraits, and the runner-up ceremony."
        />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
        <div className="hcl-photo-gallery">
          <h1>Warriors Cricket Club</h1><div id="content">
          <ImageCarousel images={hclImages} autoplay interval={4500} />
          <p className="autoplay-hint">
            Autoplay slideshow &middot; pauses on hover &middot; navigate with arrows or the
            thumbnail reel
          </p>
        </div>
        <ul id="menu">
          <li>
            <a href="/gallery">Go back to the main gallery</a>
          </li>
        </ul>
      </div>
    </>
  );
}
