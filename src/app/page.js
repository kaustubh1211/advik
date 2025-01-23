"use client";
import Home2Main from "@/components/layout/main/Home2Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";
import { SessionProvider } from "next-auth/react";

const Home2 = () => {
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
