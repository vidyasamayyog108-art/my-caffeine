import List "mo:core/List";
import Types "../types/chatbot";

module {

  // ── FAQ Knowledge Base ────────────────────────────────────────────────────

  // Each entry: (keywords, answer_mr, answer_hi, answer_kn, answer_en)
  type FaqEntry = {
    keywords : [Text];
    mr : Text;
    hi : Text;
    kn : Text;
    en : Text;
  };

  // 20+ FAQ entries covering all requested topics
  let faqs : [FaqEntry] = [
    // Registration
    {
      keywords = ["नोंदणी", "registration", "register", "नोंदवा", "signup", "sign up", "नोंदणी कशी", "नोंदणी कशी करायची", "रजिस्ट्रेशन", "पंजीकरण", "ನೋಂದಣಿ", "ನೋಂದಿಸಿ"];
      mr = "नोंदणी करण्यासाठी: 1) 'Login' वर क्लिक करा 2) मोबाईल नंबर टाका 3) OTP verify करा 4) 7-पायऱ्यांचा profile form भरा 5) ₹499 premium membership साठी payment करा. नोंदणी फक्त दिगंबर जैन समाजाच्या सदस्यांसाठी आहे.";
      hi = "नोंदणी के लिए: 1) 'Login' पर क्लिक करें 2) मोबाइल नंबर दर्ज करें 3) OTP verify करें 4) 7-चरण profile form भरें 5) ₹499 premium membership के लिए payment करें. नोंदणी केवल दिगंबर जैन समाज के सदस्यों के लिए है.";
      kn = "ನೋಂದಣಿ ಮಾಡಲು: 1) 'Login' ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ 2) ಮೊಬೈಲ್ ನಂಬರ್ ನಮೂದಿಸಿ 3) OTP ಪರಿಶೀಲಿಸಿ 4) 7-ಹಂತದ profile form ಭರ್ತಿ ಮಾಡಿ 5) ₹499 premium membership ಗಾಗಿ payment ಮಾಡಿ. ನೋಂದಣಿ ಕೇವಲ ದಿಗಂಬರ ಜೈನ ಸಮಾಜದ ಸದಸ್ಯರಿಗೆ.";
      en = "To register: 1) Click 'Login' 2) Enter your mobile number 3) Verify OTP 4) Fill the 7-step profile form 5) Pay ₹499 for premium membership. Registration is exclusively for Digambar Jain community members.";
    },
    // OTP / Login
    {
      keywords = ["otp", "लॉगिन", "login", "log in", "लॉगिन कसे", "ओटीपी", "otp नाही आला", "otp problem", "ಲಾಗಿನ್", "लॉग इन"];
      mr = "Login साठी: 1) 'Login' बटणावर क्लिक करा 2) मोबाईल नंबर टाका 3) SMS ने 6-digit OTP येईल 4) OTP टाकून verify करा. OTP 5 मिनिटांत expire होतो. OTP नाही आला तर 'Resend' वर क्लिक करा.";
      hi = "Login के लिए: 1) 'Login' बटन पर क्लिक करें 2) मोबाइल नंबर दर्ज करें 3) SMS द्वारा 6-digit OTP आएगा 4) OTP डालकर verify करें. OTP 5 मिनट में expire होता है.";
      kn = "Login ಗಾಗಿ: 1) 'Login' ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ 2) ಮೊಬೈಲ್ ನಂಬರ್ ನಮೂದಿಸಿ 3) SMS ಮೂಲಕ 6-digit OTP ಬರುತ್ತದೆ 4) OTP ನಮೂದಿಸಿ verify ಮಾಡಿ. OTP 5 ನಿಮಿಷದಲ್ಲಿ expire ಆಗುತ್ತದೆ.";
      en = "To login: 1) Click 'Login' button 2) Enter your mobile number 3) You'll receive a 6-digit OTP via SMS 4) Enter OTP to verify. OTP expires in 5 minutes. Click 'Resend' if you don't receive it.";
    },
    // Payment
    {
      keywords = ["payment", "पेमेंट", "पैसे", "₹499", "499", "upi", "qr", "भरणा", "pay", "ಪಾವತಿ", "भुगतान", "विवश"];
      mr = "Payment साठी: 1) UPI ID: vivahsetu@ptaxis वापरा 2) ₹499 भरा 3) Payment screenshot upload करा 4) Admin 24 तासांत approve करेल 5) Approved झाल्यावर SMS येईल. GPay, PhonePe, Paytm कुठूनही pay करता येते.";
      hi = "Payment के लिए: 1) UPI ID: vivahsetu@ptaxis उपयोग करें 2) ₹499 भेजें 3) Payment screenshot upload करें 4) Admin 24 घंटे में approve करेगा 5) Approve होने पर SMS आएगा. GPay, PhonePe, Paytm से pay कर सकते हैं.";
      kn = "Payment ಗಾಗಿ: 1) UPI ID: vivahsetu@ptaxis ಬಳಸಿ 2) ₹499 ಪಾವತಿಸಿ 3) Payment screenshot upload ಮಾಡಿ 4) Admin 24 ಗಂಟೆಯಲ್ಲಿ approve ಮಾಡುತ್ತಾರೆ 5) Approve ಆದ ಮೇಲೆ SMS ಬರುತ್ತದೆ.";
      en = "For payment: 1) Use UPI ID: vivahsetu@ptaxis 2) Pay ₹499 3) Upload payment screenshot 4) Admin will approve within 24 hours 5) You'll receive SMS confirmation. You can pay via GPay, PhonePe, or Paytm.";
    },
    // UPI ID
    {
      keywords = ["upi id", "upi आयडी", "vivahsetu", "ptaxis", "qr code", "क्यूआर कोड", "UPI", "ಯುಪಿಐ"];
      mr = "Vivah Setu चा UPI ID: vivahsetu@ptaxis. Payment page वर QR code दिसेल जो scan करून pay करता येते. QR code image download करण्याचे option पण आहे.";
      hi = "Vivah Setu का UPI ID: vivahsetu@ptaxis. Payment page पर QR code दिखेगा जिसे scan करके pay किया जा सकता है.";
      kn = "Vivah Setu ನ UPI ID: vivahsetu@ptaxis. Payment page ನಲ್ಲಿ QR code ಕಾಣಿಸುತ್ತದೆ, scan ಮಾಡಿ pay ಮಾಡಬಹುದು.";
      en = "Vivah Setu UPI ID: vivahsetu@ptaxis. The payment page shows a QR code you can scan to pay. You can also download the QR code image.";
    },
    // Membership benefits
    {
      keywords = ["membership", "सदस्यता", "premium", "प्रीमियम", "फायदे", "benefit", "फ्री", "free", "ಸದಸ್ಯತ್ವ"];
      mr = "Premium Membership (₹499) चे फायदे: ✓ सर्व profiles आणि contact details unlock ✓ unlimited profile views ✓ सर्व matches बघता येतात ✓ unlimited messages ✓ Priority listing. Free tier मध्ये: limited profile views आणि दिवसाला 10 messages.";
      hi = "Premium Membership (₹499) के फायदे: ✓ सभी profiles और contact details unlock ✓ unlimited profile views ✓ सभी matches देख सकते हैं ✓ unlimited messages ✓ Priority listing. Free tier में: limited profile views और दिन में 10 messages.";
      kn = "Premium Membership (₹499) ಪ್ರಯೋಜನಗಳು: ✓ ಎಲ್ಲಾ profiles ಮತ್ತು contact details unlock ✓ unlimited profile views ✓ ಎಲ್ಲಾ matches ನೋಡಬಹುದು ✓ unlimited messages ✓ Priority listing. Free tier ನಲ್ಲಿ: limited profile views ಮತ್ತು ದಿನಕ್ಕೆ 10 messages.";
      en = "Premium Membership (₹499) benefits: ✓ All profiles & contact details unlocked ✓ Unlimited profile views ✓ See all matches ✓ Unlimited messages ✓ Priority listing. Free tier: limited profile views and 10 messages/day.";
    },
    // Profile fields
    {
      keywords = ["profile", "प्रोफाइल", "माहिती", "information", "fields", "फील्ड", "भरायचे", "ಪ್ರೊಫೈಲ್"];
      mr = "Profile मध्ये खालील माहिती भरायची: नाव, वय, जन्म तारीख, उंची, उपजात (free-text), मूळ गाव, शहर, शिक्षण, व्यवसाय, वार्षिक उत्पन्न, कुटुंब प्रकार, वडिलांचा व आईचा व्यवसाय, भावंडे, जोडीदार अपेक्षा, आणि फोटो.";
      hi = "Profile में निम्नलिखित जानकारी भरनी है: नाम, उम्र, जन्म तिथि, ऊंचाई, उपजाति (free-text), मूल गांव, शहर, शिक्षण, व्यवसाय, वार्षिक आय, परिवार प्रकार, पिता-माता का व्यवसाय, भाई-बहन, जीवनसाथी अपेक्षाएं, और फोटो.";
      kn = "Profile ನಲ್ಲಿ ಈ ಮಾಹಿತಿ ಭರ್ತಿ ಮಾಡಿ: ಹೆಸರು, ವಯಸ್ಸು, ಹುಟ್ಟಿದ ದಿನ, ಎತ್ತರ, ಉಪಜಾತಿ (free-text), ಮೂಲ ಊರು, ನಗರ, ಶಿಕ್ಷಣ, ವೃತ್ತಿ, ವಾರ್ಷಿಕ ಆದಾಯ, ಕುಟುಂಬ ಪ್ರಕಾರ, ತಂದೆ-ತಾಯಿ ವೃತ್ತಿ, ಒಡಹುಟ್ಟಿದವರು, ಸಂಗಾತಿ ನಿರೀಕ್ಷೆ, ಮತ್ತು ಫೋಟೋ.";
      en = "Profile fields to fill: name, age, date of birth, height, upjati (free-text), native place, city, education, occupation, annual income, family type, father & mother occupation, siblings, partner preferences, and photo.";
    },
    // Photo upload
    {
      keywords = ["photo", "फोटो", "picture", "image", "upload", "अपलोड", "ಫೋಟೋ", "छवि"];
      mr = "Profile photo upload साठी: 1) आपला profile page उघडा 2) 'फोटो बदला' वर क्लिक करा 3) JPEG/PNG format, max 5MB फाइल select करा 4) Upload झाल्यावर admin moderate करेल 5) Approved झाल्यावर profile वर दिसेल.";
      hi = "Profile photo upload के लिए: 1) अपना profile page खोलें 2) 'फोटो बदलें' पर क्लिक करें 3) JPEG/PNG format, max 5MB file select करें 4) Upload होने पर admin moderate करेगा 5) Approved होने पर profile पर दिखेगा.";
      kn = "Profile photo upload ಮಾಡಲು: 1) ನಿಮ್ಮ profile page ತೆರೆಯಿರಿ 2) 'ಫೋಟೋ ಬದಲಿಸಿ' ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ 3) JPEG/PNG format, max 5MB file ಆಯ್ಕೆ ಮಾಡಿ 4) Upload ಆದ ಮೇಲೆ admin moderate ಮಾಡುತ್ತಾರೆ 5) Approved ಆದ ಮೇಲೆ profile ನಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.";
      en = "To upload profile photo: 1) Open your profile page 2) Click 'Change Photo' 3) Select JPEG/PNG file, max 5MB 4) Admin will moderate after upload 5) It will appear on your profile once approved.";
    },
    // Contact matches
    {
      keywords = ["contact", "संपर्क", "match", "जुळवणी", "कसे करायचे", "message", "मेसेज", "ಸಂಪರ್ಕ", "ಮ್ಯಾಚ್"];
      mr = "Matches शी संपर्क करण्यासाठी: 1) Premium membership लागेल 2) 'जुळवणी' page वर जा 3) Profile बघा 4) 'Message पाठवा' बटणावर क्लिक करा 5) In-app chat द्वारे संपर्क करा. Premium users ना contact details (mobile number) दिसतात.";
      hi = "Matches से संपर्क करने के लिए: 1) Premium membership जरूरी है 2) 'जुळवणी' page पर जाएं 3) Profile देखें 4) 'Message भेजें' बटन पर क्लिक करें 5) In-app chat द्वारा संपर्क करें. Premium users को contact details (mobile number) दिखते हैं.";
      kn = "Matches ಜೊತೆ ಸಂಪರ್ಕ ಮಾಡಲು: 1) Premium membership ಬೇಕು 2) 'ಜೋಡಿಸು' page ಗೆ ಹೋಗಿ 3) Profile ನೋಡಿ 4) 'Message ಕಳಿಸಿ' ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ 5) In-app chat ಮೂಲಕ ಸಂಪರ್ಕ ಮಾಡಿ.";
      en = "To contact matches: 1) Premium membership is required 2) Go to 'Matches' page 3) View profile 4) Click 'Send Message' 5) Contact via in-app chat. Premium users can see contact details (mobile number).";
    },
    // Messaging limits
    {
      keywords = ["message limit", "मेसेज लिमिट", "10 messages", "messaging", "chat", "चॅट", "ಸಂದೇಶ ಮಿತಿ"];
      mr = "Messaging limits: Free tier - दिवसाला 10 messages. Premium tier - unlimited messages. Messages दर 3 सेकंदांनी auto-refresh होतात. Matched members एकमेकांशी chat करू शकतात.";
      hi = "Messaging limits: Free tier - दिन में 10 messages. Premium tier - unlimited messages. Messages हर 3 सेकंड में auto-refresh होते हैं.";
      kn = "Messaging limits: Free tier - ದಿನಕ್ಕೆ 10 messages. Premium tier - unlimited messages. Messages ಪ್ರತಿ 3 ಸೆಕೆಂಡ್ ಗಾಗಿ auto-refresh ಆಗುತ್ತವೆ.";
      en = "Messaging limits: Free tier - 10 messages per day. Premium tier - unlimited messages. Messages auto-refresh every 3 seconds. Matched members can chat with each other.";
    },
    // Kundali Milan
    {
      keywords = ["kundali", "कुंडली", "मिलन", "milan", "गुण", "gun", "ashtakoot", "अष्टकूट", "ಕುಂಡಲಿ", "ಮಿಲನ"];
      mr = "कुंडली मिलन: Match page वर 'कुंडली मिलन' button दिसेल. Result मध्ये 36 पैकी किती गुण जुळले ते दाखवतो (वर्ण, वश्य, तारा, योनी, ग्रह मैत्री, गण, भकूट, नाडी). 18+ गुण = उत्तम, 12-17 = मध्यम, 12 पेक्षा कमी = अशुभ. फक्त जन्म तारखेवरून calculate होते.";
      hi = "कुंडली मिलन: Match page पर 'कुंडली मिलन' button दिखेगा. Result में 36 में से कितने गुण मिले यह दिखाता है (वर्ण, वश्य, तारा, योनी, ग्रह मैत्री, गण, भकूट, नाडी). 18+ गुण = उत्तम, 12-17 = मध्यम, 12 से कम = अशुभ.";
      kn = "ಕುಂಡಲಿ ಮಿಲನ: Match page ನಲ್ಲಿ 'ಕುಂಡಲಿ ಮಿಲನ' button ಕಾಣಿಸುತ್ತದೆ. Result ನಲ್ಲಿ 36 ರಲ್ಲಿ ಎಷ್ಟು ಗುಣ ಹೊಂದಿಕೊಂಡಿದೆ ತೋರಿಸುತ್ತದೆ (ವರ್ಣ, ವಶ್ಯ, ತಾರ, ಯೋನಿ, ಗ್ರಹ ಮೈತ್ರಿ, ಗಣ, ಭಕೂಟ, ನಾಡಿ).";
      en = "Kundali Milan: The 'Kundali Milan' button appears on the Match page. It shows how many of 36 points match (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi). 18+ points = Uttam, 12-17 = Madhyam, below 12 = Ashubh.";
    },
    // Account issues
    {
      keywords = ["account", "खाते", "blocked", "ब्लॉक", "deactivated", "निष्क्रिय", "problem", "समस्या", "ಖಾತೆ"];
      mr = "Account संबंधित समस्या असल्यास: 1) Profile अपूर्ण असल्यास पूर्ण करा 2) Payment pending असल्यास screenshot upload करा 3) Admin ने block केले असल्यास support ला संपर्क करा. आमचा support: [Admin contact करा]";
      hi = "Account से संबंधित समस्या होने पर: 1) Profile अधूरी है तो पूरी करें 2) Payment pending है तो screenshot upload करें 3) Admin ने block किया है तो support से संपर्क करें.";
      kn = "Account ಸಮಸ್ಯೆ ಇದ್ದರೆ: 1) Profile ಅಪೂರ್ಣವಿದ್ದರೆ ಪೂರ್ಣ ಮಾಡಿ 2) Payment pending ಇದ್ದರೆ screenshot upload ಮಾಡಿ 3) Admin block ಮಾಡಿದ್ದರೆ support ಗೆ ಸಂಪರ್ಕ ಮಾಡಿ.";
      en = "For account issues: 1) Complete your profile if incomplete 2) Upload payment screenshot if pending 3) Contact support if blocked by admin.";
    },
    // Who can join
    {
      keywords = ["कोण", "who", "eligible", "पात्र", "community", "समाज", "दिगंबर", "जैन", "ಯಾರು", "ಸಮುದಾಯ"];
      mr = "हे app फक्त दिगंबर जैन समाजाच्या वधू व वरांसाठी आहे. नोंदणी करताना तुम्ही दिगंबर जैन समाजाचे सदस्य असणे आवश्यक आहे.";
      hi = "यह app केवल दिगंबर जैन समाज के वर-वधू के लिए है. नोंदणी करते समय आप दिगंबर जैन समाज के सदस्य होना जरूरी है.";
      kn = "ಈ app ಕೇವಲ ದಿಗಂಬರ ಜೈನ ಸಮಾಜದ ವರ ಮತ್ತು ವಧುಗಳಿಗಾಗಿ. ನೋಂದಣಿ ಮಾಡಲು ದಿಗಂಬರ ಜೈನ ಸಮಾಜದ ಸದಸ್ಯರಾಗಿರಬೇಕು.";
      en = "This app is exclusively for Digambar Jain community brides and grooms. You must be a member of the Digambar Jain community to register.";
    },
    // Success stories
    {
      keywords = ["success", "यशोगाथा", "stories", "यशस्वी", "married", "लग्न", "ಯಶೋಗಾಥೆ"];
      mr = "'यशोगाथा' page वर आमच्या successfully married couples च्या कथा वाचा. तुमचे लग्न झाल्यावर admin ला कळवा आणि आपली यशोगाथा share करा!";
      hi = "'यशोगाथा' page पर हमारे successfully married couples की कहानियां पढ़ें. आपकी शादी होने पर admin को बताएं और अपनी यशोगाथा share करें!";
      kn = "'ಯಶೋಗಾಥೆ' page ನಲ್ಲಿ ನಮ್ಮ successfully married couples ರ ಕಥೆಗಳನ್ನು ಓದಿ. ನಿಮ್ಮ ಮದುವೆ ಆದ ಮೇಲೆ admin ಗೆ ತಿಳಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಯಶೋಗಾಥೆ share ಮಾಡಿ!";
      en = "Read success stories of our married couples on the 'Success Stories' page. After your wedding, inform the admin to share your success story!";
    },
    // Privacy
    {
      keywords = ["privacy", "गोपनीयता", "personal", "personal data", "safe", "सुरक्षित", "ಗೋಪ್ಯತೆ"];
      mr = "तुमची माहिती सुरक्षित आहे. Contact details (mobile number) फक्त Premium members नाच दिसतात. Profile photos admin moderate करतात. तुमचा data Internet Computer blockchain वर सुरक्षितपणे साठवला जातो.";
      hi = "आपकी जानकारी सुरक्षित है. Contact details (mobile number) केवल Premium members को दिखती है. Profile photos admin moderate करते हैं.";
      kn = "ನಿಮ್ಮ ಮಾಹಿತಿ ಸುರಕ್ಷಿತ. Contact details (mobile number) ಕೇವಲ Premium members ಗೆ ಕಾಣಿಸುತ್ತದೆ. Profile photos admin moderate ಮಾಡುತ್ತಾರೆ.";
      en = "Your information is secure. Contact details (mobile number) are visible only to Premium members. Profile photos are moderated by admin. Your data is stored securely on Internet Computer blockchain.";
    },
    // Admin panel
    {
      keywords = ["admin", "एडमिन", "panel", "पॅनेल", "admin panel", "ಅಡ್ಮಿನ್"];
      mr = "Admin Panel हे hidden URL वर आहे. Admin ला username, password, आणि OTP तिन्ही लागतात. Admin Panel मध्ये: members approve/reject/block, payments approve/reject, यशोगाथा manage, photos moderate, messages manage करता येते.";
      hi = "Admin Panel एक hidden URL पर है. Admin को username, password, और OTP तीनों चाहिए. Admin Panel में: members approve/reject/block, payments approve/reject, यशोगाथा manage, photos moderate किए जा सकते हैं.";
      kn = "Admin Panel hidden URL ನಲ್ಲಿದೆ. Admin ಗೆ username, password ಮತ್ತು OTP ಮೂರೂ ಬೇಕು. Admin Panel ನಲ್ಲಿ: members approve/reject/block, payments approve/reject, ಯಶೋಗಾಥೆ manage, photos moderate ಮಾಡಬಹುದು.";
      en = "The Admin Panel is at a hidden URL. Admin requires username, password, and OTP for login. Admin Panel allows: member approval/rejection/blocking, payment approval, success story management, photo moderation.";
    },
    // Approve / pending payment
    {
      keywords = ["approve", "approved", "pending", "approved नाही", "कधी होईल", "when", "ಅನುಮೋದನೆ"];
      mr = "Payment approve होण्यासाठी: screenshot upload केल्यावर admin 24 तासांत review करेल. Approved झाल्यावर तुमच्या mobile वर SMS येईल आणि Premium access मिळेल. जास्त वेळ झाल्यास admin ला contact करा.";
      hi = "Payment approve होने के लिए: screenshot upload करने के बाद admin 24 घंटे में review करेगा. Approve होने पर mobile पर SMS आएगा और Premium access मिलेगा.";
      kn = "Payment approve ಆಗಲು: screenshot upload ಮಾಡಿದ ನಂತರ admin 24 ಗಂಟೆಯಲ್ಲಿ review ಮಾಡುತ್ತಾರೆ. Approve ಆದ ಮೇಲೆ mobile ಗೆ SMS ಬರುತ್ತದೆ ಮತ್ತು Premium access ಸಿಗುತ್ತದೆ.";
      en = "For payment approval: After uploading screenshot, admin will review within 24 hours. Once approved, you'll receive an SMS and gain Premium access immediately.";
    },
    // Forget / how to reset
    {
      keywords = ["forgot", "विसरलो", "reset", "change mobile", "मोबाईल बदलणे", "ಮರೆತಿದ್ದೇನೆ"];
      mr = "Mobile number बदलण्यासाठी किंवा account issues साठी admin ला संपर्क करा. Login साठी नेहमी OTP-based login वापरा - password नाही.";
      hi = "Mobile number बदलने के लिए या account issues के लिए admin से संपर्क करें. Login के लिए हमेशा OTP-based login उपयोग करें - कोई password नहीं है.";
      kn = "Mobile number ಬದಲಾಯಿಸಲು ಅಥವಾ account ಸಮಸ್ಯೆಗಳಿಗಾಗಿ admin ಗೆ ಸಂಪರ್ಕ ಮಾಡಿ. Login ಗಾಗಿ ಯಾವಾಗಲೂ OTP-based login ಬಳಸಿ.";
      en = "To change your mobile number or for account issues, contact admin. Always use OTP-based login - there's no password.";
    },
    // Languages
    {
      keywords = ["language", "भाषा", "मराठी", "hindi", "हिंदी", "kannada", "कन्नड", "english", "इंग्रजी", "ಭಾಷೆ"];
      mr = "हे app 4 भाषांमध्ये उपलब्ध आहे: मराठी (MR), हिंदी (HI), कन्नड (KN), इंग्रजी (EN). Header मध्ये भाषा switcher (MR/HI/KN/EN) वापरून भाषा बदलता येते.";
      hi = "यह app 4 भाषाओं में उपलब्ध है: मराठी (MR), हिंदी (HI), कन्नड (KN), अंग्रेजी (EN). Header में language switcher (MR/HI/KN/EN) से भाषा बदली जा सकती है.";
      kn = "ಈ app 4 ಭಾಷೆಗಳಲ್ಲಿ ಲಭ್ಯ: ಮರಾಠಿ (MR), ಹಿಂದಿ (HI), ಕನ್ನಡ (KN), ಇಂಗ್ಲಿಷ್ (EN). Header ನಲ್ಲಿ language switcher (MR/HI/KN/EN) ಬಳಸಿ ಭಾಷೆ ಬದಲಾಯಿಸಬಹುದು.";
      en = "This app is available in 4 languages: Marathi (MR), Hindi (HI), Kannada (KN), English (EN). Use the language switcher (MR/HI/KN/EN) in the header to change language.";
    },
    // Deactivate / delete profile
    {
      keywords = ["delete", "काढा", "deactivate", "निष्क्रिय", "remove profile", "profile delete", "ಅಳಿಸು"];
      mr = "Profile deactivate करण्यासाठी: आपल्या profile page वर जा आणि 'Profile Delete करा' वर क्लिक करा. Profile inactive होईल. Reactivate साठी admin ला संपर्क करा.";
      hi = "Profile deactivate करने के लिए: अपने profile page पर जाएं और 'Profile Delete करें' पर क्लिक करें. Profile inactive हो जाएगी.";
      kn = "Profile deactivate ಮಾಡಲು: ನಿಮ್ಮ profile page ಗೆ ಹೋಗಿ ಮತ್ತು 'Profile Delete ಮಾಡಿ' ಕ್ಲಿಕ್ ಮಾಡಿ. Profile inactive ಆಗುತ್ತದೆ.";
      en = "To deactivate your profile: Go to your profile page and click 'Delete Profile'. Your profile will become inactive. Contact admin to reactivate.";
    },
    // Search / find matches
    {
      keywords = ["search", "शोधा", "filter", "फिल्टर", "find", "शोध", "ಹುಡುಕು", "खोजें"];
      mr = "'प्रोफाइल्स' page वर age, city, education, occupation, income, upjati नुसार filter करून profiles शोधा. Premium members ना सर्व profiles दिसतात.";
      hi = "'प्रोफाइल्स' page पर age, city, education, occupation, income, upjati के अनुसार filter करके profiles खोजें.";
      kn = "'Profiles' page ನಲ್ಲಿ age, city, education, occupation, income, upjati ಅನ್ವಯ filter ಮಾಡಿ profiles ಹುಡುಕಿ.";
      en = "On the 'Profiles' page, filter profiles by age, city, education, occupation, income, and upjati. Premium members can see all profiles.";
    },
    // Help / default fallback (very broad)
    {
      keywords = ["help", "मदत", "maddat", "support", "सहाय्य", "ಸಹಾಯ", "सहायता", "हेल्प", "काय करायचे"];
      mr = "मी तुम्हाला खालील विषयांवर मदत करू शकतो: नोंदणी, login/OTP, payment (₹499), profile fields, membership benefits, photo upload, matches, messaging, कुंडली मिलन, यशोगाथा. तुमचा प्रश्न विचारा!";
      hi = "मैं आपको इन विषयों पर मदद कर सकता हूं: नोंदणी, login/OTP, payment (₹499), profile fields, membership benefits, photo upload, matches, messaging, कुंडली मिलन, यशोगाथा. अपना प्रश्न पूछें!";
      kn = "ನಾನು ನಿಮಗೆ ಈ ವಿಷಯಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ: ನೋಂದಣಿ, login/OTP, payment (₹499), profile fields, membership benefits, photo upload, matches, messaging, ಕುಂಡಲಿ ಮಿಲನ, ಯಶೋಗಾಥೆ.";
      en = "I can help you with: registration, login/OTP, payment (₹499), profile fields, membership benefits, photo upload, matches, messaging, kundali milan, success stories. Ask your question!";
    },
  ];

  // ── Matching logic ────────────────────────────────────────────────────────

  /// Find the best matching FAQ entry for a user message.
  func findBestMatch(msg : Text, lang : Text) : ?Text {
    let lower = msg.toLower();
    // Score each FAQ by keyword hits
    var bestScore = 0;
    var bestAnswer : ?Text = null;
    for (faq in faqs.values()) {
      var score = 0;
      for (kw in faq.keywords.values()) {
        if (lower.contains(#text kw)) {
          score += 1;
        };
      };
      if (score > bestScore) {
        bestScore := score;
        let answer = switch (lang) {
          case "mr" faq.mr;
          case "hi" faq.hi;
          case "kn" faq.kn;
          case _ faq.en;
        };
        bestAnswer := ?answer;
      };
    };
    bestAnswer;
  };

  /// Default fallback responses per language
  func fallbackResponse(lang : Text) : Text {
    switch (lang) {
      case "mr" "मला माफ करा, मी हा प्रश्न समजू शकलो नाही. कृपया नोंदणी, payment, profile, membership किंवा messaging बद्दल प्रश्न विचारा. अधिक मदतीसाठी admin ला संपर्क करा.";
      case "hi" "मुझे माफ करें, मैं यह प्रश्न समझ नहीं सका. कृपया नोंदणी, payment, profile, membership या messaging के बारे में प्रश्न पूछें.";
      case "kn" "ಕ್ಷಮಿಸಿ, ನಾನು ಈ ಪ್ರಶ್ನೆ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ನೋಂದಣಿ, payment, profile, membership ಅಥವಾ messaging ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ.";
      case _ "I'm sorry, I couldn't understand that question. Please ask about registration, payment, profile, membership, or messaging. Contact admin for more help.";
    };
  };

  /// Generate a bot response for the given user message in the given language.
  public func generateReply(userMessage : Text, language : Text) : Text {
    switch (findBestMatch(userMessage, language)) {
      case (?answer) answer;
      case null fallbackResponse(language);
    };
  };

  // ── Greeting ──────────────────────────────────────────────────────────────

  public func greetingMessage(lang : Text) : Text {
    switch (lang) {
      case "mr" "नमस्कार! मी विवाह सेतू चा AI सहाय्यक आहे. नोंदणी, payment, profile, membership बद्दल प्रश्न विचारा. मी मदत करेन!";
      case "hi" "नमस्कार! मैं विवाह सेतू का AI सहायक हूं. नोंदणी, payment, profile, membership के बारे में प्रश्न पूछें. मैं मदद करूंगा!";
      case "kn" "ನಮಸ್ಕಾರ! ನಾನು ವಿವಾಹ ಸೇತು ನ AI ಸಹಾಯಕ. ನೋಂದಣಿ, payment, profile, membership ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ. ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ!";
      case _ "Namaste! I'm the Vivah Setu AI assistant. Ask me about registration, payment, profile, or membership. I'm here to help!";
    };
  };

  // ── Chat store helpers ────────────────────────────────────────────────────

  public func addMessage(
    chatMessages : List.List<Types.ChatMessage>,
    nextId : Nat,
    sessionId : Text,
    userId : ?Types.MemberId,
    message : Text,
    isBot : Bool,
    language : Text,
    now : Types.Timestamp,
  ) : Types.ChatMessage {
    let m : Types.ChatMessage = {
      id = nextId;
      sessionId;
      userId;
      message;
      isBot;
      language;
      createdAt = now;
    };
    chatMessages.add(m);
    m;
  };

  public func getSessionMessages(
    chatMessages : List.List<Types.ChatMessage>,
    sessionId : Text,
  ) : [Types.ChatMessage] {
    chatMessages.filter(func(m) { m.sessionId == sessionId }).toArray();
  };

  /// Build conversation summaries grouped by sessionId for admin panel.
  public func buildConversationSummaries(
    chatMessages : List.List<Types.ChatMessage>,
    cursor : Nat,
    limit : Nat,
  ) : { conversations : [Types.ChatConversationSummary]; total : Nat } {
    // Collect unique sessions with stats
    let sessionMap = List.empty<(Text, ?Types.MemberId, Nat, Types.Timestamp, Text)>();
    // (sessionId, userId, count, lastActivity, firstMessage)

    chatMessages.forEach(func(msg) {
      if (not msg.isBot) {
        // Only count user messages
        switch (sessionMap.findIndex(func(s) { let (sid, _, _, _, _) = s; sid == msg.sessionId })) {
          case (?idx) {
            let (sid, uid, cnt, last, first) = sessionMap.at(idx);
            let newLast = if (msg.createdAt > last) msg.createdAt else last;
            sessionMap.put(idx, (sid, uid, cnt + 1, newLast, first));
          };
          case null {
            sessionMap.add((msg.sessionId, msg.userId, 1, msg.createdAt, msg.message));
          };
        };
      };
    });

    let total = sessionMap.size();
    let end = if (cursor + limit > total) total else cursor + limit;
    if (cursor >= total) return { conversations = []; total };

    let slice = sessionMap.sliceToArray(cursor, end);
    let summaries = slice.map(
      func(s) {
        let (sid, uid, cnt, last, first) = s;
        { sessionId = sid; userId = uid; messageCount = cnt; lastActivity = last; firstMessage = first };
      }
    );
    { conversations = summaries; total };
  };
};
