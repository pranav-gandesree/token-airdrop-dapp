"use client";
import { ReactNode } from "react";
import { WalletProviders } from "./wallet-provider";
// import { AnchorProgramProvider } from "./anchor-provider"
export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
        <WalletProviders>
          {children}
          {/* <AnchorProgramProvider>{children}</AnchorProgramProvider> */}
        </WalletProviders>
    </>
  );
};