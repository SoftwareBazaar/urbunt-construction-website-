# 🌐 Custom Domain Setup Guide

## Current Status
- ✅ Domain purchased on Vercel
- ⏳ Need to configure domain for production

---

## 📋 Step-by-Step Setup

### **Step 1: Add Domain in Vercel Dashboard**

1. Go to your Vercel project dashboard:
   - https://vercel.com/dashboard
   - Click on your project: `urbunt-construction-website`

2. Click on **"Settings"** tab (top menu)

3. Click on **"Domains"** in the left sidebar

4. You should see your purchased domain listed

5. If not listed, click **"Add"** and enter your domain name

---

### **Step 2: Configure Domain**

#### **For Root Domain (example.com)**

1. In the Domains section, you'll see DNS records needed
2. Vercel will show you an **A Record** pointing to their IP
3. Copy the IP address (usually `76.76.21.21`)

#### **For WWW Subdomain (www.example.com)**

1. Vercel will show a **CNAME Record**
2. The value will be something like: `cname.vercel-dns.com`

---

### **Step 3: Verify Domain is Active**

1. After adding, Vercel will show the domain status
2. Look for status indicators:
   - 🟡 **Pending** - DNS not configured yet
   - 🟢 **Active** - Domain is live!
   - 🔴 **Error** - Configuration issue

3. DNS propagation can take **up to 48 hours** (usually 10-30 minutes)

---

### **Step 4: Set as Production Domain**

1. In the Domains section, find your custom domain
2. Click the **three dots (⋯)** next to the domain
3. Select **"Set as Primary Domain"** or **"Edit"**
4. Make sure it's assigned to the **Production** environment

---

### **Step 5: Force HTTPS (Recommended)**

1. Still in Settings → Domains
2. Find **"Force HTTPS"** or **"HTTPS"** section
3. Toggle it **ON** (Vercel provides free SSL certificates)

---

## 🔍 Troubleshooting

### **Domain Shows as Pending**

**Cause**: DNS records haven't propagated yet

**Solution**: Wait 10-30 minutes, then refresh. Can take up to 48 hours.

---

### **Domain Shows Error**

**Cause**: DNS records not configured correctly

**Solution**:
1. Go back to Settings → Domains
2. Click on the domain with error
3. Verify the DNS records shown match what you configured
4. If domain was purchased through Vercel, it should auto-configure

---

### **Domain Purchased on Vercel Not Showing**

**Cause**: Domain might not be linked to this project

**Solution**:
1. Go to https://vercel.com/dashboard/domains
2. Find your domain in the list
3. Click **"Manage"** or **"Link to Project"**
4. Select your `urbunt-construction-website` project
5. Confirm

---

### **Site Still Shows vercel.app URL**

**Cause**: Primary domain not set

**Solution**:
1. Settings → Domains
2. Find your custom domain
3. Click three dots (⋯) → **"Set as Primary"**
4. This makes it the default production URL

---

## 🎯 Quick Checklist

Before your domain goes live, verify:

- [ ] Domain is added in Vercel Domains settings
- [ ] Domain status shows 🟢 Active (not Pending)
- [ ] Domain is set as **Primary/Production** domain
- [ ] HTTPS is enabled and working
- [ ] Old vercel.app URL redirects to custom domain
- [ ] All pages load correctly on custom domain
- [ ] Forms submit correctly
- [ ] Images and assets load

---

## 📞 What Domain Did You Purchase?

**Domain Name**: ______________________________

Once you tell me your domain name, I can:
1. Create specific DNS configuration
2. Verify it's set up correctly
3. Check propagation status

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Domains**: https://vercel.com/dashboard/domains
- **DNS Checker**: https://dnschecker.org
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html

---

## 💡 Common Domain Providers

If domain was purchased elsewhere (not on Vercel):

**Namecheap, GoDaddy, Cloudflare, etc.**:
1. Log into your domain registrar
2. Find DNS settings
3. Add the A Record and CNAME shown in Vercel
4. Save changes
5. Wait for propagation (10-30 min)

---

## ✅ Final Verification

After setup, test these URLs (replace with your domain):

```
https://yourdomain.com
https://www.yourdomain.com
http://yourdomain.com (should redirect to https)
https://yourdomain.com/services
https://yourdomain.com/contact
```

All should load your Urban T Construction website!

---

**Need Help?** Tell me:
1. What domain name you purchased
2. Where you purchased it (Vercel or elsewhere)
3. What error/issue you're seeing

I'll provide specific instructions for your situation.
