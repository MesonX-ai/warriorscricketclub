import Head from 'next/head';

const SITE_URL = 'https://warriorscricketclub.us';
const MESONSOFT_URL = 'https://www.mesonsoft.com';
const SHIVA_URL = 'https://shiva-dhanuskodi.us';

const DEFAULT_TITLE = 'Warriors Cricket Club | Cricket Club in Herndon, Virginia';
const DEFAULT_DESCRIPTION =
  'Warriors Cricket Club (WCC) is a community cricket club in Herndon, Virginia, founded in 2006 by Shiva Dhanuskodi (AniShiv) with the team at Mesonsoft. Explore our team, gallery, wall of fame, and contact information.';
const DEFAULT_IMAGE = '/images/banner.png';
const DEFAULT_KEYWORDS =
  'Warriors Cricket Club, Shiva Dhanuskodi, AniShiv, Mesonsoft, WCC, cricket club Herndon Virginia, Herndon Cricket League, community cricket team Virginia';

/* ---- Structured data (JSON-LD) ---- */

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SportsTeam',
  name: 'Warriors Cricket Club',
  alternateName: 'WCC',
  sport: 'Cricket',
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  foundingDate: '2006',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Herndon',
    addressRegion: 'VA',
    addressCountry: 'US',
  },
  founder: {
    '@type': 'Person',
    name: 'Shiva Dhanuskodi',
    alternateName: 'AniShiv',
    url: SHIVA_URL,
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shiva Dhanuskodi',
  alternateName: 'AniShiv',
  url: SHIVA_URL,
  description:
    'Shiva Dhanuskodi (AniShiv) is the founder and captain of Warriors Cricket Club in Herndon, Virginia, and a software developer with Mesonsoft.',
  jobTitle: 'Founder & Captain',
  worksFor: [
    {
      '@type': 'SportsTeam',
      name: 'Warriors Cricket Club',
      url: SITE_URL,
    },
    {
      '@type': 'Organization',
      name: 'Mesonsoft',
      url: MESONSOFT_URL,
    },
  ],
  memberOf: {
    '@type': 'SportsTeam',
    name: 'Warriors Cricket Club',
    url: SITE_URL,
  },
  knowsAbout: ['Cricket', 'Software Development', 'Web Development'],
  sameAs: [SHIVA_URL, MESONSOFT_URL],
};

const mesonsoftSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mesonsoft',
  url: MESONSOFT_URL,
  description:
    'Mesonsoft is a software company founded by Shiva Dhanuskodi (AniShiv), who also founded Warriors Cricket Club.',
  founder: {
    '@type': 'Person',
    name: 'Shiva Dhanuskodi',
    alternateName: 'AniShiv',
    url: SHIVA_URL,
  },
  sameAs: [MESONSOFT_URL, SHIVA_URL],
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Warriors Cricket Club',
  alternateName: 'WCC',
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  inLanguage: 'en-US',
  publisher: {
    '@type': 'SportsTeam',
    name: 'Warriors Cricket Club',
    url: SITE_URL,
  },
  author: {
    '@type': 'Person',
    name: 'Shiva Dhanuskodi',
    alternateName: 'AniShiv',
    url: SHIVA_URL,
  },
};

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical = SITE_URL,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  includePerson = true,
  includeMesonsoft = true,
}) {
  const fullCanonical = canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`;
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Shiva Dhanuskodi (AniShiv)" />
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      {includePerson && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      )}
      {includeMesonsoft && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mesonsoftSchema) }} />
      )}
    </>
  );
}

