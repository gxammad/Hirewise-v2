'use client';

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap.min.js");
}
const Wrapper = ({children}) => {
  return (
    <>
      {children}
    </>
  );
};

export default Wrapper;