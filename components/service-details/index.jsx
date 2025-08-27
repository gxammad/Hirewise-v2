import FooterTwo from "../../layout/footers/footer-2";
import HeaderThree from "../../layout/headers/header-3";
import Breadcrumb from "../breadcrumb/breadcrumb";
import BackToTopCom from "../common/back-to-top-com";
import ServicesDetailsArea from "./services-details-area";

export default function ServiceDetailsMain({serviceItem}) {
  return (
    <div className='page-wrapper'>
      <HeaderThree />
      <Breadcrumb title={'Service Details'} subtitle={'Service Details'} />
      <ServicesDetailsArea item={serviceItem} />
      <FooterTwo />
      <BackToTopCom/>
    </div>
  )
}
