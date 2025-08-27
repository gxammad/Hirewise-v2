import HeaderEight from '@/layout/headers/header-8';
import FooterEight from '@/layout/footers/footer-8';
import BlogArea from './blog-area';
import CallToAction from './call-to-action';
import CounterSection from './counter-section';
import FeatureAbout from './feature-about';
import HeroSlider from './hero-slider';
import ProjectSection from './project-section';
import ProtectReadyArea from './protect-ready-area';
import ServicesArea from './services-area';
import TestimonialArea from './testimonial-area';
import BackToTopCom from '@/components/common/back-to-top-com';

const HomeEightMain = () => {
  return (
    <div className='page-wrapper home-eight'>
      <HeaderEight/>
      <HeroSlider/>
      <FeatureAbout/>
      <ServicesArea/>
      <CounterSection/>
      <ProtectReadyArea/>
      <ProjectSection/>
      <TestimonialArea/>
      <BlogArea/>
      <CallToAction/>
      <FooterEight/>
      <BackToTopCom/>
    </div>
  );
};

export default HomeEightMain;