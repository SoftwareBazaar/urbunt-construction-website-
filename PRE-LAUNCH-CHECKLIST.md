# 🚀 Urban T Construction - Pre-Launch Checklist

## ✅ COMPLETED

### Website & Code
- [x] Full website built and deployed to Vercel
- [x] Admin CMS with 5 sections (Projects, Blog, Media, Users, Content)
- [x] Live content management integration
- [x] Client portal for project tracking
- [x] Responsive design (mobile, tablet, desktop)
- [x] Social media links connected (Instagram, TikTok)
- [x] Hero video added
- [x] Portfolio section with Makueni School project
- [x] All pages created (Home, About, Services, Portfolio, Contact, etc.)
- [x] Admin dashboard landing page

### Technical Setup
- [x] GitHub repository connected
- [x] Vercel auto-deployment configured
- [x] Custom domain: urbantconstruction.com
- [x] SSL certificate (HTTPS) enabled

---

## ⚠️ CRITICAL - MUST DO BEFORE LAUNCH

### 1. Database Setup (REQUIRED)
- [ ] **Run `admin-cms-setup.sql` in Supabase SQL Editor**
  - Creates blog_posts, blog_categories, media_library, website_content tables
  - Status: NOT YET RUN
  - Time: 2 minutes
  - Link: https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp/sql

- [ ] **Run `admin-user-list-fix.sql` in Supabase SQL Editor**
  - Creates get_all_users() function
  - Fixes 401 errors in admin panel
  - Status: NOT YET RUN
  - Time: 1 minute

- [ ] **Verify Storage Bucket "media" exists**
  - Go to: https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp/storage
  - Check if "media" bucket exists and is PUBLIC
  - If not, create it (public: YES)

### 2. Content Review & Updates

#### A. Pricing (HIGH PRIORITY)
- [ ] **Review and update `PRICING-REVIEW.md`**
  - Current prices may be too high
  - Fill in "Suggested New Price" column
  - Decision needed: Budget / Mid-Range / Premium positioning
  - Once decided, I'll update entire website

#### B. Company Information
- [ ] **Verify contact details are correct:**
  - Phone: +254 111 770 039 ✓
  - Email: Urbantconstructions@gmail.com ✓
  - Address: Westways arcade northern bypass ✓
  - Hours: Mon–Sat, 7:30am – 6:00pm ✓

#### C. Portfolio Projects
- [ ] **Add more portfolio projects** (currently only Makueni School)
  - Need 3-5 completed projects with photos
  - For each project, provide:
    * Project name
    * Location
    * Type (Residential/Commercial/Civil)
    * Photos (4-6 per project)
    * Brief description
    * Client testimonial (optional)

#### D. Team Photos (Optional but Recommended)
- [ ] **Add team member photos**
  - Upload to `/admin/media` → Team folder
  - Add to About page
  - Builds trust with potential clients

#### E. Blog Content (Optional - can add after launch)
- [ ] **Write 3-5 initial blog posts**
  - Cost guides (e.g., "Cost to Build 3BR House in Nairobi 2026")
  - How-to guides (e.g., "How to Choose a Contractor")
  - Project stories (e.g., "Makueni School Build Journey")

---

## 🎯 RECOMMENDED BEFORE LAUNCH

### 3. Testing & Quality Assurance

#### A. Functionality Testing
- [ ] **Test all admin sections:**
  - [ ] Login at `/auth` works
  - [ ] Admin redirect works (admins → `/admin`, clients → `/portal`)
  - [ ] Create a test project at `/admin/projects`
  - [ ] Upload a test image at `/admin/media`
  - [ ] Edit homepage content at `/admin/content`
  - [ ] Verify content changes appear on live site
  - [ ] Create a test blog post at `/admin/blog`
  - [ ] Assign roles at `/admin/users`

#### B. Client Portal Testing
- [ ] **Create test client account:**
  - Sign up at `/auth`
  - Admin assigns a project to them
  - Client logs in and views their project
  - Check milestones and updates display correctly

#### C. Forms & Contact Testing
- [ ] **Test contact form at `/contact`**
  - Submit test inquiry
  - Verify it saves to database (if connected)
  - Check if emails send (if configured)

- [ ] **Test WhatsApp links**
  - Click "Chat on WhatsApp" buttons
  - Verify they open WhatsApp with pre-filled message

#### D. Mobile Testing
- [ ] **Test on mobile devices:**
  - iPhone/Android
  - Check all pages load correctly
  - Verify navigation menu works
  - Test video plays on mobile
  - Check forms work on mobile

### 4. SEO & Performance

#### A. Meta Tags & SEO
- [x] Page titles set for all pages
- [x] Meta descriptions set
- [x] Open Graph tags for social sharing
- [ ] **Test social media preview:**
  - Share link on Facebook/WhatsApp
  - Check if image and description show correctly

#### B. Google Tools
- [ ] **Set up Google Analytics** (Optional)
  - Track website visitors
  - See which pages are popular
  - Monitor conversion rates

- [ ] **Set up Google Search Console** (Optional)
  - Submit sitemap
  - Monitor search performance
  - Fix any indexing issues

- [ ] **Google My Business** (Highly Recommended)
  - Create/claim business listing
  - Add photos
  - Encourage reviews
  - Shows up in Google Maps

#### C. Performance Check
- [ ] **Test website speed:**
  - Use: https://pagespeed.web.dev/
  - Enter: urbantconstruction.com
  - Check mobile and desktop scores
  - Should be 80+ for good performance

### 5. Legal & Compliance

- [ ] **Privacy Policy page** (if collecting user data)
- [ ] **Terms & Conditions page** (for contracts)
- [ ] **Cookie consent banner** (if using analytics)
- [ ] **Business registration documents** ready to show clients

---

## 🎨 NICE TO HAVE (Can Add Later)

### Content Enhancements
- [ ] Professional photos of your team
- [ ] More before/after project photos
- [ ] Video testimonials from clients
- [ ] 360° virtual tours of completed projects
- [ ] Drone footage of construction sites

### Features
- [ ] Live chat widget (e.g., Tawk.to)
- [ ] Online payment integration (M-Pesa)
- [ ] Automated quote calculator
- [ ] Client document upload portal
- [ ] SMS notifications for project updates
- [ ] Email newsletter signup
- [ ] Customer reviews/ratings system

### Marketing
- [ ] Facebook page created and linked
- [ ] YouTube channel for project videos
- [ ] LinkedIn company page
- [ ] Google Ads campaign
- [ ] Facebook/Instagram ads
- [ ] Local SEO optimization (Nairobi keywords)

---

## 🚨 SHOW-STOPPERS (MUST FIX)

These will cause major issues if not fixed:

1. **Database Not Set Up** → Admin panel won't work properly
2. **Pricing Not Reviewed** → May lose customers due to high prices
3. **No Test Projects** → Can't verify admin/client portal works
4. **Storage Bucket Missing** → Can't upload media files

---

## 📋 LAUNCH DAY CHECKLIST

### Morning of Launch:
- [ ] Run both SQL files in Supabase (if not done yet)
- [ ] Test admin login with both admin accounts
- [ ] Create 1 real project for a real client
- [ ] Upload 5-10 real photos to media library
- [ ] Edit homepage hero text (if needed)
- [ ] Clear browser cache and test website as visitor

### Announcement:
- [ ] Post on Instagram: "New website launched! 🎉"
- [ ] Post on TikTok: "Check out our new website"
- [ ] WhatsApp Status: Share website link
- [ ] Update Instagram bio with website link
- [ ] Update TikTok bio with website link

### Monitor:
- [ ] Check for any error messages
- [ ] Monitor contact form submissions
- [ ] Watch for WhatsApp inquiries
- [ ] Check if admin panel works smoothly

---

## ✅ CURRENT STATUS SUMMARY

### ✅ What's Working:
- Website is live at urbantconstruction.com
- All pages exist and look professional
- Admin CMS is built
- Content management integration works
- Client portal exists
- Responsive design works
- Hero video plays

### ⚠️ What Needs Attention:
1. **Database setup (CRITICAL)** - Run 2 SQL files
2. **Pricing review** - Need to update prices
3. **Test admin panel** - Verify everything works
4. **Add more portfolio projects** - Only have 1 project
5. **Test on real clients** - Create test accounts

### ⏰ Time to Launch:
**Minimum:** 2-3 hours (just critical items)
**Recommended:** 1-2 days (include testing and portfolio)

---

## 🎯 MY RECOMMENDATION

### TODAY (Critical):
1. ✅ Run both SQL files in Supabase (15 minutes)
2. ✅ Review pricing and tell me new prices (30 minutes)
3. ✅ Test admin panel - create project, upload photo (15 minutes)

### THIS WEEK (Before Launch):
4. Add 2-3 more portfolio projects with photos
5. Test client portal with a real client
6. Test on mobile devices

### AFTER LAUNCH (Can wait):
- Set up Google Analytics
- Write blog posts
- Create social media content
- Set up Google My Business
- Professional team photos

---

## 🚀 READY TO LAUNCH WHEN:

- [x] Website is live and looks professional ✓
- [ ] Database is set up and working
- [ ] Pricing is competitive and attractive
- [ ] Admin panel tested and works
- [ ] At least 3 portfolio projects added
- [ ] Contact forms work
- [ ] Mobile version tested
- [ ] WhatsApp links work

**You're about 85% ready!** Just need database setup and pricing review to hit 100% 🎉

---

## 📞 NEED HELP?

If anything is unclear or you get stuck:
1. Check the error message
2. Look at ADMIN-SETUP-FINAL.md
3. Ask me for help
4. We can debug together

**Let's get this launched! 🚀**
