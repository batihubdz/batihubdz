/**
 * BatiHub DZ - Web Application Server for Render (onrender.com) & Cloud Hosting
 * Node.js HTTP server with PWA support & real Gmail OTP email dispatch.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

let nodemailer = null;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  console.warn('Nodemailer not loaded:', e.message);
}

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Official Gmail SMTP Transporter for BatiHub DZ
let mailTransporter = null;
if (nodemailer) {
  mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'batihubdz@gmail.com',
      pass: 'nrvzvvhmkwbnvmcp'
    }
  });

  mailTransporter.verify((err) => {
    if (err) {
      console.warn('⚠️ Gmail SMTP Verify Notice:', err.message);
    } else {
      console.log('✅ BatiHub DZ Gmail SMTP Connected Successfully!');
    }
  });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.bat': 'application/x-msdos-program',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // CORS Headers for cross-origin requests (e.g. from GitHub Pages)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Normalize request URL
  let cleanUrl = req.url.split('?')[0];

  // =========================================================================
  // API ROUTE: /api/send-otp & /api/send-mail
  // =========================================================================
  if (req.method === 'POST' && (cleanUrl === '/api/send-otp' || cleanUrl === '/api/send-mail')) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      // Safeguard max payload size (1MB)
      if (body.length > 1e6) req.destroy();
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const toEmail = (payload.to || payload.email || '').trim();
        const otpCode = (payload.code || payload.otp || '').toString().trim();
        const subject = payload.subject || 'BatiHub DZ • رمز التحقق لتأكيد جهازك';
        const defaultText = `رمز التحقق الخاص بك في BatiHub DZ هو: ${otpCode}`;

        const defaultHtml = `
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

        const html = payload.html || defaultHtml;
        const text = payload.text || defaultText;

        if (!toEmail) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: 'البريد الإلكتروني مطلوب' }));
          return;
        }

        if (!mailTransporter) {
          throw new Error('محرك إرسال البريد الإلكتروني غير مهيأ');
        }

        const info = await mailTransporter.sendMail({
          from: '"Support Bati Hub DZ" <batihubdz@gmail.com>',
          to: toEmail,
          replyTo: 'batihubdz@gmail.com',
          subject: subject,
          text: text,
          html: html
        });

        console.log(`[SMTP SUCCESS] Mail delivered to ${toEmail}, MessageId: ${info.messageId}`);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, messageId: info.messageId }));
      } catch (err) {
        console.error('[SMTP ERROR] Failed to send email:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // =========================================================================
  // STATIC FILES & SPA FALLBACK
  // =========================================================================
  if (cleanUrl === '/' || cleanUrl === '') {
    cleanUrl = '/index.html';
  }

  // Prevent path traversal attacks
  const safePath = path.normalize(decodeURIComponent(cleanUrl)).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);

  // If path is a directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for Single Page Application routing
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (err2, content) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('BatiHub DZ - الملف غير موجود');
          return;
        }
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache'
        });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const headers = {
      'Content-Type': contentType
    };

    if (ext === '.html') {
      headers['Cache-Control'] = 'no-cache';
    } else if (ext === '.js' || ext === '.css') {
      headers['Cache-Control'] = 'public, max-age=3600';
    } else {
      headers['Cache-Control'] = 'public, max-age=86400';
    }

    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`🚀 BatiHub DZ Web Server is LIVE on port ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`📧 Gmail OTP API: http://localhost:${PORT}/api/send-otp`);
  console.log(`====================================================`);
});
