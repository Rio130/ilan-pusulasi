'use client';

import { useMemo, useState } from 'react';

type Skill = { label: string; aliases: string[]; category: 'Teknik' | 'Araç' | 'Yetkinlik' };

const SKILLS: Skill[] = [
  { label: 'React', aliases: ['react', 'reactjs', 'react.js'], category: 'Teknik' },
  { label: 'TypeScript', aliases: ['typescript'], category: 'Teknik' },
  { label: 'JavaScript', aliases: ['javascript', 'ecmascript'], category: 'Teknik' },
  { label: 'Next.js', aliases: ['next.js', 'nextjs', 'next js'], category: 'Teknik' },
  { label: 'HTML', aliases: ['html', 'html5'], category: 'Teknik' },
  { label: 'CSS', aliases: ['css', 'css3', 'scss', 'sass'], category: 'Teknik' },
  { label: 'Node.js', aliases: ['node.js', 'nodejs', 'node js'], category: 'Teknik' },
  { label: 'REST API', aliases: ['rest api', 'restful', 'api entegrasyonu', 'api integration'], category: 'Teknik' },
  { label: 'SQL', aliases: ['sql', 'postgresql', 'mysql'], category: 'Teknik' },
  { label: 'Test', aliases: ['jest', 'vitest', 'testing library', 'unit test', 'test yazma'], category: 'Teknik' },
  { label: 'Git', aliases: ['git', 'github', 'gitlab'], category: 'Araç' },
  { label: 'Figma', aliases: ['figma'], category: 'Araç' },
  { label: 'Docker', aliases: ['docker', 'container'], category: 'Araç' },
  { label: 'AWS', aliases: ['aws', 'amazon web services'], category: 'Araç' },
  { label: 'Agile', aliases: ['agile', 'scrum', 'kanban'], category: 'Yetkinlik' },
  { label: 'İngilizce', aliases: ['ingilizce', 'english', 'b2', 'c1'], category: 'Yetkinlik' },
  { label: 'İletişim', aliases: ['iletişim', 'communication', 'takım çalışması'], category: 'Yetkinlik' },
  { label: 'Problem Çözme', aliases: ['problem çözme', 'problem solving', 'analitik düşünme'], category: 'Yetkinlik' },
];

const INITIAL_CV = `3 yıldır web arayüzleri geliştiriyorum. React, TypeScript ve JavaScript ile erişilebilir, mobil uyumlu ürünler hazırladım. HTML, CSS ve Git iş akışına hakimim. Figma tasarımlarını kodlayabiliyor, REST API entegrasyonları yapabiliyorum. İngilizce seviyem B2.`;

const INITIAL_JOB = `Frontend Developer arıyoruz. React ve TypeScript konusunda güçlü, Next.js ile üretim deneyimi bulunan, REST API entegrasyonu ve test yazma pratiğine sahip adaylarla tanışmak istiyoruz. Git tabanlı ekip çalışması ve iyi seviyede İngilizce bekliyoruz. Docker bilgisi artı puandır.`;

function normalize(value: string) {
  return value.toLocaleLowerCase('tr-TR').replace(/[\n\r]+/g, ' ');
}

function extractSkills(value: string) {
  const text = normalize(value);
  return SKILLS.filter((skill) => skill.aliases.some((alias) => text.includes(normalize(alias))));
}

function wordCount(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

export default function Home() {
  const [cvText, setCvText] = useState(INITIAL_CV);
  const [jobText, setJobText] = useState(INITIAL_JOB);
  const [analyzedCv, setAnalyzedCv] = useState(INITIAL_CV);
  const [analyzedJob, setAnalyzedJob] = useState(INITIAL_JOB);
  const [copied, setCopied] = useState(false);
  const analysis = useMemo(() => {
    const cvSkills = extractSkills(analyzedCv);
    const jobSkills = extractSkills(analyzedJob);
    const matched = jobSkills.filter((skill) => cvSkills.some((item) => item.label === skill.label));
    const missing = jobSkills.filter((skill) => !cvSkills.some((item) => item.label === skill.label));
    const score = jobSkills.length ? Math.round((matched.length / jobSkills.length) * 100) : 0;
    return { cvSkills, jobSkills, matched, missing, score };
  }, [analyzedCv, analyzedJob]);

  const verdict = analysis.score >= 80 ? 'Güçlü eşleşme' : analysis.score >= 55 ? 'İyi bir başlangıç' : 'Gelişim alanı var';

  function analyze() {
    setAnalyzedCv(cvText);
    setAnalyzedJob(jobText);
    setCopied(false);
  }

  async function copySummary() {
    const summary = `İlan Pusulası sonucu: %${analysis.score} eşleşme. Eşleşen yetkinlikler: ${analysis.matched.map((item) => item.label).join(', ') || 'Yok'}. Gelişim alanları: ${analysis.missing.map((item) => item.label).join(', ') || 'Yok'}.`;
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top"><span>İP</span><strong>İLAN<br />PUSULASI</strong></a>
        <nav aria-label="Sayfa bölümleri"><a href="#compare">Karşılaştır</a><a href="#result">Analiz</a><a href="#guide">Rehber</a></nav>
        <span className="privacy"><i /> VERİLER TARAYICINDA KALIR</span>
      </header>

      <section className="intro" id="top">
        <div className="intro-copy"><span className="eyebrow">CV / İLAN EŞLEŞTİRİCİ</span><h1>Bir ilana ne kadar<br /><em>hazırsın?</em></h1><p>CV’ndeki yetkinlikleri iş ilanının beklentileriyle karşılaştır. Güçlü yanlarını gör, eksiklerini planla ve başvurunu bilinçli hazırla.</p></div>
        <div className="intro-note"><span>01</span><p>İlan metnini ve CV özetini ekle. Analiz cihazında, anında gerçekleşsin.</p></div>
      </section>

      <section className="comparison" id="compare">
        <article className="text-panel cv-panel">
          <div className="panel-heading"><div><span>01 / PROFİL</span><h2>CV özeti</h2></div><i>{wordCount(cvText)} kelime</i></div>
          <textarea value={cvText} onChange={(event) => setCvText(event.target.value)} aria-label="CV özeti" placeholder="Deneyimlerini ve yetkinliklerini buraya yaz..." />
          <footer><span>İPUCU</span><p>Kullandığın teknolojileri açık isimleriyle yaz.</p></footer>
        </article>

        <div className="compare-action"><span>+</span><button onClick={analyze}>EŞLEŞMEYİ<br />HESAPLA <i>→</i></button></div>

        <article className="text-panel job-panel">
          <div className="panel-heading"><div><span>02 / HEDEF</span><h2>İş ilanı</h2></div><i>{wordCount(jobText)} kelime</i></div>
          <textarea value={jobText} onChange={(event) => setJobText(event.target.value)} aria-label="İş ilanı metni" placeholder="İş ilanı metnini buraya yapıştır..." />
          <footer><span>İPUCU</span><p>İlanın sorumluluk ve beklenti bölümlerini ekle.</p></footer>
        </article>
      </section>

      <section className="results" id="result">
        <div className="score-panel">
          <div className="score-heading"><span>03 / SONUÇ</span><i>GÜNCEL ANALİZ</i></div>
          <div className="score-ring" style={{ '--score': `${analysis.score * 3.6}deg` } as React.CSSProperties}>
            <div><strong>%{analysis.score}</strong><span>EŞLEŞME</span></div>
          </div>
          <h2>{verdict}</h2>
          <p>{analysis.score >= 70 ? 'Profilin ilanın temel beklentilerinin çoğunu karşılıyor.' : 'Doğru birkaç eklemeyle profilini ilana daha güçlü bağlayabilirsin.'}</p>
          <button onClick={copySummary}>{copied ? 'KOPYALANDI ✓' : 'SONUCU KOPYALA ↗'}</button>
        </div>

        <div className="skills-panel">
          <div className="result-heading"><div><span>YETKİNLİK HARİTASI</span><h2>Eşleşen beceriler</h2></div><b>{analysis.matched.length}/{analysis.jobSkills.length}</b></div>
          <div className="matched-grid">
            {analysis.matched.map((skill, index) => <article key={skill.label}><span>{(index + 1).toString().padStart(2, '0')}</span><div><strong>{skill.label}</strong><small>{skill.category}</small></div><i>✓</i></article>)}
            {analysis.matched.length === 0 && <p className="empty">Henüz eşleşen beceri bulunamadı.</p>}
          </div>
        </div>

        <aside className="gaps-panel">
          <div className="result-heading"><div><span>GELİŞİM ALANLARI</span><h2>Eksik görünenler</h2></div></div>
          <div className="gap-list">
            {analysis.missing.map((skill, index) => <article key={skill.label}><span>{(index + 1).toString().padStart(2, '0')}</span><div><strong>{skill.label}</strong><p>CV özetinde bu beceriye dair somut bir örnek ekle.</p></div></article>)}
            {analysis.missing.length === 0 && <div className="all-good"><span>✓</span><strong>Temel beklentilerin tamamı CV’de görünüyor.</strong></div>}
          </div>
        </aside>
      </section>

      <section className="guide" id="guide">
        <div><span>BAŞVURU NOTU</span><h2>Sonraki adımın</h2></div>
        <ol>
          <li><span>01</span><p><strong>Eksik beceriyi kanıtla.</strong> Öğrendiğin teknolojiyi küçük bir projeyle göster.</p></li>
          <li><span>02</span><p><strong>Sonuç dili kullan.</strong> “Yaptım” yerine oluşturduğun etkiyi ve çıktıyı yaz.</p></li>
          <li><span>03</span><p><strong>İlana özel düzenle.</strong> Her başvuruda ilk üç yetkinliği öne çıkar.</p></li>
        </ol>
      </section>
    </main>
  );
}
