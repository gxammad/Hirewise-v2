import HeaderNine from '@/layout/headers/header-9';
import FooterNine from '@/layout/footers/footer-9';
import CallAction from './call-action';
import CollectionArea from './collection-area';
import Creators from './creators';
import HeroArea from './hero-area';
import LatestBlog from './latest-blog';
import LiveAuctions from './live-auctions';
import PopularCollection from './popular-collection';
import Testimonial from './testimonial';
import WorkProgress from './work-progress';
import BackToTopCom from '@/components/common/back-to-top-com';

const HomeNineMain = () => {
  return (
    <div className='home-nine page-wrapper text-white'>
      <HeaderNine/>
      <HeroArea/>
      <LiveAuctions/>
      <Creators/>
      <CollectionArea/>
      <WorkProgress/>
      <PopularCollection/>
      <CallAction/>
      <Testimonial/>
      <LatestBlog/>
      <FooterNine/>
      <BackToTopCom/>
    </div>
  );
};

export default HomeNineMain;