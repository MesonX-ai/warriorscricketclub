import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, showHeaderFooter = true, footerProps = {}, showAchievements = false }) {
  return (
    <>
      {showHeaderFooter && <Header showAchievements={showAchievements} />}
      <div id="contents">{children}</div>
      {showHeaderFooter && <Footer {...footerProps} />}
    </>
  );
}