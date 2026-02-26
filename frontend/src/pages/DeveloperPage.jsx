import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, Terminal, Server, Palette, Gamepad2,
  RotateCcw, Layers, Database, Globe, Zap, ArrowUpRight, Sun, Moon,
  Sparkles, Code2, Star, Rocket, Send, Heart, ArrowRight } from 'lucide-react';

// ═══════════════════════════════════════════════════
//  DESIGN TOKENS — Dark-first, toggle to Light
// ═══════════════════════════════════════════════════
const T = {
  dark: {
    id: 'dark',
    bg: '#000000', bgCard: '#0a0a0a', bgCard2: '#0f0f0f',
    surface: 'rgba(255,255,255,0.03)', surfaceHover: 'rgba(255,255,255,0.07)',
    border: 'rgba(255,255,255,0.07)', borderHover: 'rgba(255,255,255,0.18)',
    text: '#ffffff', textSub: '#888', textMuted: '#444',
    ua: '#00ff88', uaDim: 'rgba(0,255,136,0.1)', uaGlow: 'rgba(0,255,136,0.25)',
    ka: '#ffb800', kaDim: 'rgba(255,184,0,0.1)', kaGlow: 'rgba(255,184,0,0.25)',
    accent3: '#ff3cac', termBg: '#050505', termHdr: '#111',
    heroGrad: 'linear-gradient(-45deg,#000000,#050510,#000a05,#050500)',
    gridLine: 'rgba(255,255,255,0.018)',
    termOut: '#c9d1d9',
    noise: true,
  },
  light: {
    id: 'light',
    bg: '#faf7f2', bgCard: '#ffffff', bgCard2: '#f5f0e8',
    surface: 'rgba(0,0,0,0.04)', surfaceHover: 'rgba(0,0,0,0.07)',
    border: 'rgba(0,0,0,0.08)', borderHover: 'rgba(0,0,0,0.22)',
    text: '#0a0505', textSub: '#5a5050', textMuted: '#999',
    ua: '#007a42', uaDim: 'rgba(0,122,66,0.08)', uaGlow: 'rgba(0,122,66,0.2)',
    ka: '#b87800', kaDim: 'rgba(184,120,0,0.08)', kaGlow: 'rgba(184,120,0,0.2)',
    accent3: '#c0186e', termBg: '#0a0a14', termHdr: '#14141e',
    heroGrad: 'linear-gradient(-45deg,#faf7f2,#f0f7ff,#fffff0,#fff5f0)',
    gridLine: 'rgba(0,0,0,0.04)',
    termOut: '#c9d1d9',
    noise: false,
  }
};

// ═══════════════════════════════════════════════════
//  MAGNETIC BUTTON HOOK
// ═══════════════════════════════════════════════════
const useMagnetic = (strength = 0.35) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = e => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
    };
    const onLeave = () => setPos({ x: 0, y: 0 });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [strength]);
  return [ref, pos];
};

// ═══════════════════════════════════════════════════
//  TILT CARD HOOK
// ═══════════════════════════════════════════════════
const useTilt = () => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      setTilt({ rx: (y - 0.5) * -14, ry: (x - 0.5) * 14, gx: x * 100, gy: y * 100 });
    };
    const leave = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, []);
  return [ref, tilt];
};

// ═══════════════════════════════════════════════════
//  TYPED TEXT
// ═══════════════════════════════════════════════════
const TypedText = ({ words, color }) => {
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const bl = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(bl);
  }, []);
  useEffect(() => {
    const w = words[wi];
    let t;
    if (!del && ci < w.length) { t = setTimeout(() => setCi(c => c + 1), 80); }
    else if (!del && ci === w.length) { t = setTimeout(() => setDel(true), 1800); }
    else if (del && ci > 0) { t = setTimeout(() => setCi(c => c - 1), 45); }
    else if (del && ci === 0) { setDel(false); setWi(i => (i + 1) % words.length); }
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);
  return (
    <span style={{ color }}>
      {words[wi].slice(0, ci)}
      <span style={{ opacity: blink ? 1 : 0, borderRight: `3px solid ${color}`, marginLeft: 2 }}>&nbsp;</span>
    </span>
  );
};

// ═══════════════════════════════════════════════════
//  ANIMATED COUNTER
// ═══════════════════════════════════════════════════
const Counter = ({ to, suffix = '' }) => {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0; const step = to / 50;
        const tm = setInterval(() => { s += step; if (s >= to) { setV(to); clearInterval(tm); } else setV(Math.floor(s)); }, 30);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
};

// ═══════════════════════════════════════════════════
//  PARTICLE CANVAS
// ═══════════════════════════════════════════════════
const ParticleCanvas = ({ theme: t }) => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.3, col: Math.random() > 0.5 ? t.ua : t.ka,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + '80'; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            const a = Math.floor((1 - d / 110) * 30).toString(16).padStart(2, '0');
            ctx.strokeStyle = t.ua + a; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [t]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }} />;
};

// ═══════════════════════════════════════════════════
//  INTERACTIVE TERMINAL
// ═══════════════════════════════════════════════════
const Terminal2 = ({ t }) => {
  const CMDS = {
    help: ['┌─────────── UJJWAL.DEV SHELL ───────────┐','│  whoami  name  skills  stack             │','│  projects  contact  ping  git log        │','│  ls  coffee  date  version  easter       │','│  clear  →  wipes terminal                │','└─────────────────────────────────────── ┘'],
    whoami: ['ujjwal_asati','> Backend Engineer @ Impact You Academy','> API Architect · Server-side Sorcerer'],
    name: ['Ujjwal Asati — Backend Engineer','> The one who makes servers do magic.'],
    skills: ['▸ Node.js & Express.js  ▸ MongoDB & Mongoose','▸ REST API Design       ▸ JWT Authentication','▸ Razorpay Payments     ▸ Nodemailer OTP','▸ Multer File Uploads   ▸ bcrypt Security','▸ RBAC Middleware       ▸ API Rate Limiting'],
    stack: ['  Runtime   → Node.js v20','  Framework → Express.js 4.x','  Database  → MongoDB Atlas (M10 cluster)','  ODM       → Mongoose 8.x','  Auth      → JWT + bcrypt + refresh tokens','  Payments  → Razorpay (orders + webhooks)','  Email     → Nodemailer + Gmail OAuth','  Storage   → Multer + Cloudinary','  Deploy    → Render / Railway / Vercel'],
    projects: ['► Impact You Academy — Production Backend','  ✓ Complete auth system (6 endpoints)','  ✓ Program & enrollment management','  ✓ Live Razorpay payment integration','  ✓ Admin dashboard API (protected)','  ✓ Email OTP verification system','  ✓ Role-based access control (2 roles)','  ✓ Contact form + inquiry storage'],
    contact: ['📧  ujjwalasati@gmail.com','🔗  linkedin.com/in/ujjwal-asati-20527828b','🐙  github.com/UjjwalAsati','📍  Available · Remote-first · Freelance OK'],
    education: ['B.Tech — Computer Science & Engineering','> Practical builder. Real-world > textbooks.','> 0 to production in record time.'],
    ping: ['PING ujjwal.dev (172.67.x.x)', '64 bytes: icmp_seq=0 ttl=55 time=0.31ms','64 bytes: icmp_seq=1 ttl=55 time=0.28ms','Server alive · uptime: 99.9% ✓'],
    'git log': ['d3adb33  feat: razorpay webhook verification','c0ffee1  fix: JWT refresh token race condition','b4dc0de  feat: admin inquiry management API','deadf00  feat: email OTP with expiry logic','c4f3b4b  refactor: middleware chain cleanup','0ff1ce0  chore: rate limiting on auth routes'],
    coffee: ['☕  Fuel level: DANGEROUSLY LOW','    Current cups today: 4','    Debugging efficiency: MAXIMUM','    "Do not interrupt when in flow state."'],
    ls: ['drwxr  api/          drwxr  config/','drwxr  controllers/  drwxr  middleware/','drwxr  models/       drwxr  routes/','drwxr  utils/        -rw-r  server.js','       .env  (🔒 Permission denied)'],
    easter: ['🥚  EASTER EGG FOUND — Achievement unlocked!','','    Ujjwal once pushed a hotfix to prod','    at 4:17AM. The bug? Missing semicolon.','    The lesson? Use TypeScript.','','    He still uses JavaScript. 🫡'],
    version: ['ujjwal-shell 3.0.0  |  build: 2024.stable','node    → v20.11.0  |  npm → 10.4.0','mongodb → 6.3.0     |  mongoose → 8.2.0','express → 4.18.2   |  bcrypt  → 5.1.1'],
    date: [new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'medium' }), '> Still shipping. Always.'],
    clear: ['__CLEAR__'],
  };
  const BOOT = [
    { s: '> Booting ujjwal.dev shell 3.0.0...', tp: 'dim', d: 0 },
    { s: '> AUTH modules loaded ✓', tp: 'success', d: 250 },
    { s: '> Database connection established ✓', tp: 'success', d: 500 },
    { s: '> All systems nominal ✓', tp: 'success', d: 750 },
    { s: '> Type `help` for commands · Tab=autocomplete · ↑↓=history', tp: 'info', d: 1000 },
  ];
  const CM = { cmd: t.ua, out: '#e2e8f0', success: '#6ee7b7', info: '#94a3b8', item: '#93c5fd', error: '#fca5a5', dim: '#374151', box: '#6ee7b7' };
  const [lines, setLines] = useState([]);
  const [inp, setInp] = useState('');
  const [hist, setHist] = useState([]);
  const [hi, setHi] = useState(-1);
  const [ready, setReady] = useState(false);
  const [blink, setBlink] = useState(true);
  const scrollRef = useRef(null);
  const inpRef = useRef(null);
  useEffect(() => {
    const bl = setInterval(() => setBlink(b => !b), 530);
    BOOT.forEach(({ s, tp, d }) => setTimeout(() => { setLines(l => [...l, { s, tp }]); if (d === 1000) setReady(true); }, d));
    return () => clearInterval(bl);
  }, []);
  
  // FIXED: Only scroll the terminal container, not the whole page!
  useEffect(() => { 
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const run = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHist(h => [raw, ...h]); setHi(-1);
    setLines(l => [...l, { s: `$ ${raw}`, tp: 'cmd' }]);
    if (cmd === 'clear') { setTimeout(() => setLines([{ s: '> Cleared. Type `help`.', tp: 'info' }]), 40); return; }
    const resp = CMDS[cmd] || [`  ❌  command not found: '${cmd}'`, '      try `help`'];
    setTimeout(() => setLines(l => [...l, ...resp.map(s => ({
      s, tp: s.startsWith('✓') || s.startsWith('🏓') || s.match(/✓$/) ? 'success'
        : s.startsWith('▸') || s.startsWith('►') || s.match(/^  ✓/) ? 'item'
        : s.startsWith('>') || s.match(/^\s{4}/) ? 'info'
        : s.startsWith('  ❌') ? 'error'
        : s.match(/^[│┌└]/) ? 'box'
        : 'out'
    }))]), 30);
  }, []);
  
  return (
    <div onClick={() => inpRef.current?.focus()} className="cursor-text rounded-2xl overflow-hidden"
      style={{ fontFamily: "'IBM Plex Mono',monospace", border: `1px solid ${t.ua}30`, background: t.termBg, boxShadow: `0 0 40px ${t.ua}08, inset 0 0 40px rgba(0,0,0,0.3)` }}>
      <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ background: t.termHdr, borderColor: 'rgba(255,255,255,0.04)' }}>
        <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} /><span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} /><span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} /></div>
        <span className="ml-3 text-xs tracking-widest uppercase" style={{ color: '#3a3a4a', fontFamily: 'inherit' }}>ujjwal@impact-you ~ bash</span>
      </div>
      
      {/* Scroll container ref added here */}
      <div ref={scrollRef} className="p-5 h-64 overflow-y-auto text-xs leading-6" style={{ scrollbarWidth: 'none' }}>
        {lines.map((l, i) => <div key={i} style={{ color: CM[l.tp] || '#e2e8f0', whiteSpace: 'pre-wrap' }}>{l.s}</div>)}
        {ready && (
          <div className="flex items-center mt-1">
            <span style={{ color: t.ua }}>$ </span>
            <span style={{ color: '#e2e8f0', marginLeft: 4 }}>{inp}</span>
            <span style={{ display: 'inline-block', width: 7, height: 14, background: t.ua, opacity: blink ? 1 : 0, marginLeft: 2, verticalAlign: 'middle' }} />
          </div>
        )}
      </div>
      
      {ready && (
        <div className="flex items-center gap-2 px-5 py-2 border-t" style={{ borderColor: `${t.ua}15`, background: t.termHdr }}>
          <span style={{ color: t.ua, fontFamily: 'inherit', fontSize: 12 }}>$</span>
          {/* FIXED: Removed autoFocus to prevent page jumping on load */}
          <input ref={inpRef} value={inp} onChange={e => setInp(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') { run(inp); setInp(''); }
              if (e.key === 'ArrowUp') { const n = Math.min(hi + 1, hist.length - 1); setHi(n); setInp(hist[n] || ''); }
              if (e.key === 'ArrowDown') { const n = Math.max(hi - 1, -1); setHi(n); setInp(n === -1 ? '' : hist[n]); }
              if (e.key === 'Tab') { e.preventDefault(); const k = Object.keys(CMDS).find(k => k.startsWith(inp.toLowerCase())); if (k) setInp(k); }
            }}
            placeholder="type a command..."
            className="flex-1 bg-transparent outline-none text-xs"
            style={{ color: '#e2e8f0', fontFamily: 'inherit' }} />
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  PIXEL CANVAS
// ═══════════════════════════════════════════════════
const PixelCanvas = ({ t }) => {
  const SZ = 12;
  const PALETTE = ['#ffb800','#ff3cac','#00ff88','#00d4ff','#7c3aed','#ef4444','#f97316','#ffffff','#111111'];
  const BG = '#111111';
  const [grid, setGrid] = useState(() => Array(SZ * SZ).fill(BG));
  const [col, setCol] = useState('#ffb800');
  const [drawing, setDrawing] = useState(false);
  const [mode, setMode] = useState('draw');
  const paint = useCallback(idx => {
    if (mode === 'fill') {
      const tgt = grid[idx]; if (tgt === col) return;
      const g = [...grid];
      const f = i => { if (i < 0 || i >= SZ * SZ || g[i] !== tgt) return; g[i] = col; const r = Math.floor(i / SZ), c = i % SZ; if (c > 0) f(i - 1); if (c < SZ - 1) f(i + 1); if (r > 0) f(i - SZ); if (r < SZ - 1) f(i + SZ); };
      f(idx); setGrid(g);
    } else setGrid(g => { const n = [...g]; n[idx] = col; return n; });
  }, [grid, col, mode]);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {[['draw', '✏️'], ['fill', '🪣']].map(([m, ic]) => (
            <button key={m} onClick={() => setMode(m)} className="px-3 py-1 text-xs font-bold rounded-lg transition-all"
              style={mode === m ? { background: t.ka, color: '#000' } : { background: t.surface, color: t.textSub, border: `1px solid ${t.border}` }}>{ic} {m}</button>
          ))}
        </div>
        <button onClick={() => setGrid(Array(SZ * SZ).fill(BG))} className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg"
          style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
          <RotateCcw size={9} /> Clear
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {PALETTE.map(c => (
          <button key={c} onClick={() => setCol(c)}
            style={{ backgroundColor: c, width: 22, height: 22, borderRadius: 5, border: col === c ? '2px solid white' : '2px solid transparent', transform: col === c ? 'scale(1.25)' : 'scale(1)', transition: 'all 0.15s', boxShadow: col === c ? `0 0 8px ${c}` : 'none' }} />
        ))}
      </div>
      <div className="grid select-none cursor-crosshair rounded-xl overflow-hidden mx-auto"
        style={{ gridTemplateColumns: `repeat(${SZ},1fr)`, border: `1px solid ${t.border}`, maxWidth: 280 }}
        onMouseLeave={() => setDrawing(false)}>
        {grid.map((c, i) => (
          <div key={i} style={{ backgroundColor: c, aspectRatio: '1', transition: 'background 0.04s' }}
            onMouseDown={() => { setDrawing(true); paint(i); }}
            onMouseEnter={() => { if (drawing && mode === 'draw') paint(i); }}
            onMouseUp={() => setDrawing(false)} />
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  CSS CHALLENGE GAME
// ═══════════════════════════════════════════════════
const CSSGame = ({ t }) => {
  const LV = [
    { label: 'Border Radius', unit: 'px', min: 0, max: 60, target: 50, init: 8, hint: 'Make it circular' },
    { label: 'Rotation', unit: '°', min: 0, max: 360, target: 45, init: 0, hint: 'Tilt to 45°' },
    { label: 'Scale', unit: '×', min: 0.5, max: 3, target: 2, init: 1, step: 0.1, hint: '2× bigger' },
    { label: 'Opacity', unit: '%', min: 0, max: 100, target: 60, init: 100, hint: 'Go 60% opacity' },
  ];
  const [vals, setVals] = useState(LV.map(l => l.init));
  const [solved, setSolved] = useState(LV.map(() => false));
  const all = solved.every(Boolean);
  const chk = (i, v) => setSolved(s => { const n = [...s]; n[i] = Math.abs(v - LV[i].target) <= (LV[i].step ? LV[i].step * 2 : 3); return n; });
  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center h-24 rounded-xl" style={{ background: t.surface }}>
        <div className="w-16 h-16 transition-all duration-100" style={{
          background: `linear-gradient(135deg,${t.ka},${t.ka}88)`,
          borderRadius: `${vals[0]}px`, transform: `rotate(${vals[1]}deg) scale(${vals[2]})`,
          opacity: vals[3] / 100, boxShadow: `0 0 24px ${t.kaGlow}`,
        }} />
      </div>
      {LV.map((l, i) => (
        <div key={i}>
          <div className="flex justify-between text-xs mb-1.5">
            <span style={{ color: solved[i] ? t.ua : t.text, fontWeight: 700 }}>{solved[i] ? '✓ ' : ''}{l.label} <span style={{ color: t.textSub, fontWeight: 400 }}>— {l.hint}</span></span>
            <span style={{ color: t.ka, fontFamily: "'IBM Plex Mono',monospace" }}>{vals[i]}{l.unit}</span>
          </div>
          <input type="range" min={l.min} max={l.max} step={l.step || 1} value={vals[i]}
            onChange={e => { const v = parseFloat(e.target.value); setVals(p => { const n = [...p]; n[i] = v; return n; }); chk(i, v); }}
            style={{ width: '100%', accentColor: t.ka, height: 4 }} />
        </div>
      ))}
      {all && (
        <div className="text-center py-2 rounded-xl text-sm font-bold" style={{ background: `${t.ua}18`, color: t.ua, border: `1px solid ${t.ua}40` }}>
          🎉 Perfect eye for design!
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  COMPONENT BUILDER
// ═══════════════════════════════════════════════════
const Builder = ({ t }) => {
  const P = [
    { n: 'Button', bg: t.ka, col: '#000', r: 8, px: 20, py: 10, fs: 14 },
    { n: 'Badge', bg: `${t.ka}25`, col: t.ka, r: 999, px: 12, py: 4, fs: 11 },
    { n: 'Card', bg: t.bgCard2, col: t.text, r: 16, px: 20, py: 14, fs: 13 },
    { n: 'Alert', bg: `${t.ua}18`, col: t.ua, r: 12, px: 16, py: 10, fs: 13 },
    { n: 'Tag', bg: t.surface, col: t.textSub, r: 6, px: 10, py: 5, fs: 11 },
  ];
  const [sel, setSel] = useState(0);
  const [r, setR] = useState(8); const [px, setPx] = useState(20);
  const [py, setPy] = useState(10); const [fs, setFs] = useState(14);
  const [lbl, setLbl] = useState('Button');
  useEffect(() => { const p = P[sel]; setR(p.r); setPx(p.px); setPy(p.py); setFs(p.fs); setLbl(p.n); }, [sel]);
  const p = P[sel];
  return (
    <div className="space-y-3">
      <div className="flex gap-1 flex-wrap">
        {P.map((pr, i) => (
          <button key={pr.n} onClick={() => setSel(i)} className="px-2.5 py-1 text-xs font-bold rounded-lg transition-all"
            style={sel === i ? { background: t.ka, color: '#000' } : { background: t.surface, color: t.textSub, border: `1px solid ${t.border}` }}>{pr.n}</button>
        ))}
      </div>
      <div className="flex items-center justify-center h-16 rounded-xl" style={{ background: t.surface, border: `1px solid ${t.border}` }}>
        <div style={{ background: p.bg, color: p.col, borderRadius: r, padding: `${py}px ${px}px`, fontSize: fs, fontWeight: 700, transition: 'all 0.15s', boxShadow: `0 2px 20px ${t.kaGlow}` }}>{lbl}</div>
      </div>
      <input value={lbl} onChange={e => setLbl(e.target.value)} placeholder="Edit label"
        className="w-full px-3 py-1.5 rounded-lg text-xs outline-none"
        style={{ background: t.surface, color: t.text, border: `1px solid ${t.border}`, fontFamily: "'IBM Plex Mono',monospace" }} />
      {[{ l: 'Radius', v: r, s: setR, mn: 0, mx: 50 }, { l: 'Pad X', v: px, s: setPx, mn: 2, mx: 48 }, { l: 'Pad Y', v: py, s: setPy, mn: 2, mx: 32 }, { l: 'Size', v: fs, s: setFs, mn: 8, mx: 24 }].map(sl => (
        <div key={sl.l}>
          <div className="flex justify-between text-xs mb-1" style={{ color: t.textSub }}>
            <span>{sl.l}</span><span style={{ color: t.ka, fontFamily: "'IBM Plex Mono',monospace" }}>{sl.v}px</span>
          </div>
          <input type="range" min={sl.mn} max={sl.mx} value={sl.v} onChange={e => sl.s(+e.target.value)}
            style={{ width: '100%', accentColor: t.ka, height: 4 }} />
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  MAIN PAGE
// ═══════════════════════════════════════════════════
export default function DevelopersPage() {
  const [theme, setTheme] = useState(T.light);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [kTab, setKTab] = useState('pixel');
  const [togRef, togPos] = useMagnetic(0.4);
  const [uCardRef, uTilt] = useTilt();
  const [kCardRef, kTilt] = useTilt();
  const t = theme;

  useEffect(() => {
    const mv = e => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', mv);
    return () => window.removeEventListener('mousemove', mv);
  }, []);

  const uSkills = [
    { n: 'Node.js', c: '#68a063' }, { n: 'Express', c: '#ccc' }, { n: 'MongoDB', c: '#47a248' },
    { n: 'Mongoose', c: '#880000' }, { n: 'REST API', c: '#0ea5e9' }, { n: 'JWT', c: '#8b5cf6' },
    { n: 'Razorpay', c: '#3395ff' }, { n: 'Nodemailer', c: '#e0612a' }, { n: 'bcrypt', c: '#f472b6' }, { n: 'Multer', c: '#fbbf24' },
  ];
  const kSkills = [
    { n: 'React', c: '#61dafb' }, { n: 'Tailwind', c: '#06b6d4' }, { n: 'Figma', c: '#f24e1e' },
    { n: 'Vite', c: '#646cff' }, { n: 'CSS Anim', c: '#e879f9' }, { n: 'UI/UX', c: t.ka },
    { n: 'Framer', c: '#0055ff' }, { n: 'ShadcnUI', c: '#94a3b8' }, { n: 'Lucide', c: '#84cc16' }, { n: 'A11y', c: '#fb923c' },
  ];
  const mq = [...uSkills, ...kSkills, ...uSkills, ...kSkills];

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    .page{font-family:'Outfit',sans-serif;cursor:none;}
    .disp{font-family:'Bebas Neue',sans-serif;letter-spacing:0.02em;}
    .mono{font-family:'IBM Plex Mono',monospace;}

    /* CUSTOM CURSOR */
    .cursor-dot{position:fixed;top:0;left:0;width:10px;height:10px;border-radius:50%;pointer-events:none;z-index:99999;transition:transform 0.1s;mix-blend-mode:difference;}
    .cursor-ring{position:fixed;top:0;left:0;width:36px;height:36px;border-radius:50%;pointer-events:none;z-index:99998;transition:all 0.18s cubic-bezier(0.23,1,0.32,1);mix-blend-mode:difference;}

    /* NOISE TEXTURE */
    .noise::after{content:'';position:absolute;inset:0;opacity:0.025;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");z-index:1;}

    /* SCROLLBAR */
    ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:transparent;} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px;}

    /* KEYFRAMES */
    @keyframes bgShift{0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    @keyframes slideLeft{from{opacity:0;transform:translateX(-40px);}to{opacity:1;transform:translateX(0);}}
    @keyframes slideRight{from{opacity:0;transform:translateX(40px);}to{opacity:1;transform:translateX(0);}}
    @keyframes glitch1{0%{clip-path:inset(20% 0 65% 0);transform:translate(-3px,0);}20%{clip-path:inset(75% 0 5% 0);transform:translate(3px,0);}40%{clip-path:inset(40% 0 45% 0);transform:translate(-3px,0);}60%{clip-path:inset(55% 0 30% 0);transform:translate(3px,0);}80%{clip-path:inset(10% 0 80% 0);transform:translate(-3px,0);}100%{clip-path:inset(50% 0 35% 0);transform:translate(3px,0);}}
    @keyframes glitch2{0%{clip-path:inset(60% 0 15% 0);transform:translate(3px,0);}20%{clip-path:inset(10% 0 75% 0);transform:translate(-3px,0);}40%{clip-path:inset(80% 0 5% 0);transform:translate(3px,0);}60%{clip-path:inset(30% 0 55% 0);transform:translate(-3px,0);}80%{clip-path:inset(5% 0 90% 0);transform:translate(3px,0);}100%{clip-path:inset(45% 0 40% 0);transform:translate(-3px,0);}}
    @keyframes scanline{0%{top:-5%;}100%{top:105%;}}
    @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
    @keyframes pulseRing{0%{transform:scale(1);opacity:0.6;}100%{transform:scale(2.8);opacity:0;}}
    @keyframes borderFlow{0%{background-position:0% 50%;}100%{background-position:200% 50%;}}
    @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
    @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
    @keyframes ripple{0%{transform:scale(0);opacity:0.6;}100%{transform:scale(4);opacity:0;}}
    @keyframes numberCount{from{opacity:0;transform:scale(0.6);}to{opacity:1;transform:scale(1);}}
    @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
    @keyframes orbPulse{0%,100%{transform:scale(1);opacity:0.15;}50%{transform:scale(1.15);opacity:0.25;}}
    @keyframes lineGrow{from{width:0;}to{width:100%;}}
    @keyframes tagIn{from{opacity:0;transform:scale(0.7)translateY(8px);}to{opacity:1;transform:scale(1)translateY(0);}}
    @keyframes toggleSlide{from{transform:translateX(0);}to{transform:translateX(28px);}}
    @keyframes toggleSlideBack{from{transform:translateX(28px);}to{transform:translateX(0);}}
    @keyframes sunRay{0%,100%{transform:rotate(0deg) scaleX(1);}50%{transform:rotate(180deg) scaleX(0.7);}}
    @keyframes moonGlow{0%,100%{filter:drop-shadow(0 0 4px #a78bfa);}50%{filter:drop-shadow(0 0 12px #7c3aed);}}
    @keyframes starTwinkle{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.3;transform:scale(0.5);}}
    @keyframes particleDrift{0%{transform:translateY(0) rotate(0deg);opacity:1;}100%{transform:translateY(-60px) rotate(360deg);opacity:0;}}
    @keyframes cardEntrance{from{opacity:0;transform:translateY(24px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);}}
    @keyframes gradientBorder{0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}
    @keyframes waveText{0%,100%{transform:translateY(0);}25%{transform:translateY(-4px);}75%{transform:translateY(4px);}}
    @keyframes bounceIn{0%{transform:scale(0.3);opacity:0;}50%{transform:scale(1.05);}70%{transform:scale(0.95);}100%{transform:scale(1);opacity:1;}}
    @keyframes rotateIn{from{transform:rotate(-180deg) scale(0);opacity:0;}to{transform:rotate(0) scale(1);opacity:1;}}
    @keyframes slideInDown{from{transform:translateY(-100%);opacity:0;}to{transform:translateY(0);opacity:1;}}

    /* HERO */
    .hero-bg{background:var(--hbg);background-size:400% 400%;animation:bgShift 20s ease infinite;}
    .hero-line{animation:lineGrow 1.2s 1.5s ease both;}

    /* GLITCH */
    .glitch{position:relative;display:inline-block;}
    .glitch::before,.glitch::after{content:attr(data-t);position:absolute;top:0;left:0;width:100%;height:100%;font-family:'Bebas Neue',sans-serif;}
    .glitch::before{animation:glitch1 6s infinite linear;opacity:0.8;}
    .glitch::after{animation:glitch2 4.5s infinite linear;opacity:0.8;}

    /* PULSE RINGS */
    .ring-u{position:absolute;inset:-10px;border-radius:50%;border:2px solid var(--ua);animation:pulseRing 2.2s ease-out infinite;opacity:0.5;}
    .ring-k{position:absolute;inset:-10px;border-radius:50%;border:2px solid var(--ka);animation:pulseRing 2.2s 1.1s ease-out infinite;opacity:0.5;}

    /* SCANLINE */
    .scanl{position:absolute;left:0;width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--ua),transparent);animation:scanline 9s linear infinite;pointer-events:none;z-index:3;opacity:0.4;}

    /* MARQUEE */
    .mq-track{display:flex;animation:marquee 28s linear infinite;width:max-content;}
    .mq-track:hover{animation-play-state:paused;}

    /* TILT CARD */
    .tilt-card{transform-style:preserve-3d;transition:transform 0.15s ease-out;}

    /* TAGS */
    .skill-tag{display:inline-flex;align-items:center;padding:4px 10px;border-radius:6px;font-size:10.5px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;font-family:'IBM Plex Mono',monospace;transition:all 0.25s ease;}
    .skill-tag:hover{transform:translateY(-3px) scale(1.08);}

    /* STAT ORB */
    .stat-orb{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;}
    .stat-orb::before{content:'';position:absolute;inset:-6px;border-radius:50%;border:1px solid var(--ua);opacity:0.2;animation:orbPulse 3s ease-in-out infinite;}

    /* FADE ANIMATIONS */
    .fu1{animation:fadeUp 0.9s ease both;}
    .fu2{animation:fadeUp 0.9s 0.12s ease both;}
    .fu3{animation:fadeUp 0.9s 0.24s ease both;}
    .fu4{animation:fadeUp 0.9s 0.36s ease both;}
    .fu5{animation:fadeUp 0.9s 0.48s ease both;}
    .fu6{animation:fadeUp 0.9s 0.6s ease both;}
    .sl{animation:slideLeft 0.9s ease both;}
    .sr{animation:slideRight 0.9s ease both;}

    /* BUTTON — BORDER FLOW */
    .btn-flow{position:relative;overflow:hidden;font-family:'Outfit',sans-serif;font-weight:700;cursor:pointer;transition:all 0.3s ease;}
    .btn-flow::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);transform:translateX(-100%);transition:transform 0.6s;}
    .btn-flow:hover::before{transform:translateX(100%);}
    .btn-flow:hover{transform:translateY(-3px);}

    /* DIVIDER */
    .section-divider{height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);}

    /* COLLAB ORBIT */
    .orbit-container{position:relative;width:120px;height:120px;}
    .orbit-inner{position:absolute;inset:0;border-radius:50%;border:1px dashed rgba(255,255,255,0.1);animation:spin 12s linear infinite;}
    .orbit-dot{position:absolute;top:-5px;left:50%;width:10px;height:10px;border-radius:50%;margin-left:-5px;}

    /* FLOATING BADGE */
    .float-badge{animation:float 4s ease-in-out infinite;}

    /* SHIMMER */
    .shimmer{background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.05) 50%,transparent 100%);background-size:200% 100%;animation:shimmer 4s infinite;}

    /* CARD HOVER LINE */
    .card-line::after{content:'';position:absolute;bottom:0;left:0;height:2px;width:0;background:var(--ua);transition:width 0.4s ease;}
    .card-line:hover::after{width:100%;}

    /* DEV NUMBER */
    .dev-number{font-family:'Bebas Neue',sans-serif;font-size:8rem;line-height:1;opacity:0.04;position:absolute;right:-10px;top:-20px;pointer-events:none;user-select:none;}

    /* TERMINAL RANGE */
    input[type=range]{-webkit-appearance:none;appearance:none;background:rgba(255,255,255,0.08);border-radius:999px;}
    input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:var(--ka);cursor:pointer;box-shadow:0 0 8px var(--ka);}

    /* RESPONSIVE */
    @media(max-width:768px){.hero-number{display:none;} .dev-number{display:none;}}
    @media(max-width:640px){.collab-grid{grid-template-columns:1fr;}}
  `;

  const colTypes = [
    { icon: <Rocket size={20} />, title: 'Startup MVPs', desc: 'Idea to launch, fast.', c: '#7c3aed' },
    { icon: <Globe size={20} />, title: 'Web Apps', desc: 'Full-stack, polished.', c: t.ua },
    { icon: <Layers size={20} />, title: 'SaaS Builds', desc: 'Production-ready.', c: t.ka },
    { icon: <Star size={20} />, title: 'Freelance', desc: 'One-off or ongoing.', c: '#ff3cac' },
  ];

  const built = [
    { icon: <Database size={18} />, t: 'Auth System', d: '6 endpoints · OTP · JWT · RBAC', c: t.ua },
    { icon: <Zap size={18} />, t: 'Payments', d: 'Razorpay · orders + webhooks', c: '#3395ff' },
    { icon: <Layers size={18} />, t: 'Admin Panel', d: 'Full CRUD · 4 resource types', c: t.ka },
    { icon: <Globe size={18} />, t: '8+ Pages', d: 'Animated · responsive · fast', c: '#8b5cf6' },
    { icon: <Server size={18} />, t: 'REST APIs', d: '15+ routes · validated · secured', c: '#10b981' },
    { icon: <Sparkles size={18} />, t: 'Design System', d: 'Tokens · animations · A11y', c: '#ff3cac' },
  ];

  return (
    <div className="page min-h-screen" style={{ background: t.bg, color: t.text, '--ua': t.ua, '--ka': t.ka, '--hbg': t.heroGrad, '--border': t.border, '--bg': t.bg, '--grid': t.gridLine }}>
      <style>{CSS}</style>

      {/* CUSTOM CURSOR */}
      <div className="cursor-dot" style={{ background: t.ua, transform: `translate(${mouse.x - 5}px,${mouse.y - 5}px)` }} />
      <div className="cursor-ring" style={{ border: `1.5px solid ${t.ua}`, transform: `translate(${mouse.x - 18}px,${mouse.y - 18}px)` }} />

      {/* CREATIVE THEME TOGGLE — FIXED: Applied inline zIndex to guarantee visibility */}
      <div ref={togRef} className="fixed"
        style={{ zIndex: 9999, top: 96, right: 24, transform: `translate(${togPos.x}px,${togPos.y}px)`, transition: 'transform 0.25s cubic-bezier(0.23,1,0.32,1)' }}>
        <button
          onClick={() => setTheme(t.id === 'dark' ? T.light : T.dark)}
          aria-label="Toggle theme"
          style={{
            position: 'relative',
            display: 'flex', alignItems: 'center',
            width: 72, height: 36,
            borderRadius: 999,
            border: 'none', outline: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
            background: t.id === 'dark'
              ? 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)'
              : 'linear-gradient(135deg,#fef3c7,#fde68a,#fed7aa)',
            boxShadow: t.id === 'dark'
              ? '0 0 0 1.5px rgba(167,139,250,0.5), 0 4px 20px rgba(109,40,217,0.4), inset 0 0 12px rgba(109,40,217,0.15)'
              : '0 0 0 1.5px rgba(251,191,36,0.7), 0 4px 20px rgba(251,191,36,0.35), inset 0 0 12px rgba(251,191,36,0.2)',
          }}>
          {/* Stars (dark mode) */}
          {t.id === 'dark' && [
            { top: '20%', left: '18%', size: 3, delay: '0s' },
            { top: '55%', left: '28%', size: 2, delay: '0.3s' },
            { top: '30%', left: '38%', size: 2, delay: '0.6s' },
          ].map((s, i) => (
            <span key={i} style={{
              position: 'absolute', top: s.top, left: s.left,
              width: s.size, height: s.size, borderRadius: '50%',
              background: 'white', opacity: 0.9,
              animation: `starTwinkle 1.5s ${s.delay} ease-in-out infinite`,
            }} />
          ))}
          {/* Sun rays (light mode) */}
          {t.id === 'light' && [0,45,90,135].map((deg, i) => (
            <span key={i} style={{
              position: 'absolute', left: 44, top: '50%',
              width: 8, height: 1.5, borderRadius: 1,
              background: '#f59e0b', opacity: 0.7,
              transformOrigin: '0 50%',
              transform: `translateY(-50%) rotate(${deg}deg) translateX(8px)`,
              animation: `sunRay 3s ${i * 0.2}s ease-in-out infinite`,
            }} />
          ))}
          {/* Track label */}
          <span style={{
            position: 'absolute',
            left: t.id === 'dark' ? 10 : 'auto',
            right: t.id === 'dark' ? 'auto' : 10,
            fontSize: 8, fontWeight: 800,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: t.id === 'dark' ? 'rgba(167,139,250,0.8)' : 'rgba(180,83,9,0.7)',
            fontFamily: "'IBM Plex Mono',monospace",
            userSelect: 'none', pointerEvents: 'none',
            transition: 'all 0.4s ease',
          }}>{t.id === 'dark' ? 'DARK' : 'LITE'}</span>
          {/* Thumb */}
          <span style={{
            position: 'absolute',
            left: t.id === 'dark' ? 'calc(100% - 32px)' : 4,
            width: 28, height: 28,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
            transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
            background: t.id === 'dark'
              ? 'radial-gradient(circle at 35% 35%,#c4b5fd,#7c3aed)'
              : 'radial-gradient(circle at 35% 35%,#fef08a,#f59e0b)',
            boxShadow: t.id === 'dark'
              ? '0 2px 10px rgba(124,58,237,0.6), inset 0 -2px 4px rgba(0,0,0,0.3)'
              : '0 2px 10px rgba(245,158,11,0.7), inset 0 -2px 4px rgba(180,83,9,0.2)',
          }}>
            {t.id === 'dark' ? '🌙' : '☀️'}
          </span>
        </button>
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <section className={`hero-bg relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 py-32 ${t.id === 'dark' ? 'noise' : ''}`}>
        <ParticleCanvas theme={t} />
        <div className="scanl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${t.gridLine} 1px,transparent 1px),linear-gradient(90deg,${t.gridLine} 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: t.ua, opacity: 0.07, animation: 'orbPulse 8s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: t.ka, opacity: 0.07, animation: 'orbPulse 10s 2s ease-in-out infinite' }} />

        <div className="relative z-10 text-center max-w-6xl w-full mx-auto">
          {/* Badge */}
          <div className="fu1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8 mono text-xs font-semibold uppercase tracking-widest"
            style={{ background: t.surface, borderColor: t.border, color: t.textSub, backdropFilter: 'blur(10px)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: t.ua, boxShadow: `0 0 8px ${t.ua}`, animation: 'orbPulse 1.5s ease-in-out infinite' }} />
            Impact You Academy · Developers
          </div>

          {/* Giant heading */}
          <div className="fu2 relative mb-4">
            <h1 className="disp font-black leading-none select-none" style={{ fontSize: 'clamp(4.5rem,13vw,11rem)', color: t.text }}>
              THE
            </h1>
          </div>
          <div className="fu3 relative mb-4 overflow-hidden">
            <h1 className="disp font-black leading-none"
              style={{ fontSize: 'clamp(4.5rem,13vw,11rem)', color: 'transparent', WebkitTextStroke: `2px ${t.id === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)' }` }}>
              <span className="glitch" data-t="BUILDERS" style={{ color: 'transparent', WebkitTextStroke: `2px ${t.id === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}` }}
                onMouseEnter={e => { e.target.style.WebkitTextFillColor = t.ua; e.target.style.WebkitTextStroke = 'none'; }}
                onMouseLeave={e => { e.target.style.WebkitTextFillColor = 'transparent'; e.target.style.WebkitTextStroke = `2px ${t.id === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`; }}>
                BUILDERS
              </span>
            </h1>
          </div>

          {/* Typed subtitle */}
          <div className="fu4 text-xl md:text-2xl font-semibold mb-8 h-9" style={{ color: t.textSub }}>
            We craft&nbsp;<TypedText words={['elegant UIs.', 'robust APIs.', 'scalable systems.', 'pixel-perfect design.', 'end-to-end products.']} color={t.ua} />
          </div>

          {/* Stats row */}
          <div className="fu5 flex items-center justify-center gap-6 md:gap-12 mb-10 flex-wrap">
            {[{ to: 15, sfx: '+', l: 'API Routes' }, { to: 8, sfx: '', l: 'Pages Built' }, { to: 100, sfx: '%', l: 'Custom Code' }, { to: 2, sfx: '', l: 'Developers' }].map((s, i) => (
              <div key={i} className="text-center stat-orb" style={{ '--ua': t.ua }}>
                <div className="disp text-5xl md:text-6xl" style={{ color: i % 2 === 0 ? t.ua : t.ka }}><Counter to={s.to} suffix={s.sfx} /></div>
                <div className="mono text-xs uppercase tracking-widest mt-1" style={{ color: t.textMuted }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="fu6 flex gap-3 justify-center flex-wrap">
            {['Backend', 'Frontend', 'Full Stack'].map((lbl, i) => (
              <span key={lbl} className="skill-tag" style={{ background: [t.uaDim, t.kaDim, 'rgba(124,58,237,0.12)'][i], color: [t.ua, t.ka, '#a78bfa'][i], border: `1px solid ${[t.ua, t.ka, '#7c3aed'][i]}30` }}>
                {lbl}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 float-badge">
          <span className="mono text-xs uppercase tracking-[0.3em]" style={{ color: t.textMuted }}>scroll</span>
          <div className="w-px h-10" style={{ background: `linear-gradient(to bottom,${t.textMuted},transparent)` }} />
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: t.bgCard, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }} className="py-3 overflow-hidden">
        <div className="mq-track gap-4 px-4">
          {mq.map((s, i) => (
            <span key={i} className="skill-tag flex-shrink-0" style={{ background: `${s.c}14`, color: s.c, border: `1px solid ${s.c}30` }}>{s.n}</span>
          ))}
        </div>
      </div>

      {/* ═══════════ UJJWAL SECTION ═══════════ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: t.bg }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${t.gridLine} 1px,transparent 1px),linear-gradient(90deg,${t.gridLine} 1px,transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
            {/* Left col — identity */}
            <div className="xl:col-span-4 sl">
              <div className="mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: t.ua }}>
                <span className="w-8 h-px" style={{ background: t.ua }} /> Developer 01
              </div>
              <div className="disp mb-2" style={{ fontSize: 'clamp(3rem,6vw,5.5rem)', lineHeight: 1, color: t.text }}>
                UJJWAL<br /><span style={{ color: t.ua }}>ASATI</span>
              </div>
              <div className="mono text-sm mb-6" style={{ color: t.textSub }}>Backend Engineer · API Architect</div>

              {/* Avatar block */}
              <div className="relative w-fit mb-8">
                <div className="ring-u" style={{ '--ua': t.ua }} />
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative z-10 disp text-4xl"
                  style={{ background: `linear-gradient(135deg,${t.uaDim},${t.bgCard})`, border: `2px solid ${t.ua}40`, color: t.ua, boxShadow: `0 0 30px ${t.uaGlow}` }}>
                  UA
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: t.textSub }}>
                The architect behind every invisible layer. APIs, authentication, databases, payments — if it runs in the dark, Ujjwal built it.
              </p>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[{ v: '15+', l: 'Endpoints' }, { v: '3', l: 'Integrations' }, { v: '6', l: 'Auth Flows' }].map((s, i) => (
                  <div key={i} className="text-center p-3 rounded-xl" style={{ background: t.surface, border: `1px solid ${t.border}` }}>
                    <div className="disp text-3xl" style={{ color: t.ua }}>{s.v}</div>
                    <div className="mono text-xs mt-0.5" style={{ color: t.textMuted }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { href: 'https://www.linkedin.com/in/ujjwal-asati-20527828b/', icon: <Linkedin size={13} />, label: 'LinkedIn', c: t.ua },
                  { href: 'https://github.com/UjjwalAsati', icon: <Github size={13} />, label: 'GitHub', c: t.textSub },
                  { href: 'mailto:ujjwalasati@gmail.com', icon: <Mail size={13} />, label: 'Email', c: t.textSub },
                ].map(lk => (
                  <a key={lk.href} href={lk.href} target={lk.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="btn-flow flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold"
                    style={{ background: lk.c === t.ua ? t.uaDim : t.surface, color: lk.c, border: `1px solid ${lk.c === t.ua ? t.ua + '40' : t.border}`, textDecoration: 'none' }}>
                    {lk.icon} {lk.label} <ArrowUpRight size={10} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right col — terminal + skills */}
            <div className="xl:col-span-8 sr">
              <div ref={uCardRef}
                className="tilt-card rounded-3xl p-6 relative overflow-hidden card-line"
                style={{
                  background: t.bgCard,
                  border: `1px solid ${t.border}`,
                  transform: `perspective(1000px) rotateX(${uTilt.rx}deg) rotateY(${uTilt.ry}deg)`,
                  boxShadow: `0 0 60px ${t.uaGlow}, 0 20px 60px rgba(0,0,0,0.3)`,
                  '--ua': t.ua,
                }}>
                <div className="scanl" />
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: t.ua, opacity: 0.05 }} />
                <div className="dev-number" style={{ color: t.ua }}>01</div>
                {/* Gradient spot following tilt */}
                <div className="absolute pointer-events-none rounded-full w-40 h-40 blur-3xl opacity-20 transition-all duration-100"
                  style={{ background: t.ua, left: `${uTilt.gx}%`, top: `${uTilt.gy}%`, transform: 'translate(-50%,-50%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Terminal size={14} style={{ color: t.ua }} />
                    <span className="mono text-xs uppercase tracking-widest" style={{ color: t.textMuted }}>
                      Interactive Shell — try: <span style={{ color: t.ua }}>help · skills · projects · coffee</span>
                    </span>
                  </div>
                  <Terminal2 t={t} />
                  <div className="mt-6">
                    <div className="mono text-xs uppercase tracking-widest mb-3" style={{ color: t.textMuted }}>Tech Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {uSkills.map(s => (
                        <span key={s.n} className="skill-tag" style={{ background: `${s.c}14`, color: s.c, border: `1px solid ${s.c}30` }}>{s.n}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6" style={{ '--border': t.border }} />

      {/* ═══════════ KAUSHIK SECTION ═══════════ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: t.bg }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${t.gridLine} 1px,transparent 1px),linear-gradient(90deg,${t.gridLine} 1px,transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
            {/* Left col — playground */}
            <div className="xl:col-span-8 xl:order-1 order-2 sl">
              <div ref={kCardRef}
                className="tilt-card rounded-3xl p-6 relative overflow-hidden card-line"
                style={{
                  background: t.bgCard,
                  border: `1px solid ${t.border}`,
                  transform: `perspective(1000px) rotateX(${kTilt.rx}deg) rotateY(${kTilt.ry}deg)`,
                  boxShadow: `0 0 60px ${t.kaGlow}, 0 20px 60px rgba(0,0,0,0.3)`,
                  '--ka': t.ka, '--ua': t.ua,
                }}>
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: t.ka, opacity: 0.05 }} />
                <div className="dev-number" style={{ color: t.ka }}>02</div>
                <div className="absolute pointer-events-none rounded-full w-40 h-40 blur-3xl opacity-20 transition-all duration-100"
                  style={{ background: t.ka, left: `${kTilt.gx}%`, top: `${kTilt.gy}%`, transform: 'translate(-50%,-50%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Gamepad2 size={14} style={{ color: t.ka }} />
                      <span className="mono text-xs uppercase tracking-widest" style={{ color: t.textMuted }}>Design Playground</span>
                    </div>
                    <div className="flex gap-1">
                      {[{ id: 'pixel', icon: '🎨', l: 'Pixel' }, { id: 'css', icon: '⚡', l: 'CSS' }, { id: 'build', icon: '🧩', l: 'Build' }].map(tab => (
                        <button key={tab.id} onClick={() => setKTab(tab.id)}
                          className="px-3 py-1.5 text-xs font-bold rounded-xl transition-all"
                          style={kTab === tab.id ? { background: t.ka, color: '#000' } : { background: t.surface, color: t.textSub, border: `1px solid ${t.border}` }}>
                          {tab.icon} {tab.l}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl p-4" style={{ background: t.bgCard2, border: `1px solid ${t.border}` }}>
                    {kTab === 'pixel' && <PixelCanvas t={t} />}
                    {kTab === 'css' && <CSSGame t={t} />}
                    {kTab === 'build' && <Builder t={t} />}
                  </div>
                  <div className="mt-6">
                    <div className="mono text-xs uppercase tracking-widest mb-3" style={{ color: t.textMuted }}>Design Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {kSkills.map(s => (
                        <span key={s.n} className="skill-tag" style={{ background: `${s.c}14`, color: s.c, border: `1px solid ${s.c}30` }}>{s.n}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right col — identity */}
            <div className="xl:col-span-4 xl:order-2 order-1 sr">
              <div className="mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: t.ka }}>
                <span className="w-8 h-px" style={{ background: t.ka }} /> Developer 02
              </div>
              <div className="disp mb-2" style={{ fontSize: 'clamp(3rem,6vw,5.5rem)', lineHeight: 1, color: t.text }}>
                SAI<br /><span style={{ color: t.ka }}>KAUSHIK</span>
              </div>
              <div className="mono text-sm mb-6" style={{ color: t.textSub }}>Frontend Engineer · Design Lead</div>

              <div className="relative w-fit mb-8">
                <div className="ring-k" style={{ '--ka': t.ka }} />
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative z-10 disp text-4xl"
                  style={{ background: `linear-gradient(135deg,${t.kaDim},${t.bgCard})`, border: `2px solid ${t.ka}40`, color: t.ka, boxShadow: `0 0 30px ${t.kaGlow}` }}>
                  SK
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: t.textSub }}>
                The painter of pixels. Every animation, hover state, and layout decision was Kaushik's canvas. If it looks extraordinary, he made it.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[{ v: '8+', l: 'Pages' }, { v: '50+', l: 'Components' }, { v: '∞', l: 'Animations' }].map((s, i) => (
                  <div key={i} className="text-center p-3 rounded-xl" style={{ background: t.surface, border: `1px solid ${t.border}` }}>
                    <div className="disp text-3xl" style={{ color: t.ka }}>{s.v}</div>
                    <div className="mono text-xs mt-0.5" style={{ color: t.textMuted }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 flex-wrap">
                {[
                  { href: 'https://www.linkedin.com/in/sai-kaushik-chunduri-a6130228b/', icon: <Linkedin size={13} />, label: 'LinkedIn', c: t.ka },
                  { href: 'https://github.com/Kaushik-verse', icon: <Github size={13} />, label: 'GitHub', c: t.textSub },
                  { href: 'mailto:chundurisaikaushik@gmail.com', icon: <Mail size={13} />, label: 'Email', c: t.textSub },
                ].map(lk => (
                  <a key={lk.href} href={lk.href} target={lk.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="btn-flow flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold"
                    style={{ background: lk.c === t.ka ? t.kaDim : t.surface, color: lk.c, border: `1px solid ${lk.c === t.ka ? t.ka + '40' : t.border}`, textDecoration: 'none' }}>
                    {lk.icon} {lk.label} <ArrowUpRight size={10} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHAT WE BUILT ═══════════ */}
      <section style={{ background: t.bgCard, borderTop: `1px solid ${t.border}` }} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="mono text-xs uppercase tracking-widest mb-3" style={{ color: t.textMuted }}>impact you academy</div>
            <h2 className="disp" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', color: t.text }}>
              WHAT WE <span style={{ color: t.ka }}>SHIPPED</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {built.map((item, i) => (
              <div key={i} className="group relative p-5 rounded-2xl cursor-default overflow-hidden"
                style={{ background: t.surface, border: `1px solid ${t.border}`, transition: 'all 0.35s ease' }}
                onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${item.c}50`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${item.c}18`; }}
                onMouseLeave={e => { e.currentTarget.style.border = `1px solid ${t.border}`; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: item.c }} />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.c}18`, color: item.c }}>
                  {item.icon}
                </div>
                <div className="font-bold mb-1" style={{ color: t.text }}>{item.t}</div>
                <div className="mono text-xs" style={{ color: t.textSub }}>{item.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ COLLAB ═══════════ */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ background: t.bg }}>
        {/* BG orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[700px] h-[700px] rounded-full blur-[120px]" style={{ background: t.ua, opacity: 0.05, top: '-20%', left: '-15%', animation: 'orbPulse 12s ease-in-out infinite' }} />
          <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: t.ka, opacity: 0.05, bottom: '-20%', right: '-15%', animation: 'orbPulse 15s 3s ease-in-out infinite' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: '#7c3aed', opacity: 0.03, top: '40%', left: '40%', animation: 'orbPulse 10s 5s ease-in-out infinite' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${t.gridLine} 1px,transparent 1px),linear-gradient(90deg,${t.gridLine} 1px,transparent 1px)`, backgroundSize: '40px 40px' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="mono text-xs uppercase tracking-widest mb-6 float-badge" style={{ color: t.textMuted }}>available for new work</div>
            <h2 className="disp leading-none mb-6" style={{ fontSize: 'clamp(3.5rem,9vw,8rem)', color: t.text }}>
              LET'S BUILD<br />
              <span style={{
                background: `linear-gradient(135deg,${t.ua},${t.ka})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>SOMETHING</span><br />
              <span style={{ color: t.id === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)', WebkitTextStroke: `2px ${t.id === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)'}` }}>GREAT</span>
            </h2>
            <p className="text-lg max-w-md mx-auto" style={{ color: t.textSub }}>
              Two developers. End-to-end capability. Ready to turn your idea into a production product.
            </p>
          </div>

          {/* Collaboration types */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
            {colTypes.map((ct, i) => (
              <div key={i} className="group p-5 rounded-2xl text-center cursor-default"
                style={{ background: t.surface, border: `1px solid ${t.border}`, transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ct.c}0f`; e.currentTarget.style.border = `1px solid ${ct.c}40`; e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = t.surface; e.currentTarget.style.border = `1px solid ${t.border}`; e.currentTarget.style.transform = ''; }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: `${ct.c}18`, color: ct.c }}>{ct.icon}</div>
                <div className="font-bold text-sm mb-1" style={{ color: t.text }}>{ct.title}</div>
                <div className="text-xs" style={{ color: t.textMuted }}>{ct.desc}</div>
              </div>
            ))}
          </div>

          {/* Dev contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14 collab-grid">
            {[
              { init: 'UA', name: 'Ujjwal Asati', role: 'Backend Engineer', tag: 'APIs · Systems · Auth', c: t.ua, dim: t.uaDim, glow: t.uaGlow, email: 'ujjwalasati@gmail.com', li: 'https://www.linkedin.com/in/ujjwal-asati-20527828b/', gh: 'https://github.com/UjjwalAsati', perks: ['REST APIs', 'Auth Systems', 'Database Design', 'Payment Integration'] },
              { init: 'SK', name: 'Sai Kaushik', role: 'Frontend Engineer', tag: 'UI/UX · Design · React', c: t.ka, dim: t.kaDim, glow: t.kaGlow, email: 'chundurisaikaushik@gmail.com', li: 'https://www.linkedin.com/in/sai-kaushik-chunduri-a6130228b/', gh: 'https://github.com/Kaushik-verse', perks: ['Landing Pages', 'Design Systems', 'Animations', 'Dashboard UI'] },
            ].map((dev, i) => (
              <div key={dev.name}
                className="relative rounded-3xl p-7 overflow-hidden group"
                style={{ background: t.bgCard, border: `1px solid ${t.border}`, transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${dev.c}50`; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 24px 60px ${dev.glow}`; }}
                onMouseLeave={e => { e.currentTarget.style.border = `1px solid ${t.border}`; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: dev.c }} />
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative flex-shrink-0">
                      <div className={i === 0 ? 'ring-u' : 'ring-k'} />
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center disp text-3xl relative z-10"
                        style={{ background: dev.dim, color: dev.c, border: `2px solid ${dev.c}35`, boxShadow: `0 0 20px ${dev.glow}` }}>
                        {dev.init}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg" style={{ color: t.text, fontFamily: "'Outfit',sans-serif" }}>{dev.name}</h3>
                      <div className="mono text-xs font-bold uppercase tracking-widest" style={{ color: dev.c }}>{dev.role}</div>
                      <div className="text-xs" style={{ color: t.textMuted }}>{dev.tag}</div>
                    </div>
                  </div>
                  {/* Perks */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {dev.perks.map(p => (
                      <span key={p} className="skill-tag" style={{ background: `${dev.c}12`, color: dev.c, border: `1px solid ${dev.c}25` }}>{p}</span>
                    ))}
                  </div>
                  {/* Links */}
                  <div className="space-y-2 mono text-xs">
                    {[
                      { href: `mailto:${dev.email}`, icon: <Mail size={11} />, label: dev.email },
                      { href: dev.li, icon: <Linkedin size={11} />, label: 'LinkedIn Profile', ext: true },
                      { href: dev.gh, icon: <Github size={11} />, label: 'GitHub Profile', ext: true },
                    ].map((lk, j) => (
                      <a key={j} href={lk.href} target={lk.ext ? '_blank' : undefined} rel="noopener noreferrer"
                        className="flex items-center gap-2 group/link transition-all hover:translate-x-1"
                        style={{ color: t.textSub, textDecoration: 'none' }}>
                        <span style={{ color: dev.c }}>{lk.icon}</span>
                        <span className="group-hover/link:underline truncate">{lk.label}</span>
                        {lk.ext && <ArrowUpRight size={9} className="opacity-0 group-hover/link:opacity-100" style={{ color: dev.c }} />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
              <a href="mailto:ujjwalasati@gmail.com"
                className="btn-flow flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold"
                style={{ background: t.uaDim, color: t.ua, border: `1.5px solid ${t.ua}50`, textDecoration: 'none', boxShadow: `0 0 20px ${t.uaGlow}` }}>
                <Send size={15} /> Email Ujjwal
              </a>
              <a href="mailto:chundurisaikaushik@gmail.com"
                className="btn-flow flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold"
                style={{ background: t.kaDim, color: t.ka, border: `1.5px solid ${t.ka}50`, textDecoration: 'none', boxShadow: `0 0 20px ${t.kaGlow}` }}>
                <Send size={15} /> Email Kaushik
              </a>
            </div>
            <div className="mono text-xs uppercase tracking-widest" style={{ color: t.textMuted }}>
              © {new Date().getFullYear()} · Designed &amp; Engineered for Impact You Academy ·{' '}
              <span style={{ color: '#ef4444' }}>♥</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
