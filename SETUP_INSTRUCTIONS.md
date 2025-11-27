# Setup Instructions for The Audorra Project

## 🖼️ Add Your Profile Photo

**IMPORTANT**: Replace the placeholder avatar with your actual photo!

### Steps:
1. Save your profile photo as `avatar.jpg`
2. Replace the file at: `/public/avatar.jpg`
3. Recommended size: 500x500 pixels or larger (square format works best)
4. The image will be automatically displayed in:
   - Header (circular crop)
   - About Me section (rounded corners)

### Quick Command:
```bash
# Copy your photo to the project
cp /path/to/your/photo.jpg "/Users/rahul.jain/The Audorra Project/public/avatar.jpg"
```

---

## ✅ Already Updated

- ✅ Instagram: https://www.instagram.com/itsaudorra/
- ✅ YouTube: https://www.youtube.com/@ItsAudorra
- ✅ LinkedIn: https://www.linkedin.com/in/rahul-jain-a37235183/
- ✅ Email: rahulj06.rj@gmail.com

---

## 🚀 After Adding Your Photo

```bash
git add public/avatar.jpg
git commit -m "Add Audorra profile photo"
git push
```

Your site will automatically redeploy on Netlify with your photo!

