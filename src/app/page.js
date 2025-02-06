
import Home2Main from "@/components/layout/main/Home2Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";


const Home2 = () => {
  // const [isClient, setIsClient] = useState(false);
 
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);
  return (
    <PageWrapper
      isNavbarAppointmentBtn={true}
      footerBg={"dark"}
      isNotTransparent={true}
    >
      <Home2Main />
    </PageWrapper>
  );
};

export default Home2;
