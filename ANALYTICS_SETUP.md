# Analytics Setup Guide

## 📊 Analytics Implementation

Your site now has **two analytics systems**:

### 1. **Google Analytics 4** (Professional, Cross-Device)

#### Setup Steps:

1. **Create a Google Analytics Account**
   - Go to https://analytics.google.com/
   - Sign in with your Google account
   - Click "Start measuring"
   - Create a new property for "The Audorra Project"

2. **Get Your Measurement ID**
   - In GA4, go to Admin → Data Streams
   - Add a new Web stream
   - Enter your website URL
   - Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

3. **Update Your Site**
   - Open `index.html`
   - Replace **both instances** of `G-XXXXXXXXXX` with your actual Measurement ID
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID-HERE"></script>
   ```
   and
   ```javascript
   gtag('config', 'G-YOUR-ID-HERE', {
   ```

4. **Verify It's Working**
   - Deploy your site
   - Visit it in a browser
   - Go to GA4 → Reports → Realtime
   - You should see your visit appear within seconds!

#### What Gets Tracked:
- ✅ **Page views** - Every time someone visits
- ✅ **Song plays** - When users click "Listen"
- ✅ **Song requests** - When users submit recommendations
- ✅ **Social clicks** - Instagram & YouTube button clicks
- ✅ **Collaborate clicks** - Email collaboration button
- ✅ **User demographics** - Location, device, browser (anonymous)
- ✅ **Traffic sources** - Where visitors came from

#### View Your Analytics:
Go to https://analytics.google.com/ and check:
- **Realtime** - Current active users
- **Reports → Acquisition** - Where traffic comes from
- **Reports → Engagement** - What users do on your site
- **Reports → Events** - Custom events (song plays, requests, etc.)

---

### 2. **Local Visitor Counter** (Demo Widget)

A simple visual counter displayed on your homepage that shows:
- **Total Visits** - All-time visit count
- **Today** - Visits today
- **Unique** - Unique visitors (browser-based)

**Note**: This is stored in browser localStorage, so it's only visible to individual users. For real analytics, rely on Google Analytics.

#### Optional: Hide the Widget
If you want to hide the visitor stats widget, edit `src/App.vue`:
```vue
<!-- Comment out or remove this section -->
<!-- <section class="px-3 sm:px-4 md:px-8 lg:px-12 mt-6">
  <VisitorStats class="max-w-4xl mx-auto" />
</section> -->
```

---

## 🎯 Custom Events Tracked

The following user actions are automatically tracked:

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `page_view` | User visits the site | `page_title` |
| `song_play` | User clicks "Listen" on Song of the Day | `song_name`, `artist` |
| `song_request` | User submits a song recommendation | `song_name` |
| `social_click` | User clicks social media link | `platform` |
| `collaborate_click` | User clicks email collaboration button | - |

You can view these events in GA4 under **Events** section.

---

## 🔒 Privacy Features

- ✅ **IP Anonymization** enabled
- ✅ **Cookie security** flags set
- ✅ No personally identifiable information (PII) collected
- ✅ GDPR-friendly configuration

---

## 📈 Tips for Better Analytics

1. **Set Goals** in GA4 for important events (song requests, social follows)
2. **Create Custom Reports** for metrics you care about most
3. **Monitor Realtime** during launches or promotions
4. **Use UTM Parameters** in marketing links to track campaigns
5. **Check Mobile vs Desktop** usage in the Tech reports

---

## 🚀 Next Steps

1. Get your GA4 Measurement ID
2. Update `index.html` with your ID
3. Deploy your site
4. Verify tracking in GA4 Realtime
5. Check back after a few days to see trends!

---

## Need Help?

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/9304153)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)

