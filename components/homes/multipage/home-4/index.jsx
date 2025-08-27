import FooterFour from '@/layout/footers/footer-4';
import HeaderFour from '@/layout/headers/header-4';
import AboutArea from './about-area';
import AboutTabSection from './about-tab-section';
import BlogArea from './blog-area';
import GallerySection from './gallery-section';
import HeroArea from './hero-area';
import PricingArea from './pricing-area';
import Services from './services';
import TeamArea from './team-area';
import WorkProgress from './work-progress';
import BackToTopCom from '@/components/common/back-to-top-com';

const HomeFourMain = () => {
  return (
    <div className='page-wrapper'>
      <HeaderFour/>
      <HeroArea/>
      <Services/>
      <AboutArea/>
      <AboutTabSection/>
      <GallerySection/>
      <TeamArea/>
      <WorkProgress/>
      <PricingArea/>
      <BlogArea/>
      <FooterFour/>
      <BackToTopCom/>
    </div>
  );
};

export default HomeFourMain;