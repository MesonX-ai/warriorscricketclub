import { useState, useEffect } from 'react';

export default function Footer({
  facebookHref = 'http://mesonsoft.com/go/facebook/',
  emailHref = 'http://www.mesonsoft.com/misc/contact/',
  twitterHref = 'http://mesonsoft.com/go/twitter/',
  googleplusHref = 'http://mesonsoft.com/go/googleplus/',
}) {
  // Initialise from the build timestamp so the static export always ships
  // with a real year (no empty placeholder, no hydration mismatch) ...
  const [year, setYear] = useState(() => new Date().getFullYear());

  // ... then refresh it from the viewer's clock on mount. This keeps
  // long-lived static exports correct well past their build year and
  // works reliably under client-side (SPA) navigation, where inline
  // <script> tags are NOT re-executed by React.
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <div id="footer" style={{ marginTop: '0px' }}>
        <div id="connect" className="footer-connect">
          <a href={facebookHref} target="_blank" className="facebook"></a>
          <a href={emailHref} target="_blank" className="email"></a>
          <a href={twitterHref} target="_blank" className="twitter"></a>
          <a href={googleplusHref} target="_blank" className="googleplus"></a>
        </div>
        <p>
          Copyright &copy; {year}{' '}
          <a href="https://www.mesonsoft.com" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            Mesonsoft LLC
          </a>
          , All rights reserved.{' '}
          <a href="https://shiva-dhanuskodi.us" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            - Shiva Dhanuskodi
          </a>
        </p>
      </div>
    </>
  );
}