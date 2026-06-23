"use client";

import { useEffect } from "react";
import Hotjar from "@hotjar/browser";

const siteId = 6503489;
const hotjarVersion = 6;

export default function HotjarInit() {
  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion);
  }, []);

  return null;
}
