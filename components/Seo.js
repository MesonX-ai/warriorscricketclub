import Head from 'next/head';

const SITE_URL = 'https://warriorscricketclub.us';
const DEFAULT_TITLE = 'Warriors Cricket Club | Cricket Club in Herndon, Virginia';
const DEFAULT_DESCRIPTION = 'Warriors Cricket Club (WCC) is a community cricket club based in Herndon, Virginia. Explore our team, gallery, wall of fame, and contact information.';
const DEFAULT_IMAGE = '/images/banner.png';

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical = SITE_URL,
  keywords = 'Warriors Cricket Club, cricket club Herndon Virginia, WCC, community cricket team Virginia, Herndon Cricket League',
  image = DEFAULT_IMAGE,
}) {
  const fullCanonical = canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`;
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: 'Warriors Cricket Club',
    sport: 'Cricket',
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Herndon',
      addressRegion: 'VA',
      addressCountry: 'US',
    },
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={fullCanonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullCanonical} />
        <meta property="og:image" content={fullImage} />
        <meta property="og:site_name" content="Warriors Cricket Club" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullImage} />
        <meta name="theme-color" content="#f6e6bf" />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
