// Generates ElevenLabs voice-over clips for the launch video (ar + en).
// Key is read from a gitignored file and NEVER printed.
const fs = require('fs');
const path = require('path');

const KEY_FILE = 'D:/Work/1-Nodejs/CRM/Est8Core/New/.Pm/keys/elevenlabs-key.txt';
const OUT_BASE = 'D:/Work/1-Nodejs/CRM/Est8Core/New/est8core-frontend/platform-master/apps/marketing/public/launch-video/audio';
// Free-tier premade voice (verified working on this key). Same voice for both
// languages for a consistent narrator; multilingual_v2 handles ar + en.
const VOICE = { ar: 'EXAVITQu4vr4xnSDxMaL', en: 'EXAVITQu4vr4xnSDxMaL' };
const MODEL = 'eleven_multilingual_v2';

const KEY = fs.readFileSync(KEY_FILE, 'utf8').trim();

const VO = {
  ar: [
    'إست إيت كور. منصة الوساطة العقارية الذكية.',
    'في سوق العقارات، كل ثانية بتفرق. بس العملاء بيتبعتروا بين الواتساب، والإكسيل، والورق، وصفقات كتير بتضيع.',
    'تخيّل كل ده في مكان واحد.',
    'كل عميل بيتسجّل تلقائياً، ويتوزّع على الوكيل المناسب، وتتابع رحلته من أول استفسار لحد إغلاق الصفقة.',
    'والعمولات، والأقساط، والموافقات، كلها بتتحسب وتتوثّق تلقائياً، من غير أخطاء.',
    'فروع، وفِرق، ووكلاء. كل واحد يشوف نطاقه، والمدير يشوف الصورة كاملة.',
    'وكل أرقامك حيّة قدامك، لحظة بلحظة.',
    'متعدّد الفروع، عربي بالكامل، آمن، وسهل إن أي فريق يبدأ بيه.',
    'وادفع بأي طريقة تناسبك — بطاقة، أو محفظة، أو تحويل بنكي — وفاتورة ضريبية عربية رسمية بضغطة واحدة.',
    'ومن يوم ما أطلقنا، الثقة كبرت معانا. مئات الشركات والوكلاء بدأوا فعلاً. فكن معنا في رحلة التطور',
    'وده اللي بيقولوه اللي بيستخدموه كل يوم.',
    'وده مجرد البداية — دي المميزات اللي جايالك قريباً.',
    'إست إيت كور. متاح الآن. ابدأ مجانا وكن جزء من رحلتنا في عالم العقارات',
  ],
  en: [
    'Est8Core. The smart real-estate brokerage platform.',
    'In real estate, every second counts. But your clients are scattered across WhatsApp, spreadsheets, and paper — and deals slip away.',
    'Imagine all of it in one place.',
    'Every lead is captured automatically, assigned to the right agent, and tracked from first inquiry to closing.',
    'Commissions, instalments, and approvals are all calculated and documented automatically — with no errors.',
    'Branches, teams, and agents — each sees their own scope, while the manager sees the full picture.',
    'And all your numbers are live in front of you, moment by moment.',
    'Multi-branch, fully Arabic, secure, and easy for any team to get started.',
    'And get paid any way you like — card, wallet, or bank transfer — with an official Arabic tax invoice in one click.',
    'And since we launched, trust has grown with us. Hundreds of companies and agents have already started — so join us on the journey.',
    'And this is what the people using it every day have to say.',
    'And this is just the beginning — here is what is coming soon.',
    'Est8Core. Available now. Start free and become part of our journey in real estate.',
  ],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function gen(lang, i, text) {
  const url = 'https://api.elevenlabs.io/v1/text-to-speech/' + VOICE[lang] + '?output_format=mp3_44100_128';
  const body = JSON.stringify({
    text,
    model_id: MODEL,
    voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true },
  });
  let lastErr;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
        body,
      });
      if (res.status === 401 || res.status === 402) {
        throw new Error('HTTP ' + res.status + ' ' + (await res.text()).slice(0, 160) + ' (no-retry)');
      }
      if (!res.ok) throw new Error('HTTP ' + res.status + ' ' + (await res.text()).slice(0, 160));
      const buf = Buffer.from(await res.arrayBuffer());
      const dir = path.join(OUT_BASE, lang);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'vo-' + i + '.mp3'), buf);
      return buf.length;
    } catch (e) {
      lastErr = e;
      if (String(e.message).includes('no-retry')) throw e;
      await sleep(1500 * (attempt + 1));
    }
  }
  throw lastErr;
}

(async () => {
  for (const lang of ['ar', 'en']) {
    for (let i = 0; i < VO[lang].length; i++) {
      try {
        const bytes = await gen(lang, i, VO[lang][i]);
        console.log(lang + '[' + i + '] ok ' + (bytes / 1024).toFixed(0) + ' KB');
      } catch (e) {
        console.log(lang + '[' + i + '] FAILED: ' + e.message);
      }
      await sleep(500);
    }
  }
  console.log('DONE');
})();
