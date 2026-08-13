import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Warriors Cricket Club"
        description="Get in touch with Warriors Cricket Club in Herndon, Virginia for cricket club inquiries and team information."
        canonical="/contact"
        keywords="contact Warriors Cricket Club, Herndon cricket club contact, WCC contact"
      />
      <Layout
        footerProps={{
          facebookHref: 'http://mesonsoft.com/go/facebook/',
          emailHref: 'http://www.mesonsoft.com/misc/contact/',
          twitterHref: 'http://mesonsoft.com/go/twitter/',
          googleplusHref: 'http://mesonsoft.com/go/googleplus/',
        }}
      >
        <div id="adbox">
          <div className="parent">
            <img src="/images/contact.png" className="image1" alt="Warriors Cricket Club contact information" />
            <img src="/images/shiva_r_dhanuskodi.png" className="image2" alt="Shiva R Dhanuskodi, contact for Warriors Cricket Club" />
          </div>
        </div>
        <div id="featured">
          <p>
            You can also reach us at{' '}
            <a href="https://shiva-dhanuskodi.us" target="_blank" style={{ color: 'inherit', fontWeight: 'bold', textDecoration: 'none' }}>
              www.shiva-dhanuskodi.us
            </a>{' '}
            and{' '}
            <a href="https://www.mesonsoft.com" target="_blank" style={{ color: 'inherit', fontWeight: 'bold', textDecoration: 'none' }}>
              www.mesonsoft.com
            </a>
          </p>
        </div>
      </Layout>
    </>
  );
}