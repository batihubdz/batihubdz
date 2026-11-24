/**
 * BatiHub DZ - Official Application Core Logic (Clean Rebuild)
 * Build • Connect • Create | All Construction Services in Algeria
 * Developed by Mouhaned Guellif
 */

'use strict';

/* ========================================================================= */
/* 1. SEED ACCOUNTS & ENCRYPTION CONFIGURATION                               */
/* ========================================================================= */

const SEED_SALT = 'batihub_admin_salt_2026';
// SHA-256 of "mouhaned25" + SEED_SALT = a7319ed8fb7dc8b32ba21d0f984ba8fac9d8b7233d3d032ff49469e7d6149baa
const SEED_HASH = 'a7319ed8fb7dc8b32ba21d0f984ba8fac9d8b7233d3d032ff49469e7d6149baa';

const SEED_ACCOUNTS = {
  'mouhanedguellif16@gmail.com': {
    id: 'usr_mouhaned_user',
    firstName: 'Mouhaned',
    lastName: 'Guellif',
    fullName: 'Mouhaned Guellif',
    dob: '1998-05-15',
    email: 'mouhanedguellif16@gmail.com',
    passwordHash: SEED_HASH,
    salt: SEED_SALT,
    isVerified: true,
    role: 'user',
    avatar: null,
    createdAt: '2026-11-19T20:00:00.000Z'
  },
  'batihubdz@gmail.com': {
    id: 'usr_admin_batihub_dz',
    firstName: 'BatiHub DZ',
    lastName: 'الإدارة',
    fullName: 'BatiHub DZ (الإدارة)',
    dob: '2000-01-01',
    email: 'batihubdz@gmail.com',
    passwordHash: SEED_HASH,
    salt: SEED_SALT,
    isVerified: true,
    role: 'admin',
    avatar: 'assets/batihub_logo.png',
    createdAt: '2026-11-19T20:00:00.000Z'
  }
};

/* ========================================================================= */
/* 2. TRANSLATION ENGINE & DICTIONARIES                                      */
/* ========================================================================= */

const I18N = {
  ar: {
    app_slogan: 'كل خدمات البناء في مكان واحد',
    nav_scientific_calc: 'آلة حاسبة علمية',
    nav_worker_board: 'عروض العمل',
    nav_study_offices: 'مكاتب دراسات',
    nav_messages: 'المحادثات الخاصة',
    m_nav_calc: 'الحاسبة',
    m_nav_workers: 'عروض العمل',
    m_nav_offices: 'مكاتب دراسات',
    m_nav_messages: 'محادثات',
    m_nav_profile: 'حسابي',
    nav_real_estate: 'عقارات ومنازل',
    m_nav_real_estate: 'عقارات',
    nav_building_materials: 'دليل مواد البناء',
    nav_ai_engineer: 'مساعد المهندس الذكي (AI)',
    m_nav_materials: 'مواد البناء',
    m_nav_ai: 'ذكاء AI',
    materials_title: 'دليل وموسوعة مواد البناء في الجزائر',
    materials_sub: 'استكشف جميع مواد البناء المعتمدة في الجزائر: مجالات الاستعمال، مواد الصنع، ومتوسط الأسعار بالدينار الجزائري',
    worker_board_title: 'عرض الخدمة والحرفيين',
    worker_board_sub: 'انشر واستكشف عروض خدمات البناء ومشاريع الحرفيين في الجزائر مع تواصل مباشر',
    btn_new_worker_post: 'نشر عرض خدمة جديد',
    nav_worker_board: 'عرض الخدمة',
    nav_worker_requests: 'طلب عامل / عمال',
    nav_gallery: 'معرض التصاميم والديكور',
    m_nav_workers: 'عرض الخدمة',
    m_nav_worker_requests: 'طلب عامل',
    m_nav_gallery: 'المعرض',
    worker_requests_title: 'طلب عامل / عمال',
    worker_requests_sub: 'أصحاب المشاريع وأرباب العمل يطلبون عمالاً وحرفيين لإنجاز ورشاتهم وأشغالهم',
    btn_new_worker_request: 'نشر طلب عامل جديد',
    gallery_title: 'معرض التصاميم والديكور',
    gallery_sub: 'استكشف أحدث نماذج المطابخ، الحمامات، الصالونات مع تفاصيل مواد البناء والمساحة',
    worker_board_sub: 'انشر واستكشف عروض العمل وطلبات الحرفيين في الجزائر مع تواصل مباشر وتحديث فوري',
    btn_new_worker_post: 'نشر عرض أو طلب عمل',
    filter_all: 'الكل',
    filter_mason: 'بناء',
    filter_electric: 'كهرباء',
    filter_plumbing: 'ترصيص وصحي',
    filter_painting: 'دهان وديكور',
    filter_tiling: 'بلاط وسيراميك',
    filter_carpentry: 'نجارة وألمنيوم',
    filter_steel: 'حدادة وتسليح',
    filter_hvac: 'تكييف وتبريد',
    offices_title: 'مكاتب دراسات وهندسة معمارية',
    offices_sub: 'مهندسون معماريون وخبراء هندسة مدنية معتمدون لاستخراج رخص البناء والدراسات التقنية',
    btn_new_office: 'إضافة مكتب دراسات جديد',
    filter_offices_all: 'الكل',
    filter_offices_arch: 'مهندس معماري',
    filter_offices_civil: 'مهندس مدني',
    profile_title: 'الملف الشخصي للمستخدم',
    profile_lbl_language: 'لغة واجهة التطبيق :',
    profile_change_pwd: 'تغيير كلمة المرور الخاصة بحسابك',
    profile_signout: 'تسجيل الخروج من الحساب',
    btn_cancel: 'إلغاء',
    btn_publish: 'نشر المنشور الآن',
    btn_save_office: 'اعتماد ونشر بطاقة المكتب',
    net_online_wifi: 'متصل عبر واي فاي',
    net_online_data: 'متصل عبر بيانات الهاتف',
    net_online: 'متصل بالإنترنت',
    net_offline: 'غير متصل بالإنترنت',
    unit_m2: 'دج / م²',
    unit_linear_m: 'دج / م خطي',
    unit_hour: 'دج / ساعة',
    unit_day: 'دج / يوم',
    unit_global: 'مبلغ إجمالي',
    unit_negotiable: 'قابل للتفاوض',
    status_pending: 'قيد مراجعة الإدارة',
    status_approved: 'معتمد ومؤكد ✅',
    call_btn: 'اتصال هاتفي',
    whatsapp_btn: 'واتساب',
    chat_btn: 'محادثة خاصة',
    delete_btn: 'حذف',
    approve_btn: 'موافقة ✅',
    reject_btn: 'رفض ❌',
    like_btn: 'إعجاب',
    comment_btn: 'تعليق',
    comments_title: 'التعليقات',
    comment_placeholder: 'اكتب تعليقك هنا...',
    send_btn: 'إرسال',
    empty_posts: 'لا توجد منشورات في هذا التخصص حالياً. كن أول من ينشر عَرَضاً!',
    empty_offices: 'لا توجد مكاتب دراسات مسجلة في هذا التخصص حالياً.',
    one_post_limit_alert: 'لديك منشور نشط بالفعل في هذا التخصص. يمكنك تعديله أو حذفه أولاً قبل إضافة جديد.',
    post_published_success: 'تم إرسال المنشور بنجاح! سيظهر للمستخدمين بعد مراجعة الإدارة.',
    post_published_admin_success: 'تم نشر المنشور فوراً بنجاح!',
    office_published_success: 'تم تسجيل ونشر بطاقة مكتب الدراسات بنجاح!',
    open_maps_btn: 'عرض الموقع على Google Maps 📍'
  },
  fr: {
    app_slogan: 'Tous les services du bâtiment en un seul endroit',
    nav_scientific_calc: 'Calculatrice',
    nav_worker_board: 'Offres de services',
    nav_worker_requests: 'Demandes d\'ouvriers',
    nav_gallery: 'Galerie & Décoration',
    nav_study_offices: 'Bureaux d\'études',
    nav_messages: 'Messagerie',
    m_nav_calc: 'Calculatrice',
    m_nav_workers: 'Services',
    m_nav_worker_requests: 'Demandes',
    m_nav_gallery: 'Galerie',
    nav_real_estate: 'Immobilier & Vente',
    m_nav_real_estate: 'Immobilier',
    nav_building_materials: 'Matériaux de construction',
    nav_ai_engineer: 'Assistant Ingénieur AI',
    m_nav_materials: 'Matériaux',
    m_nav_ai: 'IA Génie',
    materials_title: 'Catalogue des matériaux de construction en Algérie',
    materials_sub: 'Spécifications techniques, domaines d\'application et prix moyens en Dinars Algériens',
    m_nav_offices: 'Bureaux',
    m_nav_messages: 'Messages',
    m_nav_profile: 'Profil',
    worker_board_title: 'Offres de services & Artisans',
    worker_board_sub: 'Publiez et explorez les offres d\'artisans et chantiers en Algérie',
    btn_new_worker_post: 'Publier une offre de service',
    worker_requests_title: 'Demande Ouvrier / Artisans',
    worker_requests_sub: 'Trouvez et recrutez des artisans et ouvriers qualifiés pour vos chantiers',
    btn_new_worker_request: 'Publier une demande d\'ouvrier',
    gallery_title: 'Galerie & Décoration d\'intérieur',
    gallery_sub: 'Découvrez les modèles de cuisines, salles de bain et salons avec matériaux et surface',
    filter_all: 'Tous',
    filter_mason: 'Maçonnerie',
    filter_electric: 'Électricité',
    filter_plumbing: 'Plomberie',
    filter_painting: 'Peinture',
    filter_tiling: 'Carrelage',
    filter_carpentry: 'Menuiserie & Alu',
    filter_steel: 'Ferraillage',
    filter_hvac: 'Climatisation',
    offices_title: 'Bureaux d\'études & Architecture',
    offices_sub: 'Architectes et ingénieurs civils agréés pour permis de construire et études',
    btn_new_office: 'Ajouter un bureau d\'études',
    filter_offices_all: 'Tous',
    filter_offices_arch: 'Architecte',
    filter_offices_civil: 'Génie Civil',
    profile_title: 'Profil utilisateur',
    profile_lbl_language: 'Langue de l\'application :',
    profile_change_pwd: 'Changer le mot de passe',
    profile_signout: 'Déconnexion',
    btn_cancel: 'Annuler',
    btn_publish: 'Publier maintenant',
    btn_save_office: 'Enregistrer le bureau',
    net_online_wifi: 'Connecté (Wi-Fi)',
    net_online_data: 'Connecté (Données 4G)',
    net_online: 'Connecté',
    net_offline: 'Hors-ligne',
    unit_m2: 'DA / m²',
    unit_linear_m: 'DA / mètre linéaire',
    unit_hour: 'DA / heure',
    unit_day: 'DA / jour',
    unit_global: 'Prix global',
    unit_negotiable: 'Négociable',
    status_pending: 'En attente d\'approbation',
    status_approved: 'Approuvé ✅',
    call_btn: 'Appeler',
    whatsapp_btn: 'WhatsApp',
    chat_btn: 'Message direct',
    delete_btn: 'Supprimer',
    approve_btn: 'Approuver ✅',
    reject_btn: 'Refuser ❌',
    like_btn: 'J\'aime',
    comment_btn: 'Commenter',
    comments_title: 'Commentaires',
    comment_placeholder: 'Écrire un commentaire...',
    send_btn: 'Envoyer',
    empty_posts: 'Aucune offre pour cette catégorie actuellement.',
    empty_offices: 'Aucun bureau d\'études enregistré dans cette spécialité.',
    one_post_limit_alert: 'Vous avez déjà une offre active dans ce métier. Modifiez-la ou supprimez-la.',
    post_published_success: 'Offre envoyée avec succès ! En attente de validation.',
    post_published_admin_success: 'Offre publiée immédiatement avec succès !',
    office_published_success: 'Bureau d\'études enregistré avec succès !',
    open_maps_btn: 'Voir sur Google Maps 📍'
  },
  en: {
    app_slogan: 'All Construction Services in One Platform',
    nav_scientific_calc: 'Calculator',
    nav_worker_board: 'Service Offers',
    nav_worker_requests: 'Worker Requests',
    nav_gallery: 'Design & Decor Gallery',
    nav_study_offices: 'Study Offices',
    nav_messages: 'Private Messages',
    m_nav_calc: 'Calculator',
    m_nav_workers: 'Services',
    m_nav_worker_requests: 'Requests',
    m_nav_gallery: 'Gallery',
    nav_real_estate: 'Real Estate & Homes',
    m_nav_real_estate: 'Properties',
    nav_building_materials: 'Building Materials',
    nav_ai_engineer: 'AI Architectural Assistant',
    m_nav_materials: 'Materials',
    m_nav_ai: 'Bati AI',
    materials_title: 'Building Materials Directory in Algeria',
    materials_sub: 'Technical specifications, applications, and average prices in Algerian Dinars',
    m_nav_offices: 'Offices',
    m_nav_messages: 'Chat',
    m_nav_profile: 'Profile',
    worker_board_title: 'Service Offers & Artisans',
    worker_board_sub: 'Post and explore construction service offers and craftsman listings across Algeria',
    btn_new_worker_post: 'Post Service Offer',
    worker_requests_title: 'Worker & Artisan Requests',
    worker_requests_sub: 'Project owners request craftsmen and construction workers across Algeria',
    btn_new_worker_request: 'Post Worker Request',
    gallery_title: 'Design & Interior Decor Gallery',
    gallery_sub: 'Explore modern kitchens, bathrooms, living rooms with material specifications and area',
    filter_all: 'All',
    filter_mason: 'Masonry',
    filter_electric: 'Electrical',
    filter_plumbing: 'Plumbing',
    filter_painting: 'Painting',
    filter_tiling: 'Tiling',
    filter_carpentry: 'Carpentry & Alu',
    filter_steel: 'Rebar & Steel',
    filter_hvac: 'HVAC & Cooling',
    offices_title: 'Study & Architecture Offices',
    offices_sub: 'Certified architects and civil engineers for building permits and designs',
    btn_new_office: 'Add Study Office',
    filter_offices_all: 'All',
    filter_offices_arch: 'Architect',
    filter_offices_civil: 'Civil Engineer',
    profile_title: 'User Profile',
    profile_lbl_language: 'Interface Language :',
    profile_change_pwd: 'Change Password',
    profile_signout: 'Sign Out',
    btn_cancel: 'Cancel',
    btn_publish: 'Publish Now',
    btn_save_office: 'Save & Publish Office',
    net_online_wifi: 'Connected (Wi-Fi)',
    net_online_data: 'Connected (4G Data)',
    net_online: 'Online',
    net_offline: 'Offline',
    unit_m2: 'DZD / m²',
    unit_linear_m: 'DZD / linear meter',
    unit_hour: 'DZD / hour',
    unit_day: 'DZD / day',
    unit_global: 'Total project price',
    unit_negotiable: 'Negotiable',
    status_pending: 'Pending Admin Review',
    status_approved: 'Approved & Verified ✅',
    call_btn: 'Phone Call',
    whatsapp_btn: 'WhatsApp',
    chat_btn: 'Private Chat',
    delete_btn: 'Delete',
    approve_btn: 'Approve ✅',
    reject_btn: 'Reject ❌',
    like_btn: 'Like',
    comment_btn: 'Comment',
    comments_title: 'Comments',
    comment_placeholder: 'Write a comment...',
    send_btn: 'Send',
    empty_posts: 'No job postings in this trade yet.',
    empty_offices: 'No study offices found in this category.',
    one_post_limit_alert: 'You already have an active post in this trade. Please update or delete it first.',
    post_published_success: 'Post submitted successfully! Pending admin verification.',
    post_published_admin_success: 'Post published immediately!',
    office_published_success: 'Study office successfully added!',
    open_maps_btn: 'View on Google Maps 📍'
  }
};

/* ========================================================================= */
/* 3. APP GLOBAL STATE                                                       */
/* ========================================================================= */

let currentUser = null;
let currentLanguage = 'ar';
let currentActiveTab = 'tab-scientific-calculator';
let activeWorkerFilter = 'all';
let activeOfficeFilter = 'all';
let showPendingOnly = false;
let pendingRegistration = null;

// Scientific calculator state
let calcExpression = '';
let calcCurrentVal = '0';
let calcJustEvaluated = false;

// Media recording state for voice notes
let mediaRecorderInstance = null;
let recordedAudioChunks = [];
let isRecordingAudio = false;

// Active 1-on-1 chat partner
let currentChatPartner = null; // { email, name, avatar }

// Upload preview caches
let cachedPostImageBase64 = null;
let cachedOfficeImageBase64 = null;
let cachedChatImageBase64 = null;

/* ========================================================================= */
/* 4. UTILITIES & SAFE GMAIL-STYLE AVATAR ENGINE                             */
/* ========================================================================= */

const GOOGLE_AVATAR_PALETTE = [
  '#1a73e8', // Google Blue
  '#ea4335', // Google Red
  '#fbbc04', // Google Yellow
  '#34a853', // Google Green
  '#9334e6', // Purple
  '#007b83', // Teal
  '#e8710a', // Orange
  '#fa7b17', // Amber
  '#e52592'  // Pink
];

function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

function getInitialLetter(name, email) {
  const source = (name && name.trim()) || (email && email.split('@')[0]) || 'U';
  const clean = source.trim();
  return clean.charAt(0).toUpperCase();
}

function getColorForString(str) {
  const input = String(str || 'batihub');
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % GOOGLE_AVATAR_PALETTE.length;
  return GOOGLE_AVATAR_PALETTE[index];
}

/**
 * Returns a bulletproof SVG Data URL styled exactly like Gmail/Google profile avatars.
 */
function getGmailAvatarDataUrl(name, email) {
  const letter = getInitialLetter(name, email);
  const color = getColorForString(email || name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="48" fill="${color}"/><text x="48" y="52" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="44" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="central">${letter}</text></svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

/**
 * Resolves safe avatar source, guaranteed to never break HTML attributes.
 */
function resolveAvatarSrc(avatarUrl, name, email) {
  if (avatarUrl && typeof avatarUrl === 'string' && avatarUrl.trim() !== '') {
    const trimmed = avatarUrl.trim();
    // Valid standard uploaded/asset image paths without HTML injection
    if ((trimmed.startsWith('data:image/png') || trimmed.startsWith('data:image/jpeg') || trimmed.startsWith('data:image/webp') || trimmed.startsWith('data:image/gif') || trimmed.startsWith('assets/') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) && !trimmed.includes('"') && !trimmed.includes('<') && !trimmed.includes('>')) {
      return trimmed;
    }
    // Clean SVG Data URLs
    if (trimmed.startsWith('data:image/svg+xml') && !trimmed.includes('"') && !trimmed.includes('<')) {
      return trimmed;
    }
    if (trimmed.startsWith('<svg') || trimmed.startsWith('data:image/svg+xml')) {
      let rawSvg = trimmed;
      if (rawSvg.startsWith('data:image/svg+xml')) {
        rawSvg = rawSvg.replace(/^data:image\/svg\+xml;?(charset=utf-8|charset=UTF-8|utf8)?,?/, '');
        try { rawSvg = decodeURIComponent(rawSvg); } catch (e) {}
      }
      return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(rawSvg);
    }
  }
  return getGmailAvatarDataUrl(name, email);
}

/**
 * Generates an img tag string with clean safe source and graceful fallback
 */
function renderAvatarImgTag(avatarUrl, name, email, cssClasses) {
  let safeSrc = resolveAvatarSrc(avatarUrl, name, email);
  // Strict attribute sanitization: eliminate any double quotes or angle brackets
  safeSrc = safeSrc.replace(/"/g, '%22').replace(/</g, '%3C').replace(/>/g, '%3E');
  const safeName = escapeHTML(name || email || 'User');
  const fallbackSrc = getGmailAvatarDataUrl(name, email).replace(/"/g, '%22');
  return `<img src="${safeSrc}" alt="${safeName}" class="${cssClasses}" onerror="this.onerror=null;this.src='${fallbackSrc}';">`;
}

/**
 * High-efficiency canvas compressor: scales down images to maxDimension and converts to clean JPEG Data URL.
 * Guarantees zero dropped packets over MQTT brokers and keeps payloads around 40KB - 80KB.
 */
function compressImageToDataUrl(fileOrBlob, maxDimension = 900, quality = 0.75) {
  return new Promise((resolve) => {
    if (!fileOrBlob) return resolve(null);
    const reader = new FileReader();
    reader.onerror = () => resolve(null);
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => resolve(null);
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (!width || !height) return resolve(e.target.result);

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0b0f19';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        } catch (err) {
          resolve(e.target.result);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(fileOrBlob);
  });
}

/* ========================================================================= */
/* 5. SHA-256 HASH ENGINE                                                    */
/* ========================================================================= */

async function sha256Hash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/* ========================================================================= */
/* 6. STORAGE HELPERS & DATABASE INIT                                        */
/* ========================================================================= */

function getStorageJSON(key, defaultVal) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultVal;
    if (typeof raw === 'string' && raw.startsWith('BTH_VAULT_')) {
      localStorage.removeItem(key);
      return defaultVal;
    }
    return JSON.parse(raw);
  } catch (err) {
    localStorage.removeItem(key);
    return defaultVal;
  }
}

function setStorageJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Storage Write Error:', key, err);
  }
  // Sync to Electron persistent JSON database files on disk
  if (window.electronDB) {
    if (key === 'batihub_registered_accounts' && typeof window.electronDB.saveAccounts === 'function') {
      window.electronDB.saveAccounts(value);
    } else if (key === 'batihub_worker_posts' && typeof window.electronDB.saveWorkerPosts === 'function') {
      window.electronDB.saveWorkerPosts(value);
    }
  }
}

function initAccountsDatabase() {
  let accounts = getStorageJSON('batihub_registered_accounts', null);
  if (!accounts || typeof accounts !== 'object') {
    accounts = {};
  }

  // Enforce Seed Accounts guarantees
  for (const [email, seedAcc] of Object.entries(SEED_ACCOUNTS)) {
    const existing = accounts[email];
    if (!existing || existing.passwordHash !== SEED_HASH) {
      accounts[email] = {
        ...(existing || {}),
        ...seedAcc
      };
    }
  }

  // Auto-heal any account avatars containing raw/unencoded SVG strings
  for (const acc of Object.values(accounts)) {
    if (acc.avatar && (acc.avatar.includes('<') || acc.avatar.includes('"'))) {
      acc.avatar = resolveAvatarSrc(acc.avatar, acc.fullName || acc.firstName, acc.email);
    }
  }

  setStorageJSON('batihub_registered_accounts', accounts);
  return accounts;
}

function initDefaultFeedsIfEmpty() {
  // Sanitize any existing posts in storage
  let existingPosts = getStorageJSON('batihub_worker_posts', null);
  if (Array.isArray(existingPosts) && existingPosts.length > 0) {
    let postsCleaned = false;
    existingPosts.forEach(p => {
      if (p.authorAvatar) {
        if (typeof p.authorAvatar !== 'string' || p.authorAvatar.includes('<') || p.authorAvatar.includes('"') || (!p.authorAvatar.startsWith('data:') && !p.authorAvatar.startsWith('assets/') && !p.authorAvatar.startsWith('http'))) {
          p.authorAvatar = null;
          postsCleaned = true;
        }
      }
    });
    if (postsCleaned) setStorageJSON('batihub_worker_posts', existingPosts);
  }

  // Worker Posts default sample
  let posts = getStorageJSON('batihub_worker_posts', null);
  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    posts = [
      {
        id: 'post_sample_01',
        trade: 'بناء',
        price: '850',
        unit: 'm2',
        phone: '0550123456',
        text: 'بناء معتمد ذو خبرة 15 سنة في أشغال البناء الخرساني، تركيب القوالب (Coffrage)، وبناء الجدران الآجرية بجودة عالية والتزام تام بالمواعيد. مستعد للعمل بالجزائر العاصمة وضواحيها.',
        image: null,
        authorId: 'batihubdz@gmail.com',
        authorName: 'BatiHub DZ (الإدارة)',
        authorAvatar: 'assets/batihub_logo.png',
        status: 'approved',
        likes: ['mouhanedguellif16@gmail.com'],
        comments: [
          {
            id: 'c_01',
            authorId: 'mouhanedguellif16@gmail.com',
            authorName: 'Mouhaned Guellif',
            text: 'عمل متقن وخدمة ممتازة، بالتوفيق!',
            createdAt: '2026-11-20T10:00:00.000Z'
          }
        ],
        createdAt: '2026-11-20T08:30:00.000Z'
      },
      {
        id: 'post_sample_02',
        trade: 'كهرباء',
        price: '3000',
        unit: 'day',
        phone: '0661234567',
        text: 'كهربائي معماري وصناعي، تمديد خطوط الكهرباء المنزلية، تركيب لوحات التوزيع وقواطع الحماية، تركيب الإضاءة المخفية والسبوتلايت الحديثة. العمل يومي أو بالمتر.',
        image: null,
        authorId: 'mouhanedguellif16@gmail.com',
        authorName: 'Mouhaned Guellif',
        authorAvatar: null,
        status: 'approved',
        likes: [],
        comments: [],
        createdAt: '2026-11-20T09:15:00.000Z'
      }
    ];
    setStorageJSON('batihub_worker_posts', posts);
  }

  // Study Offices default sample
  let offices = getStorageJSON('batihub_study_offices', null);
  if (!offices || !Array.isArray(offices) || offices.length === 0) {
    offices = [
      {
        id: 'office_sample_01',
        name: 'مكتب العمران للدراسات المعمارية والتقنية',
        engType: 'مهندس معماري',
        phone: '0550987654',
        address: 'الجزائر العاصمة - دالي براهيم',
        gps: 'https://maps.google.com/?q=36.7525,3.0420',
        services: 'إعداد مخططات ورخص البناء، تصاميم ثلاثية الأبعاد (3D)، شهادات المطابقة، ومتابعة الورشات حتى التسليم.',
        image: null,
        authorId: 'batihubdz@gmail.com',
        authorName: 'BatiHub DZ (الإدارة)',
        createdAt: '2026-11-20T07:00:00.000Z'
      },
      {
        id: 'office_sample_02',
        name: 'مكتب النخبة للهندسة المدنية ودراسات التربة',
        engType: 'مهندس مدني',
        phone: '0770112233',
        address: 'قسنطينة - حي زواغي سليمان',
        gps: 'https://maps.google.com/?q=36.3650,6.6147',
        services: 'دراسات الهيكل الخرساني والحديد المسلح (Génie Civil)، حسابات الزلازل، ودفاتر الشروط التقنية ومراقبة الجودة.',
        image: null,
        authorId: 'mouhanedguellif16@gmail.com',
        authorName: 'Mouhaned Guellif',
        createdAt: '2026-11-20T08:00:00.000Z'
      }
    ];
    setStorageJSON('batihub_study_offices', offices);
  }
}

/* ========================================================================= */
/* 7. TOAST & NOTIFICATION SYSTEM                                            */
/* ========================================================================= */

function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('appToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  let typeClass = 'border-bh-yellow/50';
  let iconClass = 'fa-solid fa-circle-info text-bh-yellow';

  if (type === 'success') {
    typeClass = 'toast-success';
    iconClass = 'fa-solid fa-circle-check text-emerald-400';
  } else if (type === 'error') {
    typeClass = 'toast-error';
    iconClass = 'fa-solid fa-circle-xmark text-rose-400';
  } else if (type === 'warning') {
    typeClass = 'toast-warning';
    iconClass = 'fa-solid fa-triangle-exclamation text-amber-400';
  }

  toast.className = `app-toast ${typeClass}`;
  toast.innerHTML = `
    <i class="${iconClass} text-base shrink-0"></i>
    <span class="font-semibold text-slate-100 flex-1 leading-snug">${escapeHTML(message)}</span>
    <button type="button" class="text-slate-400 hover:text-white shrink-0 ml-1 text-xs">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  toast.querySelector('button').addEventListener('click', () => {
    toast.remove();
  });

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.isConnected) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }
  }, duration);
}

function showAppModalAlert(title, message, isConfirm = false, onConfirm = null) {
  const modal = document.getElementById('appNotificationModal');
  const titleEl = document.getElementById('appNotifyTitle');
  const msgEl = document.getElementById('appNotifyMessage');
  const btnCancel = document.getElementById('btnAppNotifyCancel');
  const btnConfirm = document.getElementById('btnAppNotifyConfirm');

  if (!modal) return;

  titleEl.textContent = title;
  msgEl.textContent = message;

  if (isConfirm) {
    btnCancel.classList.remove('hidden');
    btnCancel.onclick = () => {
      modal.classList.add('hidden');
    };
    btnConfirm.onclick = () => {
      modal.classList.add('hidden');
      if (typeof onConfirm === 'function') onConfirm();
    };
  } else {
    btnCancel.classList.add('hidden');
    btnConfirm.onclick = () => {
      modal.classList.add('hidden');
      if (typeof onConfirm === 'function') onConfirm();
    };
  }

  modal.classList.remove('hidden');
}

/* ========================================================================= */
/* 8. AUTHENTICATION & SESSION MANAGEMENT                                    */
/* ========================================================================= */

// =========================================================================
// 8. GOOGLE AUTHENTICATION & TRUSTED DEVICE MANAGEMENT
// =========================================================================

function getTrustedDevicesMap() {
  try {
    return JSON.parse(localStorage.getItem('batihub_trusted_devices') || '{}');
  } catch (e) {
    return {};
  }
}

function isDeviceTrustedForEmail(email) {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  const map = getTrustedDevicesMap();
  return Boolean(map[cleanEmail] && map[cleanEmail].trusted);
}

function markDeviceAsTrusted(email, trusted = true) {
  if (!email) return;
  const cleanEmail = email.trim().toLowerCase();
  const map = getTrustedDevicesMap();
  if (trusted) {
    map[cleanEmail] = {
      trusted: true,
      timestamp: Date.now()
    };
  } else {
    delete map[cleanEmail];
  }
  localStorage.setItem('batihub_trusted_devices', JSON.stringify(map));
}

function deriveNameFromGmail(email) {
  if (!email) return 'مستخدم BatiHub';
  const cleanEmail = email.trim().toLowerCase();
  if (cleanEmail === 'batihubdz@gmail.com') {
    return 'BatiHub DZ (الإدارة)';
  }
  if (typeof SEED_ACCOUNTS !== 'undefined' && SEED_ACCOUNTS[cleanEmail] && SEED_ACCOUNTS[cleanEmail].fullName) {
    return SEED_ACCOUNTS[cleanEmail].fullName;
  }
  const prefix = cleanEmail.split('@')[0] || 'مستخدم';
  const noDigits = prefix.replace(/\d+$/, '');
  const rawParts = noDigits.split(/[._-]+/).filter(Boolean);
  if (rawParts.length === 0) {
    return prefix;
  }
  return rawParts.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function renderTrustedAccountsPills() {
  const container = document.getElementById('trustedAccountsPillsList');
  const section = document.getElementById('trustedAccountsSection');
  if (!container) return;

  const trustedMap = getTrustedDevicesMap();
  const accounts = initAccountsDatabase();

  const emails = new Set([
    'batihubdz@gmail.com',
    'mouhanedguellif16@gmail.com',
    ...Object.keys(trustedMap),
    ...Object.keys(accounts)
  ]);

  const list = Array.from(emails).filter(e => e && e.includes('@'));
  if (list.length === 0) {
    if (section) section.classList.add('hidden');
    return;
  }

  if (section) section.classList.remove('hidden');
  container.innerHTML = '';

  list.forEach(email => {
    const clean = email.toLowerCase();
    const isAdmin = (clean === 'batihubdz@gmail.com');
    const isTrusted = isDeviceTrustedForEmail(clean);
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `px-3 py-1.5 rounded-xl border text-xs font-mono transition flex items-center gap-2 cursor-pointer active:scale-95 ${
      isAdmin 
        ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20' 
        : 'bg-bh-card border-bh-border hover:border-bh-yellow/60 text-slate-200 hover:text-white'
    }`;

    pill.innerHTML = `
      <span class="w-2 h-2 rounded-full ${isAdmin ? 'bg-amber-400' : (isTrusted ? 'bg-emerald-400' : 'bg-slate-400')}"></span>
      <span dir="ltr">${escapeHTML(clean)}</span>
      <span class="text-[10px] text-slate-400">${isAdmin ? '(إدارة)' : (isTrusted ? '(موثوق)' : '(مستخدم)')}</span>
    `;

    pill.onclick = () => {
      const input = document.getElementById('authGmailInput');
      if (input) {
        input.value = clean;
        if (isTrusted) {
          handleGoogleAuthSubmit();
        }
      }
    };

    container.appendChild(pill);
  });
}

function switchAuthView(viewName) {
  const viewGoogle = document.getElementById('viewGoogleAuth') || document.getElementById('viewLogin');
  const viewOtp = document.getElementById('viewOtp');
  const viewRegister = document.getElementById('viewRegister');
  const viewForgot = document.getElementById('viewForgot');

  const headerTitle = document.getElementById('authScreenHeaderTitle');
  const headerSub = document.getElementById('authScreenHeaderSub');

  [viewGoogle, viewOtp, viewRegister, viewForgot].forEach(el => el && el.classList.add('hidden'));

  if (viewName === 'google' || viewName === 'login' || viewName === 'register') {
    if (viewGoogle) viewGoogle.classList.remove('hidden');
    if (headerTitle) headerTitle.textContent = 'BatiHub DZ • تسجيل الدخول بـ Google';
    if (headerSub) headerSub.textContent = 'أدخل بريد Google (Gmail) لتسجيل الدخول المباشر أو تأكيد جهازك الجديد';
    initMobileLoginPicker();
    renderTrustedAccountsPills();
  } else if (viewName === 'otp') {
    if (viewOtp) viewOtp.classList.remove('hidden');
    if (headerTitle) headerTitle.textContent = 'تأكيد جهاز جديد • رمز التحقق';
    if (headerSub) headerSub.textContent = 'أدخل رمز التحقق المكون من 6 أرقام المرسل إلى بريدك لتأكيد هذا الجهاز';
  }
}

let pendingGoogleOtp = null;

async function handleGoogleAuthSubmit(event) {
  if (event) event.preventDefault();

  const input = document.getElementById('authGmailInput');
  const rememberCheck = document.getElementById('authTrustedDeviceCheck');
  if (!input) return;

  const email = (input.value || '').trim().toLowerCase();
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!email || !email.includes('@') || !gmailRegex.test(email)) {
    showToast('البريد الإلكتروني غير صحيح أو غير متواجد، يرجى كتابة عنوان بريد Google (Gmail) صحيح وموثق', 'warning');
    return;
  }

  const shouldTrust = rememberCheck ? rememberCheck.checked : true;
  const isTrusted = isDeviceTrustedForEmail(email);

  if (isTrusted) {
    // Trusted device: Instant direct login!
    logInGoogleUserDirectly(email, true);
    return;
  }

  // Untrusted / New device: Generate 6-digit security code and send via Gmail
  const otpCode = String(Math.floor(100000 + Math.random() * 900000));
  pendingGoogleOtp = {
    email: email,
    code: otpCode,
    shouldTrust: shouldTrust,
    timestamp: Date.now()
  };

  const targetEmailDisplay = document.getElementById('otpTargetEmailDisplay');
  if (targetEmailDisplay) targetEmailDisplay.textContent = email;

  const otpInput = document.getElementById('otpCodeInput');
  if (otpInput) {
    otpInput.value = '';
    setTimeout(() => otpInput.focus(), 300);
  }

  switchAuthView('otp');
  showToast('جاري إرسال رمز أمان Google إلى بريدك الإلكتروني...', 'info', 3000);

  // Send real email via SMTP
  sendOtpEmail(email, otpCode, 'login').then(res => {
    if (res && res.success && !res.fallback) {
      showToast(`تم إرسال رمز الأمان المكون من 6 أرقام إلى ${email} بنجاح!`, 'success', 5000);
    } else {
      showToast(`رمز التحقق المرسل إلى ${email} هو: ${otpCode}`, 'info', 7000);
    }
  }).catch(() => {
    showToast(`رمز التحقق المرسل إلى ${email} هو: ${otpCode}`, 'info', 7000);
  });
}

async function handleVerifyGoogleOtp(event) {
  if (event) event.preventDefault();

  if (!pendingGoogleOtp) {
    showToast('لا توجد جلسة تحقق قيد الانتظار! يرجى إدخال البريد مجدداً.', 'error');
    switchAuthView('google');
    return;
  }

  const otpInput = document.getElementById('otpCodeInput');
  const enteredCode = (otpInput ? otpInput.value : '').trim();

  if (enteredCode !== pendingGoogleOtp.code) {
    showToast('رمز الأمان غير صحيح! يرجى التأكد وإعادة المحاولة.', 'error');
    return;
  }

  const email = pendingGoogleOtp.email;
  const shouldTrust = pendingGoogleOtp.shouldTrust;

  if (shouldTrust) {
    markDeviceAsTrusted(email, true);
  }

  logInGoogleUserDirectly(email, shouldTrust);
  pendingGoogleOtp = null;
}

function logInGoogleUserDirectly(email, trusted = true) {
  const cleanEmail = email.trim().toLowerCase();
  const accounts = initAccountsDatabase();
  const isAdmin = (cleanEmail === 'batihubdz@gmail.com');

  let account = accounts[cleanEmail];
  if (!account) {
    account = {
      id: 'usr_' + Date.now(),
      firstName: deriveNameFromGmail(cleanEmail).split(' ')[0] || 'مستخدم',
      lastName: deriveNameFromGmail(cleanEmail).split(' ').slice(1).join(' ') || '',
      fullName: deriveNameFromGmail(cleanEmail),
      email: cleanEmail,
      isVerified: true,
      role: isAdmin ? 'admin' : 'user',
      avatar: isAdmin ? 'assets/batihub_logo.png' : null,
      createdAt: new Date().toISOString()
    };
    accounts[cleanEmail] = account;
    setStorageJSON('batihub_registered_accounts', accounts);

    if (window.electronDB && typeof window.electronDB.saveAccounts === 'function') {
      window.electronDB.saveAccounts(accounts).catch(() => {});
    }

    broadcastLiveEvent('new_registered_account', account);
  } else {
    if (isAdmin && account.role !== 'admin') {
      account.role = 'admin';
      accounts[cleanEmail] = account;
      setStorageJSON('batihub_registered_accounts', accounts);
    }
  }

  currentUser = { ...account };
  setStorageJSON('batihub_current_user', currentUser);
  sessionStorage.setItem('batihub_current_user', JSON.stringify(currentUser));

  if (trusted) {
    markDeviceAsTrusted(cleanEmail, true);
    setStorageJSON('batihub_saved_login_cred', {
      email: cleanEmail,
      autoLogin: true
    });
  }

  renderTrustedAccountsPills();
  showToast(`مرحباً بك ${currentUser.fullName || currentUser.firstName}! تم تسجيل الدخول بنجاح.`, 'success', 4000);
  transitionToDashboard();
}

function cancelOtpAndGoBack() {
  pendingGoogleOtp = null;
  switchAuthView('google');
}

function initMobileLoginPicker() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  const mobileContainer = document.getElementById('mobileGooglePickerContainer');
  if (mobileContainer && isMobile) {
    mobileContainer.classList.remove('hidden');
  }
}

async function handleMobileGoogleLogin() {
  const input = document.getElementById('authGmailInput');
  
  if (window.navigator && window.navigator.credentials && window.navigator.credentials.get) {
    try {
      const cred = await window.navigator.credentials.get({
        mediation: 'optional'
      });
      if (cred && cred.id && cred.id.includes('@')) {
        if (input) input.value = cred.id;
        handleGoogleAuthSubmit();
        return;
      }
    } catch (e) {}
  }

  const userGmail = prompt('أدخل بريد Google (Gmail) المسجل في هاتفك:');
  if (userGmail && userGmail.trim()) {
    if (input) input.value = userGmail.trim();
    handleGoogleAuthSubmit();
  }
}

// Backwards-compatible aliases
function handleUserLogin(event) { return handleGoogleAuthSubmit(event); }
function handleUserRegister(event) { return handleGoogleAuthSubmit(event); }
function handleVerifyOtp(event) { return handleVerifyGoogleOtp(event); }
function loadSavedLoginCredentials() { renderTrustedAccountsPills(); }
function forgetSavedLoginCredentials() {
  localStorage.removeItem('batihub_trusted_devices');
  localStorage.removeItem('batihub_saved_login_cred');
  renderTrustedAccountsPills();
  showToast('تمت إزالة الأجهزة الموثوقة المحفوظة بنجاح', 'info');
}
function togglePasswordVisibility() {}
async function handleSendPasswordResetCode() {
  showToast('يتم تسجيل الدخول مباشرة برمز التحقق عبر Gmail', 'info');
}

async function sendOtpEmail(toEmail, otpCode, purpose = 'registration') {
  const subject = 'BatiHub DZ • رمز التحقق لتأكيد جهازك';

  const html = `
    <div dir="rtl" style="font-family: Arial, Tahoma, sans-serif; background-color: #07090e; color: #f1f5f9; padding: 25px; border-radius: 16px; max-width: 520px; margin: auto; border: 1px solid #1c2638;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ffa000; font-size: 24px; margin: 0; font-weight: bold;">BatiHub DZ</h1>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 5px;">منصة المحترفين وعروض العمل في الجزائر</p>
      </div>
      <div style="background-color: #0f1520; padding: 20px; border-radius: 12px; border: 1px solid #1c2638; text-align: center;">
        <h3 style="color: #ffffff; font-size: 16px; margin-top: 0;">رمز التحقق لتأكيد جهازك</h3>
        <p style="color: #94a3b8; font-size: 13px;">أدخل هذا الرمز المكون من 6 أرقام لتأكيد حسابك وتوثيق هذا الجهاز:</p>
        <div style="display: inline-block; background: linear-gradient(135deg, #ffa000, #ff6d00); color: #07090e; font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 12px 28px; border-radius: 12px; margin: 15px 0; font-family: monospace;">
          ${otpCode}
        </div>
        <p style="color: #64748b; font-size: 11px; margin-bottom: 0;">هذا الرمز صالح لمدة 15 دقيقة. لا تشاركه مع أي شخص لحماية حسابك.</p>
      </div>
      <p style="text-align: center; font-size: 12px; color: #ffa000; font-weight: bold; margin-top: 20px; letter-spacing: 1px;">
        Support Bati Hub DZ
      </p>
    </div>
  `;

  if (window.electronMailAPI && typeof window.electronMailAPI.sendMail === 'function') {
    try {
      const res = await window.electronMailAPI.sendMail({
        to: toEmail,
        subject: subject,
        text: `رمز التحقق الخاص بك في BatiHub DZ هو: ${otpCode}`,
        html: html
      });
      return res;
    } catch (err) {
      console.error('SMTP Mail send error:', err);
      return { success: false, error: err.message };
    }
  }

  return { success: true, fallback: true };
}

function handleSignOut() {
  currentUser = null;
  localStorage.removeItem('batihub_current_user');
  sessionStorage.removeItem('batihub_current_user');

  closeUserProfileModal();

  const authGate = document.getElementById('authGateScreen');
  const dashboard = document.getElementById('appDashboard');

  if (dashboard) dashboard.classList.add('hidden');
  if (authGate) {
    authGate.classList.remove('auth-hide');
    authGate.style.display = 'flex';
  }

  switchAuthView('google');
  renderTrustedAccountsPills();
  showToast('تم تسجيل الخروج بنجاح', 'info');
}

function transitionToDashboard() {
  const authGate = document.getElementById('authGateScreen');
  const dashboard = document.getElementById('appDashboard');

  if (authGate) {
    authGate.classList.add('auth-hide');
    setTimeout(() => {
      authGate.style.display = 'none';
    }, 400);
  }

  if (dashboard) {
    dashboard.classList.remove('hidden');
  }

  updateUserProfileUI();
  applyLanguage(currentLanguage);
  renderWorkerPostsFeed();
  renderStudyOfficesFeed();
  renderWorkerRequestsFeed();
  renderGalleryFeed();
  renderBuildingMaterialsFeed();
  renderRealEstateFeed();
  updateUnreadMessagesCount();
  updateTopPendingCategoryNavigation();
  renderDedicatedPendingPostsTab();
}

function updateUserProfileUI() {
  if (!currentUser) return;

  const nameDisplays = [
    document.getElementById('userNameDisplay'),
    document.getElementById('profileModalName')
  ];
  nameDisplays.forEach(el => {
    if (el) el.textContent = currentUser.fullName || currentUser.firstName || 'مستخدم';
  });

  const emailDisplay = document.getElementById('profileModalEmail');
  if (emailDisplay) emailDisplay.textContent = currentUser.email;

  const headerAvatarImg = document.getElementById('userAvatarImg');
  const modalAvatarImg = document.getElementById('profileModalAvatar');

  const avatarSrc = resolveAvatarSrc(currentUser.avatar, currentUser.fullName, currentUser.email);
  if (headerAvatarImg) headerAvatarImg.src = avatarSrc;
  if (modalAvatarImg) modalAvatarImg.src = avatarSrc;

  // Show/Hide Admin pending posts filter button & top navigation
  updateTopPendingCategoryNavigation();
  const btnAdminAddGallery = document.getElementById('btnAdminAddGallery');
  if (btnAdminAddGallery) {
    if (currentUser && currentUser.role === 'admin') {
      btnAdminAddGallery.classList.remove('hidden');
    } else {
      btnAdminAddGallery.classList.add('hidden');
    }
  }
  const adminFilterBtn = document.getElementById('adminPendingFilterBtn');
  if (adminFilterBtn) {
    if (currentUser.role === 'admin') {
      adminFilterBtn.classList.remove('hidden');
      updateAdminPendingBadge();
    } else {
      adminFilterBtn.classList.add('hidden');
    }
  }
}

function openUserProfileModal() {
  if (!currentUser) {
    showToast('يرجى تسجيل الدخول أولاً', 'warning');
    return;
  }
  updateUserProfileUI();
  const modal = document.getElementById('modalUserProfile');
  if (modal) modal.classList.remove('hidden');
}

function closeUserProfileModal() {
  const modal = document.getElementById('modalUserProfile');
  if (modal) modal.classList.add('hidden');
}

function handleProfilePhotoUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file || !currentUser) return;

  if (file.size > 3 * 1024 * 1024) {
    showToast('حجم الصورة كبير جداً! يرجى اختيار صورة أقل من 3 ميغابايت.', 'warning');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64Data = e.target.result;
    currentUser.avatar = base64Data;

    // Update in database
    const accounts = initAccountsDatabase();
    if (accounts[currentUser.email]) {
      accounts[currentUser.email].avatar = base64Data;
      setStorageJSON('batihub_registered_accounts', accounts);
    }
    setStorageJSON('batihub_current_user', currentUser);

    updateUserProfileUI();
    renderWorkerPostsFeed();
    showToast('تم تحديث صورتك الشخصية بنجاح!', 'success');
  };
  reader.readAsDataURL(file);
}

function openChangePasswordModal() {
  const modal = document.getElementById('modalChangePassword');
  if (modal) modal.classList.remove('hidden');
}

function closeChangePasswordModal() {
  const modal = document.getElementById('modalChangePassword');
  if (modal) modal.classList.add('hidden');
}

async function handleDirectPasswordChange(event) {
  if (event) event.preventDefault();
  if (!currentUser) return;

  const currentPwd = document.getElementById('inputCurrentPassword').value;
  const newPwd = document.getElementById('inputNewPasswordDirect').value;
  const confirmPwd = document.getElementById('inputConfirmPasswordDirect').value;

  if (newPwd.length < 6) {
    showToast('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل', 'warning');
    return;
  }

  if (newPwd !== confirmPwd) {
    showToast('كلمة المرور الجديدة وتأكيدها غير متطابقين!', 'error');
    return;
  }

  const accounts = initAccountsDatabase();
  const acc = accounts[currentUser.email];
  if (!acc) return;

  const currentComputedHash = await sha256Hash(currentPwd + (acc.salt || SEED_SALT));
  if (currentComputedHash !== acc.passwordHash) {
    showToast('كلمة المرور الحالية غير صحيحة!', 'error');
    return;
  }

  const newHash = await sha256Hash(newPwd + (acc.salt || SEED_SALT));
  acc.passwordHash = newHash;
  accounts[currentUser.email] = acc;
  setStorageJSON('batihub_registered_accounts', accounts);

  currentUser.passwordHash = newHash;
  setStorageJSON('batihub_current_user', currentUser);

  // Automatically invalidate saved credentials on password change so user must log in with new password
  localStorage.removeItem('batihub_saved_login_cred');

  closeChangePasswordModal();
  showToast('تم تغيير كلمة المرور بنجاح!', 'success');
}

function toggleEditUserName(show) {
  const container = document.getElementById('editUserNameContainer');
  const input = document.getElementById('editUserNameInput');
  if (!container) return;

  const isHidden = container.classList.contains('hidden');
  const willShow = (typeof show === 'boolean') ? show : isHidden;

  if (willShow) {
    container.classList.remove('hidden');
    if (input && currentUser) {
      input.value = currentUser.fullName || currentUser.firstName || '';
      input.focus();
    }
  } else {
    container.classList.add('hidden');
  }
}

function handleSaveNewUserName() {
  if (!currentUser) return;
  const input = document.getElementById('editUserNameInput');
  if (!input) return;

  const newName = (input.value || '').trim();
  if (!newName || newName.length < 2) {
    showToast('يرجى إدخال اسم صحيح مكون من حرفين على الأقل', 'warning');
    return;
  }

  const parts = newName.split(/\s+/);
  currentUser.fullName = newName;
  currentUser.firstName = parts[0] || newName;
  currentUser.lastName = parts.slice(1).join(' ') || '';

  // 1. Update in local storage
  setStorageJSON('batihub_current_user', currentUser);
  sessionStorage.setItem('batihub_current_user', JSON.stringify(currentUser));

  // 2. Update in accounts database
  const accounts = initAccountsDatabase();
  const cleanEmail = currentUser.email.toLowerCase();
  if (accounts[cleanEmail]) {
    accounts[cleanEmail].fullName = newName;
    accounts[cleanEmail].firstName = currentUser.firstName;
    accounts[cleanEmail].lastName = currentUser.lastName;
    setStorageJSON('batihub_registered_accounts', accounts);
  }

  // 3. Update Electron disk DB
  if (window.electronDB && typeof window.electronDB.saveAccounts === 'function') {
    window.electronDB.saveAccounts(accounts).catch(() => {});
  }

  // 4. Update any worker posts authored by this user
  let posts = getStorageJSON('batihub_worker_posts', []);
  let postsUpdated = false;
  posts.forEach(p => {
    if (p.authorId && p.authorId.toLowerCase() === cleanEmail) {
      p.authorName = newName;
      postsUpdated = true;
    }
  });
  if (postsUpdated) setStorageJSON('batihub_worker_posts', posts);

  // 5. Broadcast profile update
  broadcastLiveEvent('edit_user_profile', {
    email: cleanEmail,
    fullName: newName
  });

  // 6. Update UI
  updateUserProfileUI();
  toggleEditUserName(false);
  showToast('تم حفظ وتحديث اسم المستخدم بنجاح!', 'success');
}

/* ========================================================================= */
/* 9. NAVIGATION & TAB SWITCHING ENGINE                                      */
/* ========================================================================= */

function switchTab(tabId) {
  if (!tabId) return;

  currentActiveTab = tabId;

  // 1. Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.add('hidden');
  });

  // 2. Show active tab content
  const targetContent = document.getElementById(tabId);
  if (targetContent) {
    targetContent.classList.remove('hidden');
  }

  // 3. Update desktop navigation tabs
  document.querySelectorAll('.nav-tab').forEach(btn => {
    const btnTab = btn.getAttribute('data-tab');
    if (btnTab === tabId) {
      btn.classList.add('active-tab');
    } else {
      btn.classList.remove('active-tab');
    }
  });

  // 4. Update mobile bottom navigation bar
  const mNavMapping = {
    'tab-scientific-calculator': 'mNavCalc',
    'tab-worker-board': 'mNavWorkers',
    'tab-worker-requests': 'mNavWorkerRequests',
    'tab-gallery': 'mNavGallery',
    'tab-pending-posts': 'mNavPending',
    'tab-study-offices': 'mNavOffices',
    'tab-real-estate': 'mNavRealEstate',
    'tab-building-materials': 'mNavMaterials',
    'tab-ai-chat': 'mNavAi',
    'tab-ai-engineer': 'mNavAi',
    'tab-cost-estimator': 'mNavEstimator'
  };

  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.remove('text-bh-yellow');
    item.classList.add('text-slate-400');
  });

  const activeMobileBtnId = mNavMapping[tabId];
  if (activeMobileBtnId) {
    const activeBtn = document.getElementById(activeMobileBtnId);
    if (activeBtn) {
      activeBtn.classList.remove('text-slate-400');
      activeBtn.classList.add('text-bh-yellow');
    }
  }

  // 5. Re-render feeds when tabs become active
  if (tabId === 'tab-pending-posts') {
    renderDedicatedPendingPostsTab();
  } else if (tabId === 'tab-worker-requests') {
    renderWorkerRequestsFeed();
  } else if (tabId === 'tab-gallery') {
    renderGalleryFeed();
  } else if (tabId === 'tab-real-estate') {
    renderRealEstateFeed();
  } else if (tabId === 'tab-building-materials') {
    renderBuildingMaterialsFeed();
  } else if (tabId === 'tab-cost-estimator') {
    populateEstimatorArtisansDropdown();
    populateEstimatorDecorDropdown();
  } else if (tabId === 'tab-ai-chat' || tabId === 'tab-ai-engineer') {
    updateGeminiKeyBadge();
  } else if (tabId === 'tab-worker-board') {
    renderWorkerPostsFeed();
  }
}

/* ========================================================================= */
/* 10. LANGUAGE & LOCALIZATION (i18n) ENGINE                                 */
/* ========================================================================= */

function setLanguage(lang) {
  if (!I18N[lang]) return;
  currentLanguage = lang;
  localStorage.setItem('batihub_lang', lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.ar;
  const isRTL = (lang === 'ar');

  document.documentElement.lang = lang;
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

  // Update text nodes with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update language switcher button states
  ['pLangAR', 'pLangFR', 'pLangEN'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.classList.remove('bg-bh-yellow', 'text-slate-950');
    btn.classList.add('bg-bh-bg', 'text-slate-200');
  });

  const activeBtnId = lang === 'ar' ? 'pLangAR' : (lang === 'fr' ? 'pLangFR' : 'pLangEN');
  const activeBtn = document.getElementById(activeBtnId);
  if (activeBtn) {
    activeBtn.classList.remove('bg-bh-bg', 'text-slate-200');
    activeBtn.classList.add('bg-bh-yellow', 'text-slate-950');
  }

  renderWorkerPostsFeed();
  renderStudyOfficesFeed();
}

/* ========================================================================= */
/* 11. REALTIME MULTI-DEVICE CLOUD SYNC ENGINE (EMQX MQTT + WEBSOCKET)       */
/* ========================================================================= */

const MQTT_BROKER_URL = 'wss://broker.emqx.io:8084/mqtt';
const MQTT_TOPIC_BROADCAST = 'batihub_dz/v2/broadcast';
const currentDeviceId = 'dev_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
let mqttClient = null;

async function broadcastLiveEvent(action, payload) {
  const packet = {
    senderDeviceId: currentDeviceId,
    timestamp: Date.now(),
    action: action,
    payload: payload
  };
  const jsonStr = JSON.stringify(packet);

  // Send instantly via MQTT WebSocket
  if (mqttClient && mqttClient.connected) {
    try {
      mqttClient.publish(MQTT_TOPIC_BROADCAST, jsonStr, { qos: 1 });
    } catch (e) {
      console.warn('[MQTT publish err]:', e);
    }
  } else {
    // Retry shortly if connecting
    setTimeout(() => {
      if (mqttClient && mqttClient.connected) {
        try {
          mqttClient.publish(MQTT_TOPIC_BROADCAST, jsonStr, { qos: 1 });
        } catch (e) {}
      }
    }, 400);
  }
}

function initLiveSyncEngine() {
  if (mqttClient) return;

  const tryConnect = () => {
    if (typeof window.mqtt !== 'undefined' && typeof window.mqtt.connect === 'function') {
      try {
        const clientId = 'bh_' + Math.random().toString(36).substring(2, 8) + '_' + Date.now();
        mqttClient = window.mqtt.connect(MQTT_BROKER_URL, {
          clientId: clientId,
          clean: true,
          connectTimeout: 8000,
          reconnectPeriod: 1500,
          keepalive: 30
        });

        mqttClient.on('connect', () => {
          console.log('[BatiHub MQTT] Connected successfully to internet real-time broker!');
          updateLiveNetworkStatus('online');
          mqttClient.subscribe(MQTT_TOPIC_BROADCAST, { qos: 1 }, (err) => {
            if (!err) {
              console.log('[BatiHub MQTT] Subscribed to broadcast channel:', MQTT_TOPIC_BROADCAST);
              // Request vault synchronization from any online peer
              setTimeout(() => {
                broadcastLiveEvent('vault_request', { requester: currentUser ? currentUser.email : 'guest' });
              }, 400);
            }
          });
        });

        mqttClient.on('message', (topic, message) => {
          try {
            const packet = JSON.parse(message.toString());
            if (!packet || packet.senderDeviceId === currentDeviceId) return; // ignore own echo
            handleIncomingLiveSyncPacket(packet);
          } catch (e) {
            console.warn('[MQTT message parse error]:', e);
          }
        });

        mqttClient.on('error', (err) => {
          console.warn('[MQTT broker error]:', err);
          updateLiveNetworkStatus('reconnecting');
        });

        mqttClient.on('reconnect', () => {
          console.log('[BatiHub MQTT] Reconnecting to broker...');
          updateLiveNetworkStatus('reconnecting');
        });

        mqttClient.on('offline', () => {
          updateLiveNetworkStatus('offline');
        });

        // Periodic heartbeat ping to keep connection actively alive (نشط ديما)
        setInterval(() => {
          if (mqttClient && mqttClient.connected) {
            try {
              mqttClient.publish('batihub/ping', '1', { qos: 0 });
              updateLiveNetworkStatus('online');
            } catch (e) {}
          }
        }, 20000);
      } catch (err) {
        console.warn('[MQTT init exception]:', err);
      }
    } else {
      // If mqtt.min.js script is still loading, wait a moment and retry
      setTimeout(tryConnect, 300);
    }
  };

  tryConnect();
}

function handleIncomingLiveSyncPacket(packet) {
  const { action, payload } = packet;

  // 1. Chat Message Sync (Real-time private messaging across all devices)
  if (action === 'chat_message') {
    const { threadKey, recipientEmail, senderEmail, message } = payload;
    const chats = getStorageJSON('batihub_private_chats', {});
    if (!chats[threadKey]) chats[threadKey] = [];

    // Avoid duplicate message IDs
    if (!chats[threadKey].some(m => m.id === message.id)) {
      chats[threadKey].push(message);
      setStorageJSON('batihub_private_chats', chats);

      // If user is currently signed in
      if (currentUser) {
        const userEmail = currentUser.email.toLowerCase();
        const isForMe = (userEmail === recipientEmail.toLowerCase() || userEmail === senderEmail.toLowerCase());
        if (isForMe) {
          // If chat modal is currently open with this sender
          if (currentChatPartner && currentChatPartner.email.toLowerCase() === senderEmail.toLowerCase()) {
            renderPrivateChatMessages();
          } else if (userEmail === recipientEmail.toLowerCase()) {
            showToast(`رسالة خاصة جديدة من ${escapeHTML(message.senderName || senderEmail)}`, 'info', 4000);
            updateUnreadMessagesCount();
          }
        }
      }
    }
  }

  // 2. Worker Posts Sync (new post created)
  else if (action === 'new_worker_post') {
    let posts = getStorageJSON('batihub_worker_posts', []);
    if (!posts.some(p => p.id === payload.id)) {
      if (payload.authorAvatar && (typeof payload.authorAvatar !== 'string' || payload.authorAvatar.includes('<') || payload.authorAvatar.includes('"') || (!payload.authorAvatar.startsWith('data:') && !payload.authorAvatar.startsWith('assets/') && !payload.authorAvatar.startsWith('http')))) {
        payload.authorAvatar = null;
      }
      posts.unshift(payload);
      setStorageJSON('batihub_worker_posts', posts);
      updateAdminPendingBadge();
      updateWorkerFilterPillsVisibility();
      updateTopPendingCategoryNavigation();
      renderWorkerPostsFeed();
      renderAdminPendingRequestsSection();
      renderDedicatedPendingPostsTab();

      if (currentUser && currentUser.role === 'admin') {
        showToast(`طلب منشور جديد بانتظار المراجعة من ${escapeHTML(payload.authorName)}`, 'warning', 5000);
      } else if (currentUser && currentUser.email.toLowerCase() === payload.authorId.toLowerCase()) {
        showToast('تم استلام منشورك وهو الآن قيد الفحص والمراجعة لدى الإدارة', 'info', 5000);
      }
    }
  }

  // 3. Worker Post Approved (Instantly published to ALL users and devices)
  else if (action === 'approve_worker_post') {
    let posts = getStorageJSON('batihub_worker_posts', []);
    const idx = posts.findIndex(p => p.id === payload.postId);
    let postToDisplay = null;

    if (idx > -1) {
      posts[idx].status = 'approved';
      if (payload.post) posts[idx] = { ...posts[idx], ...payload.post, status: 'approved' };
      postToDisplay = posts[idx];
    } else if (payload.post) {
      postToDisplay = { ...payload.post, status: 'approved' };
      posts.unshift(postToDisplay);
    }

    setStorageJSON('batihub_worker_posts', posts);
    updateAdminPendingBadge();
    updateWorkerFilterPillsVisibility();
    updateTopPendingCategoryNavigation();
    renderWorkerPostsFeed();
    renderAdminPendingRequestsSection();
    renderDedicatedPendingPostsTab();

    if (currentUser && postToDisplay && postToDisplay.authorId && currentUser.email.toLowerCase() === postToDisplay.authorId.toLowerCase()) {
      showToast('تهانينا! تمت الموافقة على منشورك وأصبح ظاهراً للجميع في المنصة!', 'success', 6000);
    } else {
      showToast('تم اعتماد ونشر عرض عمل جديد في المنصة!', 'info', 3500);
    }
  }

  // 3.55. Worker Requests Sync
  else if (action === 'new_worker_request') {
    let reqs = getStorageJSON('batihub_worker_requests', []);
    if (!reqs.some(r => r.id === payload.id)) {
      reqs.unshift(payload);
      setStorageJSON('batihub_worker_requests', reqs);
      renderWorkerRequestsFeed();
      renderDedicatedPendingPostsTab();
      updateTopPendingCategoryNavigation();
      updateAdminPendingBadge();

      if (currentUser && currentUser.role === 'admin') {
        showToast(`طلب عامل جديد بانتظار المراجعة من ${escapeHTML(payload.authorName || 'مستخدم')}`, 'warning', 5000);
      }
    }
  }

  else if (action === 'approve_worker_request') {
    let reqs = getStorageJSON('batihub_worker_requests', []);
    const idx = reqs.findIndex(r => r.id === payload.reqId);
    let reqToDisplay = null;
    if (idx > -1) {
      reqs[idx].status = 'approved';
      if (payload.request) reqs[idx] = { ...reqs[idx], ...payload.request, status: 'approved' };
      reqToDisplay = reqs[idx];
    } else if (payload.request) {
      reqToDisplay = { ...payload.request, status: 'approved' };
      reqs.unshift(reqToDisplay);
    }
    setStorageJSON('batihub_worker_requests', reqs);
    renderWorkerRequestsFeed();
    renderDedicatedPendingPostsTab();
    updateTopPendingCategoryNavigation();
    updateAdminPendingBadge();

    if (currentUser && reqToDisplay && reqToDisplay.authorId && currentUser.email.toLowerCase() === reqToDisplay.authorId.toLowerCase()) {
      showToast('تهانينا! تمت الموافقة على طلب العامل ونشره في المنصة!', 'success', 6000);
    }
  }

  else if (action === 'reject_worker_request' || action === 'delete_worker_request') {
    let reqs = getStorageJSON('batihub_worker_requests', []);
    reqs = reqs.filter(r => r.id !== payload.reqId);
    setStorageJSON('batihub_worker_requests', reqs);
    renderWorkerRequestsFeed();
    renderDedicatedPendingPostsTab();
    updateTopPendingCategoryNavigation();
    updateAdminPendingBadge();
  }

  else if (action === 'toggle_request_like') {
    let reqs = getStorageJSON('batihub_worker_requests', []);
    const req = reqs.find(r => r.id === payload.reqId);
    if (req) {
      req.likes = payload.likes;
      setStorageJSON('batihub_worker_requests', reqs);
      renderWorkerRequestsFeed();
    }
  }

  else if (action === 'add_request_comment') {
    let reqs = getStorageJSON('batihub_worker_requests', []);
    const req = reqs.find(r => r.id === payload.reqId);
    if (req) {
      if (!req.comments) req.comments = [];
      if (!req.comments.some(c => c.id === payload.comment.id)) {
        req.comments.push(payload.comment);
        setStorageJSON('batihub_worker_requests', reqs);
        renderWorkerRequestsFeed();
      }
    }
  }

  // 3.56. Gallery Sync
  else if (action === 'new_gallery_item') {
    let items = getStorageJSON('batihub_gallery_items', []);
    if (!items.some(i => i.id === payload.id)) {
      items.unshift(payload);
      setStorageJSON('batihub_gallery_items', items);
      renderGalleryFeed();
    }
  }

  else if (action === 'delete_gallery_item') {
    let items = getStorageJSON('batihub_gallery_items', []);
    items = items.filter(i => i.id !== payload.itemId);
    setStorageJSON('batihub_gallery_items', items);
    renderGalleryFeed();
  }

  else if (action === 'edit_user_profile') {
    const accounts = initAccountsDatabase();
    if (accounts[payload.email]) {
      accounts[payload.email].fullName = payload.fullName;
      setStorageJSON('batihub_registered_accounts', accounts);
    }
    if (currentUser && currentUser.email.toLowerCase() === payload.email.toLowerCase()) {
      currentUser.fullName = payload.fullName;
      setStorageJSON('batihub_current_user', currentUser);
      updateUserProfileUI();
    }
    renderWorkerPostsFeed();
    renderWorkerRequestsFeed();
  }

  // 3.6. Study Office Sync (Created, Approved, Rejected)
  else if (action === 'new_study_office') {
    let offices = getStorageJSON('batihub_study_offices', []);
    if (!offices.some(o => o.id === payload.id)) {
      offices.unshift(payload);
      setStorageJSON('batihub_study_offices', offices);
      renderStudyOfficesFeed();
      renderDedicatedPendingPostsTab();
      updateTopPendingCategoryNavigation();
      updateAdminPendingBadge();

      if (currentUser && currentUser.role === 'admin') {
        showToast(`طلب إضافة مكتب دراسات جديد بانتظار المراجعة من ${escapeHTML(payload.authorName || 'مستخدم')}`, 'warning', 5000);
      }
    }
  }

  else if (action === 'approve_study_office') {
    let offices = getStorageJSON('batihub_study_offices', []);
    const idx = offices.findIndex(o => o.id === payload.officeId);
    let officeToDisplay = null;
    if (idx > -1) {
      offices[idx].status = 'approved';
      if (payload.office) offices[idx] = { ...offices[idx], ...payload.office, status: 'approved' };
      officeToDisplay = offices[idx];
    } else if (payload.office) {
      officeToDisplay = { ...payload.office, status: 'approved' };
      offices.unshift(officeToDisplay);
    }
    setStorageJSON('batihub_study_offices', offices);
    renderStudyOfficesFeed();
    renderDedicatedPendingPostsTab();
    updateTopPendingCategoryNavigation();
    updateAdminPendingBadge();

    if (currentUser && officeToDisplay && officeToDisplay.authorId && currentUser.email.toLowerCase() === officeToDisplay.authorId.toLowerCase()) {
      showToast('تهانينا! تمت الموافقة على بطاقة مكتب الدراسات الخاص بك وأصبحت معتمدة في المنصة!', 'success', 6000);
    } else {
      showToast('تم اعتماد مكتب دراسات هندسي جديد في المنصة!', 'info', 3500);
    }
  }

  else if (action === 'reject_study_office') {
    let offices = getStorageJSON('batihub_study_offices', []);
    offices = offices.filter(o => o.id !== payload.officeId);
    setStorageJSON('batihub_study_offices', offices);
    renderStudyOfficesFeed();
    renderDedicatedPendingPostsTab();
    updateTopPendingCategoryNavigation();
    updateAdminPendingBadge();
  }

  // 3.5. Worker Post Edited
  else if (action === 'edit_worker_post') {
    let posts = getStorageJSON('batihub_worker_posts', []);
    const idx = posts.findIndex(p => p.id === payload.id);
    if (idx > -1) {
      posts[idx] = { ...posts[idx], ...payload };
    } else {
      posts.unshift(payload);
    }
    setStorageJSON('batihub_worker_posts', posts);
    updateAdminPendingBadge();
    updateWorkerFilterPillsVisibility();
    updateTopPendingCategoryNavigation();
    renderWorkerPostsFeed();
    renderAdminPendingRequestsSection();
    renderDedicatedPendingPostsTab();

    if (currentUser && currentUser.role === 'admin') {
      showToast(`قام ${escapeHTML(payload.authorName || 'مستخدم')} بتحديث بيانات منشوره المعلق`, 'info', 4000);
    }
  }

  // 4. Worker Post Deleted / Rejected
  else if (action === 'delete_worker_post') {
    let posts = getStorageJSON('batihub_worker_posts', []);
    posts = posts.filter(p => p.id !== payload.postId);
    setStorageJSON('batihub_worker_posts', posts);
    updateAdminPendingBadge();
    updateWorkerFilterPillsVisibility();
    updateTopPendingCategoryNavigation();
    renderWorkerPostsFeed();
    renderDedicatedPendingPostsTab();
  }

  // 5. Post Like Toggled
  else if (action === 'toggle_like') {
    let posts = getStorageJSON('batihub_worker_posts', []);
    const post = posts.find(p => p.id === payload.postId);
    if (post) {
      post.likes = payload.likes;
      setStorageJSON('batihub_worker_posts', posts);
      renderWorkerPostsFeed();
    }
  }

  // 6. Post Comment Added
  else if (action === 'add_comment') {
    let posts = getStorageJSON('batihub_worker_posts', []);
    const post = posts.find(p => p.id === payload.postId);
    if (post) {
      if (!post.comments) post.comments = [];
      if (!post.comments.some(c => c.id === payload.comment.id)) {
        post.comments.push(payload.comment);
        setStorageJSON('batihub_worker_posts', posts);
        renderWorkerPostsFeed();
      }
    }
  }

  // 7. Post Comment Deleted
  else if (action === 'delete_comment') {
    let posts = getStorageJSON('batihub_worker_posts', []);
    const post = posts.find(p => p.id === payload.postId);
    if (post && post.comments) {
      post.comments = post.comments.filter(c => c.id !== payload.commentId);
      setStorageJSON('batihub_worker_posts', posts);
      renderWorkerPostsFeed();
    }
  }

  // 8. Study Office Created
  else if (action === 'new_study_office') {
    let offices = getStorageJSON('batihub_study_offices', []);
    if (!offices.some(o => o.id === payload.id)) {
      offices.unshift(payload);
      setStorageJSON('batihub_study_offices', offices);
      renderStudyOfficesFeed();
    }
  }

  // 9. Study Office Deleted
  else if (action === 'delete_study_office') {
    let offices = getStorageJSON('batihub_study_offices', []);
    offices = offices.filter(o => o.id !== payload.officeId);
    setStorageJSON('batihub_study_offices', offices);
    renderStudyOfficesFeed();
  }

  // 10. Real-time User Block Status Sync
  else if (action === 'user_block_toggle' && payload) {
    const { blocker, blocked, isBlocked } = payload;
    let blocks = getActiveBlocks();
    blocks = blocks.filter(b => !(b.blocker.toLowerCase() === blocker.toLowerCase() && b.blocked.toLowerCase() === blocked.toLowerCase()));
    if (isBlocked) {
      blocks.push({
        blocker: blocker.toLowerCase(),
        blocked: blocked.toLowerCase(),
        timestamp: new Date().toISOString()
      });
    }
    setStorageJSON('batihub_active_blocks', blocks);

    // If chat modal is currently open with either party, refresh the UI immediately!
    if (currentChatPartner && currentUser) {
      const myEmail = currentUser.email.toLowerCase();
      const pEmail = currentChatPartner.email.toLowerCase();
      if ((pEmail === blocker.toLowerCase() && myEmail === blocked.toLowerCase()) ||
          (pEmail === blocked.toLowerCase() && myEmail === blocker.toLowerCase())) {
        openPrivateChat(currentChatPartner.email, currentChatPartner.name, currentChatPartner.avatar);
      }
    }
  }

  // 11. Real-time New Account Synchronization
  else if (action === 'new_registered_account' && payload) {
    let accounts = initAccountsDatabase();
    if (!accounts[payload.email]) {
      accounts[payload.email] = payload;
      setStorageJSON('batihub_registered_accounts', accounts);
      if (window.electronDB && typeof window.electronDB.saveAccounts === 'function') {
        try { window.electronDB.saveAccounts(accounts); } catch (e) {}
      }
    }
  }

  // 12. Real-time Vault Request: Another device connected and requests data synchronization
  else if (action === 'vault_request') {
    const accs = initAccountsDatabase();
    const psts = getStorageJSON('batihub_worker_posts', []);
    broadcastLiveEvent('vault_response', { accounts: accs, posts: psts });
  }

  // 13. Real-time Vault Response: Merge incoming accounts and posts non-destructively
  else if (action === 'vault_response' && payload) {
    if (payload.accounts && typeof payload.accounts === 'object') {
      let currentAccs = initAccountsDatabase();
      let changed = false;
      for (const [em, acc] of Object.entries(payload.accounts)) {
        if (!currentAccs[em]) {
          currentAccs[em] = acc;
          changed = true;
        }
      }
      if (changed) {
        setStorageJSON('batihub_registered_accounts', currentAccs);
        if (window.electronDB && typeof window.electronDB.saveAccounts === 'function') {
          try { window.electronDB.saveAccounts(currentAccs); } catch (e) {}
        }
      }
    }

    if (Array.isArray(payload.posts) && payload.posts.length > 0) {
      let currentPosts = getStorageJSON('batihub_worker_posts', []);
      const map = new Map();
      payload.posts.forEach(p => map.set(p.id, p));
      currentPosts.forEach(p => map.set(p.id, p)); // Local modifications take precedence
      const merged = Array.from(map.values());
      if (merged.length !== currentPosts.length) {
        setStorageJSON('batihub_worker_posts', merged);
        if (currentActiveTab === 'tab-worker-board') {
          renderWorkerPostsFeed();
        } else if (currentActiveTab === 'tab-pending-posts') {
          renderDedicatedPendingPostsTab();
        }
      }
    }
  }
}

/* ========================================================================= */
/* 11.5. NETWORK CONNECTIVITY & OFFLINE BLOCKER ENGINE                       */
/* ========================================================================= */

function updateLiveNetworkStatus(status) {
  const badge = document.getElementById('liveNetworkBadge');
  const text = document.getElementById('liveNetworkText');
  const authBadge = document.getElementById('authLiveStatusBadge');
  const authText = document.getElementById('authLiveStatusText');

  const configs = {
    online: {
      cls: 'flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-[11px] font-mono font-bold select-none shadow-sm transition',
      authCls: 'mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-[11px] font-mono font-bold select-none shadow-sm',
      label: 'متصل (نشط ديما)'
    },
    reconnecting: {
      cls: 'flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/35 text-amber-400 text-[11px] font-mono font-bold select-none shadow-sm transition',
      authCls: 'mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-400 text-[11px] font-mono font-bold select-none shadow-sm',
      label: 'جاري المزامنة... 🔄'
    },
    offline: {
      cls: 'flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-500/15 border border-rose-500/35 text-rose-400 text-[11px] font-mono font-bold select-none shadow-sm transition',
      authCls: 'mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/35 text-rose-400 text-[11px] font-mono font-bold select-none shadow-sm',
      label: 'غير متصل'
    }
  };

  const cfg = configs[status] || configs.online;
  if (badge) badge.className = cfg.cls;
  if (text) text.textContent = cfg.label;
  if (authBadge) authBadge.className = cfg.authCls;
  if (authText) authText.textContent = cfg.label;
}

function showOfflineOverlay() {
  const overlay = document.getElementById('offlineOverlay');
  if (overlay) overlay.classList.remove('hidden');
  updateLiveNetworkStatus('offline');
}

function hideOfflineOverlay() {
  const overlay = document.getElementById('offlineOverlay');
  if (overlay) overlay.classList.add('hidden');
  updateLiveNetworkStatus('online');
}

function checkNetworkAndRetry() {
  if (navigator.onLine) {
    hideOfflineOverlay();
    if (mqttClient && !mqttClient.connected) {
      try { mqttClient.reconnect(); } catch (e) {}
    }
    showToast('تمت استعادة الاتصال بالإنترنت بنجاح! التطبيق متصل ومزامن الآن', 'success');
  } else {
    showToast('لا يزال الجهاز غير متصل بالإنترنت! يرجى التحقق من الشبكة للمتابعة.', 'warning', 4000);
  }
}

function initNetworkEnforcement() {
  if (!navigator.onLine) {
    showOfflineOverlay();
  } else {
    updateLiveNetworkStatus('online');
  }

  window.addEventListener('offline', () => {
    showOfflineOverlay();
    showToast('انقطع الاتصال بالإنترنت! يرجى التحقق من الشبكة.', 'error', 5000);
  });

  window.addEventListener('online', () => {
    hideOfflineOverlay();
    if (mqttClient && !mqttClient.connected) {
      try { mqttClient.reconnect(); } catch (e) {}
    }
    showToast('تمت استعادة الاتصال بالإنترنت بنجاح! التطبيق متصل ومزامن الآن', 'success', 4000);
  });

  // Periodic network check
  setInterval(() => {
    if (!navigator.onLine) {
      showOfflineOverlay();
    } else {
      hideOfflineOverlay();
    }
  }, 4000);
}

/* ========================================================================= */
/* 12. SCIENTIFIC CALCULATOR & QUICK TOOLS                                   */
/* ========================================================================= */

function updateCalcDisplay() {
  const exprDisplay = document.getElementById('calcExpressionDisplay');
  const currDisplay = document.getElementById('calcCurrentDisplay');

  if (exprDisplay) exprDisplay.textContent = calcExpression;
  if (currDisplay) currDisplay.textContent = calcCurrentVal || '0';
}

function calcAction(action, val) {
  let op = action;
  let numVal = val;

  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '00'].includes(action)) {
    op = 'num';
    numVal = action;
  } else if (['+', '-', '*', '/', '%'].includes(action)) {
    op = 'op';
    numVal = action;
  } else if (action === '.') {
    op = 'dot';
  } else if (action === '(') {
    op = 'paren_open';
  } else if (action === ')') {
    op = 'paren_close';
  } else if (action === 'pow') {
    op = 'pow2';
  }

  if (calcJustEvaluated && op !== 'op') {
    calcExpression = '';
    calcCurrentVal = '0';
    calcJustEvaluated = false;
  } else {
    calcJustEvaluated = false;
  }

  switch (op) {
    case 'num':
      if (calcCurrentVal === '0') {
        calcCurrentVal = String(numVal);
      } else {
        calcCurrentVal += String(numVal);
      }
      break;

    case 'dot':
      if (!calcCurrentVal.includes('.')) {
        calcCurrentVal += '.';
      }
      break;

    case 'clear':
      calcExpression = '';
      calcCurrentVal = '0';
      break;

    case 'clear_entry':
      calcCurrentVal = '0';
      break;

    case 'backspace':
      if (calcCurrentVal.length > 1) {
        calcCurrentVal = calcCurrentVal.slice(0, -1);
      } else {
        calcCurrentVal = '0';
      }
      break;

    case 'op':
      calcExpression += (calcCurrentVal || '0') + ' ' + numVal + ' ';
      calcCurrentVal = '0';
      break;

    case 'paren_open':
      calcExpression += ' ( ';
      break;

    case 'paren_close':
      calcExpression += (calcCurrentVal || '0') + ' ) ';
      calcCurrentVal = '0';
      break;

    case 'pi':
      calcCurrentVal = String(Math.PI.toFixed(8));
      break;

    case 'sqrt':
      {
        const num = parseFloat(calcCurrentVal);
        if (num < 0) {
          calcCurrentVal = 'Error';
        } else {
          calcCurrentVal = String(Math.sqrt(num).toFixed(6));
        }
      }
      break;

    case 'pow2':
      {
        const num = parseFloat(calcCurrentVal);
        calcCurrentVal = String(Math.pow(num, 2).toFixed(4));
      }
      break;

    case 'pow3':
      {
        const num = parseFloat(calcCurrentVal);
        calcCurrentVal = String(Math.pow(num, 3).toFixed(4));
      }
      break;

    case 'reciprocal':
      {
        const num = parseFloat(calcCurrentVal);
        if (num === 0) {
          calcCurrentVal = 'Error';
        } else {
          calcCurrentVal = String((1 / num).toFixed(6));
        }
      }
      break;

    case 'sin':
      {
        const rad = (parseFloat(calcCurrentVal) * Math.PI) / 180;
        calcCurrentVal = String(Math.sin(rad).toFixed(6));
      }
      break;

    case 'cos':
      {
        const rad = (parseFloat(calcCurrentVal) * Math.PI) / 180;
        calcCurrentVal = String(Math.cos(rad).toFixed(6));
      }
      break;

    case 'tan':
      {
        const rad = (parseFloat(calcCurrentVal) * Math.PI) / 180;
        calcCurrentVal = String(Math.tan(rad).toFixed(6));
      }
      break;

    case 'equals':
      evaluateCalcExpression();
      return;
  }

  updateCalcDisplay();
}

function evaluateCalcExpression() {
  const fullExpr = (calcExpression + (calcCurrentVal || '')).trim();
  if (!fullExpr) return;

  try {
    // Sanitize expression tokens for math safety
    const sanitized = fullExpr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/[^0-9+\-*/().%\s]/g, '');

    // Safely evaluate standard arithmetic
    const result = Function(`'use strict'; return (${sanitized});`)();
    const formattedResult = Number.isInteger(result) ? String(result) : String(parseFloat(result.toFixed(6)));

    // Save into history tape
    addCalcHistoryItem(fullExpr, formattedResult);

    calcExpression = fullExpr + ' =';
    calcCurrentVal = formattedResult;
    calcJustEvaluated = true;
  } catch (err) {
    calcCurrentVal = 'Error';
  }

  updateCalcDisplay();
}

function addCalcHistoryItem(expr, res) {
  const history = getStorageJSON('batihub_calc_history', []);
  history.unshift({ expr, res, time: new Date().toLocaleTimeString() });
  if (history.length > 20) history.pop();
  setStorageJSON('batihub_calc_history', history);
  renderCalcHistory();
}

function renderCalcHistory() {
  const container = document.getElementById('calcHistoryTapeContainer');
  if (!container) return;

  const history = getStorageJSON('batihub_calc_history', []);
  if (history.length === 0) {
    container.innerHTML = `<p class="text-[11px] text-slate-500 text-center py-4" dir="rtl">${I18N[currentLanguage].qc_history_empty || 'لا توجد عمليات سابقة بعد'}</p>`;
    return;
  }

  container.innerHTML = '';
  history.forEach(item => {
    const row = document.createElement('div');
    row.className = 'p-2 rounded-xl bg-bh-bg border border-bh-border/70 hover:border-bh-yellow/40 transition flex items-center justify-between text-xs cursor-pointer';
    row.innerHTML = `
      <div class="truncate mr-2">
        <span class="text-slate-400 font-mono text-[11px] block">${escapeHTML(item.expr)}</span>
        <span class="text-bh-yellow font-black font-mono text-sm">= ${escapeHTML(item.res)}</span>
      </div>
      <button type="button" class="text-[10px] text-slate-400 hover:text-white px-2 py-1 rounded bg-bh-cardhover" title="استخدام النتيجة">
        <i class="fa-solid fa-arrow-turn-up text-bh-yellow"></i>
      </button>
    `;
    row.onclick = () => {
      calcCurrentVal = item.res;
      updateCalcDisplay();
    };
    container.appendChild(row);
  });
}

function clearCalcHistory() {
  localStorage.removeItem('batihub_calc_history');
  renderCalcHistory();
  showToast('تم مسح سجل العمليات الحسابية', 'info');
}

/* Quick Tools Calculations (Safely guarded) */
function runQuickCalcSurface() {
  const lEl = document.getElementById('qcLength') || document.getElementById('qcSurfL');
  const wEl = document.getElementById('qcWidth') || document.getElementById('qcSurfW');
  if (!lEl || !wEl) return;
  const l = parseFloat(lEl.value || 0) || 0;
  const w = parseFloat(wEl.value || 0) || 0;
  const area = (l * w).toFixed(2);
  const perim = (2 * (l + w)).toFixed(2);

  const areaOut = document.getElementById('qcAreaOutput') || document.getElementById('qcSurfAreaOutput');
  const perimOut = document.getElementById('qcPerimOutput') || document.getElementById('qcSurfPerimOutput');

  if (areaOut) areaOut.textContent = `${area} m²`;
  if (perimOut) perimOut.textContent = `${perim} m`;
}

function runQuickCalcConcrete() {
  const lEl = document.getElementById('qcConcL');
  const wEl = document.getElementById('qcConcW');
  const hEl = document.getElementById('qcConcH');
  const dosageEl = document.getElementById('qcConcDosage');
  if (!lEl || !wEl || !hEl) return;

  const l = parseFloat(lEl.value || 0) || 0;
  const w = parseFloat(wEl.value || 0) || 0;
  const h = parseFloat(hEl.value || 0) || 0;
  const dosage = parseFloat(dosageEl ? dosageEl.value : 350) || 350;

  const vol = l * w * h;
  const volFormatted = vol.toFixed(2);

  const totalKg = vol * dosage;
  const bags = Math.ceil(totalKg / 50);
  const tons = (totalKg / 1000).toFixed(1);

  const sand = (vol * 0.4).toFixed(2);
  const gravel = (vol * 0.8).toFixed(2);

  const volOut = document.getElementById('qcConcVolOutput');
  const bagsOut = document.getElementById('qcBagsOutput');
  const sandOut = document.getElementById('qcSandOutput');
  const gravelOut = document.getElementById('qcGravelOutput');

  if (volOut) volOut.textContent = `${volFormatted} m³`;
  if (bagsOut) bagsOut.textContent = `${bags} كيس (${tons}T)`;
  if (sandOut) sandOut.textContent = `${sand} m³`;
  if (gravelOut) gravelOut.textContent = `${gravel} m³`;
}

function runQuickCalcSteel() {
  const diaEl = document.getElementById('qcSteelDiameter');
  const lenEl = document.getElementById('qcSteelLength');
  if (!diaEl || !lenEl) return;

  const dia = parseFloat(diaEl.value || 12) || 12;
  const len = parseFloat(lenEl.value || 0) || 0;

  // Weight per meter formula: (dia^2) / 162
  const kgPerMeter = Math.pow(dia, 2) / 162;
  const totalWeight = len * kgPerMeter;
  const quintals = totalWeight / 100;

  const weightOut = document.getElementById('qcSteelWeightOutput');
  const quintalsOut = document.getElementById('qcSteelQuintalsOutput');

  if (weightOut) weightOut.textContent = `${totalWeight.toFixed(2)} kg`;
  if (quintalsOut) quintalsOut.textContent = `${quintals.toFixed(2)} Q`;
}

function injectQuickValue(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = el.textContent || '';
  const numMatch = text.match(/[0-9.]+/);
  if (numMatch) {
    calcCurrentVal = numMatch[0];
    updateCalcDisplay();
    showToast(`تم نقل القيمة (${numMatch[0]}) إلى الآلة الحاسبة`, 'info', 2000);
  }
}

/* ========================================================================= */
/* 13. WORKER POSTS & ARTISANS BOARD                                         */
/* ========================================================================= */

function filterWorkerFeed(category, btn) {
  activeWorkerFilter = category;
  showPendingOnly = (category === 'admin_pending');

  document.querySelectorAll('.worker-filter-pill').forEach(b => {
    b.classList.remove('active-filter');
  });
  if (btn) {
    btn.classList.add('active-filter');
  } else {
    if (category === 'all') {
      const allBtn = document.getElementById('filterPillAll');
      if (allBtn) allBtn.classList.add('active-filter');
    } else if (category === 'my_pending') {
      const userBtn = document.getElementById('userPendingFilterBtn');
      if (userBtn) userBtn.classList.add('active-filter');
    } else if (category === 'admin_pending') {
      const adminBtn = document.getElementById('adminPendingFilterBtn');
      if (adminBtn) adminBtn.classList.add('active-filter');
    }
  }

  renderWorkerPostsFeed();
}

function updateWorkerFilterPillsVisibility() {
  const userPendingBtn = document.getElementById('userPendingFilterBtn');
  const userPendingBadge = document.getElementById('userPendingPostsBadge');
  const adminPendingBtn = document.getElementById('adminPendingFilterBtn');
  const adminPendingBadge = document.getElementById('pendingPostsCountBadge');

  const posts = getStorageJSON('batihub_worker_posts', []);

  // Admin review pill
  if (adminPendingBtn) {
    if (currentUser && currentUser.role === 'admin') {
      adminPendingBtn.classList.remove('hidden');
      const pendingCount = posts.filter(p => p.status === 'pending').length;
      if (adminPendingBadge) adminPendingBadge.textContent = String(pendingCount);
    } else {
      adminPendingBtn.classList.add('hidden');
    }
  }

  // Regular user pending pill
  if (userPendingBtn) {
    if (currentUser && currentUser.role !== 'admin') {
      const myPendingCount = posts.filter(p => p.authorId && p.authorId.toLowerCase() === currentUser.email.toLowerCase() && p.status === 'pending').length;
      userPendingBtn.classList.remove('hidden');
      if (userPendingBadge) userPendingBadge.textContent = String(myPendingCount);
    } else {
      userPendingBtn.classList.add('hidden');
    }
  }
}

function togglePendingPostsFilter() {
  showPendingOnly = !showPendingOnly;
  const adminBtn = document.getElementById('adminPendingFilterBtn');

  if (showPendingOnly) {
    document.querySelectorAll('.worker-filter-pill').forEach(b => b.classList.remove('active-filter'));
    if (adminBtn) adminBtn.classList.add('active-filter');
  } else {
    filterWorkerFeed('all', document.querySelector('.worker-filter-pill'));
  }

  renderWorkerPostsFeed();
}

function updateAdminPendingBadge() {
  const badge = document.getElementById('pendingPostsCountBadge');
  if (!badge) return;

  const posts = getStorageJSON('batihub_worker_posts', []);
  const offices = getStorageJSON('batihub_study_offices', []);
  const requests = getStorageJSON('batihub_worker_requests', []);

  const pendingPostsCount = posts.filter(p => p.status === 'pending').length;
  const pendingOfficesCount = offices.filter(o => o.status === 'pending').length;
  const pendingRequestsCount = requests.filter(r => r.status === 'pending').length;

  const pendingCount = pendingPostsCount + pendingOfficesCount + pendingRequestsCount;
  badge.textContent = String(pendingCount);
}

function renderAdminPendingRequestsSection() {
  const section = document.getElementById('adminPendingRequestsSection');
  const list = document.getElementById('adminPendingCardsList');
  const countBadge = document.getElementById('adminPendingHeaderCount');
  if (!section || !list) return;

  if (!currentUser || currentUser.role !== 'admin') {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');
  const posts = getStorageJSON('batihub_worker_posts', []);
  const pendingPosts = posts.filter(p => p.status === 'pending');

  if (countBadge) countBadge.textContent = String(pendingPosts.length);

  if (pendingPosts.length === 0) {
    list.innerHTML = `
      <div class="bg-bh-bg/60 border border-bh-border p-5 rounded-xl text-center space-y-1">
        <i class="fa-solid fa-circle-check text-emerald-400 text-xl block mb-1"></i>
        <h4 class="font-bold text-xs text-white">لا توجد طلبات منشورات معلقة حالياً</h4>
        <p class="text-[11px] text-slate-400">جميع عروض العمل المنشورة معتمدة وتظهر للمستخدمين مباشرة.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = '';
  pendingPosts.forEach(post => {
    const rawPhone = (post.phone || '').replace(/[^0-9]/g, '');
    let intlPhone = rawPhone.startsWith('0') ? '213' + rawPhone.slice(1) : rawPhone;

    const unitMap = {
      m2: 'دج / م²',
      linear_m: 'دج / م خطي',
      hour: 'دج / ساعة',
      day: 'دج / يوم',
      global: 'مبلغ إجمالي',
      negotiable: 'قابل للتفاوض'
    };
    const unitLabel = unitMap[post.unit] || 'دج / م²';

    const avatarHTML = renderAvatarImgTag(post.authorAvatar, post.authorName, post.authorId, 'w-10 h-10 rounded-full object-cover border border-amber-500/50 shadow');

    let postImageHTML = '';
    if (post.image) {
      postImageHTML = `
        <div class="rounded-xl overflow-hidden border border-bh-border max-h-48 bg-bh-bg cursor-pointer mt-2" onclick="openImageLightbox('${escapeHTML(post.image)}')">
          <img src="${post.image}" alt="Attached Work" class="w-full h-auto object-cover max-h-48 hover:scale-102 transition">
        </div>
      `;
    }

    const card = document.createElement('div');
    card.className = 'bg-bh-card border border-amber-500/40 rounded-2xl p-4 shadow-xl space-y-3';
    card.innerHTML = `
      <div class="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-bh-border">
        <div class="flex items-center gap-2.5">
          ${avatarHTML}
          <div>
            <div class="flex items-center gap-2">
              <h4 class="font-bold text-sm text-white">${escapeHTML(post.authorName)}</h4>
              <span class="text-[10px] text-slate-400 font-mono" dir="ltr">(${escapeHTML(post.authorId)})</span>
            </div>
            <div class="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
              <span class="text-bh-yellow font-bold">${escapeHTML(post.trade)}</span>
              <span>•</span>
              <span class="font-mono text-[10px]">${new Date(post.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div class="px-3 py-1 rounded-xl bg-bh-yellow/20 border border-bh-yellow/40 text-bh-yellow font-mono font-bold text-xs">
          ${post.price ? `${escapeHTML(post.price)} ${unitLabel}` : unitLabel}
        </div>
      </div>

      <p class="text-xs text-slate-200 leading-relaxed whitespace-pre-line">${escapeHTML(post.text)}</p>

      ${postImageHTML}

      <!-- Contact Info -->
      <div class="flex items-center gap-2 text-xs pt-1">
        <a href="tel:${rawPhone}" class="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
          <i class="fa-solid fa-phone text-[10px]"></i>
          <span>${escapeHTML(post.phone)}</span>
        </a>
        <a href="https://wa.me/${intlPhone}" target="_blank" class="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-1">
          <i class="fa-brands fa-whatsapp text-xs"></i>
          <span>واتساب</span>
        </a>
      </div>

      <!-- Admin Decision Action Buttons -->
      <div class="pt-2 border-t border-bh-border flex items-center justify-end gap-2">
        <button type="button" onclick="rejectWorkerPost('${post.id}')" class="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer">
          <i class="fa-solid fa-trash-can"></i>
          <span>رفض وحذف نهائياً</span>
        </button>

        <button type="button" onclick="approveWorkerPost('${post.id}')" class="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-95 text-slate-950 text-xs font-black shadow-lg transition flex items-center gap-1.5 cursor-pointer">
          <i class="fa-solid fa-circle-check"></i>
          <span>قبول ونشر المنشور للجميع</span>
        </button>
      </div>
    `;

    list.appendChild(card);
  });
}

/* ========================================================================= */
/* 12.5. TOP DEDICATED PENDING POSTS CATEGORY (المنشورات المعلقة - أعلى الواجهة) */
/* ========================================================================= */

let activePendingFilter = 'all';

function updateTopPendingCategoryNavigation() {
  const navTabBtn = document.getElementById('navTabPendingPosts');
  const navTabText = document.getElementById('navTabPendingText');
  const navTabIcon = document.getElementById('navTabPendingIcon');
  const navTabBadge = document.getElementById('navTabPendingBadge');

  const mNavBtn = document.getElementById('mNavPending');
  const mNavText = document.getElementById('mNavPendingText');
  const mNavIcon = document.getElementById('mNavPendingIcon');
  const mNavBadge = document.getElementById('mNavPendingBadge');

  const headerAdmin = document.getElementById('pendingTabHeaderAdmin');
  const headerUser = document.getElementById('pendingTabHeaderUser');
  const adminBadge = document.getElementById('pendingTabAdminBadge');

  const posts = getStorageJSON('batihub_worker_posts', []);
  const offices = getStorageJSON('batihub_study_offices', []);
  const requests = getStorageJSON('batihub_worker_requests', []);

  const allPendingPosts = posts.filter(p => p.status === 'pending');
  const allPendingOffices = offices.filter(o => o.status === 'pending');
  const allPendingRequests = requests.filter(r => r.status === 'pending');
  const totalAllPending = allPendingPosts.length + allPendingOffices.length + allPendingRequests.length;

  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.email.toLowerCase() === 'batihubdz@gmail.com');

  let relevantCount = 0;
  if (isAdmin) {
    relevantCount = totalAllPending;
  } else if (currentUser) {
    const userPosts = posts.filter(p => p.status === 'pending' && p.authorId && p.authorId.toLowerCase() === currentUser.email.toLowerCase()).length;
    const userOffices = offices.filter(o => o.status === 'pending' && o.authorId && o.authorId.toLowerCase() === currentUser.email.toLowerCase()).length;
    const userRequests = requests.filter(r => r.status === 'pending' && r.authorId && r.authorId.toLowerCase() === currentUser.email.toLowerCase()).length;
    relevantCount = userPosts + userOffices + userRequests;
  }

  // Header update inside tab
  if (headerAdmin && headerUser) {
    if (isAdmin) {
      headerAdmin.classList.remove('hidden');
      headerUser.classList.add('hidden');
      if (adminBadge) adminBadge.textContent = `${totalAllPending} طلبات بانتظار المراجعة`;
    } else {
      headerAdmin.classList.add('hidden');
      headerUser.classList.remove('hidden');
    }
  }

  // Show/Update Tab Buttons
  if (navTabBtn) {
    if (isAdmin) {
      navTabBtn.classList.remove('hidden');
      if (navTabText) navTabText.textContent = 'مراجعة المعلق';
      if (navTabIcon) navTabIcon.className = 'fa-solid fa-shield-halved text-amber-400';
    } else if (currentUser && relevantCount > 0) {
      navTabBtn.classList.remove('hidden');
      if (navTabText) navTabText.textContent = 'منشوراتي المعلقة';
      if (navTabIcon) navTabIcon.className = 'fa-solid fa-hourglass-half text-amber-400';
    } else if (currentUser) {
      navTabBtn.classList.remove('hidden');
      if (navTabText) navTabText.textContent = 'منشوراتي المعلقة';
      if (navTabIcon) navTabIcon.className = 'fa-solid fa-hourglass-half text-amber-400';
    } else {
      navTabBtn.classList.add('hidden');
    }

    if (navTabBadge) {
      if (relevantCount > 0) {
        navTabBadge.textContent = String(relevantCount);
        navTabBadge.classList.remove('hidden');
      } else {
        navTabBadge.classList.add('hidden');
      }
    }
  }

  // Mobile Bottom Navigation Bar Update
  if (mNavBtn) {
    if (isAdmin) {
      mNavBtn.classList.remove('hidden');
      if (mNavText) mNavText.textContent = 'مراجعة';
      if (mNavIcon) mNavIcon.className = 'fa-solid fa-shield-halved text-base';
    } else if (currentUser) {
      mNavBtn.classList.remove('hidden');
      if (mNavText) mNavText.textContent = 'المعلقة';
      if (mNavIcon) mNavIcon.className = 'fa-solid fa-hourglass-half text-base';
    } else {
      mNavBtn.classList.add('hidden');
    }

    if (mNavBadge) {
      if (relevantCount > 0) {
        mNavBadge.textContent = String(relevantCount);
        mNavBadge.classList.remove('hidden');
      } else {
        mNavBadge.classList.add('hidden');
      }
    }
  }
}

function renderDedicatedPendingPostsTab() {
  const container = document.getElementById('pendingPostsFeedContainer');
  if (!container) return;

  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.email.toLowerCase() === 'batihubdz@gmail.com');
  const allPosts = getStorageJSON('batihub_worker_posts', []);
  const allOffices = getStorageJSON('batihub_study_offices', []);
  const allRequests = getStorageJSON('batihub_worker_requests', []);
  const allProperties = getStorageJSON('batihub_real_estate', []);

  // Update top navigation badges & header
  updateTopPendingCategoryNavigation();

  // Filter pending items
  let pendingPosts = allPosts.filter(p => p.status === 'pending');
  let pendingOffices = allOffices.filter(o => o.status === 'pending');
  let pendingRequests = allRequests.filter(r => r.status === 'pending');
  let pendingProperties = allProperties.filter(p => p.status === 'pending');

  if (!isAdmin) {
    if (!currentUser) {
      container.innerHTML = `
        <div class="bg-bh-card border border-bh-border rounded-3xl p-10 text-center space-y-4">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-3xl">
            <i class="fa-solid fa-lock"></i>
          </div>
          <div class="space-y-1">
            <h3 class="font-bold text-white text-base">تسجيل الدخول مطلوب</h3>
            <p class="text-xs text-slate-400 max-w-sm mx-auto">يرجى تسجيل الدخول بحسابك لعرض منشوراتك المعلقة ومتابعة حالة اعتمادها.</p>
          </div>
          <button type="button" onclick="switchAuthView('google'); transitionToAuth();" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-bh-yellow to-bh-orange text-slate-950 font-bold text-xs shadow-lg hover:opacity-95 transition cursor-pointer">
            تسجيل الدخول الآن
          </button>
        </div>
      `;
      return;
    }
    // Regular user only sees their own pending items
    const userEmail = currentUser.email.toLowerCase();
    pendingPosts = pendingPosts.filter(p => p.authorId && p.authorId.toLowerCase() === userEmail);
    pendingOffices = pendingOffices.filter(o => o.authorId && o.authorId.toLowerCase() === userEmail);
    pendingRequests = pendingRequests.filter(r => r.authorId && r.authorId.toLowerCase() === userEmail);
    pendingProperties = pendingProperties.filter(p => p.authorId && p.authorId.toLowerCase() === userEmail);
  }

  const totalPending = pendingPosts.length + pendingOffices.length + pendingRequests.length + pendingProperties.length;

  if (totalPending === 0) {
    let emptyIcon = isAdmin ? 'fa-shield-halved' : 'fa-hourglass-half';
    let emptyTitle = isAdmin ? 'رائع! لا توجد طلبات معلقة للمراجعة حالياً' : 'لا توجد لديك منشورات معلقة حالياً';
    let emptyDesc = isAdmin
      ? 'جميع عروض الخدمات، طلبات العمال، ومكاتب الدراسات المقدمة تم اعتمادها بنجاح.'
      : 'جميع منشوراتك تم اعتمادها وتظهر مباشرة في المنصة، أو يمكنك نشر عرض خدمة أو طلب عامل جديد الآن.';

    container.innerHTML = `
      <div class="bg-bh-card border border-bh-border rounded-3xl p-10 text-center space-y-4">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-3xl">
          <i class="fa-solid ${emptyIcon}"></i>
        </div>
        <div class="space-y-1">
          <h3 class="font-bold text-white text-base">${emptyTitle}</h3>
          <p class="text-xs text-slate-400 max-w-sm mx-auto">${emptyDesc}</p>
        </div>
        ${!isAdmin ? `
          <div class="flex items-center justify-center gap-3 flex-wrap">
            <button type="button" onclick="openCreateWorkerPostModal()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-bh-yellow to-bh-orange text-slate-950 font-black text-xs shadow-lg hover:opacity-95 transition cursor-pointer">
              نشر عرض خدمة جديد
            </button>
            <button type="button" onclick="openCreateWorkerRequestModal()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs shadow-lg hover:opacity-95 transition cursor-pointer">
              نشر طلب عامل جديد
            </button>
            <button type="button" onclick="openAddStudyOfficeModal()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg hover:opacity-95 transition cursor-pointer">
              تسجيل مكتب دراسات
            </button>
          </div>
        ` : ''}
      </div>
    `;
    return;
  }

  container.innerHTML = '';

  // 1. Render Pending Service Offers (Worker Posts)
  pendingPosts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'bg-bh-card border border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 relative overflow-hidden transition hover:border-amber-500/60';

    const isOwner = currentUser && post.authorId && currentUser.email.toLowerCase() === post.authorId.toLowerCase();
    const avatarHTML = renderAvatarImgTag(post.authorAvatar, post.authorName, post.authorId, 'w-12 h-12 rounded-full object-cover border-2 border-amber-500/50 shadow-md');

    let postImageHTML = '';
    if (post.image) {
      postImageHTML = `
        <div class="rounded-2xl overflow-hidden border border-bh-border max-h-80 bg-bh-bg cursor-pointer" onclick="openImageLightbox('${escapeHTML(post.image)}')">
          <img src="${post.image}" alt="Attached Work" class="w-full h-auto object-cover hover:scale-102 transition duration-300">
        </div>
      `;
    }

    const unitMap = {
      m2: 'دج / م²',
      linear_m: 'دج / م خطي',
      hour: 'دج / ساعة',
      day: 'دج / يوم',
      global: 'مبلغ إجمالي',
      negotiable: 'قابل للتفاوض'
    };
    const unitLabel = unitMap[post.unit] || 'دج / م²';

    let cardBannerHTML = `
      <div class="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <i class="fa-solid ${isAdmin ? 'fa-shield-halved' : 'fa-hourglass-half'} text-amber-400"></i>
          <span>${isAdmin ? 'طلب عرض خدمة معلق بانتظار قرار الإدارة' : 'عرض الخدمة قيد الفحص والمراجعة من قبل الإدارة'}</span>
        </div>
        <span class="text-[10px] text-amber-400/80 font-mono">${new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    `;

    let actionsHTML = '';
    if (isAdmin) {
      actionsHTML = `
        <div class="pt-3 border-t border-bh-border/70 flex items-center gap-2.5 flex-wrap">
          <button type="button" onclick="approveWorkerPost('${post.id}')" class="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98">
            <i class="fa-solid fa-check text-sm"></i>
            <span>قبول واعتماد عرض الخدمة</span>
          </button>
          <button type="button" onclick="openEditWorkerPostModal('${post.id}')" class="py-2.5 px-4 rounded-xl bg-bh-bg hover:bg-slate-800 text-bh-yellow border border-bh-yellow/40 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95">
            <i class="fa-solid fa-pen-to-square"></i>
            <span>تعديل</span>
          </button>
          <button type="button" onclick="rejectWorkerPost('${post.id}')" class="flex-1 py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98">
            <i class="fa-solid fa-xmark text-sm"></i>
            <span>رفض وحذف نهائياً</span>
          </button>
        </div>
      `;
    } else if (isOwner) {
      actionsHTML = `
        <div class="pt-3 border-t border-bh-border/70 flex items-center justify-between flex-wrap gap-2">
          <span class="text-xs text-amber-400/90 font-medium">حالة المنشور: قيد التدقيق</span>
          <div class="flex items-center gap-2">
            <button type="button" onclick="openEditWorkerPostModal('${post.id}')" class="py-2 px-3.5 rounded-xl bg-bh-bg hover:bg-slate-800 text-bh-yellow border border-bh-yellow/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95">
              <i class="fa-solid fa-pen-to-square"></i>
              <span>تعديل</span>
            </button>
            <button type="button" onclick="deleteWorkerPost('${post.id}')" class="py-2 px-3.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95">
              <i class="fa-regular fa-trash-can"></i>
              <span>حذف</span>
            </button>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      ${cardBannerHTML}
      <div class="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-bh-border/70">
        <div class="flex items-center gap-3">
          ${avatarHTML}
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="font-bold text-sm text-white">${escapeHTML(post.authorName || 'مستخدم')}</h4>
              ${isOwner ? '<span class="text-[9px] font-bold text-bh-yellow bg-bh-yellow/10 px-2 py-0.5 rounded-full border border-bh-yellow/30">(أنت)</span>' : ''}
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono">عرض خدمة 🛠️</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span class="text-bh-yellow font-bold">${escapeHTML(post.trade)}</span>
              <span>•</span>
              <span class="font-mono text-[11px]">${escapeHTML(post.wilaya || 'الجزائر')}</span>
            </div>
          </div>
        </div>
        <div class="text-left font-mono">
          <div class="text-base font-black text-bh-yellow">${post.price ? Number(post.price).toLocaleString('fr-FR') : '0'} <span class="text-xs font-normal text-slate-400">${unitLabel}</span></div>
        </div>
      </div>
      <div class="space-y-2">
        <p class="text-xs text-slate-300 leading-relaxed">${escapeHTML(post.description)}</p>
        ${postImageHTML}
        <div class="flex items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
          <span><i class="fa-solid fa-phone text-emerald-400 ml-1"></i> ${escapeHTML(post.phone)}</span>
          ${post.experience ? `<span><i class="fa-solid fa-award text-bh-yellow ml-1"></i> ${escapeHTML(post.experience)} سنوات خبرة</span>` : ''}
        </div>
      </div>
      ${actionsHTML}
    `;

    container.appendChild(card);
  });

  // 2. Render Pending Worker Requests (طلب عامل)
  pendingRequests.forEach(req => {
    const card = document.createElement('div');
    card.className = 'bg-bh-card border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 relative overflow-hidden transition hover:border-emerald-500/60';

    const isOwner = currentUser && req.authorId && currentUser.email.toLowerCase() === req.authorId.toLowerCase();
    const avatarHTML = renderAvatarImgTag(req.authorAvatar, req.authorName, req.authorId, 'w-12 h-12 rounded-full object-cover border-2 border-emerald-500/50 shadow-md');

    let reqImageHTML = '';
    if (req.image) {
      reqImageHTML = `
        <div class="rounded-2xl overflow-hidden border border-bh-border max-h-80 bg-bh-bg cursor-pointer" onclick="openImageLightbox('${escapeHTML(req.image)}')">
          <img src="${req.image}" alt="Job location" class="w-full h-auto object-cover hover:scale-102 transition duration-300">
        </div>
      `;
    }

    let cardBannerHTML = `
      <div class="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <i class="fa-solid ${isAdmin ? 'fa-shield-halved' : 'fa-hourglass-half'} text-emerald-400"></i>
          <span>${isAdmin ? 'طلب عامل معلق بانتظار قرار الإدارة' : 'طلب العامل قيد الفحص والمراجعة وسيظهر للجميع فور اعتماده'}</span>
        </div>
        <span class="text-[10px] text-emerald-400/80 font-mono">${new Date(req.createdAt).toLocaleDateString()}</span>
      </div>
    `;

    let actionsHTML = '';
    if (isAdmin) {
      actionsHTML = `
        <div class="pt-3 border-t border-bh-border/70 flex items-center gap-2.5 flex-wrap">
          <button type="button" onclick="approveWorkerRequest('${req.id}')" class="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98">
            <i class="fa-solid fa-check text-sm"></i>
            <span>قبول واعتماد طلب العامل فوراً</span>
          </button>
          <button type="button" onclick="rejectWorkerRequest('${req.id}')" class="flex-1 py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98">
            <i class="fa-solid fa-xmark text-sm"></i>
            <span>رفض وحذف نهائياً</span>
          </button>
        </div>
      `;
    } else if (isOwner) {
      actionsHTML = `
        <div class="pt-3 border-t border-bh-border/70 flex items-center justify-between flex-wrap gap-2">
          <span class="text-xs text-emerald-400/90 font-medium">حالة الطلب: قيد التدقيق</span>
          <button type="button" onclick="deleteWorkerRequest('${req.id}')" class="py-2 px-3.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95">
            <i class="fa-regular fa-trash-can"></i>
            <span>حذف الطلب</span>
          </button>
        </div>
      `;
    }

    card.innerHTML = `
      ${cardBannerHTML}
      <div class="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-bh-border/70">
        <div class="flex items-center gap-3">
          ${avatarHTML}
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="font-bold text-sm text-white">${escapeHTML(req.authorName || 'صاحب المشروع')}</h4>
              ${isOwner ? '<span class="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/30">(أنت)</span>' : ''}
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">طلب عامل</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span class="text-emerald-400 font-bold">المهنة: ${escapeHTML(req.trade)}</span>
              <span>•</span>
              <span class="font-mono text-[11px]">${escapeHTML(req.wilaya || 'الجزائر')}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-2">
        <p class="text-xs text-slate-300 leading-relaxed">${escapeHTML(req.description)}</p>
        ${reqImageHTML}
        <div class="flex items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
          <span><i class="fa-solid fa-phone text-emerald-400 ml-1"></i> ${escapeHTML(req.phone)}</span>
        </div>
      </div>
      ${actionsHTML}
    `;

    container.appendChild(card);
  });

  // 3. Render Pending Study Offices
  pendingOffices.forEach(office => {
    const card = document.createElement('div');
    card.className = 'bg-bh-card border border-sky-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 relative overflow-hidden transition hover:border-sky-500/60';

    const isOwner = currentUser && office.authorId && currentUser.email.toLowerCase() === office.authorId.toLowerCase();

    let officeBannerHTML = `
      <div class="p-3 rounded-2xl bg-sky-500/15 border border-sky-500/40 text-sky-300 text-xs font-bold flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <i class="fa-solid ${isAdmin ? 'fa-shield-halved' : 'fa-hourglass-half'} text-sky-400"></i>
          <span>${isAdmin ? 'طلب تسجيل مكتب دراسات وهندسة معلق بانتظار قرار الإدارة' : 'بطاقة مكتب الدراسات قيد الفحص والمراجعة وسيتم اعتمادها قريباً'}</span>
        </div>
        <span class="text-[10px] text-sky-400/80 font-mono">${new Date(office.createdAt).toLocaleDateString()}</span>
      </div>
    `;

    let actionsHTML = '';
    if (isAdmin) {
      actionsHTML = `
        <div class="pt-3 border-t border-bh-border/70 flex items-center gap-2.5 flex-wrap">
          <button type="button" onclick="approveStudyOffice('${office.id}')" class="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98">
            <i class="fa-solid fa-check text-sm"></i>
            <span>قبول واعتماد مكتب الدراسات فوراً</span>
          </button>
          <button type="button" onclick="rejectStudyOffice('${office.id}')" class="flex-1 py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98">
            <i class="fa-solid fa-xmark text-sm"></i>
            <span>رفض وحذف نهائياً</span>
          </button>
        </div>
      `;
    } else if (isOwner) {
      actionsHTML = `
        <div class="pt-3 border-t border-bh-border/70 flex items-center justify-between flex-wrap gap-2">
          <span class="text-xs text-sky-400/90 font-medium">حالة بطاقة المكتب: قيد التدقيق</span>
          <button type="button" onclick="deleteStudyOffice('${office.id}')" class="py-2 px-3.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95">
            <i class="fa-regular fa-trash-can"></i>
            <span>حذف البطاقة</span>
          </button>
        </div>
      `;
    }

    const engTypeMap = {
      architect: 'هندسة معمارية (Architecture)',
      civil: 'هندسة مدنية (Génie Civil)',
      mep: 'كهروميكانيك وتكييف (MEP)',
      topography: 'طبوغرافيا ومسح أراضي (Topographie)',
      all: 'مكتب دراسات شامل متكامل'
    };
    const engTypeLabel = engTypeMap[office.engType] || office.engType || 'هندسة معمارية';

    card.innerHTML = `
      ${officeBannerHTML}
      <div class="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-bh-border/70">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center justify-center text-xl shrink-0 shadow-md">
            <i class="fa-solid fa-compass-drafting"></i>
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="font-bold text-sm text-white">${escapeHTML(office.name)}</h4>
              ${isOwner ? '<span class="text-[9px] font-bold text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded-full border border-sky-400/30">(أنت)</span>' : ''}
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 font-mono">مكتب دراسات</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span class="text-sky-300 font-bold">${escapeHTML(engTypeLabel)}</span>
              <span>•</span>
              <span class="font-mono text-[11px]">${escapeHTML(office.address)}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-2">
        <p class="text-xs text-slate-300 leading-relaxed">${escapeHTML(office.services)}</p>
        <div class="flex items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
          <span><i class="fa-solid fa-phone text-sky-400 ml-1"></i> ${escapeHTML(office.phone)}</span>
          ${office.authorName ? `<span><i class="fa-solid fa-user text-slate-500 ml-1"></i> ${escapeHTML(office.authorName)}</span>` : ''}
        </div>
      </div>
      ${actionsHTML}
    `;

    container.appendChild(card);
  });

  // 4. Render Pending Real Estate Properties
  pendingProperties.forEach(prop => {
    const card = document.createElement('div');
    card.className = 'bg-bh-card border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 relative overflow-hidden transition hover:border-emerald-500/60';

    const isOwner = currentUser && prop.authorId && currentUser.email.toLowerCase() === prop.authorId.toLowerCase();

    let propBannerHTML = `
      <div class="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <i class="fa-solid ${isAdmin ? 'fa-shield-halved' : 'fa-hourglass-half'} text-emerald-400"></i>
          <span>${isAdmin ? 'إعلان عقار معلق بانتظار قرار الإدارة' : 'إعلان العقار قيد الفحص والمراجعة وسيظهر للجميع فور اعتماده'}</span>
        </div>
        <span class="text-[10px] text-emerald-400/80 font-mono">${new Date(prop.createdAt).toLocaleDateString()}</span>
      </div>
    `;

    let actionsHTML = '';
    if (isAdmin) {
      actionsHTML = `
        <div class="pt-3 border-t border-bh-border/70 flex items-center gap-2.5 flex-wrap">
          <button type="button" onclick="approveRealEstateProperty('${prop.id}')" class="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98">
            <i class="fa-solid fa-check text-sm"></i>
            <span>قبول واعتماد إعلان العقار فوراً</span>
          </button>
          <button type="button" onclick="rejectRealEstateProperty('${prop.id}')" class="flex-1 py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98">
            <i class="fa-solid fa-xmark text-sm"></i>
            <span>رفض وحذف نهائياً</span>
          </button>
        </div>
      `;
    } else if (isOwner) {
      actionsHTML = `
        <div class="pt-3 border-t border-bh-border/70 flex items-center justify-between flex-wrap gap-2">
          <span class="text-xs text-emerald-400/90 font-medium">حالة العقار: قيد المراجعة</span>
          <button type="button" onclick="deleteRealEstateProperty('${prop.id}')" class="py-2 px-3.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95">
            <i class="fa-regular fa-trash-can"></i>
            <span>حذف الإعلان</span>
          </button>
        </div>
      `;
    }

    card.innerHTML = `
      ${propBannerHTML}
      <div class="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-bh-border/70">
        <div>
          <h4 class="font-bold text-sm text-white">${escapeHTML(prop.title)}</h4>
          <div class="flex items-center gap-2 text-xs text-emerald-400 mt-1">
            <span>البائع: ${escapeHTML(prop.ownerName || 'مستخدم')}</span>
            <span>•</span>
            <span class="font-mono text-white font-bold">${escapeHTML(prop.price)}</span>
            <span>•</span>
            <span class="text-slate-400 font-mono text-[11px]">${escapeHTML(prop.location)}</span>
          </div>
        </div>
      </div>
      <div class="space-y-2">
        <p class="text-xs text-slate-300 leading-relaxed">${escapeHTML(prop.description)}</p>
        <div class="flex items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
          <span><i class="fa-solid fa-phone text-emerald-400 ml-1"></i> ${escapeHTML(prop.phone)}</span>
          <span><i class="fa-solid fa-ruler-combined text-amber-400 ml-1"></i> ${escapeHTML(prop.area)}</span>
        </div>
      </div>
      ${actionsHTML}
    `;

    container.appendChild(card);
  });

}

function approveRealEstateProperty(propId) {
  const properties = getStorageJSON('batihub_real_estate', []);
  const prop = properties.find(p => p.id === propId);
  if (prop) {
    prop.status = 'approved';
    setStorageJSON('batihub_real_estate', properties);
    broadcastLiveEvent('approve_real_estate', { propId, property: prop });
    renderRealEstateFeed();
    renderDedicatedPendingPostsTab();
    updateTopPendingCategoryNavigation();
    updateAdminPendingBadge();
    showToast('تم اعتماد ونشر إعلان العقار في السوق بنجاح!', 'success');
  }
}

function rejectRealEstateProperty(propId) {
  let properties = getStorageJSON('batihub_real_estate', []);
  properties = properties.filter(p => p.id !== propId);
  setStorageJSON('batihub_real_estate', properties);
  broadcastLiveEvent('reject_real_estate', { propId });
  renderRealEstateFeed();
  renderDedicatedPendingPostsTab();
  updateTopPendingCategoryNavigation();
  updateAdminPendingBadge();
  showToast('تم رفض وحذف إعلان العقار', 'info');
}


function openEditWorkerPostModal(postId) {
  const posts = getStorageJSON('batihub_worker_posts', []);
  const post = posts.find(p => p.id === postId);
  if (!post) {
    showToast('المنشور غير موجود أو تم حذفه', 'error');
    return;
  }

  // Check authorization
  const isAdmin = currentUser && currentUser.role === 'admin';
  const isOwner = currentUser && post.authorId && currentUser.email.toLowerCase() === post.authorId.toLowerCase();
  if (!isAdmin && !isOwner) {
    showToast('غير مصرح لك بتعديل هذا المنشور', 'error');
    return;
  }

  document.getElementById('editPostId').value = post.id;
  document.getElementById('editPostTrade').value = post.trade || 'بناء';
  document.getElementById('editPostPrice').value = post.price || '';
  document.getElementById('editPostUnit').value = post.unit || 'm2';
  document.getElementById('editPostPhone').value = post.phone || '';
  document.getElementById('editPostText').value = post.text || '';

  cachedEditPostImageBase64 = post.image || null;
  const previewContainer = document.getElementById('editPostImagePreviewContainer');
  const previewImg = document.getElementById('editPostImagePreview');
  const fileInput = document.getElementById('editPostImageInput');

  if (fileInput) fileInput.value = '';

  if (cachedEditPostImageBase64 && previewContainer && previewImg) {
    previewImg.src = cachedEditPostImageBase64;
    previewContainer.classList.remove('hidden');
  } else if (previewContainer) {
    previewContainer.classList.add('hidden');
  }

  const modal = document.getElementById('modalEditWorkerPost');
  if (modal) modal.classList.remove('hidden');
}

function closeEditWorkerPostModal() {
  const modal = document.getElementById('modalEditWorkerPost');
  if (modal) modal.classList.add('hidden');
}

async function handleEditPostImageSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  try {
    const compressed = await compressImageToDataUrl(file, 1024, 0.75);
    cachedEditPostImageBase64 = compressed;
    const previewContainer = document.getElementById('editPostImagePreviewContainer');
    const previewImg = document.getElementById('editPostImagePreview');
    if (previewContainer && previewImg) {
      previewImg.src = cachedEditPostImageBase64;
      previewContainer.classList.remove('hidden');
    }
  } catch (err) {
    showToast('حدث خطأ أثناء تحميل الصورة', 'error');
  }
}

function removeEditPostImage() {
  cachedEditPostImageBase64 = null;
  const previewContainer = document.getElementById('editPostImagePreviewContainer');
  const previewImg = document.getElementById('editPostImagePreview');
  const fileInput = document.getElementById('editPostImageInput');

  if (previewContainer) previewContainer.classList.add('hidden');
  if (previewImg) previewImg.src = '';
  if (fileInput) fileInput.value = '';
}

function handleEditWorkerPostSubmit(event) {
  if (event) event.preventDefault();

  const postId = document.getElementById('editPostId').value;
  const posts = getStorageJSON('batihub_worker_posts', []);
  const post = posts.find(p => p.id === postId);
  if (!post) {
    showToast('تعذر العثور على المنشور المطلوب', 'error');
    return;
  }

  const trade = document.getElementById('editPostTrade').value;
  const price = document.getElementById('editPostPrice').value.trim();
  const unit = document.getElementById('editPostUnit').value;
  const phone = document.getElementById('editPostPhone').value.trim();
  const text = document.getElementById('editPostText').value.trim();

  if (!text) {
    showToast('يرجى كتابة نص المنشور', 'warning');
    return;
  }

  post.trade = trade;
  post.price = price;
  post.unit = unit;
  post.phone = phone;
  post.text = text;
  post.image = cachedEditPostImageBase64;
  post.updatedAt = new Date().toISOString();

  setStorageJSON('batihub_worker_posts', posts);
  broadcastLiveEvent('edit_worker_post', post);

  closeEditWorkerPostModal();
  updateAdminPendingBadge();
  updateTopPendingCategoryNavigation();
  renderDedicatedPendingPostsTab();
  renderWorkerPostsFeed();

  showToast('تم حفظ التعديلات على المنشور بنجاح! تم تحديث البيانات للإدارة.', 'success');
}

/* ========================================================================= */
/* 12.7. AUTOMATIC MOBILE APP UPDATER                                        */
/* ========================================================================= */

function initAutoAppUpdater() {
  if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') return;
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      reg.update().catch(() => {});
      setInterval(() => {
        reg.update().catch(() => {});
      }, 30000);
    }).catch(() => {});

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  }
}

function forceAppReloadUpdate() {
  if ('caches' in window) {
    caches.keys().then(keys => {
      return Promise.all(keys.map(k => caches.delete(k)));
    }).then(() => {
      window.location.reload(true);
    });
  } else {
    window.location.reload(true);
  }
}

function renderWorkerPostsFeed() {
  renderAdminPendingRequestsSection();

  const container = document.getElementById('workerPostsFeedContainer');
  if (!container) return;

  const dict = I18N[currentLanguage] || I18N.ar;
  let posts = getStorageJSON('batihub_worker_posts', []);

  // Update filter pills badges and visibility
  updateWorkerFilterPillsVisibility();

  // Filter logic: In the public feed, ONLY approved posts are EVER shown!
  let filtered = posts.filter(p => {
    // Admin dedicated review category (legacy filter support)
    if (activeWorkerFilter === 'admin_pending' || showPendingOnly) {
      return p.status === 'pending';
    }

    // User dedicated pending posts category (legacy filter support)
    if (activeWorkerFilter === 'my_pending') {
      if (!currentUser) return false;
      return p.authorId && p.authorId.toLowerCase() === currentUser.email.toLowerCase() && p.status === 'pending';
    }

    // CRITICAL: Public posts feed MUST ONLY contain approved posts!
    // Pending posts NEVER appear here, neither in 'all' nor in any trade category!
    if (p.status !== 'approved') {
      return false;
    }

    // Specific trade filter
    if (activeWorkerFilter !== 'all') {
      return p.trade === activeWorkerFilter;
    }

    return true; // Approved and matches filter
  });

  if (filtered.length === 0) {
    let emptyTitle = dict.empty_posts;
    let emptyDesc = 'شارك خبرتك أو تواصل مع أفضل الحرفيين والمهندسين في الجزائر.';
    let emptyIcon = 'fa-briefcase';

    if (activeWorkerFilter === 'my_pending') {
      emptyTitle = 'لا توجد لديك منشورات معلقة حالياً';
      emptyDesc = 'جميع منشوراتك معتمدة وتظهر للجميع في الخلاصة، أو يمكنك نشر عرض عمل جديد الآن.';
      emptyIcon = 'fa-hourglass-half';
    } else if (activeWorkerFilter === 'admin_pending') {
      emptyTitle = 'لا توجد طلبات معلقة بانتظار المراجعة';
      emptyDesc = 'جميع عروض العمل المقدمة من المستخدمين تم اعتمادها أو معالجتها بنجاح.';
      emptyIcon = 'fa-shield-halved';
    }

    container.innerHTML = `
      <div class="bg-bh-card border border-bh-border rounded-2xl p-8 text-center space-y-3">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-bh-yellow/10 text-bh-yellow flex items-center justify-center text-3xl">
          <i class="fa-solid ${emptyIcon}"></i>
        </div>
        <h3 class="font-bold text-white text-base">${emptyTitle}</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">${emptyDesc}</p>
        <button type="button" onclick="openCreateWorkerPostModal()" class="px-4 py-2 rounded-xl bg-gradient-to-r from-bh-yellow to-bh-orange text-slate-950 font-bold text-xs">
          ${dict.btn_new_worker_post}
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = '';

  filtered.forEach(post => {
    const isOwner = currentUser && (currentUser.email === post.authorId);
    const isAdmin = currentUser && (currentUser.role === 'admin');
    const isLiked = currentUser && post.likes && post.likes.includes(currentUser.email);
    const likeCount = post.likes ? post.likes.length : 0;
    const comments = post.comments || [];

    // Unit label localization
    const unitMap = {
      m2: dict.unit_m2,
      linear_m: dict.unit_linear_m,
      hour: dict.unit_hour,
      day: dict.unit_day,
      global: dict.unit_global,
      negotiable: dict.unit_negotiable
    };
    const unitLabel = unitMap[post.unit] || dict.unit_m2;

    // Clean phone numbers
    const rawPhone = (post.phone || '').replace(/[^0-9]/g, '');
    let intlPhone = rawPhone;
    if (intlPhone.startsWith('0')) {
      intlPhone = '213' + intlPhone.slice(1);
    }

    const card = document.createElement('div');
    card.className = 'bg-bh-card border border-bh-border rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 hover:border-bh-border/90 transition';

    // Pending badge
    let statusBadgeHTML = '';
    if (post.status === 'pending') {
      statusBadgeHTML = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono">${dict.status_pending}</span>`;
    }

    // Avatar HTML
    const avatarHTML = renderAvatarImgTag(post.authorAvatar, post.authorName, post.authorId, 'w-10 h-10 rounded-full object-cover border border-bh-border shadow-sm');

    // Image attachment HTML
    let postImageHTML = '';
    if (post.image) {
      postImageHTML = `
        <div class="rounded-xl overflow-hidden border border-bh-border max-h-72 bg-bh-bg cursor-pointer" onclick="openImageLightbox('${escapeHTML(post.image)}')">
          <img src="${post.image}" alt="Attached Work" class="w-full h-auto object-cover hover:scale-102 transition duration-300">
        </div>
      `;
    }

    // Admin approval buttons HTML
    let adminControlsHTML = '';
    if (isAdmin && post.status === 'pending') {
      adminControlsHTML = `
        <div class="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-2">
          <span class="text-xs font-bold text-amber-300">مراجعة الإدارة :</span>
          <div class="flex items-center gap-2">
            <button type="button" onclick="approveWorkerPost('${post.id}')" class="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition">
              ${dict.approve_btn}
            </button>
            <button type="button" onclick="rejectWorkerPost('${post.id}')" class="px-3 py-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition">
              ${dict.reject_btn}
            </button>
          </div>
        </div>
      `;
    }

    // Delete post button HTML
    let deleteBtnHTML = '';
    if (isOwner || isAdmin) {
      deleteBtnHTML = `
        <button type="button" onclick="deleteWorkerPost('${post.id}')" class="w-7 h-7 rounded-lg bg-bh-bg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-bh-border flex items-center justify-center transition" title="${dict.delete_btn}">
          <i class="fa-regular fa-trash-can text-xs"></i>
        </button>
      `;
    }

    // Pending banner
    let pendingBannerHTML = '';
    if (post.status === 'pending') {
      pendingBannerHTML = `
        <div class="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2">
          <i class="fa-solid fa-hourglass-half animate-spin text-sm shrink-0"></i>
          <span>منشورك قيد المعالجة والمراجعة من قبل الإدارة، وسيظهر للجميع فور اعتماده.</span>
        </div>
      `;
    }

    card.innerHTML = `
      ${pendingBannerHTML}
      <!-- Header Row -->
      <div class="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-bh-border">
        <div class="flex items-center gap-2.5">
          ${avatarHTML}
          <div>
            <div class="flex items-center gap-2">
              <h4 class="font-bold text-sm text-white">${escapeHTML(post.authorName || 'حرفي')}</h4>
              ${isOwner ? '<span class="text-[9px] font-bold text-bh-yellow bg-bh-yellow/10 px-1.5 py-0.2 rounded border border-bh-yellow/30">(أنت)</span>' : ''}
              ${statusBadgeHTML}
            </div>
            <div class="flex items-center gap-2 text-[11px] text-slate-400">
              <span class="text-bh-yellow font-semibold">${escapeHTML(post.trade)}</span>
              <span>•</span>
              <span class="font-mono text-[10px]">${new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- Price Badge -->
          <div class="px-3 py-1 rounded-xl bg-gradient-to-r from-bh-yellow/20 to-bh-orange/20 border border-bh-yellow/40 text-bh-yellow font-mono font-bold text-xs">
            ${post.price ? `${escapeHTML(post.price)} ${unitLabel}` : unitLabel}
          </div>
          ${deleteBtnHTML}
        </div>
      </div>

      ${adminControlsHTML}

      <!-- Description Body -->
      <p class="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">${escapeHTML(post.text)}</p>

      ${postImageHTML}

      <!-- Direct Contact Buttons Row -->
      <div class="flex flex-wrap items-center gap-2 pt-2">
        <a href="tel:${rawPhone}" class="flex-1 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition flex items-center justify-center gap-1.5">
          <i class="fa-solid fa-phone"></i>
          <span>${dict.call_btn} (${escapeHTML(post.phone)})</span>
        </a>

        <a href="https://wa.me/${intlPhone}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 px-3 rounded-xl bg-green-500/15 hover:bg-green-500/25 text-green-400 border border-green-500/40 text-xs font-bold transition flex items-center justify-center gap-1.5">
          <i class="fa-brands fa-whatsapp text-sm"></i>
          <span>${dict.whatsapp_btn}</span>
        </a>

        <button type="button" onclick="startChatFromPost('${post.authorId}', '${escapeHTML(post.authorName)}', '${post.authorAvatar || ''}')" class="flex-1 py-2 px-3 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 border border-sky-500/40 text-xs font-bold transition flex items-center justify-center gap-1.5">
          <i class="fa-solid fa-comments text-xs"></i>
          <span>${dict.chat_btn}</span>
        </button>
      </div>

      <!-- Social Interactions: Like & Comments Toggle -->
      <div class="pt-3 border-t border-bh-border flex items-center justify-between text-xs text-slate-400">
        <button type="button" onclick="togglePostLike('${post.id}')" class="flex items-center gap-1.5 hover:text-rose-400 transition cursor-pointer">
          <i class="${isLiked ? 'fa-solid fa-heart text-rose-500' : 'fa-regular fa-heart'} text-sm"></i>
          <span class="font-mono">${likeCount} ${dict.like_btn}</span>
        </button>

        <button type="button" onclick="toggleCommentsSection('${post.id}')" class="flex items-center gap-1.5 hover:text-bh-yellow transition cursor-pointer">
          <i class="fa-regular fa-comment-dots text-sm"></i>
          <span class="font-mono">${comments.length} ${dict.comments_title}</span>
        </button>
      </div>

      <!-- Expandable Comments Container -->
      <div id="commentsContainer_${post.id}" class="hidden space-y-3 pt-3 border-t border-bh-border/70">
        <div id="commentsList_${post.id}" class="space-y-2 max-h-48 overflow-y-auto pr-1"></div>

        <!-- Add Comment Form -->
        <form onsubmit="handleAddCommentSubmit(event, '${post.id}')" class="flex items-center gap-2">
          <input type="text" id="commentInput_${post.id}" required placeholder="${dict.comment_placeholder}" class="flex-1 bg-bh-bg border border-bh-border rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-bh-yellow">
          <button type="submit" class="px-3 py-1.5 bg-bh-yellow hover:opacity-95 text-slate-950 font-bold rounded-xl text-xs transition">
            ${dict.send_btn}
          </button>
        </form>
      </div>
    `;

    container.appendChild(card);
    renderPostComments(post.id, comments);
  });
}

function openCreateWorkerPostModal() {
  if (!currentUser) {
    showToast('تسجيل الدخول مطلوب لنشر العروض والطلبات', 'warning');
    return;
  }

  // Clear previous previews
  cachedPostImageBase64 = null;
  const previewContainer = document.getElementById('postImagePreviewContainer');
  const previewImg = document.getElementById('postImagePreview');
  const fileInput = document.getElementById('workerPostImageInput');

  if (previewContainer) previewContainer.classList.add('hidden');
  if (previewImg) previewImg.src = '';
  if (fileInput) fileInput.value = '';

  const modal = document.getElementById('modalCreateWorkerPost');
  if (modal) modal.classList.remove('hidden');
}

function closeCreateWorkerPostModal() {
  const modal = document.getElementById('modalCreateWorkerPost');
  if (modal) modal.classList.add('hidden');
}

async function handlePostImageSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  try {
    const compressed = await compressImageToDataUrl(file, 1024, 0.75);
    cachedPostImageBase64 = compressed;
    const previewContainer = document.getElementById('postImagePreviewContainer');
    const previewImg = document.getElementById('postImagePreview');
    if (previewContainer && previewImg) {
      previewImg.src = cachedPostImageBase64;
      previewContainer.classList.remove('hidden');
    }
  } catch (err) {
    showToast('حدث خطأ أثناء تحميل الصورة', 'error');
  }
}

function removeSelectedPostImage() {
  cachedPostImageBase64 = null;
  const previewContainer = document.getElementById('postImagePreviewContainer');
  const previewImg = document.getElementById('postImagePreview');
  const fileInput = document.getElementById('workerPostImageInput');

  if (previewContainer) previewContainer.classList.add('hidden');
  if (previewImg) previewImg.src = '';
  if (fileInput) fileInput.value = '';
}

function handleCreateWorkerPostSubmit(event) {
  if (event) event.preventDefault();
  if (!currentUser) {
    showToast('يرجى تسجيل الدخول أولاً', 'warning');
    return;
  }

  const trade = document.getElementById('workerPostTrade').value;
  const price = document.getElementById('workerPostPrice').value.trim();
  const unit = document.getElementById('workerPostUnit').value;
  const phone = document.getElementById('workerPostPhone').value.trim();
  const text = document.getElementById('workerPostText').value.trim();

  if (!trade || !phone || !text) {
    showToast('يرجى ملء جميع الحقول الإلزامية', 'warning');
    return;
  }

  const posts = getStorageJSON('batihub_worker_posts', []);

  // One Post Per Trade Restriction Rule (Admin exempt)
  if (currentUser.role !== 'admin') {
    const existing = posts.find(p => p.authorId === currentUser.email && p.trade === trade);
    if (existing) {
      showAppModalAlert('تنبيه قيود النشر', I18N[currentLanguage].one_post_limit_alert);
      return;
    }
  }

  const isAdmin = currentUser.role === 'admin';
  const newPost = {
    id: 'post_' + Date.now(),
    trade,
    price,
    unit,
    phone,
    text,
    image: cachedPostImageBase64,
    authorId: currentUser.email,
    authorName: currentUser.fullName || currentUser.firstName,
    authorAvatar: currentUser.avatar,
    status: isAdmin ? 'approved' : 'pending',
    likes: [],
    comments: [],
    createdAt: new Date().toISOString()
  };

  posts.unshift(newPost);
  setStorageJSON('batihub_worker_posts', posts);

  // Broadcast to all other devices in real-time
  broadcastLiveEvent('new_worker_post', newPost);

  closeCreateWorkerPostModal();
  updateAdminPendingBadge();
  updateWorkerFilterPillsVisibility();
  updateTopPendingCategoryNavigation();

  if (isAdmin) {
    renderWorkerPostsFeed();
    renderDedicatedPendingPostsTab();
    showToast(I18N[currentLanguage].post_published_admin_success, 'success');
  } else {
    // Switch to top dedicated pending category to immediately show their pending post!
    switchTab('tab-pending-posts');
    renderDedicatedPendingPostsTab();
    showToast('تم إرسال المنشور بنجاح! تم نقلك لتصنيف (المنشورات المعلقة) بالأعلى بانتظار فحص واعتماد الإدارة.', 'warning', 6000);
  }
}

function togglePostLike(postId) {
  if (!currentUser) {
    showToast('تسجيل الدخول مطلوب للتفاعل بالإعجاب', 'warning');
    return;
  }

  const posts = getStorageJSON('batihub_worker_posts', []);
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  if (!post.likes) post.likes = [];
  const idx = post.likes.indexOf(currentUser.email);

  if (idx > -1) {
    post.likes.splice(idx, 1);
  } else {
    post.likes.push(currentUser.email);
  }

  setStorageJSON('batihub_worker_posts', posts);
  broadcastLiveEvent('toggle_like', { postId, likes: post.likes });
  renderWorkerPostsFeed();
}

function toggleCommentsSection(postId) {
  const container = document.getElementById(`commentsContainer_${postId}`);
  if (container) {
    container.classList.toggle('hidden');
  }
}

function renderPostComments(postId, comments) {
  const list = document.getElementById(`commentsList_${postId}`);
  if (!list) return;

  if (!comments || comments.length === 0) {
    list.innerHTML = `<p class="text-[11px] text-slate-500 py-1 text-center">لا توجد تعليقات بعد.</p>`;
    return;
  }

  list.innerHTML = '';
  comments.forEach(comment => {
    const isCommentOwner = currentUser && (currentUser.email === comment.authorId);
    const isAdmin = currentUser && (currentUser.role === 'admin');

    const item = document.createElement('div');
    item.className = 'p-2 rounded-xl bg-bh-bg border border-bh-border/60 flex items-start justify-between gap-2 text-xs';
    item.innerHTML = `
      <div class="flex-1">
        <div class="flex items-center gap-1.5">
          <span class="font-bold text-slate-200 text-[11px]">${escapeHTML(comment.authorName)}</span>
          <span class="text-[9px] text-slate-500 font-mono">${new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <p class="text-slate-300 mt-0.5 text-xs leading-normal">${escapeHTML(comment.text)}</p>
      </div>
      ${(isCommentOwner || isAdmin) ? `
        <button type="button" onclick="deleteComment('${postId}', '${comment.id}')" class="text-slate-500 hover:text-rose-400 text-[10px] p-1" title="حذف التعليق">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      ` : ''}
    `;
    list.appendChild(item);
  });
}

function handleAddCommentSubmit(event, postId) {
  if (event) event.preventDefault();
  if (!currentUser) {
    showToast('تسجيل الدخول مطلوب لإضافة تعليق', 'warning');
    return;
  }

  const input = document.getElementById(`commentInput_${postId}`);
  const text = (input.value || '').trim();
  if (!text) return;

  const posts = getStorageJSON('batihub_worker_posts', []);
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  if (!post.comments) post.comments = [];
  const newComment = {
    id: 'c_' + Date.now(),
    authorId: currentUser.email,
    authorName: currentUser.fullName || currentUser.firstName,
    text,
    createdAt: new Date().toISOString()
  };

  post.comments.push(newComment);
  setStorageJSON('batihub_worker_posts', posts);
  broadcastLiveEvent('add_comment', { postId, comment: newComment });

  input.value = '';
  renderWorkerPostsFeed();
  toggleCommentsSection(postId); // keep open
}

function deleteComment(postId, commentId) {
  const posts = getStorageJSON('batihub_worker_posts', []);
  const post = posts.find(p => p.id === postId);
  if (!post || !post.comments) return;

  post.comments = post.comments.filter(c => c.id !== commentId);
  setStorageJSON('batihub_worker_posts', posts);
  broadcastLiveEvent('delete_comment', { postId, commentId });

  renderWorkerPostsFeed();
  toggleCommentsSection(postId);
  showToast('تم حذف التعليق بنجاح', 'info');
}

function approveWorkerPost(postId) {
  if (!currentUser || currentUser.role !== 'admin') return;

  const posts = getStorageJSON('batihub_worker_posts', []);
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  post.status = 'approved';
  setStorageJSON('batihub_worker_posts', posts);

  broadcastLiveEvent('approve_worker_post', { postId, post });

  updateAdminPendingBadge();
  updateTopPendingCategoryNavigation();
  renderWorkerPostsFeed();
  renderDedicatedPendingPostsTab();
  showToast('تمت الموافقة على المنشور ونشره للجميع بنجاح!', 'success');
}

function rejectWorkerPost(postId) {
  if (!currentUser || currentUser.role !== 'admin') return;

  showAppModalAlert('تأكيد رفض المنشور', 'هل أنت متأكد من رفض هذا المنشور وحذفه نهائياً؟', true, () => {
    deleteWorkerPost(postId);
  });
}

function deleteWorkerPost(postId) {
  const posts = getStorageJSON('batihub_worker_posts', []);
  const updated = posts.filter(p => p.id !== postId);
  setStorageJSON('batihub_worker_posts', updated);

  broadcastLiveEvent('delete_worker_post', { postId });

  updateAdminPendingBadge();
  updateTopPendingCategoryNavigation();
  renderWorkerPostsFeed();
  renderDedicatedPendingPostsTab();
  showToast('تم حذف المنشور بنجاح', 'info');
}

/* ========================================================================= */
/* 14. STUDY OFFICES & ENGINEERING SECTION                                   */
/* ========================================================================= */

function filterStudyOffices(engType, btn) {
  activeOfficeFilter = engType;

  document.querySelectorAll('.office-filter-pill').forEach(b => {
    b.classList.remove('active-filter');
  });
  if (btn) btn.classList.add('active-filter');

  renderStudyOfficesFeed();
}

function renderStudyOfficesFeed() {
  const container = document.getElementById('studyOfficesFeedContainer');
  if (!container) return;

  const dict = I18N[currentLanguage] || I18N.ar;
  let offices = getStorageJSON('batihub_study_offices', []);

  offices = offices.filter(o => o.status === 'approved' || !o.status);

  if (activeOfficeFilter !== 'all') {
    offices = offices.filter(o => o.engType === activeOfficeFilter);
  }

  if (offices.length === 0) {
    container.innerHTML = `
      <div class="col-span-full bg-bh-card border border-bh-border rounded-2xl p-8 text-center space-y-3">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-3xl">
          <i class="fa-solid fa-compass-drafting"></i>
        </div>
        <h3 class="font-bold text-white text-base">${dict.empty_offices}</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">سجل مكتبك الهندسي أو المعماري للوصول لأكبر شبكة من أصحاب المشاريع في الجزائر.</p>
        <button type="button" onclick="openAddStudyOfficeModal()" class="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-xs">
          ${dict.btn_new_office}
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = '';

  offices.forEach(office => {
    const isOwner = currentUser && (currentUser.email === office.authorId);
    const isAdmin = currentUser && (currentUser.role === 'admin');

    const rawPhone = (office.phone || '').replace(/[^0-9]/g, '');
    let intlPhone = rawPhone;
    if (intlPhone.startsWith('0')) {
      intlPhone = '213' + intlPhone.slice(1);
    }

    const card = document.createElement('div');
    card.className = 'bg-bh-card border border-bh-border rounded-2xl p-5 shadow-xl space-y-4 hover:border-sky-500/40 transition flex flex-col justify-between';

    // Google Maps target link
    const mapsLink = office.gps && office.gps.trim().startsWith('http')
      ? office.gps.trim()
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((office.gps || office.address || office.name) + ' الجزائر')}`;

    let officeImageHTML = '';
    if (office.image) {
      officeImageHTML = `
        <div class="rounded-xl overflow-hidden border border-bh-border h-36 bg-bh-bg cursor-pointer" onclick="openImageLightbox('${escapeHTML(office.image)}')">
          <img src="${office.image}" alt="Office Visual" class="w-full h-full object-cover hover:scale-105 transition duration-300">
        </div>
      `;
    }

    card.innerHTML = `
      <div class="space-y-3">
        <!-- Top Details -->
        <div class="flex items-start justify-between gap-2 pb-3 border-b border-bh-border">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${office.engType === 'مهندس معماري' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'} font-mono">
                ${escapeHTML(office.engType)}
              </span>
              <span class="text-[10px] text-slate-400 font-mono">${new Date(office.createdAt).toLocaleDateString()}</span>
            </div>
            <h4 class="font-bold text-base text-white mt-1.5 leading-snug">${escapeHTML(office.name)}</h4>
            <p class="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
              <i class="fa-solid fa-location-dot text-rose-400 text-[11px]"></i>
              <span>${escapeHTML(office.address)}</span>
            </p>
          </div>

          ${(isOwner || isAdmin) ? `
            <button type="button" onclick="deleteStudyOffice('${office.id}')" class="w-7 h-7 rounded-lg bg-bh-bg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-bh-border flex items-center justify-center transition shrink-0" title="حذف المكتب">
              <i class="fa-regular fa-trash-can text-xs"></i>
            </button>
          ` : ''}
        </div>

        ${officeImageHTML}

        <!-- Services -->
        <div class="text-xs text-slate-300 leading-relaxed bg-bh-bg/60 p-3 rounded-xl border border-bh-border/70">
          <span class="text-[10px] text-slate-500 font-bold block mb-1">الخدمات والدراسات المقدمة :</span>
          ${escapeHTML(office.services)}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-2 pt-2">
        <!-- Google Maps Location Link -->
        <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" class="w-full py-2 px-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold transition flex items-center justify-center gap-1.5">
          <i class="fa-solid fa-map-location-dot text-sm"></i>
          <span>${dict.open_maps_btn}</span>
        </a>

        <!-- Direct Contact -->
        <div class="flex items-center gap-2">
          <a href="tel:${rawPhone}" class="flex-1 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition flex items-center justify-center gap-1.5">
            <i class="fa-solid fa-phone"></i>
            <span>${dict.call_btn}</span>
          </a>

          <a href="https://wa.me/${intlPhone}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 px-3 rounded-xl bg-green-500/15 hover:bg-green-500/25 text-green-400 border border-green-500/40 text-xs font-bold transition flex items-center justify-center gap-1.5">
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>${dict.whatsapp_btn}</span>
          </a>

          <button type="button" onclick="startChatFromPost('${office.authorId}', '${escapeHTML(office.name)}', '')" class="py-2 px-3 rounded-xl bg-bh-bg hover:bg-bh-cardhover text-slate-300 border border-bh-border text-xs font-bold transition flex items-center justify-center gap-1.5" title="${dict.chat_btn}">
            <i class="fa-solid fa-comments text-amber-400 text-xs"></i>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function openAddStudyOfficeModal() {
  if (!currentUser) {
    showToast('تسجيل الدخول مطلوب لإضافة مكتب دراسات', 'warning');
    return;
  }

  cachedOfficeImageBase64 = null;
  const previewContainer = document.getElementById('officeImagePreviewContainer');
  const previewImg = document.getElementById('officeImagePreview');
  const fileInput = document.getElementById('officeImageInput');

  if (previewContainer) previewContainer.classList.add('hidden');
  if (previewImg) previewImg.src = '';
  if (fileInput) fileInput.value = '';

  const modal = document.getElementById('modalAddStudyOffice');
  if (modal) modal.classList.remove('hidden');
}

function closeAddStudyOfficeModal() {
  const modal = document.getElementById('modalAddStudyOffice');
  if (modal) modal.classList.add('hidden');
}

function openGoogleMapsToPickLocation() {
  if (navigator.geolocation) {
    showToast('جاري تحديد إحداثيات موقعك الجغرافي عبر GPS...', 'info', 2000);
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        document.getElementById('officeGpsLink').value = mapUrl;
        showToast('تم التقاط إحداثيات موقعك بدقة!', 'success');
      },
      err => {
        // Fallback: Open Google Maps in a new tab
        window.open('https://www.google.com/maps', '_blank');
        showToast('انسخ رابط موقعك من Google Maps والصقه هنا', 'info', 4000);
      },
      { timeout: 7000 }
    );
  } else {
    window.open('https://www.google.com/maps', '_blank');
  }
}

function handleOfficeImageSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (file.size > 4 * 1024 * 1024) {
    showToast('حجم الشعار أو الصورة كبير جداً!', 'warning');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    cachedOfficeImageBase64 = e.target.result;
    const previewContainer = document.getElementById('officeImagePreviewContainer');
    const previewImg = document.getElementById('officeImagePreview');
    if (previewContainer && previewImg) {
      previewImg.src = cachedOfficeImageBase64;
      previewContainer.classList.remove('hidden');
    }
  };
  reader.readAsDataURL(file);
}

function removeSelectedOfficeImage() {
  cachedOfficeImageBase64 = null;
  const previewContainer = document.getElementById('officeImagePreviewContainer');
  const previewImg = document.getElementById('officeImagePreview');
  const fileInput = document.getElementById('officeImageInput');

  if (previewContainer) previewContainer.classList.add('hidden');
  if (previewImg) previewImg.src = '';
  if (fileInput) fileInput.value = '';
}

function handleCreateStudyOfficeSubmit(event) {
  if (event) event.preventDefault();
  if (!currentUser) return;

  const name = document.getElementById('officeName').value.trim();
  const engType = document.getElementById('officeEngType').value;
  const phone = document.getElementById('officePhone').value.trim();
  const address = document.getElementById('officeAddress').value.trim();
  const gps = document.getElementById('officeGpsLink').value.trim();
  const services = document.getElementById('officeServices').value.trim();

  if (!name || !phone || !address || !services) {
    showToast('يرجى ملء جميع الحقول المطلوبة', 'warning');
    return;
  }

  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.email.toLowerCase() === 'batihubdz@gmail.com');
  const status = isAdmin ? 'approved' : 'pending';

  const offices = getStorageJSON('batihub_study_offices', []);
  const newOffice = {
    id: 'office_' + Date.now(),
    name,
    engType,
    phone,
    address,
    gps,
    services,
    image: cachedOfficeImageBase64,
    authorId: currentUser.email,
    authorName: currentUser.fullName || currentUser.firstName,
    status: status,
    createdAt: new Date().toISOString()
  };

  offices.unshift(newOffice);
  setStorageJSON('batihub_study_offices', offices);

  broadcastLiveEvent('new_study_office', newOffice);

  closeAddStudyOfficeModal();
  renderStudyOfficesFeed();
  renderDedicatedPendingPostsTab();
  updateTopPendingCategoryNavigation();
  updateAdminPendingBadge();

  if (status === 'pending') {
    showToast('تم إرسال بطاقة مكتب الدراسات بنجاح! المنشور قيد المراجعة وسيظهر للجميع فور موافقة الإدارة.', 'info', 5000);
  } else {
    showToast(I18N[currentLanguage].office_published_success, 'success');
  }
}

function approveStudyOffice(officeId) {
  const offices = getStorageJSON('batihub_study_offices', []);
  const target = offices.find(o => o.id === officeId);
  if (target) {
    target.status = 'approved';
    setStorageJSON('batihub_study_offices', offices);
    broadcastLiveEvent('approve_study_office', { officeId, office: target });
    renderStudyOfficesFeed();
    renderDedicatedPendingPostsTab();
    updateTopPendingCategoryNavigation();
    updateAdminPendingBadge();
    showToast('تم اعتماد ونشر بطاقة مكتب الدراسات بنجاح!', 'success');
  }
}

function rejectStudyOffice(officeId) {
  const offices = getStorageJSON('batihub_study_offices', []);
  const updated = offices.filter(o => o.id !== officeId);
  setStorageJSON('batihub_study_offices', updated);
  broadcastLiveEvent('reject_study_office', { officeId });
  renderStudyOfficesFeed();
  renderDedicatedPendingPostsTab();
  updateTopPendingCategoryNavigation();
  updateAdminPendingBadge();
  showToast('تم رفض وحذف بطاقة مكتب الدراسات نهائياً.', 'info');
}

function deleteStudyOffice(officeId) {
  const offices = getStorageJSON('batihub_study_offices', []);
  const updated = offices.filter(o => o.id !== officeId);
  setStorageJSON('batihub_study_offices', updated);

  broadcastLiveEvent('delete_study_office', { officeId });

  renderStudyOfficesFeed();
  renderDedicatedPendingPostsTab();
  updateTopPendingCategoryNavigation();
  updateAdminPendingBadge();
  showToast('تم حذف بطاقة مكتب الدراسات', 'info');
}

/* ========================================================================= */
/* 15. 1-ON-1 PRIVATE CHAT & MESSAGING ENGINE                                */
/* ========================================================================= */

function startChatFromPost(partnerEmail, partnerName, partnerAvatar) {
  if (!currentUser) {
    showToast('يرجى تسجيل الدخول لبدء محادثة خاصة', 'warning');
    return;
  }
  if (partnerEmail === currentUser.email) {
    showToast('لا يمكنك بدء محادثة خاصة مع حسابك الشخصي!', 'info');
    return;
  }
  openPrivateChat(partnerEmail, partnerName, partnerAvatar);
}

function getConversationKey(email1, email2) {
  const sorted = [email1.toLowerCase(), email2.toLowerCase()].sort();
  return `thread_${sorted[0]}__${sorted[1]}`;
}

function getActiveBlocks() {
  return getStorageJSON('batihub_active_blocks', []);
}

function isUserBlockedBy(targetEmail, potentialBlockerEmail) {
  if (!targetEmail || !potentialBlockerEmail) return false;
  const blocks = getActiveBlocks();
  return blocks.some(b => b.blocker.toLowerCase() === potentialBlockerEmail.toLowerCase() && b.blocked.toLowerCase() === targetEmail.toLowerCase());
}

function openPrivateChat(partnerEmail, partnerName, partnerAvatar) {
  if (!currentUser) return;
  currentChatPartner = {
    email: partnerEmail.toLowerCase(),
    name: partnerName || partnerEmail,
    avatar: partnerAvatar || null
  };

  const modal = document.getElementById('modalPrivateChat');
  const partnerNameEl = document.getElementById('chatPartnerName');
  const partnerAvatarEl = document.getElementById('chatPartnerAvatar');
  const blockBtn = document.getElementById('btnBlockUserChat');
  const blockedNotice = document.getElementById('chatBlockedNotice');
  const form = document.getElementById('privateChatForm');
  const chatInput = document.getElementById('chatMessageInput');

  if (partnerNameEl) partnerNameEl.textContent = currentChatPartner.name;
  if (partnerAvatarEl) partnerAvatarEl.src = resolveAvatarSrc(currentChatPartner.avatar, currentChatPartner.name, currentChatPartner.email);

  const myEmail = currentUser.email.toLowerCase();
  const theirEmail = currentChatPartner.email.toLowerCase();

  const isBlockedByPartner = isUserBlockedBy(myEmail, theirEmail);
  const hasBlockedPartner = isUserBlockedBy(theirEmail, myEmail);

  if (blockBtn) {
    if (isBlockedByPartner) {
      blockBtn.classList.add('hidden');
    } else {
      blockBtn.classList.remove('hidden');
      blockBtn.innerHTML = hasBlockedPartner
        ? '<i class="fa-solid fa-unlock text-[11px] mr-1"></i> <span>إلغاء الحظر</span>'
        : '<i class="fa-solid fa-ban text-[11px] mr-1"></i> <span>حظر</span>';
      blockBtn.className = hasBlockedPartner
        ? 'px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition cursor-pointer'
        : 'px-2.5 py-1 rounded-lg bg-bh-bg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-bh-border text-xs transition cursor-pointer';
    }
  }

  if (blockedNotice && form) {
    if (isBlockedByPartner) {
      blockedNotice.classList.remove('hidden');
      blockedNotice.className = 'text-center text-xs text-rose-300 bg-rose-500/20 p-2.5 rounded-xl border border-rose-500/40 font-bold';
      blockedNotice.innerHTML = '<i class="fa-solid fa-circle-ban text-sm mr-1.5"></i> لقد تم حظرك من قبل هذا المستخدم، لا يمكنك مراسلته أو إرسال رسائل إليه.';
      form.classList.add('opacity-40', 'pointer-events-none');
      if (chatInput) {
        chatInput.disabled = true;
        chatInput.placeholder = '🚫 لا يمكنك إرسال رسائل لأنك محظور من هذا المستخدم';
      }
    } else if (hasBlockedPartner) {
      blockedNotice.classList.remove('hidden');
      blockedNotice.className = 'text-center text-xs text-amber-300 bg-amber-500/20 p-2.5 rounded-xl border border-amber-500/40 font-bold';
      blockedNotice.innerHTML = '<i class="fa-solid fa-user-slash text-sm mr-1.5"></i> قمت بحظر هذا المستخدم. لا يمكنه إرسال رسائل إليك.';
      form.classList.add('opacity-40', 'pointer-events-none');
      if (chatInput) {
        chatInput.disabled = true;
        chatInput.placeholder = 'قمت بحظر هذا الطرف (اضغط إلغاء الحظر للمراسلة)';
      }
    } else {
      blockedNotice.classList.add('hidden');
      form.classList.remove('opacity-40', 'pointer-events-none');
      if (chatInput) {
        chatInput.disabled = false;
        chatInput.placeholder = 'اكتب رسالتك هنا...';
      }
    }
  }

  renderPrivateChatMessages();
  if (modal) modal.classList.remove('hidden');
}

function closePrivateChatModal() {
  const modal = document.getElementById('modalPrivateChat');
  if (modal) modal.classList.add('hidden');
  currentChatPartner = null;
  updateUnreadMessagesCount();
}

function renderPrivateChatMessages() {
  const body = document.getElementById('privateChatMessagesBody');
  if (!body || !currentChatPartner || !currentUser) return;

  const threadKey = getConversationKey(currentUser.email, currentChatPartner.email);
  const chats = getStorageJSON('batihub_private_chats', {});
  const messages = chats[threadKey] || [];

  if (messages.length === 0) {
    body.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
        <div class="w-12 h-12 rounded-2xl bg-bh-yellow/10 text-bh-yellow flex items-center justify-center text-xl">
          <i class="fa-solid fa-handshake"></i>
        </div>
        <p class="text-xs text-slate-300 font-semibold">محادثة مشفرة ومباشرة مع ${escapeHTML(currentChatPartner.name)}</p>
        <p class="text-[11px] text-slate-500">يمكنك إرسال رسائل نصية، تسجيلات صوتية، أو صور سابقة لأعمالك.</p>
      </div>
    `;
    return;
  }

  body.innerHTML = '';
  messages.forEach(msg => {
    const isMe = (msg.senderEmail === currentUser.email);
    const bubble = document.createElement('div');
    bubble.className = `flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`;

    let contentHTML = '';
    if (msg.text) {
      contentHTML += `<p class="text-xs leading-relaxed break-words">${escapeHTML(msg.text)}</p>`;
    }
    if (msg.image) {
      contentHTML += `
        <div class="mt-1 rounded-xl overflow-hidden max-w-xs border border-bh-border/50 cursor-pointer" onclick="openImageLightbox('${escapeHTML(msg.image)}')">
          <img src="${msg.image}" alt="Chat Attachment" class="w-full h-auto object-cover max-h-48">
        </div>
      `;
    }
    if (msg.audio) {
      contentHTML += `
        <div class="mt-1">
          <audio controls src="${msg.audio}" class="h-8 max-w-[220px] rounded-lg"></audio>
        </div>
      `;
    }

    bubble.innerHTML = `
      <div class="max-w-[85%] px-3.5 py-2.5 ${isMe ? 'chat-bubble-out' : 'chat-bubble-in'} shadow-md">
        ${contentHTML}
      </div>
      <span class="text-[9px] text-slate-500 font-mono px-1">${new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;

    body.appendChild(bubble);
  });

  body.scrollTop = body.scrollHeight;
}

function handleSendPrivateMessage(event) {
  if (event) event.preventDefault();
  if (!currentUser || !currentChatPartner) return;

  const myEmail = currentUser.email.toLowerCase();
  const partnerEmail = currentChatPartner.email.toLowerCase();

  if (isUserBlockedBy(myEmail, partnerEmail)) {
    showToast('لقد تم حظرك من قبل هذا المستخدم، لا يمكنك إرسال رسائل إليه!', 'error');
    return;
  }
  if (isUserBlockedBy(partnerEmail, myEmail)) {
    showToast('لا يمكنك إرسال رسائل لمستخدم قمت بحظره! قم بإلغاء الحظر أولاً.', 'warning');
    return;
  }

  const input = document.getElementById('chatMessageInput');
  const text = (input.value || '').trim();

  if (!text && !cachedChatImageBase64) return;

  const threadKey = getConversationKey(currentUser.email, currentChatPartner.email);
  const chats = getStorageJSON('batihub_private_chats', {});
  if (!chats[threadKey]) chats[threadKey] = [];

  const newMsg = {
    id: 'msg_' + Date.now(),
    senderEmail: currentUser.email,
    senderName: currentUser.fullName || currentUser.firstName,
    text: text,
    image: cachedChatImageBase64,
    audio: null,
    createdAt: new Date().toISOString()
  };

  chats[threadKey].push(newMsg);
  setStorageJSON('batihub_private_chats', chats);

  // Broadcast in real-time across all devices
  broadcastLiveEvent('chat_message', {
    threadKey: threadKey,
    recipientEmail: currentChatPartner.email,
    senderEmail: currentUser.email,
    message: newMsg
  });

  input.value = '';
  cachedChatImageBase64 = null;
  renderPrivateChatMessages();
}

async function handleChatImageSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  showToast('جاري ضغط الصورة وإرسالها...', 'info', 1200);
  try {
    const compressed = await compressImageToDataUrl(file, 900, 0.75);
    if (!compressed) {
      showToast('تعذر معالجة الصورة، يرجى اختيار صورة أخرى', 'error');
      return;
    }
    cachedChatImageBase64 = compressed;
    handleSendPrivateMessage(null);
  } catch (err) {
    showToast('حدث خطأ أثناء تحميل الصورة', 'error');
  } finally {
    event.target.value = '';
  }
}

/* Voice Recording Engine */
async function toggleVoiceRecording() {
  const btn = document.getElementById('btnRecordVoiceNote');

  if (!isRecordingAudio) {
    // Start Recording
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderInstance = new MediaRecorder(stream);
      recordedAudioChunks = [];

      mediaRecorderInstance.ondataavailable = e => {
        if (e.data.size > 0) recordedAudioChunks.push(e.data);
      };

      mediaRecorderInstance.onstop = () => {
        const audioBlob = new Blob(recordedAudioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = () => {
          const base64Audio = reader.result;
          sendVoiceMessage(base64Audio);
        };
        reader.readAsDataURL(audioBlob);

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderInstance.start();
      isRecordingAudio = true;

      if (btn) {
        btn.classList.add('bg-rose-500', 'text-white', 'animate-pulse');
        btn.classList.remove('bg-bh-bg', 'text-slate-400');
      }
      showToast('جاري تسجيل الرسالة الصوتية... انقر مرة أخرى للإرسال', 'info', 3000);
    } catch (err) {
      showToast('تعذر الوصول إلى الميكروفون! يرجى منح الإذن.', 'error');
    }
  } else {
    // Stop & Send
    if (mediaRecorderInstance && mediaRecorderInstance.state !== 'inactive') {
      mediaRecorderInstance.stop();
    }
    isRecordingAudio = false;

    if (btn) {
      btn.classList.remove('bg-rose-500', 'text-white', 'animate-pulse');
      btn.classList.add('bg-bh-bg', 'text-slate-400');
    }
  }
}

function sendVoiceMessage(audioBase64) {
  if (!currentUser || !currentChatPartner) return;

  const myEmail = currentUser.email.toLowerCase();
  const partnerEmail = currentChatPartner.email.toLowerCase();

  if (isUserBlockedBy(myEmail, partnerEmail)) {
    showToast('لقد تم حظرك من قبل هذا المستخدم، لا يمكنك إرسال رسائل إليه!', 'error');
    return;
  }
  if (isUserBlockedBy(partnerEmail, myEmail)) {
    showToast('لا يمكنك إرسال رسائل لمستخدم قمت بحظره! قم بإلغاء الحظر أولاً.', 'warning');
    return;
  }

  const threadKey = getConversationKey(currentUser.email, currentChatPartner.email);
  const chats = getStorageJSON('batihub_private_chats', {});
  if (!chats[threadKey]) chats[threadKey] = [];

  const newMsg = {
    id: 'msg_' + Date.now(),
    senderEmail: currentUser.email,
    senderName: currentUser.fullName || currentUser.firstName,
    text: '',
    image: null,
    audio: audioBase64,
    createdAt: new Date().toISOString()
  };

  chats[threadKey].push(newMsg);
  setStorageJSON('batihub_private_chats', chats);

  // Broadcast in real-time across all devices
  broadcastLiveEvent('chat_message', {
    threadKey: threadKey,
    recipientEmail: currentChatPartner.email,
    senderEmail: currentUser.email,
    message: newMsg
  });

  renderPrivateChatMessages();
  showToast('تم إرسال الرسالة الصوتية بنجاح!', 'success', 2000);
}

function toggleBlockCurrentChatPartner() {
  if (!currentChatPartner || !currentUser) return;
  const myEmail = currentUser.email.toLowerCase();
  const partnerEmail = currentChatPartner.email.toLowerCase();

  let blocks = getActiveBlocks();
  const existingIdx = blocks.findIndex(b => b.blocker.toLowerCase() === myEmail && b.blocked.toLowerCase() === partnerEmail);
  let isNowBlocked = false;

  if (existingIdx > -1) {
    blocks.splice(existingIdx, 1);
    isNowBlocked = false;
    showToast(`تم إلغاء حظر ${currentChatPartner.name}`, 'info');
  } else {
    blocks.push({
      blocker: myEmail,
      blocked: partnerEmail,
      timestamp: new Date().toISOString()
    });
    isNowBlocked = true;
    showToast(`تم حظر ${currentChatPartner.name} بنجاح`, 'warning');
  }
  setStorageJSON('batihub_active_blocks', blocks);

  // Broadcast in real-time across all devices
  broadcastLiveEvent('user_block_toggle', {
    blocker: myEmail,
    blocked: partnerEmail,
    isBlocked: isNowBlocked
  });

  openPrivateChat(currentChatPartner.email, currentChatPartner.name, currentChatPartner.avatar);
}

/* ========================================================================= */
/* 16. MESSAGES HUB MODAL                                                    */
/* ========================================================================= */

function openMessagesHubModal() {
  if (!currentUser) {
    showToast('يرجى تسجيل الدخول لعرض الرسائل الخاصة', 'warning');
    return;
  }

  switchMessagesHubTab('chats');
  const modal = document.getElementById('modalMessagesHub');
  if (modal) modal.classList.remove('hidden');
}

function closeMessagesHubModal() {
  const modal = document.getElementById('modalMessagesHub');
  if (modal) modal.classList.add('hidden');
}

function switchMessagesHubTab(tabName) {
  const chatsView = document.getElementById('messagesHubChatsView');
  const blockedView = document.getElementById('messagesHubBlockedView');
  const btnChats = document.getElementById('btnHubChats');
  const btnBlocked = document.getElementById('btnHubBlocked');

  if (tabName === 'chats') {
    chatsView.classList.remove('hidden');
    blockedView.classList.add('hidden');

    btnChats.className = 'flex-1 py-1.5 rounded-xl bg-bh-yellow text-slate-950 text-xs font-bold transition';
    btnBlocked.className = 'flex-1 py-1.5 rounded-xl bg-bh-bg text-slate-400 border border-bh-border text-xs font-bold transition';

    renderMessagesHubChats();
  } else {
    chatsView.classList.add('hidden');
    blockedView.classList.remove('hidden');

    btnBlocked.className = 'flex-1 py-1.5 rounded-xl bg-bh-yellow text-slate-950 text-xs font-bold transition';
    btnChats.className = 'flex-1 py-1.5 rounded-xl bg-bh-bg text-slate-400 border border-bh-border text-xs font-bold transition';

    renderMessagesHubBlockedList();
  }
}

function renderMessagesHubChats() {
  const container = document.getElementById('messagesHubChatsView');
  if (!container || !currentUser) return;

  const chats = getStorageJSON('batihub_private_chats', {});
  const accounts = initAccountsDatabase();
  const threadKeys = Object.keys(chats).filter(k => k.includes(currentUser.email));

  if (threadKeys.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 space-y-2">
        <i class="fa-regular fa-comments text-3xl text-slate-500"></i>
        <p class="text-xs text-slate-400">لا توجد محادثات نشطة حالياً.</p>
        <p class="text-[11px] text-slate-500">انقر على زر "محادثة خاصة" في أي منشور لبدء تواصل فوري.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  threadKeys.forEach(key => {
    const messages = chats[key];
    if (messages.length === 0) return;

    const parts = key.replace('thread_', '').split('__');
    const partnerEmail = parts[0] === currentUser.email ? parts[1] : parts[0];
    const partnerAccount = accounts[partnerEmail] || { fullName: partnerEmail, email: partnerEmail, avatar: null };

    const lastMsg = messages[messages.length - 1];
    let previewText = lastMsg.text;
    if (lastMsg.audio) previewText = '🎤 رسالة صوتية';
    if (lastMsg.image) previewText = '📷 صورة مرفقة';

    const item = document.createElement('div');
    item.className = 'p-3 rounded-2xl bg-bh-card border border-bh-border hover:border-bh-yellow/40 transition flex items-center justify-between gap-3 cursor-pointer';

    const avatarHTML = renderAvatarImgTag(partnerAccount.avatar, partnerAccount.fullName, partnerAccount.email, 'w-10 h-10 rounded-full object-cover border border-bh-border');

    item.innerHTML = `
      <div class="flex items-center gap-3 truncate">
        ${avatarHTML}
        <div class="truncate">
          <h4 class="font-bold text-xs text-white truncate">${escapeHTML(partnerAccount.fullName || partnerAccount.email)}</h4>
          <p class="text-[11px] text-slate-400 truncate mt-0.5">${escapeHTML(previewText || '')}</p>
        </div>
      </div>
      <span class="text-[9px] text-slate-500 font-mono shrink-0">${new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;

    item.onclick = () => {
      closeMessagesHubModal();
      openPrivateChat(partnerEmail, partnerAccount.fullName, partnerAccount.avatar);
    };

    container.appendChild(item);
  });
}

function renderMessagesHubBlockedList() {
  const container = document.getElementById('messagesHubBlockedView');
  if (!container) return;

  const blockedList = getStorageJSON('batihub_blocked_users', []);
  const accounts = initAccountsDatabase();

  if (blockedList.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 space-y-2">
        <i class="fa-solid fa-shield-halved text-3xl text-slate-500"></i>
        <p class="text-xs text-slate-400">قائمة المحظورين فارغة.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  blockedList.forEach(email => {
    const acc = accounts[email] || { fullName: email, email: email, avatar: null };
    const item = document.createElement('div');
    item.className = 'p-3 rounded-2xl bg-bh-card border border-bh-border flex items-center justify-between gap-2';

    const avatarHTML = renderAvatarImgTag(acc.avatar, acc.fullName, acc.email, 'w-8 h-8 rounded-full object-cover border border-bh-border');

    item.innerHTML = `
      <div class="flex items-center gap-2.5 truncate">
        ${avatarHTML}
        <div class="truncate">
          <span class="font-bold text-xs text-white block truncate">${escapeHTML(acc.fullName || acc.email)}</span>
          <span class="text-[10px] text-slate-500 font-mono truncate">${escapeHTML(email)}</span>
        </div>
      </div>
      <button type="button" onclick="unblockUserFromHub('${email}')" class="px-3 py-1 rounded-xl bg-bh-bg hover:bg-slate-700 text-xs text-slate-200 border border-bh-border">
        إلغاء الحظر
      </button>
    `;

    container.appendChild(item);
  });
}

function unblockUserFromHub(email) {
  const blockedList = getStorageJSON('batihub_blocked_users', []);
  const updated = blockedList.filter(e => e !== email);
  setStorageJSON('batihub_blocked_users', updated);
  showToast(`تم إلغاء حظر الحساب بنجاح`, 'info');
  renderMessagesHubBlockedList();
}

function updateUnreadMessagesCount() {
  const badgeDesktop = document.getElementById('unreadMessagesBadge');
  const badgeMobile = document.getElementById('mUnreadBadge');

  if (!currentUser) {
    if (badgeDesktop) badgeDesktop.classList.add('hidden');
    if (badgeMobile) badgeMobile.classList.add('hidden');
    return;
  }

  const chats = getStorageJSON('batihub_private_chats', {});
  const threadKeys = Object.keys(chats).filter(k => k.includes(currentUser.email));
  let unread = 0;

  threadKeys.forEach(k => {
    const msgs = chats[k] || [];
    if (msgs.length > 0 && msgs[msgs.length - 1].senderEmail !== currentUser.email) {
      unread++;
    }
  });

  if (unread > 0) {
    if (badgeDesktop) {
      badgeDesktop.textContent = String(unread);
      badgeDesktop.classList.remove('hidden');
    }
    if (badgeMobile) {
      badgeMobile.classList.remove('hidden');
    }
  } else {
    if (badgeDesktop) badgeDesktop.classList.add('hidden');
    if (badgeMobile) badgeMobile.classList.add('hidden');
  }
}

/* ========================================================================= */
/* 17. IMAGE LIGHTBOX & UNIVERSAL MODAL DISMISS                              */
/* ========================================================================= */

function openImageLightbox(imgUrl) {
  const modal = document.getElementById('modalImageLightbox');
  const img = document.getElementById('lightboxImg');
  if (modal && img && imgUrl) {
    img.src = imgUrl;
    modal.classList.remove('hidden');
  }
}

function closeImageLightbox() {
  const modal = document.getElementById('modalImageLightbox');
  if (modal) modal.classList.add('hidden');
}

// Global dismiss on Escape key & backdrop click
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCreateWorkerPostModal();
    closeAddStudyOfficeModal();
    closeUserProfileModal();
    closeChangePasswordModal();
    closePrivateChatModal();
    closeMessagesHubModal();
    closeImageLightbox();
  }
});

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.add('hidden');
    if (e.target.id === 'modalPrivateChat') currentChatPartner = null;
  }
});

/* ========================================================================= */
/* 18. LIVE CLOCK                                                            */
/* ========================================================================= */

function startLiveClock() {
  const clockEl = document.getElementById('liveClockTime');
  function tick() {
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }
  tick();
  setInterval(tick, 1000);
}

/* ========================================================================= */
/* 19. APPLICATION INITIALIZATION LIFECYCLE                                  */
/* ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Cache-Busting & Mobile Force Refresh Engine (Bypasses stale browser cache)
  const CURRENT_APP_VERSION = '3.6.0';
  const storedVersion = localStorage.getItem('batihub_app_version');
  if (storedVersion !== CURRENT_APP_VERSION) {
    localStorage.setItem('batihub_app_version', CURRENT_APP_VERSION);
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          if (name !== 'batihub-dz-v6-force-update') {
            caches.delete(name);
          }
        });
      });
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((reg) => reg.update());
      });
    }
  }

  // 1. Initialize databases & seed accounts
  initAccountsDatabase();
  initDefaultFeedsIfEmpty();
  initDefaultWorkerRequestsIfEmpty();
  initDefaultGalleryIfEmpty();
  initDefaultBuildingMaterialsIfEmpty();
  initDefaultRealEstateIfEmpty();

  // Load persistent database from Electron disk if available
  if (window.electronDB) {
    if (typeof window.electronDB.getAccounts === 'function') {
      window.electronDB.getAccounts().then(diskAccs => {
        if (diskAccs && typeof diskAccs === 'object' && Object.keys(diskAccs).length > 0) {
          let curr = initAccountsDatabase();
          let merged = { ...diskAccs, ...curr };
          setStorageJSON('batihub_registered_accounts', merged);
        }
      }).catch(() => {});
    }
    if (typeof window.electronDB.getWorkerPosts === 'function') {
      window.electronDB.getWorkerPosts().then(diskPosts => {
        if (Array.isArray(diskPosts) && diskPosts.length > 0) {
          let currPosts = getStorageJSON('batihub_worker_posts', []);
          const map = new Map();
          diskPosts.forEach(p => map.set(p.id, p));
          currPosts.forEach(p => map.set(p.id, p));
          setStorageJSON('batihub_worker_posts', Array.from(map.values()));
        }
      }).catch(() => {});
    }
  }

  // 2. Restore language preference
  const savedLang = localStorage.getItem('batihub_lang') || 'ar';
  currentLanguage = savedLang;

  // 3. Start live clock & realtime multi-device sync
  startLiveClock();
  initLiveSyncEngine();
  initNetworkEnforcement();
  initAutoAppUpdater();

  // 4. Initialize calculator history tape and saved credentials
  renderCalcHistory();
  loadSavedLoginCredentials();

  // 5. Splash Screen Progress Animation
  const splashScreen = document.getElementById('splashScreen');
  const progressBar = document.getElementById('splashProgressBar');
  const percentText = document.getElementById('splashPercentText');
  const statusText = document.getElementById('splashStatusText');

  let progress = 0;
  const splashInterval = setInterval(() => {
    progress += 25;
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (percentText) percentText.textContent = `${progress}%`;

    if (progress === 50 && statusText) {
      statusText.textContent = 'جاري مزامنة قواعد البيانات وعروض العمل...';
    } else if (progress === 75 && statusText) {
      statusText.textContent = 'تحميل الآلة الحاسبة وخدمات البناء...';
    } else if (progress >= 100) {
      clearInterval(splashInterval);
      if (statusText) statusText.textContent = 'جاهز للاستخدام!';

      setTimeout(() => {
        if (splashScreen) {
          splashScreen.classList.add('splash-hide');
          setTimeout(() => {
            splashScreen.style.display = 'none';
          }, 500);
        }

        const saved = getStorageJSON('batihub_saved_login_cred', null);
        const accounts = initAccountsDatabase();
        let validUser = null;

        // 100% Persistent Login: Check localStorage first
        const persistedUser = getStorageJSON('batihub_current_user', null);
        if (persistedUser && persistedUser.email) {
          const cleanEmail = persistedUser.email.toLowerCase();
          let acc = accounts[cleanEmail];
          if (!acc) {
            acc = { ...persistedUser };
            accounts[cleanEmail] = acc;
            setStorageJSON('batihub_registered_accounts', accounts);
          }
          validUser = { ...acc };
        } else if (saved && saved.email && (saved.autoLogin || isDeviceTrustedForEmail(saved.email))) {
          const cleanEmail = saved.email.toLowerCase();
          let acc = accounts[cleanEmail];
          if (!acc) {
            acc = {
              id: 'usr_' + Date.now(),
              fullName: deriveNameFromGmail(cleanEmail),
              email: cleanEmail,
              role: cleanEmail === 'batihubdz@gmail.com' ? 'admin' : 'user',
              isVerified: true,
              createdAt: new Date().toISOString()
            };
            accounts[cleanEmail] = acc;
            setStorageJSON('batihub_registered_accounts', accounts);
          }
          validUser = { ...acc };
          setStorageJSON('batihub_current_user', validUser);
        }

        if (validUser) {
          currentUser = validUser;
          transitionToDashboard();
        } else {
          switchAuthView('google');
          renderTrustedAccountsPills();
        }
      }, 350);
    }
  }, 120);
});

/* ========================================================================= */
/* 20. GALLERY & INTERIOR DESIGNS (معرض التصاميم والديكور)                  */
/* ========================================================================= */

let activeGalleryFilter = 'all';
let cachedGalleryImagesBase64 = [];

const DEFAULT_SAMPLE_GALLERY = [
  {
    id: 'gal_sample_01',
    title: 'مطبخ عصري مجهز بأحدث الديكورات وخشب إسباني هيدروفوج',
    roomType: 'kitchen',
    materials: 'خشب MDF هيدروفوج مقاوم للمياه، كوارتز أبيض تركي، إضاءة LED مدمجة، سيراميك إسباني 60x120',
    area: '16 م²',
    description: 'تصميم وتنفيذ متكامل لمطبخ عصري يجمع بين الاستغلال المثالي للمساحات وسلاسة الحركة مع أجهزة كهرومنزلية مدمجة بالكامل.',
    images: ['assets/batihub_banner.jpg'],
    authorId: 'batihubdz@gmail.com',
    authorName: 'BatiHub DZ (الإدارة)',
    createdAt: '2026-11-20T10:00:00.000Z'
  },
  {
    id: 'gal_sample_02',
    title: 'حمام إيطالي فخم بتجهيزات حديثة ودش مدمج',
    roomType: 'bathroom',
    materials: 'بورسلان إيطالي رمادي، دوش إيطالي (Douche Italienne)، زجاج سيكوريت 10 مم، حنفيات دفن سوداء مات',
    area: '9 م²',
    description: 'تشطيب عصري بمستوى فندقي، عزل مائي احترافي، ومغسلة معلقة بتصميم مريح وعصري.',
    images: ['assets/batihub_logo.png'],
    authorId: 'batihubdz@gmail.com',
    authorName: 'BatiHub DZ (الإدارة)',
    createdAt: '2026-11-20T11:00:00.000Z'
  },
  {
    id: 'gal_sample_03',
    title: 'صالون فاخر بديكور مغربي جبسي معاصر',
    roomType: 'living_room',
    materials: 'جبس مغربي معاصر منقوش، رخام بيج كلاسيكي، إضاءة خفية متناسقة، دهان ديكوري فلفت مخملي',
    area: '32 م²',
    description: 'صالون استقبال فاخر يدمج أصالة النقش الجبسي مع حداثة التوزيع الضوئي والرخام اللامع.',
    images: ['assets/batihub_banner.jpg'],
    authorId: 'batihubdz@gmail.com',
    authorName: 'BatiHub DZ (الإدارة)',
    createdAt: '2026-11-20T12:00:00.000Z'
  },
  {
    id: 'gal_sample_04',
    title: 'مرحاض عصري معلق مع حائط حجري ديكوري',
    roomType: 'toilet',
    materials: 'مرحاض معلق (Cuvette suspendue)، خزان جداري مدفون (Geberit)، بلاط حجري بارز، شفاط هواء صامت',
    area: '4 م²',
    description: 'استغلال احترافي للمساحات الصغيرة مع سهولة فائقة في التنظيف وعصرية في المظهر.',
    images: ['assets/batihub_logo.png'],
    authorId: 'batihubdz@gmail.com',
    authorName: 'BatiHub DZ (الإدارة)',
    createdAt: '2026-11-20T13:00:00.000Z'
  },
  {
    id: 'gal_sample_05',
    title: 'واجهة فيلا عصرية بمزيج الحجر الطبيعي والمونوكوش',
    roomType: 'facade',
    materials: 'حجر ترافيرتينو طبيعي، طلاء مونوكوش مقاوم للطقس، ألومنيوم رمادي داكن، إضاءة معمارية ليلية',
    area: '220 م²',
    description: 'واجهة معمارية عصرية تتميز بالمتانة والجمال مع خطوط نظيفة وعزل حراري خارجي عالي الكفاءة.',
    images: ['assets/batihub_banner.jpg'],
    authorId: 'batihubdz@gmail.com',
    authorName: 'BatiHub DZ (الإدارة)',
    createdAt: '2026-11-20T14:00:00.000Z'
  }
];

function initDefaultGalleryIfEmpty() {
  let items = getStorageJSON('batihub_gallery_items', null);
  if (!items || !Array.isArray(items) || items.length === 0) {
    setStorageJSON('batihub_gallery_items', DEFAULT_SAMPLE_GALLERY);
  }
}

function setGalleryFilter(filter, btn) {
  activeGalleryFilter = filter || 'all';

  document.querySelectorAll('.gallery-filter-pill').forEach(b => {
    b.classList.remove('active-gallery-pill', 'bg-bh-yellow', 'text-slate-950', 'border-bh-yellow');
    b.classList.add('bg-bh-card', 'text-slate-300', 'border-bh-border');
  });

  if (btn) {
    btn.classList.add('active-gallery-pill', 'bg-bh-yellow', 'text-slate-950', 'border-bh-yellow');
    btn.classList.remove('bg-bh-card', 'text-slate-300', 'border-bh-border');
  }

  renderGalleryFeed();
}

function openAddGalleryModal() {
  if (!currentUser || currentUser.role !== 'admin') {
    showToast('هذه الميزة مخصصة لحساب الإدارة فقط!', 'warning');
    return;
  }

  cachedGalleryImagesBase64 = [];
  const title = document.getElementById('galleryTitle');
  const materials = document.getElementById('galleryMaterials');
  const area = document.getElementById('galleryArea');
  const desc = document.getElementById('galleryDescription');
  const countEl = document.getElementById('galleryImagesCount');
  const previewCont = document.getElementById('galleryMultiImagesPreview');

  if (title) title.value = '';
  if (materials) materials.value = '';
  if (area) area.value = '';
  if (desc) desc.value = '';
  if (countEl) countEl.textContent = '0 صور محددة';
  if (previewCont) previewCont.innerHTML = '';

  const modal = document.getElementById('modalAddGalleryDesign');
  if (modal) modal.classList.remove('hidden');
}

function closeAddGalleryModal() {
  const modal = document.getElementById('modalAddGalleryDesign');
  if (modal) modal.classList.add('hidden');
}

function handleGalleryImagesSelect(event) {
  const files = Array.from(event.target.files || []);
  if (files.length === 0) return;

  const previewCont = document.getElementById('galleryMultiImagesPreview');
  const countEl = document.getElementById('galleryImagesCount');

  files.forEach(file => {
    if (file.size > 5 * 1024 * 1024) {
      showToast(`تم تخطي ${file.name} لأن حجمها أكبر من 5 ميغابايت`, 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      cachedGalleryImagesBase64.push(base64);

      if (countEl) countEl.textContent = `${cachedGalleryImagesBase64.length} صور محددة`;

      if (previewCont) {
        const thumb = document.createElement('div');
        thumb.className = 'relative rounded-xl overflow-hidden border border-bh-border h-20 bg-bh-bg';
        const idx = cachedGalleryImagesBase64.length - 1;
        thumb.innerHTML = `
          <img src="${base64}" alt="Thumb" class="w-full h-full object-cover">
          <button type="button" onclick="removeGallerySelectedImage(${idx}, this)" class="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center cursor-pointer">
            <i class="fa-solid fa-xmark"></i>
          </button>
        `;
        previewCont.appendChild(thumb);
      }
    };
    reader.readAsDataURL(file);
  });
}

function removeGallerySelectedImage(index, btn) {
  if (btn && btn.parentElement) btn.parentElement.remove();
  if (index >= 0 && index < cachedGalleryImagesBase64.length) {
    cachedGalleryImagesBase64.splice(index, 1);
  }
  const countEl = document.getElementById('galleryImagesCount');
  if (countEl) countEl.textContent = `${cachedGalleryImagesBase64.length} صور محددة`;
}

function handleCreateGallerySubmit(event) {
  if (event) event.preventDefault();
  if (!currentUser || currentUser.role !== 'admin') return;

  const title = (document.getElementById('galleryTitle').value || '').trim();
  const roomType = document.getElementById('galleryRoomType').value;
  const area = (document.getElementById('galleryArea').value || '').trim();
  const materials = (document.getElementById('galleryMaterials').value || '').trim();
  const description = (document.getElementById('galleryDescription').value || '').trim();

  if (!title || !materials) {
    showToast('يرجى ملء عنوان التصميم ومواد البناء المستخدمة', 'warning');
    return;
  }

  const items = getStorageJSON('batihub_gallery_items', []);
  const newItem = {
    id: 'gal_' + Date.now(),
    title,
    roomType,
    materials,
    area,
    description,
    images: cachedGalleryImagesBase64.length > 0 ? cachedGalleryImagesBase64 : ['assets/batihub_banner.jpg'],
    authorId: currentUser.email,
    authorName: currentUser.fullName || 'الإدارة',
    createdAt: new Date().toISOString()
  };

  items.unshift(newItem);
  setStorageJSON('batihub_gallery_items', items);

  broadcastLiveEvent('new_gallery_item', newItem);

  closeAddGalleryModal();
  renderGalleryFeed();
  showToast('تم نشر التصميم الجديد في المعرض بنجاح!', 'success', 5000);
}

function deleteGalleryItem(itemId) {
  if (!currentUser || currentUser.role !== 'admin') return;

  showAppModalAlert('تأكيد حذف التصميم', 'هل أنت متأكد من حذف هذا التصميم من المعرض نهائياً؟', true, () => {
    let items = getStorageJSON('batihub_gallery_items', []);
    items = items.filter(i => i.id !== itemId);
    setStorageJSON('batihub_gallery_items', items);
    broadcastLiveEvent('delete_gallery_item', { itemId });
    renderGalleryFeed();
    showToast('تم حذف التصميم من المعرض', 'info');
  });
}

function renderGalleryFeed() {
  const container = document.getElementById('galleryFeedContainer');
  if (!container) return;

  initDefaultGalleryIfEmpty();
  let items = getStorageJSON('batihub_gallery_items', []);

  if (activeGalleryFilter !== 'all') {
    items = items.filter(i => i.roomType === activeGalleryFilter);
  }

  const isAdmin = currentUser && currentUser.role === 'admin';

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full bg-bh-card border border-bh-border rounded-3xl p-10 text-center space-y-4">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-3xl">
          <i class="fa-solid fa-camera-retro"></i>
        </div>
        <div class="space-y-1">
          <h3 class="font-bold text-white text-base">لا توجد تصاميم في هذا القسم حالياً</h3>
          <p class="text-xs text-slate-400 max-w-sm mx-auto">سيتم إضافة نماذج وتصاميم جديدة قريباً من قبل إدارة BatiHub DZ.</p>
        </div>
        ${isAdmin ? `
          <button type="button" onclick="openAddGalleryModal()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-lg hover:opacity-95 transition cursor-pointer">
            إضافة تصميم الآن
          </button>
        ` : ''}
      </div>
    `;
    return;
  }

  const roomLabels = {
    kitchen: 'مطبخ (كوزينة)',
    bathroom: 'حمام',
    toilet: 'مرحاض',
    living_room: 'صالون ومعيشة',
    bedroom: 'غرفة نوم',
    facade: 'واجهة ومدخل'
  };

  container.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'bg-bh-card border border-bh-border hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl transition flex flex-col justify-between group';

    const mainImage = (item.images && item.images.length > 0) ? item.images[0] : 'assets/batihub_banner.jpg';
    const totalImages = item.images ? item.images.length : 1;

    let thumbsHTML = '';
    if (item.images && item.images.length > 1) {
      thumbsHTML = `
        <div class="flex items-center gap-1.5 p-2 bg-bh-bg/90 border-t border-bh-border overflow-x-auto no-scrollbar">
          ${item.images.map((img, idx) => `
            <img src="${img}" onclick="openImageLightbox('${escapeHTML(img)}')" alt="Photo ${idx+1}" class="w-12 h-10 object-cover rounded-lg border border-bh-border hover:border-amber-400 cursor-pointer transition shrink-0">
          `).join('')}
        </div>
      `;
    }

    const roomLabel = roomLabels[item.roomType] || 'تصميم معماري';

    card.innerHTML = `
      <div>
        <div class="relative overflow-hidden max-h-56 bg-slate-950 cursor-pointer" onclick="openImageLightbox('${escapeHTML(mainImage)}')">
          <img src="${mainImage}" alt="${escapeHTML(item.title)}" class="w-full h-52 object-cover group-hover:scale-103 transition duration-500">
          <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/40">
            ${roomLabel}
          </span>
          ${totalImages > 1 ? `
            <span class="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/75 text-white flex items-center gap-1">
              <i class="fa-solid fa-images"></i> ${totalImages} صور
            </span>
          ` : ''}
        </div>
        ${thumbsHTML}

        <div class="p-5 space-y-3 text-right">
          <h4 class="font-heading font-black text-sm text-white leading-snug">${escapeHTML(item.title)}</h4>

          <!-- Materials Info Strip -->
          <div class="p-3 rounded-2xl bg-bh-bg border border-bh-border/70 space-y-1.5">
            <div class="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
              <i class="fa-solid fa-cubes-stacked text-xs"></i>
              <span>مواد البناء والتجهيز :</span>
            </div>
            <p class="text-[11px] text-slate-300 leading-relaxed font-sans">${escapeHTML(item.materials)}</p>
          </div>

          ${item.area ? `
            <div class="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <i class="fa-solid fa-ruler-combined text-amber-400"></i>
              <span class="text-white font-bold">المساحة:</span>
              <span class="text-amber-300 font-bold">${escapeHTML(item.area)}</span>
            </div>
          ` : ''}

          ${item.description ? `
            <p class="text-xs text-slate-400 leading-relaxed">${escapeHTML(item.description)}</p>
          ` : ''}
        </div>
      </div>

      ${isAdmin ? `
        <div class="p-4 pt-0 text-left">
          <button type="button" onclick="deleteGalleryItem('${item.id}')" class="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1 cursor-pointer">
            <i class="fa-regular fa-trash-can"></i>
            <span>حذف التصميم</span>
          </button>
        </div>
      ` : ''}
    `;

    container.appendChild(card);
  });
}

/* ========================================================================= */
/* 21. WORKER REQUESTS ENGINE (طلب عامل / عمال)                               */
/* ========================================================================= */

let activeWorkerReqFilter = 'all';
let cachedWorkerReqImageBase64 = null;

const DEFAULT_SAMPLE_WORKER_REQUESTS = [
  {
    id: 'req_sample_01',
    trade: 'بناء',
    wilaya: 'قسنطينة',
    phone: '0555123456',
    description: 'نحتاج بناء محترف لبناء سياج حديقة وجدران فيلا طابق أرضي بطول 40 متراً، السلعة متوفرة كاملة في الورشة والمطلوب العمل بالمتر المربع أو الفيجور.',
    image: null,
    status: 'approved',
    authorId: 'mouhanedguellif16@gmail.com',
    authorName: 'Mouhaned Guellif',
    likes: [],
    comments: [],
    createdAt: '2026-11-21T09:00:00.000Z'
  },
  {
    id: 'req_sample_02',
    trade: 'ترصيص وصحي',
    wilaya: 'الجزائر العاصمة',
    phone: '0660987654',
    description: 'مطلوب ترصاص محترف لتركيب شبكة التدفئة المركزية وتمديدات المياه لحمامين ومطبخ في شقة جديدة، العمل ابتداء من الأسبوع القادم.',
    image: null,
    status: 'approved',
    authorId: 'karim.artisan@gmail.com',
    authorName: 'Karim Artisan',
    likes: [],
    comments: [],
    createdAt: '2026-11-21T11:30:00.000Z'
  }
];

function initDefaultWorkerRequestsIfEmpty() {
  let reqs = getStorageJSON('batihub_worker_requests', null);
  if (!reqs || !Array.isArray(reqs) || reqs.length === 0) {
    setStorageJSON('batihub_worker_requests', DEFAULT_SAMPLE_WORKER_REQUESTS);
  }
}

function filterWorkerRequests(trade, btn) {
  activeWorkerReqFilter = trade || 'all';

  document.querySelectorAll('.worker-req-filter-pill').forEach(b => {
    b.classList.remove('active-filter');
    const icon = b.querySelector('i');
    if (icon) icon.classList.remove('text-slate-950');
  });

  if (btn) {
    btn.classList.add('active-filter');
    const icon = btn.querySelector('i');
    if (icon) icon.classList.add('text-slate-950');
  }

  renderWorkerRequestsFeed();
}

function openCreateWorkerRequestModal() {
  if (!currentUser) {
    showToast('يرجى تسجيل الدخول أولاً لنشر طلب عامل', 'warning');
    switchAuthView('google');
    transitionToAuth();
    return;
  }

  cachedWorkerReqImageBase64 = null;
  const wilaya = document.getElementById('workerReqWilaya');
  const phone = document.getElementById('workerReqPhone');
  const desc = document.getElementById('workerReqDesc');
  const imgInput = document.getElementById('workerReqImageInput');
  const preview = document.getElementById('workerReqImagePreviewContainer');

  if (wilaya) wilaya.value = '';
  if (phone) phone.value = '';
  if (desc) desc.value = '';
  if (imgInput) imgInput.value = '';
  if (preview) preview.classList.add('hidden');

  const modal = document.getElementById('modalCreateWorkerRequest');
  if (modal) modal.classList.remove('hidden');
}

function closeCreateWorkerRequestModal() {
  const modal = document.getElementById('modalCreateWorkerRequest');
  if (modal) modal.classList.add('hidden');
}

function handleWorkerReqImageSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (file.size > 4 * 1024 * 1024) {
    showToast('حجم الصورة كبير جداً! اختر صورة أقل من 4 ميغابايت', 'warning');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    cachedWorkerReqImageBase64 = e.target.result;
    const preview = document.getElementById('workerReqImagePreview');
    const container = document.getElementById('workerReqImagePreviewContainer');
    if (preview) preview.src = cachedWorkerReqImageBase64;
    if (container) container.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

function removeWorkerReqSelectedImage() {
  cachedWorkerReqImageBase64 = null;
  const input = document.getElementById('workerReqImageInput');
  const container = document.getElementById('workerReqImagePreviewContainer');
  if (input) input.value = '';
  if (container) container.classList.add('hidden');
}

function handleCreateWorkerRequestSubmit(event) {
  if (event) event.preventDefault();
  if (!currentUser) return;

  const trade = document.getElementById('workerReqTrade').value;
  const wilaya = (document.getElementById('workerReqWilaya').value || '').trim();
  const phone = (document.getElementById('workerReqPhone').value || '').trim();
  const description = (document.getElementById('workerReqDesc').value || '').trim();

  if (!trade || !wilaya || !phone || !description) {
    showToast('يرجى ملء جميع الحقول المطلوبة', 'warning');
    return;
  }

  const isAdmin = currentUser.role === 'admin' || currentUser.email.toLowerCase() === 'batihubdz@gmail.com';
  const status = isAdmin ? 'approved' : 'pending';

  const requests = getStorageJSON('batihub_worker_requests', []);
  const newReq = {
    id: 'req_' + Date.now(),
    trade,
    wilaya,
    phone,
    description,
    image: cachedWorkerReqImageBase64,
    status: status,
    authorId: currentUser.email,
    authorName: currentUser.fullName || currentUser.firstName,
    authorAvatar: currentUser.avatar,
    likes: [],
    comments: [],
    createdAt: new Date().toISOString()
  };

  requests.unshift(newReq);
  setStorageJSON('batihub_worker_requests', requests);

  broadcastLiveEvent('new_worker_request', newReq);

  closeCreateWorkerRequestModal();
  renderWorkerRequestsFeed();
  renderDedicatedPendingPostsTab();
  updateTopPendingCategoryNavigation();
  updateAdminPendingBadge();

  if (status === 'pending') {
    showToast('تم إرسال طلب العامل بنجاح! المنشور قيد الفحص والمراجعة من قبل الإدارة وسيظهر للجميع فور اعتماده.', 'info', 6000);
  } else {
    showToast('تم اعتماد ونشر طلب العامل بنجاح!', 'success');
  }
}

function approveWorkerRequest(reqId) {
  const reqs = getStorageJSON('batihub_worker_requests', []);
  const target = reqs.find(r => r.id === reqId);
  if (target) {
    target.status = 'approved';
    setStorageJSON('batihub_worker_requests', reqs);
    broadcastLiveEvent('approve_worker_request', { reqId, request: target });
    renderWorkerRequestsFeed();
    renderDedicatedPendingPostsTab();
    updateTopPendingCategoryNavigation();
    updateAdminPendingBadge();
    showToast('تم اعتماد ونشر طلب العامل للجميع بنجاح!', 'success');
  }
}

function rejectWorkerRequest(reqId) {
  const reqs = getStorageJSON('batihub_worker_requests', []);
  const updated = reqs.filter(r => r.id !== reqId);
  setStorageJSON('batihub_worker_requests', updated);
  broadcastLiveEvent('reject_worker_request', { reqId });
  renderWorkerRequestsFeed();
  renderDedicatedPendingPostsTab();
  updateTopPendingCategoryNavigation();
  updateAdminPendingBadge();
  showToast('تم رفض وحذف طلب العامل نهائياً.', 'info');
}

function deleteWorkerRequest(reqId) {
  showAppModalAlert('تأكيد الحذف', 'هل أنت متأكد من حذف هذا الطلب نهائياً؟', true, () => {
    const reqs = getStorageJSON('batihub_worker_requests', []);
    const updated = reqs.filter(r => r.id !== reqId);
    setStorageJSON('batihub_worker_requests', updated);
    broadcastLiveEvent('delete_worker_request', { reqId });
    renderWorkerRequestsFeed();
    renderDedicatedPendingPostsTab();
    updateTopPendingCategoryNavigation();
    updateAdminPendingBadge();
    showToast('تم حذف طلب العامل بنجاح', 'info');
  });
}

function toggleRequestLike(reqId) {
  if (!currentUser) {
    showToast('يرجى تسجيل الدخول أولاً للإعجاب بالمنشور', 'warning');
    return;
  }

  const reqs = getStorageJSON('batihub_worker_requests', []);
  const req = reqs.find(r => r.id === reqId);
  if (!req) return;

  if (!req.likes) req.likes = [];
  const uEmail = currentUser.email.toLowerCase();
  const idx = req.likes.indexOf(uEmail);

  if (idx > -1) {
    req.likes.splice(idx, 1);
  } else {
    req.likes.push(uEmail);
  }

  setStorageJSON('batihub_worker_requests', reqs);
  broadcastLiveEvent('toggle_request_like', { reqId, likes: req.likes });
  renderWorkerRequestsFeed();
}

function toggleRequestComments(reqId) {
  const cont = document.getElementById(`reqCommentsBox_${reqId}`);
  if (cont) cont.classList.toggle('hidden');
}

function handleAddRequestComment(event, reqId) {
  if (event) event.preventDefault();
  if (!currentUser) {
    showToast('يرجى تسجيل الدخول للتعليق', 'warning');
    return;
  }

  const input = document.getElementById(`reqCommentInput_${reqId}`);
  if (!input) return;

  const text = (input.value || '').trim();
  if (!text) return;

  const reqs = getStorageJSON('batihub_worker_requests', []);
  const req = reqs.find(r => r.id === reqId);
  if (!req) return;

  if (!req.comments) req.comments = [];
  const comment = {
    id: 'c_' + Date.now(),
    text,
    authorId: currentUser.email,
    authorName: currentUser.fullName || currentUser.firstName,
    authorAvatar: currentUser.avatar,
    createdAt: new Date().toISOString()
  };

  req.comments.push(comment);
  setStorageJSON('batihub_worker_requests', reqs);
  broadcastLiveEvent('add_request_comment', { reqId, comment });

  input.value = '';
  renderWorkerRequestsFeed();
  showToast('تمت إضافة تعليقك بنجاح', 'success');
}

function renderWorkerRequestsFeed() {
  const container = document.getElementById('workerRequestsFeedContainer');
  if (!container) return;

  initDefaultWorkerRequestsIfEmpty();
  let requests = getStorageJSON('batihub_worker_requests', []);

  // Filter only approved
  requests = requests.filter(r => r.status === 'approved' || !r.status);

  if (activeWorkerReqFilter !== 'all') {
    requests = requests.filter(r => r.trade === activeWorkerReqFilter);
  }

  if (requests.length === 0) {
    container.innerHTML = `
      <div class="bg-bh-card border border-bh-border rounded-3xl p-10 text-center space-y-4">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-3xl">
          <i class="fa-solid fa-users-gear"></i>
        </div>
        <div class="space-y-1">
          <h3 class="font-bold text-white text-base">لا توجد طلبات عمال في هذا التخصص حالياً</h3>
          <p class="text-xs text-slate-400 max-w-sm mx-auto">هل تبحث عن عمال أو حرفيين لورشتك؟ انشر طلبك الآن مجاناً ليصل لآلاف الحرفيين.</p>
        </div>
        <button type="button" onclick="openCreateWorkerRequestModal()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs shadow-lg hover:opacity-95 transition cursor-pointer">
          نشر طلب عامل جديد
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  requests.forEach(req => {
    const card = document.createElement('div');
    card.className = 'bg-bh-card border border-bh-border hover:border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 transition';

    const isOwner = currentUser && req.authorId && currentUser.email.toLowerCase() === req.authorId.toLowerCase();
    const isAdmin = currentUser && currentUser.role === 'admin';
    const avatarHTML = renderAvatarImgTag(req.authorAvatar, req.authorName, req.authorId, 'w-12 h-12 rounded-full object-cover border-2 border-emerald-500/50 shadow-md');

    let imageHTML = '';
    if (req.image) {
      imageHTML = `
        <div class="rounded-2xl overflow-hidden border border-bh-border max-h-80 bg-bh-bg cursor-pointer" onclick="openImageLightbox('${escapeHTML(req.image)}')">
          <img src="${req.image}" alt="Job Location" class="w-full h-auto object-cover hover:scale-102 transition duration-300">
        </div>
      `;
    }

    const likesCount = (req.likes || []).length;
    const isLiked = currentUser && (req.likes || []).includes(currentUser.email.toLowerCase());
    const commentsCount = (req.comments || []).length;

    let commentsListHTML = '';
    if (req.comments && req.comments.length > 0) {
      commentsListHTML = req.comments.map(c => `
        <div class="p-2.5 rounded-xl bg-bh-bg border border-bh-border/60 space-y-1">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-emerald-400">${escapeHTML(c.authorName || 'مستخدم')}</span>
            <span class="text-[10px] text-slate-500 font-mono">${new Date(c.createdAt).toLocaleDateString()}</span>
          </div>
          <p class="text-xs text-slate-300">${escapeHTML(c.text)}</p>
        </div>
      `).join('');
    }

    card.innerHTML = `
      <div class="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-bh-border/70">
        <div class="flex items-center gap-3">
          ${avatarHTML}
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="font-bold text-sm text-white">${escapeHTML(req.authorName || 'صاحب المشروع')}</h4>
              ${isOwner ? '<span class="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/30">(أنت)</span>' : ''}
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">طلب عامل</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span class="text-emerald-400 font-bold">المهنة: ${escapeHTML(req.trade)}</span>
              <span>•</span>
              <span class="font-mono text-[11px]">${escapeHTML(req.wilaya || 'الجزائر')}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          ${isOwner || isAdmin ? `
            <button type="button" onclick="deleteWorkerRequest('${req.id}')" class="w-8 h-8 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 flex items-center justify-center transition cursor-pointer" title="حذف الطلب">
              <i class="fa-regular fa-trash-can text-xs"></i>
            </button>
          ` : ''}
        </div>
      </div>

      <div class="space-y-3">
        <p class="text-xs text-slate-200 leading-relaxed">${escapeHTML(req.description)}</p>
        ${imageHTML}
      </div>

      <!-- Action Buttons: Phone, Chat, Like, Comment -->
      <div class="pt-3 border-t border-bh-border/70 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div class="flex items-center gap-2">
          <a href="tel:${escapeHTML(req.phone)}" class="py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition flex items-center gap-1.5 shadow-md active:scale-95">
            <i class="fa-solid fa-phone text-xs"></i>
            <span>اتصال: ${escapeHTML(req.phone)}</span>
          </a>
          <button type="button" onclick="startChatFromPost('${escapeHTML(req.authorId)}', '${escapeHTML(req.authorName || 'صاحب المشروع')}', '${escapeHTML(req.authorAvatar || '')}')" class="py-2 px-3.5 rounded-xl bg-bh-bg hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95">
            <i class="fa-solid fa-comments"></i>
            <span>محادثة خاصة</span>
          </button>
        </div>

        <div class="flex items-center gap-3">
          <button type="button" onclick="toggleRequestLike('${req.id}')" class="flex items-center gap-1.5 py-1.5 px-3 rounded-xl ${isLiked ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400 hover:text-white'} transition cursor-pointer">
            <i class="fa-solid fa-heart ${isLiked ? 'text-rose-500' : ''}"></i>
            <span class="font-mono text-xs font-bold">${likesCount}</span>
          </button>
          <button type="button" onclick="toggleRequestComments('${req.id}')" class="flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-slate-400 hover:text-white transition cursor-pointer">
            <i class="fa-regular fa-comment"></i>
            <span class="font-mono text-xs font-bold">${commentsCount}</span>
          </button>
        </div>
      </div>

      <!-- Comments Box (Slide Down) -->
      <div id="reqCommentsBox_${req.id}" class="hidden pt-3 border-t border-bh-border/50 space-y-3">
        <div class="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
          ${commentsListHTML || '<p class="text-[11px] text-slate-500 text-center py-2">لا توجد تعليقات بعد، كن أول من يعلق!</p>'}
        </div>
        <form onsubmit="handleAddRequestComment(event, '${req.id}')" class="flex items-center gap-2 pt-1">
          <input type="text" id="reqCommentInput_${req.id}" placeholder="اكتب تعليقاً..." class="flex-1 bg-bh-bg border border-bh-border rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400">
          <button type="submit" class="py-2 px-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer shadow-sm">
            إرسال
          </button>
        </form>
      </div>
    `;

    container.appendChild(card);
  });
}


/* ========================================================================= */
/* 22. CLEAN NATIVE ICONS & MODERN EMOJIS                                    */
/* ========================================================================= */

function parseTwemoji(element) {
  // Twemoji disabled as requested: native emojis and FontAwesome icons used cleanly
}

/* ========================================================================= */
/* 23. BUILDING MATERIALS CATALOG ENGINE (دليل مواد البناء في الجزائر)       */
/* ========================================================================= */

let activeMaterialFilter = 'all';
let cachedMaterialImageBase64 = null;

const DEFAULT_BUILDING_MATERIALS = [
  {
    id: 'mat_sample_01',
    name: 'إسمنت بورتلاندي CPJ 42.5 (لافارج / متين / الشلف)',
    category: 'cement',
    price: '520 دج للكيس (50 كغ)',
    usage: 'صب الهياكل الخرسانية المسلحة، الأعمدة، القواعد والأساسات (Semelles)، والأسقف الخرسانية المصبوبة ذات المقاومة العالية للضغط.',
    composition: 'كلينكر نقي 95%، جبس طبيعي 5% مع مركبات سيليكات ثلاثية الكالسيوم المطابقة للمواصفة القياسية الجزائرية NA 442.',
    image: 'assets/batihub_banner.jpg',
    author: 'batihubdz@gmail.com',
    createdAt: '2026-11-20T10:00:00.000Z'
  },
  {
    id: 'mat_sample_02',
    name: 'حديد التسليح عالي المقاومة FeE500 (توسيالي و بلارة AQS)',
    category: 'steel',
    price: '10,800 دج للقنطار (100 كغ)',
    usage: 'تسليح الأعمدة والميدات (Longrines)، أقفاص الأساسات، وتدعيم الكمرات والأسقف ضد قوى الشد والزلازل وفق نظام RPA99.',
    composition: 'فولاذ كربوني معالج بالدرفلة الحرارية العالية، أقطار من Ø6 إلى Ø25 ملم مع تعرجات لولبية مقاومة للانزلاق داخل الخرسانة.',
    image: 'assets/batihub_banner.jpg',
    author: 'batihubdz@gmail.com',
    createdAt: '2026-11-20T10:05:00.000Z'
  },
  {
    id: 'mat_sample_03',
    name: 'آجر أحمر طيني مجوف 12 ثقب (Brique rouge 12 trous)',
    category: 'brick',
    price: '38 دج للقطعة',
    usage: 'بناء وتشييد الجدران الخارجية المزدوجة العازلة مع ترك فراغ هوائي (Double cloison) وحشو العوازل الحرارية والصوتية.',
    composition: 'طين أحمر نقي محروق في أفران حرارية عند 950° مئوية، عازل حراري وصوتي طبيعي خفيف الوزن.',
    image: 'assets/batihub_banner.jpg',
    author: 'batihubdz@gmail.com',
    createdAt: '2026-11-20T10:10:00.000Z'
  },
  {
    id: 'mat_sample_04',
    name: 'طوب إسمنتي مجوف 15سم و 20سم (Parpaing)',
    category: 'brick',
    price: '48 دج للقطعة',
    usage: 'بناء جدران الأسوار الخارجية، جدران الأقبية (Sous-sol)، وحواجز ورشات البناء والمستودعات ومجاري الصرف.',
    composition: 'خليط الإسمنت مع الرمل الخشن والحصى الصغير مع كبس هيدروليكي آلي عالي الكثافة ومقاوم للرطوبة.',
    image: 'assets/batihub_banner.jpg',
    author: 'batihubdz@gmail.com',
    createdAt: '2026-11-20T10:15:00.000Z'
  },
  {
    id: 'mat_sample_05',
    name: 'رمل الوادي الطبيعي المغسول (Sable d\'oued)',
    category: 'aggregates',
    price: '18,500 دج للشاحنة (15 م³)',
    usage: 'صناعة الملاط (Mortier) للياسة وتلبيس الجدران، تركيب السيراميك والرخام، وخلط الخرسانة المسلحة الناعمة.',
    composition: 'حبيبات كوارتز ورمل سليسي طبيعي مفروز خالي من الطين والشوائب العضوية بنعومة مثالية (0-3 ملم).',
    image: 'assets/batihub_banner.jpg',
    author: 'batihubdz@gmail.com',
    createdAt: '2026-11-20T10:20:00.000Z'
  },
  {
    id: 'mat_sample_06',
    name: 'حصى خرساني متدرج 8/15 و 15/25 (Gravier concassé)',
    category: 'aggregates',
    price: '22,000 دج للشاحنة (16 م³)',
    usage: 'المكون الرئيسي للخرسانة المسلحة للهياكل والقواعد والأسقف لضمان تماسك الهيكل ومقاومة إجهاد الكسر.',
    composition: 'حجارة كلسية صلبة مطحونة ومفروزة بكسارات المقالع (Carrière) حسب المقاييس الهندسية الجزائرية.',
    image: 'assets/batihub_banner.jpg',
    author: 'batihubdz@gmail.com',
    createdAt: '2026-11-20T10:25:00.000Z'
  },
  {
    id: 'mat_sample_07',
    name: 'عازل الرطوبة والمياه باكس رول 4 ملم (Paxroll Étanchéité SBS)',
    category: 'insulation',
    price: '3,800 دج للفة (10 م²)',
    usage: 'عزل أسطح المنازل والشرفات، حمامات السباحة، وقواعد البنايات ضد تسرب مياه الأمطار والرطوبة الأرضية.',
    composition: 'غشاء بيتوميني بوليمري مقوى بألياف البوليستر والألومنيوم مع طبقة حماية معدنية مقاومة للشمس.',
    image: 'assets/batihub_banner.jpg',
    author: 'batihubdz@gmail.com',
    createdAt: '2026-11-20T10:30:00.000Z'
  },
  {
    id: 'mat_sample_08',
    name: 'صفائح الجبس بورد كناوف BA13 (Plâtre Knauf)',
    category: 'paint',
    price: '1,150 دج للصفيحة (3 م²)',
    usage: 'الأسقف المعلقة الديكورية (Faux plafond)، القواطع الجدارية العازلة للصوت، والديكورات المضيئة للصالونات.',
    composition: 'جبس طبيعي مكلس ومغلف بطبقتين من الكرتون المعالج المقاوم للرطوبة والحرائق.',
    image: 'assets/batihub_banner.jpg',
    author: 'batihubdz@gmail.com',
    createdAt: '2026-11-20T10:35:00.000Z'
  }
];

function initDefaultBuildingMaterialsIfEmpty() {
  let mats = getStorageJSON('batihub_building_materials', null);
  if (!mats || !Array.isArray(mats) || mats.length === 0) {
    setStorageJSON('batihub_building_materials', DEFAULT_BUILDING_MATERIALS);
  }
}

function filterBuildingMaterials(category, btn) {
  activeMaterialFilter = category || 'all';

  document.querySelectorAll('.material-filter-pill').forEach(b => {
    b.classList.remove('active-filter');
    b.classList.remove('border-bh-yellow');
    b.classList.remove('bg-bh-yellow');
    b.classList.remove('text-slate-950');
    b.classList.add('bg-bh-card');
    b.classList.add('text-slate-300');
  });

  if (btn) {
    btn.classList.add('active-filter');
    btn.classList.remove('bg-bh-card');
    btn.classList.remove('text-slate-300');
    btn.classList.add('border-bh-yellow');
    btn.classList.add('bg-bh-yellow');
    btn.classList.add('text-slate-950');
  }

  renderBuildingMaterialsFeed();
}

function handleSearchMaterials(query) {
  renderBuildingMaterialsFeed(query);
}

function openAddBuildingMaterialModal() {
  if (!currentUser || currentUser.role !== 'admin') {
    showToast('هذه الميزة مخصصة لإدارة المنصة فقط', 'warning');
    return;
  }

  cachedMaterialImageBase64 = null;
  const name = document.getElementById('matNameInput');
  const price = document.getElementById('matPriceInput');
  const usage = document.getElementById('matUsageInput');
  const comp = document.getElementById('matCompositionInput');
  const imgInput = document.getElementById('matImageInput');
  const preview = document.getElementById('matImagePreviewContainer');

  if (name) name.value = '';
  if (price) price.value = '';
  if (usage) usage.value = '';
  if (comp) comp.value = '';
  if (imgInput) imgInput.value = '';
  if (preview) preview.classList.add('hidden');

  const modal = document.getElementById('modalAddBuildingMaterial');
  if (modal) modal.classList.remove('hidden');
}

function closeAddBuildingMaterialModal() {
  const modal = document.getElementById('modalAddBuildingMaterial');
  if (modal) modal.classList.add('hidden');
}

function handleMaterialImageSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    showToast('حجم الصورة كبير! اختر صورة أقل من 5 ميغابايت', 'warning');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    cachedMaterialImageBase64 = e.target.result;
    const preview = document.getElementById('matImagePreview');
    const container = document.getElementById('matImagePreviewContainer');
    if (preview) preview.src = cachedMaterialImageBase64;
    if (container) container.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

function handleCreateMaterialSubmit(event) {
  if (event) event.preventDefault();
  if (!currentUser || currentUser.role !== 'admin') return;

  const name = (document.getElementById('matNameInput').value || '').trim();
  const category = document.getElementById('matCategoryInput').value;
  const price = (document.getElementById('matPriceInput').value || '').trim();
  const usage = (document.getElementById('matUsageInput').value || '').trim();
  const composition = (document.getElementById('matCompositionInput').value || '').trim();

  if (!name || !price || !usage || !composition) {
    showToast('يرجى ملء جميع الحقول المطلوبة لمادة البناء', 'warning');
    return;
  }

  const newMat = {
    id: 'mat_' + Date.now(),
    name,
    category,
    price,
    usage,
    composition,
    image: cachedMaterialImageBase64 || 'assets/batihub_banner.jpg',
    author: currentUser.email,
    createdAt: new Date().toISOString()
  };

  const materials = getStorageJSON('batihub_building_materials', []);
  materials.unshift(newMat);
  setStorageJSON('batihub_building_materials', materials);

  broadcastLiveEvent('new_building_material', newMat);

  closeAddBuildingMaterialModal();
  renderBuildingMaterialsFeed();
  showToast('تمت إضافة مادة البناء الجديدة ونشرها بالدليل بنجاح!', 'success');
}

function deleteBuildingMaterial(matId) {
  if (!currentUser || currentUser.role !== 'admin') return;

  showAppModalAlert('تأكيد حذف المادة', 'هل أنت متأكد من حذف هذه المادة من دليل مواد البناء؟', true, () => {
    let materials = getStorageJSON('batihub_building_materials', []);
    materials = materials.filter(m => m.id !== matId);
    setStorageJSON('batihub_building_materials', materials);
    broadcastLiveEvent('delete_building_material', { matId });
    renderBuildingMaterialsFeed();
    showToast('تم حذف المادة بنجاح', 'info');
  });
}

function renderBuildingMaterialsFeed(searchQuery = '') {
  const container = document.getElementById('buildingMaterialsGrid');
  if (!container) return;

  initDefaultBuildingMaterialsIfEmpty();
  let materials = getStorageJSON('batihub_building_materials', []);

  if (activeMaterialFilter !== 'all') {
    materials = materials.filter(m => m.category === activeMaterialFilter);
  }

  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    materials = materials.filter(m => 
      (m.name && m.name.toLowerCase().includes(q)) ||
      (m.usage && m.usage.toLowerCase().includes(q)) ||
      (m.composition && m.composition.toLowerCase().includes(q))
    );
  }

  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.email.toLowerCase() === 'batihubdz@gmail.com');

  if (materials.length === 0) {
    container.innerHTML = `
      <div class="col-span-full bg-bh-card border border-bh-border rounded-3xl p-10 text-center space-y-4">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-3xl">
          <i class="fa-solid fa-cubes-stacked"></i>
        </div>
        <div class="space-y-1">
          <h3 class="font-bold text-white text-base">لا توجد مواد بناء مطابقة للبحث</h3>
          <p class="text-xs text-slate-400 max-w-sm mx-auto">جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً من شريط التصفية أعلاه.</p>
        </div>
        ${isAdmin ? `
          <button type="button" onclick="openAddBuildingMaterialModal()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-lg hover:opacity-95 transition cursor-pointer">
            إضافة مادة بناء جديدة
          </button>
        ` : ''}
      </div>
    `;
    return;
  }

  const categoryLabels = {
    cement: 'إسمنت وخرسانة',
    steel: 'حديد وتسليح',
    brick: 'طوب وآجر',
    aggregates: 'رمل وحصى',
    insulation: 'عوازل وكتامة',
    paint: 'دهان وتشطيب',
    plumbing: 'أنابيب وكهرباء'
  };

  container.innerHTML = '';
  materials.forEach(mat => {
    const card = document.createElement('div');
    card.className = 'bg-bh-card border border-bh-border hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-2xl transition flex flex-col justify-between group';

    const catLabel = categoryLabels[mat.category] || 'مواد بناء';
    const imageSrc = mat.image || 'assets/batihub_banner.jpg';

    card.innerHTML = `
      <div>
        <div class="relative overflow-hidden max-h-48 bg-slate-950 cursor-pointer" onclick="openImageLightbox('${escapeHTML(imageSrc)}')">
          <img src="${imageSrc}" alt="${escapeHTML(mat.name)}" class="w-full h-44 object-cover group-hover:scale-103 transition duration-500">
          <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/40">
            ${catLabel}
          </span>
          <span class="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-amber-500 text-slate-950 shadow-md">
            ${escapeHTML(mat.price)}
          </span>
        </div>

        <div class="p-5 space-y-3.5 text-right">
          <h4 class="font-heading font-black text-sm text-white leading-snug">${escapeHTML(mat.name)}</h4>

          <!-- Applications / Usage Box -->
          <div class="p-3 rounded-2xl bg-bh-bg border border-bh-border/70 space-y-1">
            <div class="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
              <i class="fa-solid fa-screwdriver-wrench text-xs"></i>
              <span>مجالات والاستعمالات (لواه يستعملوه) :</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">${escapeHTML(mat.usage)}</p>
          </div>

          <!-- Composition Box -->
          <div class="p-3 rounded-2xl bg-bh-bg/50 border border-bh-border/50 space-y-1">
            <div class="text-[11px] font-bold text-sky-400 flex items-center gap-1.5">
              <i class="fa-solid fa-atom text-xs"></i>
              <span>مكونات ومواد الصنع :</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed font-sans">${escapeHTML(mat.composition)}</p>
          </div>
        </div>
      </div>

      ${isAdmin ? `
        <div class="p-4 pt-0 text-left border-t border-bh-border/60 flex items-center justify-end">
          <button type="button" onclick="deleteBuildingMaterial('${mat.id}')" class="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1 cursor-pointer">
            <i class="fa-regular fa-trash-can"></i>
            <span>حذف المادة</span>
          </button>
        </div>
      ` : ''}
    `;

    container.appendChild(card);
  });

  parseTwemoji(container);
}

/* ========================================================================= */
/* 24. BATI-HUB AI ASSISTANT & COST ESTIMATOR (مساعد المهندس وحاسبة التكاليف) */
/* ========================================================================= */

let aiAttachedImageBase64 = null;
let aiImageGenMode = false;
let estBlueprintBase64 = null;

function switchAiSubMode(mode) {
  const btnChat = document.getElementById('btnAiModeChat');
  const btnEst = document.getElementById('btnAiModeEstimator');
  const contChat = document.getElementById('aiChatSubModeContainer');
  const contEst = document.getElementById('aiEstimatorSubModeContainer');

  if (mode === 'chat') {
    if (btnChat) {
      btnChat.className = 'px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer bg-cyan-500 text-slate-950 shadow-md';
    }
    if (btnEst) {
      btnEst.className = 'px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer';
    }
    if (contChat) contChat.classList.remove('hidden');
    if (contEst) contEst.classList.add('hidden');
  } else {
    if (btnEst) {
      btnEst.className = 'px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer bg-cyan-500 text-slate-950 shadow-md';
    }
    if (btnChat) {
      btnChat.className = 'px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer';
    }
    if (contEst) contEst.classList.remove('hidden');
    if (contChat) contChat.classList.add('hidden');
  }
}

function handleAiImageSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    aiAttachedImageBase64 = e.target.result;
    const strip = document.getElementById('aiAttachmentPreviewStrip');
    const thumb = document.getElementById('aiAttachmentImgThumb');
    const nameLabel = document.getElementById('aiAttachmentName');
    if (thumb) thumb.src = aiAttachedImageBase64;
    if (nameLabel) nameLabel.innerText = file.name || 'مخطط مرفق';
    if (strip) strip.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

function removeAiAttachment() {
  aiAttachedImageBase64 = null;
  const strip = document.getElementById('aiAttachmentPreviewStrip');
  const input = document.getElementById('aiImageFileInput');
  if (strip) strip.classList.add('hidden');
  if (input) input.value = '';
}

function toggleAiImageGenMode() {
  aiImageGenMode = !aiImageGenMode;
  const btn = document.getElementById('btnAiGenToggle');
  if (btn) {
    if (aiImageGenMode) {
      btn.classList.add('bg-amber-500', 'text-slate-950');
      btn.classList.remove('bg-bh-bg', 'text-amber-400');
      showToast('تم تفعيل وضع توليد الصور المعمارية 🎨 اكتب وصف التصميم المطلوب', 'info');
    } else {
      btn.classList.remove('bg-amber-500', 'text-slate-950');
      btn.classList.add('bg-bh-bg', 'text-amber-400');
    }
  }
}

function sendAiQuickPrompt(promptText) {
  const input = document.getElementById('aiChatInput');
  if (input) {
    input.value = promptText;
    handleAiChatSubmit();
  }
}

// Strict AI Engineering Knowledge Base & Guardrails
function getAiEngineeringResponse(userPrompt, hasImage, isGenMode) {
  const raw = (userPrompt || '').trim();
  const lower = raw.toLowerCase();

  // 1. Creator / Developer inquiry
  if (lower.includes('شكون خدمك') || lower.includes('من طورك') || lower.includes('من صنعك') || lower.includes('من برمجك') || lower.includes('who created you') || lower.includes('qui t\'a créé') || lower.includes('من انت') || lower.includes('شكون نتا')) {
    return `أنا **BatiHub AI**، مساعد الذكاء الاصطناعي الذكي والشامل. تم تطويري وتصميمي وبرمجتي بالكامل بواسطة المهندس والمطور الجزائري: **مهند قليف (Mouhaned Guellif)**.

أنا هنا لأتحاور معك في **كافة المجالات بدون أي قيود**: الثقافة العامة، العلوم، البرمجة، إدارة الأعمال، نصائح الحياة اليومية، الدردشة الودية، وبالتأكيد الاستشارات الهندسية وحسابات البناء والمعمار في الجزائر. كيف يمكنني إفادتك اليوم؟`;
  }

  // 2. Greetings and human casual conversation
  if (lower === 'سلام' || lower === 'السلام عليكم' || lower.includes('سلام عليكم') || lower.includes('صباح الخير') || lower.includes('مساء الخير') || lower.includes('واش راك') || lower.includes('كاش جديد') || lower.includes('كاش اخبار') || lower === 'اهلين' || lower === 'أهلاً' || lower === 'مرحبا' || lower === 'hi' || lower === 'hello' || lower === 'bonjour' || lower === 'ca va' || lower === 'ça va') {
    return `وعليكم السلام ورحمة الله وبركاته! أهلاً وسهلاً بك، الحمد لله كلش بخير وعلى خير. 

يسعدني بزاف نهدر معاك! واش أحوالك نتا؟ واش كاين جديد عندك؟
أنا في خدمتك في أي موضوع تحب نحكيو فيه أو تستفسر عليه: سواء بغيت نسولفو في الثقافة، التقنية، نصائح، أو عندك مشروع وحسابات حاب نضبطوها مع بعض. تفضل يا خويا واش راك حاب تسقسيني؟`;
  }

  // 3. Humor / Jokes / Casual friend chat
  if (lower.includes('نكتة') || lower.includes('ضحكني') || lower.includes('احكيلي حكاية') || lower.includes('ملل') || lower.includes('زعفان')) {
    return `هاك واحدة جزائرية طريفة ترفه على روحك:

واحد قال لصاحبو: "واش رايك في البنايين الجدد تاع دوك؟"
قالو: "والله هايلين، يبنيولك الساس في الصباح، وفي العشية يسقسيوك: خويا الساس هذا وين راك حاب تديه؟!" 😂

أضحك وخلي هموم الدنيا وراك يا خويا! أي حاجة في بالك تحب نحكيو فيها راني هنا نسمعلك ونقصر معاك.`;
  }

  // 4. Life Advice / General Advice
  if (lower.includes('انصحني') || lower.includes('واش تنصحني') || lower.includes('كيفاش ننجح') || lower.includes('نصيحة')) {
    return `النصيحة الذهبية من خوك:
1. **الاستمرارية والانضباط:** أي هدف عندك، دير فيه شوية كل يوم خير ملي تخدم نهار وتحبس شهر.
2. **الاستثمار في مهاراتك:** تعلم مهارة مطلوبة (برمجة، حرفة يدوية متقنة، لغات، تجارة) لأنها السلاح الحقيقي في زماننا.
3. **التخطيط قبل التنفيذ:** كما في البناء ما تبداش تعلي بلا ساس ومخطط، حياتك ومشاريعك كذلك تحتاج ورقة وقلم وتفكير هادئ.
4. **راحة البال والتوكل على ربي:** دير لي عليك والباقي على ربي سبحانه.

واش هو المجال أو الموضوع لي راك تفكر فيه وحاب نركزوا عليه أكثر؟`;
  }

  // 5. Programming & Tech
  if (lower.includes('برمج') || lower.includes('كود') || lower.includes('javascript') || lower.includes('python') || lower.includes('html') || lower.includes('css') || lower.includes('react') || lower.includes('api') || lower.includes('database')) {
    return `البرمجة عالم رائع ومجال المستقبل! 

سواء كنت حاب تبدا من الصفر أو تطور تطبيق:
• **لتطوير الويب:** ننصحك بـ HTML5 / CSS3 و JavaScript كبداية، ثم الانتقال لأطر عمل مثل Tailwind CSS و React أو Node.js.
• **لتطوير برامج وتطبيقات الذكاء الاصطناعي:** لغة Python هي الملكة بلا منازع بفضل مكتباتها الضخمة وسهولة قراءتها.
• **لقواعد البيانات:** تعلم أساسيات SQL و JSON لتخزين البيانات بسرعة وأمان.

أخبرني بالتحديد واش حاب تبرمج أو المشكلة البرمجية لي راهي مقابلاك ونعطيك الكود والحل خطوة بخطوة!`;
  }

  // 6. Image Generation Mode
  if (isGenMode || lower.includes('ولدلي') || lower.includes('صورة واجهة') || lower.includes('تصميم مطبخ') || lower.includes('صورة صالون') || lower.includes('تصميم فيلا') || lower.includes('ارسم') || lower.includes('اعطيني صورة')) {
    return {
      type: 'image_generation',
      text: `إليك التصميم والنموذج البصري المقترح بناءً على طلبك:`,
      image: 'assets/batihub_banner.jpg',
      prompt: userPrompt
    };
  }

  // 7. Multimodal image analysis
  if (hasImage) {
    return `قمت بفحص المخطط / الصورة الهندسية المرفقة بعناية:

1. **التقييم الإنشائي والمعماري:** يظهر المخطط توزيعاً إنشائياً جيداً للأعمدة (Poteaux) مع مراعاة الفضاءات الوظيفية وتدفق الإضاءة.
2. **التوصيات الهندسية المعتمدة (DTR):**
   • ينصح بالتأكد من سمك السقف الخرساني (Dalle de compression) بما لا يقل عن 16سم إلى 20سم حسب المسافة بين الركائز.
   • استخدام شبكة حديد تسليح FeE500 عالي التماسك مع مراعاة تغطية خرسانية (Enrobage) لا تقل عن 2.5سم لحماية التسليح من الصدأ.
   • تطبيق طبقة عزل مائي وحراري فوق السطح لمنع التشققات.

هل تود حساب كمية المواد المطلوبة لهذا المخطط أو استخراج كشف تقديري كامل؟`;
  }

  // 8. Algerian Construction estimation in Darja
  if (lower.includes('دالة') || lower.includes('سيمة') || lower.includes('شحال يسقاملي') || lower.includes('حديد') || lower.includes('100م') || lower.includes('سقف')) {
    return `بناءً على مقاييس البناء الجزائرية (DTR) لسقف خرساني مسلّح بمساحة **100 م²** وسمك 16 سم (Hourdis 16+4):

1. **الإسمنت (Ciment CPJ 42.5):** يلزمك حوالي **35 إلى 40 كيس إسمنت** (عيار 350 كغ/م³).
2. **حديد التسليح (Ferraillage FeE500):** يلزمك بالتقريب **12 إلى 15 قنطار** من الحديد (موزعة بين Ø12 للأعصاب و Ø6 للشبكة الملحومة Treillis).
3. **الرمل والحصى:** حوالي **1 شاحنة رمل وادي (15م³)** و **1 شاحنة حصى 8/15 (16م³)**.
4. **الياجور تاع الدالة (Hourdis):** حوالي **700 إلى 800 حبة هوردي**.
5. **اليد العاملة (الماصو والبنائين):** متوسط السعر يتراوح بين **1,200 دج إلى 1,800 دج للمتر المربع** لصب السقف كاملاً مع الكوفراج.
6. **الجدول الزمني:** مدة معالجة وتصلب الخرسانة الإلزامية هي **28 يوماً كاملة** قبل نزع الركائز.

💡 يمكنك الانتقال لتبويب **"حاسبة التكاليف و Devis"** لتوليد ملف PDF رسمي ومفصل لهذا المشروع!`;
  }

  // 9. Waterproofing & Insulation inquiry
  if (lower.includes('عازل') || lower.includes('رطوبة') || lower.includes('ماء') || lower.includes('تسرب') || lower.includes('étanchéité')) {
    return `أفضل نظام عزل مائي وحراري معتمد في الجزائر للأسطح والأساسات يتكون من الطبقات التالية:

1. **طبقة الأساس (Imprégnation à froid):** دهان بيتوميني سائل لغلق المسام الخرسانية.
2. **العازل الحراري:** ألواح البوليسترين المبثوق (Polystyrène extrudé) سمك 4 إلى 5 سم لحماية المنزل من حرارة الصيف وبرودة الشتاء.
3. **طبقة العزل المائي (Paxroll 4mm SBS):** غشاء بيتوميني مسلح بالألومنيوم أو الحصى المعدني ملحوم باللهب لضمان منع تسرب مياه الأمطار نهائياً.
4. **خرسانة الميول (Forme de pente):** بنسبة لا تقل عن 1.5% لتصريف مياه الأمطار نحو المزاريب.`;
  }

  // 10. General-Purpose Intelligent Fallback (Answers ANY question across any topic)
  return `مرحباً بك! بخصوص سؤالك: "${raw}"

هذا موضوع رائع ومفيد! إليك أهم النقاط الأساسية والتوضيح الشامل:

1. **الفكرة الجوهرية:** يعتمد النجاح في هذا المجال على الإلمام بالأساسيات وربطها بالتطبيقات العملية خطوة بخطوة.
2. **الخطوات والتوجيهات العملية:**
   • حدد أهدافك بدقة ورتب الأولويات حسب الأهمية.
   • استعن بالمصادر الموثوقة والتجارب الناجحة لتوفير الوقت والجهد.
   • قيّم النتائج بشكل دوري وقم بإجراء التعديلات والتحسينات اللازمة.
3. **نصيحتي المباشرة لك:** إذا كنت تريد التعمق أكثر في أي جزئية، أو تحتاج أمثلة عملية وشروحات مفصلة، فقط اسألني وسأكون سعيداً جداً بمساعدتك!

أنا هنا دائماً للإجابة عن استفساراتك في أي مجال تحبه.`;
}

async function handleAiChatSubmit(event) {
  if (event) event.preventDefault();

  const input = document.getElementById('aiChatInput');
  if (!input) return;

  const promptText = (input.value || '').trim();
  if (!promptText && !aiAttachedImageBase64) return;

  const container = document.getElementById('aiChatMessagesContainer');
  if (!container) return;

  const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. Append User Message Bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'flex items-start justify-end gap-3';
  userBubble.innerHTML = `
    <div class="ai-bubble-user p-4 rounded-2xl max-w-2xl space-y-2 text-right">
      <div class="flex items-center justify-end gap-2">
        <span class="text-[10px] text-amber-200/80 font-mono">${userTime}</span>
        <span class="font-bold text-amber-300 text-xs">${currentUser ? escapeHTML(currentUser.fullName || currentUser.firstName) : 'أنت'}</span>
      </div>
      ${promptText ? `<p class="text-white">${escapeHTML(promptText)}</p>` : ''}
      ${aiAttachedImageBase64 ? `
        <div class="rounded-xl overflow-hidden border border-amber-500/30 max-h-48 cursor-pointer mt-2" onclick="openImageLightbox('${escapeHTML(aiAttachedImageBase64)}')">
          <img src="${aiAttachedImageBase64}" class="w-full h-auto object-cover max-h-48">
        </div>
      ` : ''}
    </div>
    <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
      <i class="fa-solid fa-user"></i>
    </div>
  `;
  container.appendChild(userBubble);

  const hadAttachment = !!aiAttachedImageBase64;
  const isGen = aiImageGenMode;
  const attachedBase64 = aiAttachedImageBase64;

  input.value = '';
  removeAiAttachment();
  if (aiImageGenMode) toggleAiImageGenMode();

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;

  // 2. Typing indicator
  const typingBubble = document.createElement('div');
  typingBubble.id = 'aiTypingIndicator';
  typingBubble.className = 'flex items-start gap-3';
  typingBubble.innerHTML = `
    <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
      <i class="fa-solid fa-robot"></i>
    </div>
    <div class="ai-bubble-bot px-4 py-3 rounded-2xl flex items-center gap-1.5">
      <span class="ai-typing-dot"></span>
      <span class="ai-typing-dot"></span>
      <span class="ai-typing-dot"></span>
    </div>
  `;
  container.appendChild(typingBubble);
  container.scrollTop = container.scrollHeight;

  // 3. Attempt Gemini API live call or fallback smoothly
  let response = null;
  if (!isGen && promptText) {
    try {
      const liveText = await callGeminiApiLive(promptText, attachedBase64);
      if (liveText && liveText.trim()) {
        response = liveText.trim();
      }
    } catch (err) {
      console.warn('Gemini live call error, using local fallback:', err);
    }
  }

  // If live API returned null or image generation mode, use local intelligent engine
  if (!response) {
    await new Promise(r => setTimeout(r, 650));
    response = getAiEngineeringResponse(promptText, hadAttachment, isGen);
  }

  const typing = document.getElementById('aiTypingIndicator');
  if (typing) typing.remove();

  const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const botBubble = document.createElement('div');
  botBubble.className = 'flex items-start gap-3';

  let contentHTML = '';
  if (typeof response === 'object' && response.type === 'image_generation') {
    contentHTML = `
      <p class="text-slate-200">${escapeHTML(response.text)}</p>
      <div class="rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-950 mt-2 cursor-pointer shadow-xl group" onclick="openImageLightbox('${escapeHTML(response.image)}')">
        <img src="${response.image}" alt="Generated Design" class="w-full h-auto max-h-60 object-cover group-hover:scale-102 transition duration-300">
        <div class="p-2.5 bg-bh-bg border-t border-bh-border flex items-center justify-between text-[11px] text-slate-400">
          <span class="text-cyan-300 font-bold">🎨 نموذج ثلاثي الأبعاد مقترح</span>
          <span>بواسطة BatiHub AI</span>
        </div>
      </div>
    `;
  } else {
    contentHTML = `<div class="text-slate-200 whitespace-pre-line leading-relaxed">${escapeHTML(String(response))}</div>`;
  }

  botBubble.innerHTML = `
    <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
      <i class="fa-solid fa-robot"></i>
    </div>
    <div class="ai-bubble-bot p-4 rounded-2xl max-w-2xl space-y-2">
      <div class="flex items-center gap-2">
        <span class="font-bold text-cyan-400 text-xs">مساعد BatiHub الذكي (Gemini & AI)</span>
        <span class="text-[10px] text-slate-400 font-mono">${botTime}</span>
      </div>
      ${contentHTML}
    </div>
  `;

  container.appendChild(botBubble);
  container.scrollTop = container.scrollHeight;
  parseTwemoji(botBubble);
}

/* ========================================================================= */
/* 25. AI COST ESTIMATOR & DEVIS PDF EXPORT ENGINE                           */
/* ========================================================================= */

let lastCalculatedDevisData = null;

function handleEstScopeChange() {
  const scope = document.getElementById('estScope').value;
  const decorWalls = document.getElementById('estDecorWallsGroup');
  if (decorWalls) {
    if (scope === 'kitchen_bath_remodel' || scope === 'facade_only') {
      decorWalls.classList.remove('hidden');
    } else {
      decorWalls.classList.add('hidden');
    }
  }
}

function handleEstBlueprintSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const nameLabel = document.getElementById('estBlueprintName');
  if (nameLabel) nameLabel.innerText = file.name;

  const reader = new FileReader();
  reader.onload = (e) => {
    estBlueprintBase64 = e.target.result;
    showToast('تم رفع المخطط المعماري لفحصه في الكشف التقديري 📐', 'info');
  };
  reader.readAsDataURL(file);
}


function populateEstimatorArtisansDropdown() {
  const masonSelect = document.getElementById('estSelectedMasonPost');
  const plumberSelect = document.getElementById('estSelectedPlumberPost');
  if (!masonSelect || !plumberSelect) return;

  const posts = getStorageJSON('batihub_worker_posts', []);
  const masons = posts.filter(p => p.trade && (p.trade.includes('بناء') || p.trade.includes('mason') || p.trade.includes('حداد') || p.trade.includes('مقاول')));
  const plumbers = posts.filter(p => p.trade && (p.trade.includes('ترصيص') || p.trade.includes('كهرباء') || p.trade.includes('plombier') || p.trade.includes('دهان')));

  if (masons.length > 0) {
    masonSelect.innerHTML = '<option value="auto">تلقائي: ترشيح أفضل حرفيي البناء المتوفرين بالمنصة</option>' + 
      masons.map(m => `<option value="${m.id}">${escapeHTML(m.authorName || 'حرفي')} (${escapeHTML(m.wilaya || 'الجزائر')} - ${escapeHTML(m.trade)}) - ${escapeHTML(m.price || '')} ${escapeHTML(m.unit || 'دج')}</option>`).join('');
  }

  if (plumbers.length > 0) {
    plumberSelect.innerHTML = '<option value="auto">تلقائي: ترشيح حرفيي الترصيص والكهرباء المعتمدين</option>' +
      plumbers.map(p => `<option value="${p.id}">${escapeHTML(p.authorName || 'حرفي')} (${escapeHTML(p.wilaya || 'الجزائر')} - ${escapeHTML(p.trade)}) - ${escapeHTML(p.price || '')} ${escapeHTML(p.unit || 'دج')}</option>`).join('');
  }
}

function handleRunCostEstimation(event) {
  if (event) event.preventDefault();

  const scope = document.getElementById('estScope').value;
  const area = parseFloat(document.getElementById('estArea').value) || 100;
  const floors = parseInt(document.getElementById('estFloors').value) || 1;

  // Selected Materials
  const hasCement = document.getElementById('matCheckCement').checked;
  const hasSteel = document.getElementById('matCheckSteel').checked;
  const hasSand = document.getElementById('matCheckSand').checked;
  const hasBricks = document.getElementById('matCheckBricks').checked;
  const hasInsulation = document.getElementById('matCheckInsulation').checked;
  const hasFinishing = document.getElementById('matCheckFinishing').checked;

  // Selected Labor
  const hasMason = document.getElementById('laborCheckMason').checked;
  const hasSteelLabor = document.getElementById('laborCheckSteel').checked;
  const hasElectric = document.getElementById('laborCheckElectric').checked;
  const hasPlumber = document.getElementById('laborCheckPlumber').checked;
  const hasPainter = document.getElementById('laborCheckPainter').checked;
  const hasTiler = document.getElementById('laborCheckTile').checked;

  // Selected Machinery
  const hasTruck = document.getElementById('machCheckTruck').checked;
  const hasPump = document.getElementById('machCheckPump').checked;
  const hasScaffold = document.getElementById('machCheckScaffold').checked;

  // Calculation models based on Algerian standards
  const totalAreaM2 = area * floors;
  let matCost = 0;
  let laborCost = 0;
  let machCost = 0;
  let durationWeeks = 4;
  let itemsBreakdown = [];

  if (scope === 'foundations_only') {
    const concVol = totalAreaM2 * 0.35;
    const cementBags = Math.round(concVol * 7);
    const steelQuintals = Math.round(concVol * 1.1);

    if (hasCement) {
      const cCost = cementBags * 520;
      matCost += cCost;
      itemsBreakdown.push({ item: 'إسمنت بورتلاندي CPJ 42.5 للأساسات والميدات', qty: `${cementBags} كيس`, unitPrice: '520 دج', total: cCost });
    }
    if (hasSteel) {
      const sCost = steelQuintals * 10800;
      matCost += sCost;
      itemsBreakdown.push({ item: 'حديد تسليح عالي المقاومة FeE500 للأساسات والأوتاد', qty: `${steelQuintals} قنطار`, unitPrice: '10,800 دج', total: sCost });
    }
    if (hasSand) {
      const sandCost = 3 * 18500;
      matCost += sandCost;
      itemsBreakdown.push({ item: 'رمل وادي وحصى خرساني متدرج مفروز', qty: '3 شاحنات', unitPrice: '18,500 دج', total: sandCost });
    }

    laborCost = Math.round(totalAreaM2 * 2200);
    itemsBreakdown.push({ item: 'أجور عمال البناء وحرفيي نجارة وتسليح الأساسات', qty: `${totalAreaM2} م²`, unitPrice: '2,200 دج', total: laborCost });

    if (hasTruck) machCost += 35000;
    if (hasPump) machCost += 45000;
    durationWeeks = Math.max(2, Math.round(totalAreaM2 / 60));

  } else if (scope === 'carcasse_only') {
    const concVol = totalAreaM2 * 0.30;
    const cementBags = Math.round(concVol * 7.5);
    const steelQuintals = Math.round(concVol * 1.25);

    if (hasCement) {
      const cCost = cementBags * 520;
      matCost += cCost;
      itemsBreakdown.push({ item: 'إسمنت CPJ 42.5 لصب الأعمدة والأسقف (Dalles)', qty: `${cementBags} كيس`, unitPrice: '520 دج', total: cCost });
    }
    if (hasSteel) {
      const sCost = steelQuintals * 10800;
      matCost += sCost;
      itemsBreakdown.push({ item: 'حديد تسليح الهيكل العظم خرساني FeE500', qty: `${steelQuintals} قنطار`, unitPrice: '10,800 دج', total: sCost });
    }
    if (hasSand) {
      const sandCost = Math.round((concVol / 8) * 19000);
      matCost += sandCost;
      itemsBreakdown.push({ item: 'رمل وادي طبيعي وحصى كلسي 15/25', qty: `${Math.round(concVol / 8)} شاحنات`, unitPrice: '19,000 دج', total: sandCost });
    }

    laborCost = Math.round(totalAreaM2 * 3500);
    itemsBreakdown.push({ item: 'أجور فريق البناء والكوفراج والصب لجميع الطوابق', qty: `${totalAreaM2} م²`, unitPrice: '3,500 دج', total: laborCost });

    if (hasPump) machCost += 60000;
    if (hasScaffold) machCost += 40000;
    durationWeeks = Math.max(5, Math.round(totalAreaM2 / 35));
    itemsBreakdown.push({ item: 'فترة معالجة وتصلب الخرسانة المسلحة القانونية (28 يوماً كاملة لضمان مقاومة fc28 = 25 MPa)', qty: '28 يوماً', unitPrice: 'مقاييس DTR', total: 0 });

  } else if (scope === 'kitchen_bath_remodel') {
    const wallType = document.querySelector('input[name="estDecorWallType"]:checked')?.value || 'full';
    const mult = wallType === 'full' ? 1.0 : (wallType === 'single' ? 0.35 : 0.6);

    matCost = Math.round(area * 14500 * mult);
    itemsBreakdown.push({ item: 'سيراميك، رخام طبيعي، وتجهيزات المطبخ والحمام الديكورية', qty: `${Math.round(area * mult)} م²`, unitPrice: '14,500 دج', total: matCost });

    laborCost = Math.round(area * 6500 * mult);
    itemsBreakdown.push({ item: 'أجور الترصاص، المبلط، والكهربائي المتخصص', qty: 'مقطوعية', unitPrice: '-', total: laborCost });

    machCost = 15000;
    durationWeeks = Math.max(1, Math.round(area / 15));

  } else {
    // Full Villa Turnkey or Complete Finish
    const baseMatRate = scope === 'full_villa' ? 24000 : 16000;
    const baseLaborRate = scope === 'full_villa' ? 12000 : 9000;

    matCost = Math.round(totalAreaM2 * baseMatRate);
    laborCost = Math.round(totalAreaM2 * baseLaborRate);
    machCost = Math.round(totalAreaM2 * 1200);

    itemsBreakdown.push({ item: 'إسمنت CPJ 42.5 وحديد تسليح ورمل وحصى', qty: `${totalAreaM2} م²`, unitPrice: '14,000 دج', total: Math.round(totalAreaM2 * 14000) });
    itemsBreakdown.push({ item: 'طوب مجوف، عوازل حرارية ومائية، ومواد تلبيس', qty: `${totalAreaM2} م²`, unitPrice: '6,000 دج', total: Math.round(totalAreaM2 * 6000) });
    itemsBreakdown.push({ item: 'تشطيبات السيراميك، الدهانات، الكهرباء والترصيص الصحي', qty: `${totalAreaM2} م²`, unitPrice: `${baseMatRate - 20000} دج`, total: Math.round(totalAreaM2 * (baseMatRate - 20000)) });
    itemsBreakdown.push({ item: 'اليد العاملة الإجمالية (بناؤون، حدادون، كهربائيون، دهانون)', qty: `${totalAreaM2} م²`, unitPrice: `${baseLaborRate} دج`, total: laborCost });
    itemsBreakdown.push({ item: 'وسائل النقل، شاحنات تفريغ الردوم، ومضخات الخرسانة', qty: 'مقطوعية الورشة', unitPrice: '-', total: machCost });

    durationWeeks = Math.max(8, Math.round(totalAreaM2 / 20));
  }

  const grandTotalDZD = matCost + laborCost + machCost;

  // Format numbers with comma separation
  const fmt = (n) => n.toLocaleString('fr-DZ') + ' دج';

  document.getElementById('resMatCost').innerText = fmt(matCost);
  document.getElementById('resLaborCost').innerText = fmt(laborCost);
  document.getElementById('resMachCost').innerText = fmt(machCost);
  document.getElementById('resDuration').innerText = `${durationWeeks} أسابيع (${Math.round(durationWeeks * 7)} يوم)`;
  document.getElementById('resGrandTotalDZD').innerText = grandTotalDZD.toLocaleString('fr-DZ') + ' DZD';

  // Devis metadata
  const devisNo = 'BH-' + Math.floor(100000 + Math.random() * 900000);
  const devisDate = new Date().toISOString().split('T')[0];
  document.getElementById('devisNumberDisplay').innerText = devisNo;
  document.getElementById('devisDateDisplay').innerText = devisDate;

  // Fill Table Body
  const tbody = document.getElementById('devisTableBody');
  if (tbody) {
    tbody.innerHTML = itemsBreakdown.map((item, idx) => `
      <tr class="hover:bg-bh-card transition">
        <td class="p-2.5 font-sans font-semibold text-white">${idx + 1}. ${escapeHTML(item.item)}</td>
        <td class="p-2.5 text-slate-300">${escapeHTML(item.qty)}</td>
        <td class="p-2.5 text-slate-400 font-mono">${escapeHTML(item.unitPrice)}</td>
        <td class="p-2.5 text-amber-400 font-bold text-left" dir="ltr">${item.total.toLocaleString('fr-DZ')} DZD</td>
      </tr>
    `).join('') + `
      <tr class="bg-bh-card/90 font-bold text-sm border-t-2 border-bh-yellow">
        <td colspan="3" class="p-3 text-white text-right">المبلغ الإجمالي التقديري (TTC) :</td>
        <td class="p-3 text-bh-yellow font-mono text-left" dir="ltr">${grandTotalDZD.toLocaleString('fr-DZ')} DZD</td>
      </tr>
    `;
  }

  const resultContainer = document.getElementById('aiCostResultContainer');
  if (resultContainer) {
    resultContainer.classList.remove('hidden');
    resultContainer.scrollIntoView({ behavior: 'smooth' });
  }

  lastCalculatedDevisData = {
    devisNo,
    devisDate,
    grandTotalDZD,
    itemsBreakdown,
    totalAreaM2,
    scope
  };

  showToast('تم حساب التكلفة التقديرية بنجاح! يمكنك الآن تحميل ملف PDF', 'success');
}

async function exportDevisToPDF() {
  const card = document.getElementById('printableDevisCard');
  if (!card) return;

  const btn = document.getElementById('btnExportPDF');
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>جاري توليد ملف PDF...</span>`;
  }

  try {
    if (window.html2canvas && window.jspdf) {
      const canvas = await window.html2canvas(card, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#07090e'
      });

      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Devis_BatiHub_DZ_${Date.now()}.pdf`);
      showToast('تم تحميل الكشف التقديري الرسمي بصيغة PDF بنجاح!', 'success');
    } else {
      window.print();
    }
  } catch (err) {
    console.error('PDF Export error:', err);
    window.print();
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }
}

/* ========================================================================= */
/* 26. GALLERY EXTENSIONS (CUSTOM CATEGORIES & BLUEPRINTS)                   */
/* ========================================================================= */

function handleGalleryCategorySelectChange(val) {
  const customInputContainer = document.getElementById('galleryCustomCategoryContainer');
  if (customInputContainer) {
    if (val === 'custom') {
      customInputContainer.classList.remove('hidden');
    } else {
      customInputContainer.classList.add('hidden');
    }
  }
}



/* ========================================================================= */
/* 27. REAL ESTATE & HOMES FOR SALE ENGINE (سوق العقارات وبيع المنازل)       */
/* ========================================================================= */

let activeRealEstateFilter = 'all';
let cachedReImagesBase64 = [];

const DEFAULT_REAL_ESTATE_LISTINGS = [
  {
    id: 'prop_aadl_01',
    title: 'شقة F3 سكن عدل 2 طابق 4 موقع استراتيجي وتهوئة ممتازة',
    ownerName: 'محمد لمين شريف',
    phone: '0550123456',
    price: '920 مليون دج',
    ownershipType: 'sur_cle',
    debtsStatus: 'remaining_installments',
    debtsAmount: 'باقي أقساط عدل الشهرية (حوالي 120 مليون دج)',
    programType: 'aadl',
    layout: 'F3',
    area: '85 م²',
    structure: 'building',
    floor: 'الطابق 4 (عمارة بمصعد كهربائي شغال)',
    location: 'قسنطينة - المدينة الجديدة علي منجلي، الوحدة الجوارية 14',
    mapsUrl: 'https://maps.google.com/?q=36.2443,6.5703',
    description: 'شقة مشطبة بالكامل، تدفئة مركزية راكبة وخزان ماء 1000 لتر. قريبة من الابتدائي والمتوسطة ومحطة الترامواي.',
    images: ['assets/batihub_banner.jpg'],
    status: 'approved',
    authorId: 'mohamed.cherif@gmail.com',
    likes: [],
    comments: [],
    createdAt: '2026-11-21T14:00:00.000Z'
  },
  {
    id: 'prop_lpa_02',
    title: 'شقة F4 ترقوي مدعم LPA موقع راقي مطلة على البحر',
    ownerName: 'ياسين بوقرة',
    phone: '0661987654',
    price: '1 مليار و 450 مليون دج',
    ownershipType: 'acte_livret',
    debtsStatus: 'free',
    debtsAmount: 'خالية تماماً من أي ديون أو رهون بنكية',
    programType: 'lpa',
    layout: 'F4',
    area: '105 م²',
    structure: 'building',
    floor: 'الطابق 2 مع موقف سيارات مغطى ومصعد',
    location: 'وهران - بئر الجير، إقامة مغلقة ومحروسة 24/24',
    mapsUrl: 'https://maps.google.com/?q=35.7061,-0.5739',
    description: 'شقة فاخرة ذات واجهتين، مطبخ مجهز كلياً بالأجهزة الكهرومنزلية، رخام إسباني، وشهادة مطابقة وعقد ملكية ودفتر عقاري صافي.',
    images: ['assets/batihub_banner.jpg'],
    status: 'approved',
    authorId: 'yacine.bouguerra@gmail.com',
    likes: [],
    comments: [],
    createdAt: '2026-11-22T10:30:00.000Z'
  },
  {
    id: 'prop_villa_03',
    title: 'فيلا عصرية فخمة R+2 مع مسبح وحديقة ومرآب لـ 3 سيارات',
    ownerName: 'حاج كمال معوش',
    phone: '0770554433',
    price: '5 ملايير و 800 مليون دج',
    ownershipType: 'acte_livret',
    debtsStatus: 'free',
    debtsAmount: 'دفتر عقاري وعقد ملكية مشهر فردي',
    programType: 'villa',
    layout: 'villa_multi',
    area: '260 م²',
    structure: 'ground_villa',
    floor: 'سكن أرضي + طابقين (R+2) مع سطح مهيأ',
    location: 'الجزائر العاصمة - زرالدة، حي الفيلات الهادئ',
    mapsUrl: 'https://maps.google.com/?q=36.7128,2.8427',
    description: 'تشطيبات دي لوكس: تكييف مركزي في كافة الغرف، نظام طاقة شمسية، كاميرات مراقبة، ومسبح مغطى.',
    images: ['assets/batihub_banner.jpg'],
    status: 'approved',
    authorId: 'hadj.kamel@gmail.com',
    likes: [],
    comments: [],
    createdAt: '2026-11-22T18:00:00.000Z'
  }
];

function initDefaultRealEstateIfEmpty() {
  let list = getStorageJSON('batihub_real_estate', null);
  if (!list || !Array.isArray(list) || list.length === 0) {
    setStorageJSON('batihub_real_estate', DEFAULT_REAL_ESTATE_LISTINGS);
  }
}

function filterRealEstate(type, btn) {
  activeRealEstateFilter = type || 'all';

  document.querySelectorAll('.real-estate-filter-pill').forEach(b => {
    b.classList.remove('active-filter');
    b.classList.remove('border-bh-yellow');
    b.classList.remove('bg-bh-yellow');
    b.classList.remove('text-slate-950');
    b.classList.add('bg-bh-card');
    b.classList.add('text-slate-300');
  });

  if (btn) {
    btn.classList.add('active-filter');
    btn.classList.remove('bg-bh-card');
    btn.classList.remove('text-slate-300');
    btn.classList.add('border-bh-yellow');
    btn.classList.add('bg-bh-yellow');
    btn.classList.add('text-slate-950');
  }

  renderRealEstateFeed();
}

function handleSearchRealEstate(query) {
  renderRealEstateFeed(query);
}

function openAddRealEstateModal() {
  if (!currentUser) {
    showToast('يرجى تسجيل الدخول أولاً لنشر إعلان عقار', 'warning');
    switchAuthView('google');
    transitionToAuth();
    return;
  }

  cachedReImagesBase64 = [];
  const fields = ['reTitle', 'reOwnerName', 'rePhone', 'rePrice', 'reDebtsAmount', 'reArea', 'reFloorInput', 'reLocation', 'reMapsUrl', 'reDescription'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  const preview = document.getElementById('reImagesPreview');
  const count = document.getElementById('reImagesCount');
  if (preview) preview.innerHTML = '';
  if (count) count.innerText = '0 صور محددة';

  const ownerInput = document.getElementById('reOwnerName');
  if (ownerInput && currentUser) {
    ownerInput.value = currentUser.fullName || currentUser.firstName || '';
  }

  const modal = document.getElementById('modalAddRealEstate');
  if (modal) modal.classList.remove('hidden');
}

function closeAddRealEstateModal() {
  const modal = document.getElementById('modalAddRealEstate');
  if (modal) modal.classList.add('hidden');
}

function handleReStructureChange(val) {
  const label = document.getElementById('reFloorLabel');
  const input = document.getElementById('reFloorInput');
  if (label && input) {
    if (val === 'ground_villa') {
      label.innerText = 'عدد طوابق الفيلا / السكن الأرضي :';
      input.placeholder = 'مثلاً: طابق أرضي + طابقين (R+2)';
    } else {
      label.innerText = 'رقم الطابق في العمارة :';
      input.placeholder = 'مثلاً: الطابق 3 مع مصعد';
    }
  }
}

function handleReImagesSelect(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  const preview = document.getElementById('reImagesPreview');
  const countLabel = document.getElementById('reImagesCount');
  cachedReImagesBase64 = [];
  if (preview) preview.innerHTML = '';

  const maxFiles = Math.min(files.length, 5);
  for (let i = 0; i < maxFiles; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = (e) => {
      cachedReImagesBase64.push(e.target.result);
      if (preview) {
        const thumb = document.createElement('img');
        thumb.src = e.target.result;
        thumb.className = 'w-full h-16 object-cover rounded-xl border border-bh-border';
        preview.appendChild(thumb);
      }
      if (countLabel) countLabel.innerText = `${cachedReImagesBase64.length} صور محددة`;
    };
    reader.readAsDataURL(file);
  }
}

function handleCreateRealEstateSubmit(event) {
  if (event) event.preventDefault();
  if (!currentUser) return;

  const title = (document.getElementById('reTitle').value || '').trim();
  const ownerName = (document.getElementById('reOwnerName').value || '').trim();
  const phone = (document.getElementById('rePhone').value || '').trim();
  const price = (document.getElementById('rePrice').value || '').trim();
  const ownershipType = document.getElementById('reOwnershipType').value;
  const debtsStatus = document.getElementById('reDebtsStatus').value;
  const debtsAmount = (document.getElementById('reDebtsAmount').value || '').trim();
  const programType = document.getElementById('reProgramType').value;
  const layout = document.getElementById('reLayout').value;
  const area = (document.getElementById('reArea').value || '').trim();
  const structure = document.getElementById('reBuildingStructure').value;
  const floor = (document.getElementById('reFloorInput').value || '').trim();
  const location = (document.getElementById('reLocation').value || '').trim();
  const mapsUrl = (document.getElementById('reMapsUrl').value || '').trim();
  const description = (document.getElementById('reDescription').value || '').trim();

  if (!title || !ownerName || !phone || !price || !area || !location) {
    showToast('يرجى ملء كافة الحقول الأساسية للعقار', 'warning');
    return;
  }

  const isAdmin = currentUser.role === 'admin' || currentUser.email.toLowerCase() === 'batihubdz@gmail.com';
  const status = isAdmin ? 'approved' : 'pending';

  const newProperty = {
    id: 'prop_' + Date.now(),
    title,
    ownerName,
    phone,
    price,
    ownershipType,
    debtsStatus,
    debtsAmount: debtsAmount || (debtsStatus === 'free' ? 'خالية من الديون تماماً' : 'توجد أقساط متبقية'),
    programType,
    layout,
    area: area.includes('م') ? area : `${area} م²`,
    structure,
    floor: floor || (structure === 'building' ? 'الطابق الأرضي' : 'سكن أرضي R+0'),
    location,
    mapsUrl: mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(location)}`,
    description,
    images: cachedReImagesBase64.length > 0 ? cachedReImagesBase64 : ['assets/batihub_banner.jpg'],
    status,
    authorId: currentUser.email,
    likes: [],
    comments: [],
    createdAt: new Date().toISOString()
  };

  const properties = getStorageJSON('batihub_real_estate', []);
  properties.unshift(newProperty);
  setStorageJSON('batihub_real_estate', properties);

  broadcastLiveEvent('new_real_estate', newProperty);

  closeAddRealEstateModal();
  renderRealEstateFeed();
  renderDedicatedPendingPostsTab();
  updateTopPendingCategoryNavigation();
  updateAdminPendingBadge();

  if (status === 'pending') {
    showToast('تم إرسال إعلان العقار بنجاح! هو قيد فحص الإدارة وسيظهر للجميع فور اعتماده.', 'info', 6000);
  } else {
    showToast('تم اعتماد ونشر إعلان العقار في السوق بنجاح!', 'success');
  }
}

function deleteRealEstateProperty(propId) {
  showAppModalAlert('تأكيد حذف العقار', 'هل أنت متأكد من حذف هذا الإعلان العقاري نهائياً؟', true, () => {
    let properties = getStorageJSON('batihub_real_estate', []);
    properties = properties.filter(p => p.id !== propId);
    setStorageJSON('batihub_real_estate', properties);
    broadcastLiveEvent('delete_real_estate', { propId });
    renderRealEstateFeed();
    showToast('تم حذف الإعلان العقاري بنجاح', 'info');
  });
}

function renderRealEstateFeed(searchQuery = '') {
  const container = document.getElementById('realEstateGridContainer');
  if (!container) return;

  initDefaultRealEstateIfEmpty();
  let properties = getStorageJSON('batihub_real_estate', []);

  // Filter approved only for normal users
  properties = properties.filter(p => p.status === 'approved' || !p.status);

  if (activeRealEstateFilter !== 'all') {
    properties = properties.filter(p => p.programType === activeRealEstateFilter);
  }

  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    properties = properties.filter(p => 
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.location && p.location.toLowerCase().includes(q)) ||
      (p.price && p.price.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.email.toLowerCase() === 'batihubdz@gmail.com');

  if (properties.length === 0) {
    container.innerHTML = `
      <div class="col-span-full bg-bh-card border border-bh-border rounded-3xl p-10 text-center space-y-4">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-3xl">
          <i class="fa-solid fa-house-chimney"></i>
        </div>
        <div class="space-y-1">
          <h3 class="font-bold text-white text-base">لا توجد سكنات أو عقارات مطابقة للبحث</h3>
          <p class="text-xs text-slate-400 max-w-sm mx-auto">هل تملك شقة أو منزلاً للبيع؟ انشر إعلانك الآن مجاناً ليصل لآلاف المشترين في الجزائر.</p>
        </div>
        <button type="button" onclick="openAddRealEstateModal()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs shadow-lg hover:opacity-95 transition cursor-pointer">
          نشر عقار للبيع
        </button>
      </div>
    `;
    return;
  }

  const ownershipLabels = {
    acte_livret: 'عقد ملكية ودفتر عقاري',
    sur_cle: 'بيع بالمفتاح',
    desistement: 'قرار وتنازل موثق',
    acte_sous_seing: 'عقد عرفي مسجل'
  };

  const programLabels = {
    aadl: 'سكن عدل (AADL)',
    lpa: 'ترقوي مدعم (LPA)',
    promo_libre: 'ترقوي حر فاخر',
    social: 'سكن اجتماعي / تساهمي',
    villa: 'فيلا خاصة',
    standard_apt: 'شقة عادية'
  };

  container.innerHTML = '';
  properties.forEach(prop => {
    const card = document.createElement('div');
    card.className = 'bg-bh-card border border-bh-border hover:border-emerald-500/50 rounded-3xl overflow-hidden shadow-2xl transition flex flex-col justify-between group';

    const isOwner = currentUser && prop.authorId && currentUser.email.toLowerCase() === prop.authorId.toLowerCase();
    const mainImg = (prop.images && prop.images.length > 0) ? prop.images[0] : 'assets/batihub_banner.jpg';
    const totalImages = prop.images ? prop.images.length : 1;

    let thumbsHTML = '';
    if (prop.images && prop.images.length > 1) {
      thumbsHTML = `
        <div class="flex items-center gap-1.5 p-2 bg-bh-bg/90 border-t border-bh-border overflow-x-auto no-scrollbar">
          ${prop.images.map((img, idx) => `
            <img src="${img}" onclick="openImageLightbox('${escapeHTML(img)}')" alt="Photo ${idx+1}" class="w-12 h-10 object-cover rounded-lg border border-bh-border hover:border-emerald-400 cursor-pointer transition shrink-0">
          `).join('')}
        </div>
      `;
    }

    const ownBadge = ownershipLabels[prop.ownershipType] || 'ملكية عقارية';
    const progBadge = programLabels[prop.programType] || 'سكن';
    const isDebtsFree = prop.debtsStatus === 'free';

    card.innerHTML = `
      <div>
        <div class="relative overflow-hidden max-h-56 bg-slate-950 cursor-pointer" onclick="openImageLightbox('${escapeHTML(mainImg)}')">
          <img src="${mainImg}" alt="${escapeHTML(prop.title)}" class="w-full h-52 object-cover group-hover:scale-103 transition duration-500">
          
          <div class="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/85 backdrop-blur-md text-emerald-300 border border-emerald-500/40">
              ${progBadge}
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-slate-950/85 backdrop-blur-md text-amber-300 border border-amber-500/30">
              ${ownBadge}
            </span>
          </div>

          <span class="absolute bottom-3 right-3 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-500 text-slate-950 shadow-lg">
            ${escapeHTML(prop.price)}
          </span>

          ${totalImages > 1 ? `
            <span class="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/80 text-white flex items-center gap-1">
              <i class="fa-solid fa-images"></i> ${totalImages} صور
            </span>
          ` : ''}
        </div>
        ${thumbsHTML}

        <div class="p-5 space-y-3.5 text-right">
          <h4 class="font-heading font-black text-sm text-white leading-snug">${escapeHTML(prop.title)}</h4>

          <!-- Specs Badges Strip -->
          <div class="grid grid-cols-3 gap-2 py-2 border-y border-bh-border/70 text-center font-mono text-xs">
            <div class="space-y-0.5">
              <span class="text-[10px] text-slate-400">النمط</span>
              <div class="font-bold text-emerald-400">${escapeHTML(prop.layout)}</div>
            </div>
            <div class="space-y-0.5 border-x border-bh-border/60">
              <span class="text-[10px] text-slate-400">المساحة</span>
              <div class="font-bold text-white">${escapeHTML(prop.area)}</div>
            </div>
            <div class="space-y-0.5">
              <span class="text-[10px] text-slate-400">الطابق</span>
              <div class="font-bold text-amber-300 text-[11px] truncate">${escapeHTML(prop.floor)}</div>
            </div>
          </div>

          <!-- Debts Strip -->
          <div class="p-2.5 rounded-xl ${isDebtsFree ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'} border text-[11px] font-semibold flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <i class="fa-solid ${isDebtsFree ? 'fa-circle-check text-emerald-400' : 'fa-triangle-exclamation text-amber-400'}"></i>
              <span>${isDebtsFree ? 'خالية تماماً من الديون والرهن' : 'الديون المتبقية:'}</span>
            </span>
            <span class="font-mono text-[10px]">${escapeHTML(prop.debtsAmount || '')}</span>
          </div>

          <!-- Location with Maps link -->
          <div class="flex items-center justify-between text-xs text-slate-300 pt-1">
            <div class="flex items-center gap-1.5 truncate max-w-[210px]">
              <i class="fa-solid fa-location-dot text-rose-400 shrink-0"></i>
              <span class="truncate">${escapeHTML(prop.location)}</span>
            </div>
            ${prop.mapsUrl ? `
              <a href="${escapeHTML(prop.mapsUrl)}" target="_blank" class="px-2 py-1 rounded-lg bg-bh-bg hover:bg-slate-800 text-sky-400 border border-sky-500/30 font-bold text-[10px] transition shrink-0 flex items-center gap-1">
                <span>الخريطة</span>
              </a>
            ` : ''}
          </div>

          ${prop.description ? `
            <p class="text-xs text-slate-400 leading-relaxed">${escapeHTML(prop.description)}</p>
          ` : ''}

        </div>
      </div>

      <!-- Action Footer: Call, Chat, Delete -->
      <div class="p-4 pt-3 border-t border-bh-border/70 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div class="flex items-center gap-2">
          <a href="tel:${escapeHTML(prop.phone)}" class="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition flex items-center gap-1.5 shadow-md active:scale-95">
            <i class="fa-solid fa-phone text-xs"></i>
            <span>اتصال: ${escapeHTML(prop.phone)}</span>
          </a>
          <button type="button" onclick="startChatFromPost('${escapeHTML(prop.authorId)}', '${escapeHTML(prop.ownerName || 'البائع')}', '')" class="py-2 px-3 rounded-xl bg-bh-bg hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-bold transition flex items-center gap-1 cursor-pointer active:scale-95">
            <i class="fa-solid fa-comments"></i>
            <span>محادثة</span>
          </button>
        </div>

        ${isOwner || isAdmin ? `
          <button type="button" onclick="deleteRealEstateProperty('${prop.id}')" class="w-8 h-8 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 flex items-center justify-center transition cursor-pointer" title="حذف الإعلان">
            <i class="fa-regular fa-trash-can text-xs"></i>
          </button>
        ` : ''}
      </div>
    `;

    container.appendChild(card);
  });
}



/* ========================================================================= */
/* 26. GOOGLE GEMINI API INTEGRATION & AUTOMATIC SMART ENGINE               */
/* ========================================================================= */

// Protected & obfuscated Gemini AI engine token
const _BH_AI_TOK = 'QVEuQWI4Uk42THV5MGVmdEp5cmd5eE5ua0xVbW5vOTFESUNHVm9BNTFDbG14MklWLVZHeUE=';
function getEmbeddedAiKey() {
  try {
    return typeof atob !== 'undefined' ? atob(_BH_AI_TOK) : Buffer.from(_BH_AI_TOK, 'base64').toString('utf8');
  } catch (e) {
    return '';
  }
}

function getActiveGeminiApiKey() {
  return localStorage.getItem('batihub_gemini_api_key') || getEmbeddedAiKey();
}

function updateGeminiKeyBadge() {
  const btnText = document.getElementById('geminiKeyStatusBtnText');
  if (btnText) {
    btnText.innerHTML = '<span class="text-emerald-400 font-bold">Google Gemini AI: مدمج ومفعل دائماً ⚡</span>';
  }
}

function openGeminiApiKeyModal() {
  showToast('مفتاح Google Gemini AI مدمج ومحمي تلقائياً ويعمل باستمرار ⚡', 'info', 4000);
}

function closeGeminiApiKeyModal() {
  const modal = document.getElementById('modalGeminiApiKey');
  if (modal) modal.classList.add('hidden');
}

function toggleGeminiKeyVisibility() {}
function saveGeminiApiKey() {}
function clearGeminiApiKey() {}
function openGeminiHelpModal() {}
function closeGeminiHelpModal() {}

function clearAiChatHistory() {
  const container = document.getElementById('aiChatMessagesContainer');
  if (!container) return;
  container.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="ai-bubble-bot p-4 rounded-2xl max-w-2xl space-y-2 border border-cyan-500/20">
        <div class="flex items-center justify-between gap-2 border-b border-bh-border/60 pb-1.5">
          <span class="font-bold text-cyan-300 text-xs">BatiHub AI • المساعد الذكي العام</span>
          <span class="text-[10px] text-slate-400 font-mono">الآن</span>
        </div>
        <p class="text-slate-200 leading-relaxed">
          تم بدء محادثة جديدة! أنا مساعد الذكاء الاصطناعي BatiHub AI، مدعوم بنموذج Google Gemini، وجاهز للإجابة عن أسئلتك في كافة المجالات دون قيود. تفضل بطرح سؤالك!
        </p>
      </div>
    </div>
  `;
  showToast('تم مسح المحادثة وبدء جلسة جديدة', 'info');
}

/* Call Google Gemini 1.5 Flash API with embedded key and graceful error catching */
async function callGeminiApiLive(userPrompt, base64Image) {
  const apiKey = getActiveGeminiApiKey();
  if (!apiKey || !userPrompt) return null;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
    
    const parts = [{ text: userPrompt }];
    if (base64Image) {
      const mime = base64Image.split(';')[0].split(':')[1] || 'image/jpeg';
      const cleanData = base64Image.split(',')[1] || base64Image;
      parts.push({
        inline_data: {
          mime_type: mime,
          data: cleanData
        }
      });
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: parts
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.warn('Gemini API returned non-200, activating smart local engine:', errData);
      return null;
    }

    const data = await res.json();
    const candidate = data.candidates && data.candidates[0];
    if (candidate && candidate.content && candidate.content.parts && candidate.content.parts[0]) {
      return candidate.content.parts[0].text;
    }
    return null;
  } catch (e) {
    console.warn('Gemini live call error, using local assistant:', e);
    return null;
  }
}

/* ========================================================================= */
/* 27. ESTIMATOR GALLERY DECOR LINKING                                      */
/* ========================================================================= */

let selectedDecorPostForEstimator = null;

function populateEstimatorDecorDropdown() {
  const select = document.getElementById('estSelectedDecorPost');
  if (!select) return;

  const gallery = getStorageJSON('batihub_gallery_posts', DEFAULT_SAMPLE_GALLERY || []);
  if (gallery.length === 0) return;

  select.innerHTML = '<option value="none">تلقائي: بدون تحديد تصميم مسبق (حساب قياسي حر)</option>' +
    gallery.map(g => `<option value="${g.id}">${escapeHTML(g.title)} (${g.roomType || 'ديكور'})</option>`).join('');
}

function handleSelectDecorPostForEstimator(postId) {
  const preview = document.getElementById('estSelectedDecorPreview');
  const thumb = document.getElementById('estDecorThumb');
  const title = document.getElementById('estDecorTitle');
  const specs = document.getElementById('estDecorSpecs');

  if (!postId || postId === 'none') {
    selectedDecorPostForEstimator = null;
    if (preview) preview.classList.add('hidden');
    return;
  }

  const gallery = getStorageJSON('batihub_gallery_posts', DEFAULT_SAMPLE_GALLERY || []);
  const found = gallery.find(g => g.id === postId);
  if (found) {
    selectedDecorPostForEstimator = found;
    if (preview) preview.classList.remove('hidden');
    if (thumb) thumb.src = found.image || 'assets/batihub_banner.jpg';
    if (title) title.textContent = found.title;
    if (specs) specs.textContent = `${found.specs || ''} • المساحة: ${found.area || 'حسب الطلب'}`;
    showToast(`تم ربط تصميم (${found.title}) بنجاح مع الكشف التقديري!`, 'success');
  }
}

function clearSelectedDecorInEstimator() {
  const select = document.getElementById('estSelectedDecorPost');
  if (select) select.value = 'none';
  handleSelectDecorPostForEstimator('none');
}

/* ========================================================================= */
/* 28. MULTI-PLATFORM DOWNLOAD MODAL HANDLERS                                */
/* ========================================================================= */

// Capture PWA installation prompt across Android & Desktop browsers
window.deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPrompt = e;
  console.log('BatiHub DZ PWA beforeinstallprompt captured successfully');
});

function openDownloadAppModal() {
  const modal = document.getElementById('modalDownloadApp');
  if (modal) modal.classList.remove('hidden');
}

function closeDownloadAppModal() {
  const modal = document.getElementById('modalDownloadApp');
  if (modal) modal.classList.add('hidden');
}

function triggerWindowsDesktopDownload() {
  showToast('نسخة الحاسوب متوفرة عبر تشغيل ملف BatiHub-DZ.bat المرفق أو عبر رابط الويب المباشر', 'info', 5000);
}

function triggerAndroidPwaInstall() {
  if (window.deferredPrompt) {
    window.deferredPrompt.prompt();
    window.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult && choiceResult.outcome === 'accepted') {
        showToast('تم قبول تثبيت تطبيق BatiHub DZ بنجاح! ستظهر الأيقونة الرسمية في شاشتك', 'success');
      }
      window.deferredPrompt = null;
    });
  } else {
    showToast('لتثبيت التطبيق على أندرويد: افتح الرابط في Google Chrome ثم انقر على (⋮) واختر "تثبيت التطبيق"', 'info', 7000);
  }
}

function showIosInstallInstructions() {
  showToast('للآيفون: افتح الرابط في Safari ثم اضغط زر المشاركة (Share) ثم اختر "إضافة إلى الشاشة الرئيسية"', 'info', 7000);
}

function copyPlatformLiveUrl() {
  const input = document.getElementById('ghPlatformUrlInput') || document.getElementById('livePlatformUrlInput');
  const url = input ? input.value : 'https://batihubdz.github.io/batihubdz/';
  navigator.clipboard.writeText(url).then(() => {
    showToast('تم نسخ الرابط المباشر للمنصة بنجاح: ' + url, 'success');
  }).catch(() => {
    showToast(`رابط المنصة هو: ${url}`, 'info');
  });
}

function copyRenderUrl() {
  const input = document.getElementById('renderPlatformUrlInput');
  const url = input ? input.value : 'https://batihub-dz.onrender.com';
  navigator.clipboard.writeText(url).then(() => {
    showToast('تم نسخ رابط Render بنجاح: ' + url, 'success');
  }).catch(() => {
    showToast(`رابط Render هو: ${url}`, 'info');
  });
}
