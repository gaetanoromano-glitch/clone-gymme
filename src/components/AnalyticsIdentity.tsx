"use client";

import { useEffect } from "react";
import { initializeAnalyticsIdentity } from "@/lib/analyticsIdentity";

export function AnalyticsIdentity() {
  useEffect(() => {
    initializeAnalyticsIdentity();
  }, []);

  return null;
}
