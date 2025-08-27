import Brands from '@/components/brands/brands';

const LogoArea = () => {
  return (
    <>
      <div className="client-logo-area">
        <div className="container">
          <div className="logo-carousel-wrap pt-100 pb-90">
            {/* brands start */}
            <Brands brand_3={true} />
            {/* brands end */}
          </div>
          <hr/>
        </div>
      </div>
    </>
  );
};

export default LogoArea;