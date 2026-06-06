# Behaviors — everfit.io

## Global Behaviors

### Navbar
- **Fixed position**, top: 50px (anchored below announcement banner)
- **Background:** Always transparent (`rgba(0,0,0,0)`) with strong backdrop blur (`backdrop-blur-2xl = blur(40px)`)
- **Logo swap:** At scroll=0, full wordmark `white-logo.svg` shown; after scrolling past hero, switches to icon mark `logo-sticky.svg`
- **Text color:** Nav links change from white (on hero) to dark (`rgb(27,27,27)`) when background becomes visible
- **Transition:** `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **IMPLEMENTATION:** CSS transition on `color` + JS class toggle based on scroll position. The nav has class `group` and children change based on scroll detection.

### Announcement Banner
- **Fixed bar** at very top, 50px height
- **Close button** (×) - when clicked, banner hides and nav moves to `top: 0`
- **Background:** `rgb(0, 0, 0)` solid black

### Scroll Entry Animations
- Elements animate in with `opacity: 0 → 1` + `translateY(20px → 0)` when entering viewport
- Triggered via IntersectionObserver
- Duration: ~0.5s, ease-out

---

## Hero Section Behaviors

### Background Image Carousel
- **Type:** Slick.js auto-play carousel
- **Images:** 4 slides (fitness-coaches, gym-studio, nutrition-coaches, sport-coaches)
- **Each slide:** Has a regular `xl` image + a `blur` version
- **Auto-advance:** ~3-5 seconds per slide
- **Transition:** Cross-fade between images
- **Dark overlay:** Each image has a dark gradient overlay for text readability

### Animated Text Cycling (second line)
- **Type:** Slick.js text slider (separate from background)
- **Items:** "Fitness Coaches", "Gyms & Studios", "Nutrition Coaches", "Sport Coaches"
- **Font:** TWK Everett 700, 56px, `rgba(255,255,255,0.8)`, letter-spacing: -2.8px
- **Synced with background:** Each text slides in sync with corresponding background image

### Hero CTA Form
- **Email input + "Start free trial" button**
- **Button hover:** subtle bg/opacity change

---

## Industry Solution Section Behaviors

### Feature Tabs (1, 2, 3, 4)
- **Type:** Click-driven tab switcher
- **Active tab indicator:** Underline or highlighted number badge
- **Content swap:** Feature description + screenshot changes per tab
- **Transition:** opacity fade or slide

---

## ForEveryone / Feature Accordion Sections

### PLAN & COACH — Tab Navigation
- **Interaction model:** CLICK-DRIVEN horizontal tabs
- **4 tabs:** Client Programming, Macros Tracking, Habit Tracking, On-Demand Training
- **Active tab:** Underlined (black border-bottom)
- **Inactive tabs:** Gray text, no underline
- **Right screenshot:** Changes with tab click
- **Transition:** opacity/fade transition on screenshot change

### MOTIVATE & MEASURE — Scroll-Driven Accordion
- **Interaction model:** SCROLL-DRIVEN — items expand as they enter viewport
- **Left:** Vertical list; items expand with description text when scrolled into view
- **Active item:** Has bottom border line (black), description text visible
- **Inactive items:** Just title + icon, no description
- **Right:** Sticky app screenshot panel updates based on active accordion item
- **Mechanism:** IntersectionObserver watches each accordion item; when it enters center of viewport, it becomes active
- **Transition:** Height expand + opacity on description text

### ENGAGE — Scroll-Driven Accordion
- Same mechanism as MOTIVATE & MEASURE above
- Items: 1-1 Messaging, Scheduled Messaging, Community Forum, Broadcast Messaging, Announcements

### SCALE — Scroll-Driven Accordion  
- Same mechanism as above
- Items: Streamline Onboarding, Automate Workflows, Integrated Payments, HSA/FSA, Marketplace for Lead Generation (BETA)

---

## Testimonials Section Behaviors

### Testimonial Carousel
- **Type:** Slick.js horizontal carousel
- **Cards:** 5 testimonials visible at a time (partially)
- **Auto-play or click navigation**
- **Each card:** Has profile photo top + quote + name + title

---

## Hover States

### Navigation Links
- **Hover:** Text color darkens / underline appears
- **Transition:** 0.2s ease

### Buttons (START FREE TRIAL)
- **Default:** Black bg, white text, rounded-full
- **Hover:** Slightly lighter black / opacity change
- **Transition:** 0.2s ease

### Accordion items
- **Hover:** Background lightens slightly (subtle)

### Testimonial cards
- **Hover:** Slight lift / shadow increase

### Footer links
- **Hover:** Underline, color darkens

---

## Responsive Behavior

### Desktop (1440px)
- Nav: Full horizontal with all links visible
- Hero: Full bleed 849px height
- Feature sections: 2-column layout (text left, screenshot right)

### Tablet (768px)
- Nav: Collapses to hamburger
- Hero: Slightly smaller height
- Feature sections: Stack vertically

### Mobile (390px)
- Nav: Hamburger menu
- Hero: Full width, reduced font size
- Feature sections: Single column, screenshots below text
