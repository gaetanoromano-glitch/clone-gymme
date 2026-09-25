import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Frame shared by the blog pages: the site navbar (with section links pointing
// back to the home) and the standard footer CTA.
export function BlogShell({ children, footerCta }: { children: ReactNode; footerCta?: string }) {
  return (
    <>
      <Navbar bannerVisible={false} sectionBase="/" />
      <main className="w-full px-5 pb-16 pt-[120px] md:px-10 md:pb-24 md:pt-[150px] lg:px-[80px]">{children}</main>
      <Footer ctaText={footerCta} />
    </>
  );
}
