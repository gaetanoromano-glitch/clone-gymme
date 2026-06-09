"use client";

import { useState } from "react";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <>
      {bannerVisible && (
        <AnnouncementBanner onClose={() => setBannerVisible(false)} />
      )}
      <Navbar bannerVisible={bannerVisible} />
      <main
        style={{
          paddingTop: bannerVisible ? 137 : 87,
          minHeight: "100vh",
        }}
        className="flex items-center justify-center"
      >
        <p className="text-muted-foreground">
          Clone target not yet built. Run{" "}
          <code className="font-mono text-foreground">/clone-website</code> to
          start.
        </p>
      </main>
    </>
  );
}
