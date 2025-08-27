import BackToTopCom from "../common/back-to-top-com";
import ContactSection from "./contact-section";
import Map from "./map";

const ContactMain = () => {
  return (
    <div className="page-wrapper">
      <ContactSection />
      <Map />
      <BackToTopCom />
    </div>
  );
};

export default ContactMain;