// Everfit site content types

export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface HeroSlide {
  coachType: string;
  bgImage: string;
  blurImage: string;
}

export interface IndustryFeature {
  id: number;
  icon: string;
  badge?: string; // "AI POWERED"
  title: string;
  description: string;
  screenshot: string;
}

export interface ServiceTier {
  title: string;
  subtitle: string;
  features: string[];
  bgColor: string;
  textColor: string;
  image: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description?: string;
  badge?: string;
  screenshot?: string;
}

export interface FeatureSection {
  id: string;
  badge: { icon: string; label: string; color: string };
  heading: string;
  subheading?: string;
  items: FeatureItem[];
}

export interface Stat {
  prefix?: string;
  value: string;
  suffix?: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  photo: string;
  bgColor: string;
}

export interface FooterColumn {
  label: string;
  links: { label: string; href: string; badge?: string }[];
}
