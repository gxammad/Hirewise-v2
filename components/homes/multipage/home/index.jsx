import Header from '@/layout/headers/header';
import AboutSection from './about-section';
import Blogs from './blogs';
import FeatureServices from './f-services';
import GalleryArea from './gallery-area';
import HeroArea from './hero-area';
import PricingArea from './pricing-area';
import Services from './services';
import WorkProgress from './work-progress';
import Footer from '@/layout/footers/footer';
import BackToTopCom from '@/components/common/back-to-top-com';

const HomeMain = () => {
  return (
    <div className="page-wrapper">
      <Header/>
      <HeroArea/>
      <FeatureServices/>
      <AboutSection/>
      <Services/>
      <WorkProgress/>
      <PricingArea/>
      <GalleryArea/>
      <Blogs/>
      <Footer/>
      <BackToTopCom/>
    </div>
  );
};

export default HomeMain;