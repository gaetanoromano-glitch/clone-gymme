# Page Topology — everfit.io

## Overview
- **Total page height:** ~10,380px
- **Viewport:** 1440px design width
- **Framework:** WordPress (original), cloned as Next.js 16 App Router
- **Scroll container:** `<body>` — no smooth scroll library detected
- **Z-index layers:** Announcement banner (z-sticky) > Navbar (z=1020) > Page content

---

## Section Map (top to bottom)

### 1. AnnouncementBanner
- **Position:** Fixed at top, z-index: above navbar
- **Top:** 0px
- **Height:** 50px
- **Interaction:** Static, dismissible (close × button)
- **Color:** Black bg (#000), white text
- **Content:** "Join us every Wednesday for Everfit Foundations 101 Webinar 👉Sign Up Here"

### 2. Navbar
- **Position:** Fixed, `top: 50px` (below banner), z=1020
- **Height:** 87px
- **Interaction:** Scroll-driven — stays transparent with `backdrop-blur-2xl` at ALL scroll positions (no bg change)
- **State initial (scroll=0):** Transparent bg, white logo (white-logo.svg), white text nav links
- **State scrolled:** Transparent bg, icon-only logo (logo-sticky.svg), dark text nav links
- **Logo:** Changes from full wordmark (`white-logo.svg`) to small icon (`logo-sticky.svg`) on scroll
- **Transition:** `0.3s cubic-bezier(0.4, 0, 0.2, 1)` on all properties

### 3. HeroSection
- **Position:** Flow content
- **Top:** ~50px (behind fixed nav)
- **Height:** 849px
- **Interaction:** Time-driven — Slick carousel cycles background images + animated text
- **Background:** Slick carousel of 4 full-bleed images (one per coach type)
- **Animated text:** H2 cycling through: Fitness Coaches → Gyms & Studios → Nutrition Coaches → Sport Coaches
- **Static text lines:** "The All-In-One Platform for" (top) and "To Level Up Your Business" (bottom)
- **CTA:** Email input + "Start free trial" button
- **Overlay:** Dark gradient overlay on images for text readability

### 4. IndustrySolutionSection
- **Top:** ~999px, Height: 1097px
- **Interaction:** Click-driven tabs (1, 2, 3, 4) selecting feature cards
- **Content:** "The industry's Premier Solution for Health and Fitness Coaching"
- **Tabs:** AI-Powered Workout Programming, AI-Powered Nutrition, Habit Coaching, Sport Coaching
- **Below:** Logo carousel (trusted brands)

### 5. ServiceTierSection
- **Top:** ~2096px, Height: 780px
- **Interaction:** Static
- **Content:** "Offer All Your Training Services Seamlessly In One Place"
- **Layout:** 2 side-by-side cards
  - Left: "High Ticket Clients" (dark/black card)
  - Right: "Low Ticket Clients" (lighter card)

### 6. FiveYearsSection
- **Top:** ~2826px, Height: 354px
- **Interaction:** Static
- **Content:** "5 Years OF Everfit / Never Not Building" promo
- **Layout:** Neon yellow-green card (left) + photo grid (right)

### 7. ForEveryoneSection (container)
- **Top:** ~3280px, Height: 4497px
- **Interaction:** Contains scroll-driven sub-sections
- **Header:** "For Everyone from Inspiring Coaches to Training Organizations"
- **Sub-sections (scroll-driven accordion):**

#### 7a. PlanCoachSection
- **Top:** ~3631px, Height: 816px
- **Interaction:** Click-driven horizontal tabs (4 tabs)
- **Badge:** Black icon + "PLAN & COACH" label
- **Tabs:** Client Programming, Macros Tracking, Habit Tracking, On-Demand Training
- **Layout:** Left = tab content + text, Right = sticky app screenshot

#### 7b. MotivateSection
- **Top:** ~4447px, Height: ~700px+
- **Interaction:** Scroll-driven vertical accordion
- **Badge:** Green circle icon + "MOTIVATE & MEASURE"
- **Items:** Data Analytics, Goal Setting, Fitness Challenges, Check-ins, Integrations
- **Layout:** Left = accordion list, Right = sticky app screenshots

#### 7c. EngageSection
- **Top:** ~5200px, Height: ~700px+
- **Interaction:** Scroll-driven vertical accordion
- **Badge:** Blue/dark icon + "ENGAGE"
- **Items:** 1-1 Messaging, Scheduled Messaging, Community Forum, Broadcast Messaging, Announcements

#### 7d. ScaleSection
- **Top:** ~5900px, Height: ~700px+
- **Interaction:** Scroll-driven vertical accordion
- **Badge:** Orange/red icon + "SCALE"
- **Items:** Streamline Onboarding, Automate Workflows, Integrated Payments, HSA/FSA, Marketplace (BETA)

#### 7e. BrandingSection
- **Top:** ~6882px, Height: 785px
- **Interaction:** Scroll-driven vertical accordion
- **Badge:** Purple icon + "BRANDING"
- **Items:** Custom Branded App, White Label Solution
- **CTA:** "Contact Sales"

### 8. RatingsSection
- **Top:** ~7927px, Height: 796px
- **Interaction:** Click/auto-play carousel for testimonials
- **Content:** "#1 Rated Personal Training Platform" + 5 stat metrics + testimonial cards carousel

### 9. CTASection
- **Top:** ~8873px, Height: 604px
- **Interaction:** Static
- **Content:** "Join the Coaching Evolution today!" + "Start 30-day trial" button
- **Background:** Dark with app mockup image

### 10. Footer
- **Top:** ~9477px, Height: ~900px
- **Interaction:** Static (link hover states)
- **Content:** 4 column links + social icons + giant gradient "everfit" text + copyright
- **Giant text:** "everfit" in large letters with blue-to-purple gradient fill

---

## Dependencies
- Navbar overlays everything (z=1020)
- AnnouncementBanner sits above Navbar
- Hero section height accounts for 50px banner + 87px nav = content starts at ~137px visually
- ForEveryoneSection uses `position: sticky` on the right-side screenshots
