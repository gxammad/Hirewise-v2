import FooterTwo from "@/layout/footers/footer-2";
import HeaderThree from "@/layout/headers/header-3";
import Breadcrumb from "../breadcrumb/breadcrumb";
import BackToTopCom from "../common/back-to-top-com";
import NextPrevPost from "./next-prev-post";
import PortfolioDetailsArea from "./portfolio-details-area";
import RelatedProjects from "./related-projects";

export default function PortfolioDetailsMain({portfolioItem}) {
  return (
    <div className='page-wrapper'>
      <HeaderThree />
      <Breadcrumb title={'Portfolio Details'} subtitle={'Portfolio Details'} />
      <PortfolioDetailsArea item={portfolioItem} />
      <NextPrevPost />
      <RelatedProjects />
      <FooterTwo />
      <BackToTopCom/>
    </div>
  )
}
