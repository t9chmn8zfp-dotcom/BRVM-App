import { useState, useEffect, useCallback } from "react";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  navy:    "#0D2137",
  blue:    "#1565C0",
  sky:     "#1E88E5",
  gold:    "#F9A825",
  amber:   "#FF8F00",
  green:   "#2E7D32",
  greenL:  "#43A047",
  red:     "#C62828",
  slate:   "#37474F",
  slateL:  "#546E7A",
  bg:      "#F0F4F8",
  card:    "#FFFFFF",
  border:  "#CFD8DC",
  text:    "#1A2332",
  muted:   "#607D8B",
};

// ── CURRICULUM ───────────────────────────────────────────────────────────────
const MODULES = [
  {
    id: 1, icon: "📊", title: "Fondements des marchés financiers",
    color: "#1565C0", lightColor: "#E3F2FD",
    lessons: [
      { id: "1-1", title: "Qu'est-ce qu'un marché financier ?", xp: 10 },
      { id: "1-2", title: "Marché primaire vs marché secondaire", xp: 10 },
      { id: "1-3", title: "Les instruments financiers", xp: 15 },
      { id: "1-4", title: "Les acteurs du marché", xp: 10 },
      { id: "1-5", title: "Les risques de marché", xp: 15 },
    ]
  },
  {
    id: 2, icon: "🏛️", title: "Découverte de la BRVM",
    color: "#6A1B9A", lightColor: "#F3E5F5",
    lessons: [
      { id: "2-1", title: "Historique et organisation de la BRVM", xp: 10 },
      { id: "2-2", title: "UEMOA, BCEAO et CREPMF", xp: 15 },
      { id: "2-3", title: "Les SGI et le DC/BR", xp: 15 },
      { id: "2-4", title: "Indices BRVM et secteurs", xp: 10 },
      { id: "2-5", title: "Cotation, frais et fiscalité", xp: 20 },
    ]
  },
  {
    id: 3, icon: "📈", title: "Comprendre une action",
    color: "#00695C", lightColor: "#E0F2F1",
    lessons: [
      { id: "3-1", title: "Définition juridique et droits", xp: 10 },
      { id: "3-2", title: "Valeur nominale, comptable, intrinsèque", xp: 15 },
      { id: "3-3", title: "Capitalisation boursière et flottant", xp: 10 },
      { id: "3-4", title: "Liquidité et volatilité", xp: 15 },
    ]
  },
  {
    id: 4, icon: "📋", title: "Lecture des états financiers",
    color: "#E65100", lightColor: "#FFF3E0",
    lessons: [
      { id: "4-1", title: "Le bilan SYSCOHADA", xp: 20 },
      { id: "4-2", title: "Le compte de résultat", xp: 20 },
      { id: "4-3", title: "Tableau des flux de trésorerie", xp: 20 },
      { id: "4-4", title: "Annexes et rapport annuel", xp: 15 },
    ]
  },
  {
    id: 5, icon: "🔍", title: "Analyse fondamentale",
    color: "#1B5E20", lightColor: "#E8F5E9",
    lessons: [
      { id: "5-1", title: "Analyse macro et sectorielle", xp: 20 },
      { id: "5-2", title: "Analyse concurrentielle (Porter)", xp: 20 },
      { id: "5-3", title: "Avantages compétitifs (moats)", xp: 20 },
      { id: "5-4", title: "Qualité du management", xp: 15 },
    ]
  },
  {
    id: 6, icon: "🧮", title: "Les ratios financiers",
    color: "#880E4F", lightColor: "#FCE4EC",
    lessons: [
      { id: "6-1", title: "Ratios de valorisation (PER, P/B, Yield)", xp: 25 },
      { id: "6-2", title: "Ratios de rentabilité (ROE, ROA, marges)", xp: 25 },
      { id: "6-3", title: "Ratios de flux (EBITDA, FCF)", xp: 20 },
      { id: "6-4", title: "Structure financière et endettement", xp: 20 },
    ]
  },
  {
    id: 7, icon: "💎", title: "Évaluation d'une entreprise",
    color: "#4527A0", lightColor: "#EDE7F6",
    lessons: [
      { id: "7-1", title: "Valorisation patrimoniale et par bénéfices", xp: 20 },
      { id: "7-2", title: "Modèle de Gordon-Shapiro", xp: 25 },
      { id: "7-3", title: "DCF (Discounted Cash Flow)", xp: 30 },
      { id: "7-4", title: "Multiples et marge de sécurité", xp: 25 },
    ]
  },
  {
    id: 8, icon: "💰", title: "Les dividendes",
    color: "#F57F17", lightColor: "#FFFDE7",
    lessons: [
      { id: "8-1", title: "Calendrier et dates clés", xp: 10 },
      { id: "8-2", title: "Calcul du rendement et payout ratio", xp: 15 },
      { id: "8-3", title: "Politique de distribution", xp: 15 },
      { id: "8-4", title: "Réinvestissement et rendement total", xp: 20 },
    ]
  },
  {
    id: 9, icon: "📉", title: "Analyse technique BRVM",
    color: "#0277BD", lightColor: "#E1F5FE",
    lessons: [
      { id: "9-1", title: "Supports, résistances et tendances", xp: 20 },
      { id: "9-2", title: "Volumes et moyennes mobiles", xp: 20 },
      { id: "9-3", title: "RSI, MACD, Bollinger", xp: 25 },
      { id: "9-4", title: "Figures chartistes et cassures", xp: 25 },
    ]
  },
  {
    id: 10, icon: "🗂️", title: "Construction de portefeuille",
    color: "#2E7D32", lightColor: "#E8F5E9",
    lessons: [
      { id: "10-1", title: "Diversification et allocation", xp: 20 },
      { id: "10-2", title: "Sizing et gestion du risque", xp: 25 },
      { id: "10-3", title: "Modified Dietz et Indice Base 100", xp: 30 },
      { id: "10-4", title: "Rééquilibrage et benchmark", xp: 20 },
    ]
  },
  {
    id: 11, icon: "🖥️", title: "Passer un ordre en bourse",
    color: "#37474F", lightColor: "#ECEFF1",
    lessons: [
      { id: "11-1", title: "Ouvrir un compte SGI", xp: 10 },
      { id: "11-2", title: "Types d'ordres à la BRVM", xp: 20 },
      { id: "11-3", title: "Règlement J+3 et conservation", xp: 15 },
    ]
  },
  {
    id: 12, icon: "📡", title: "Suivi d'une société cotée",
    color: "#00838F", lightColor: "#E0F7FA",
    lessons: [
      { id: "12-1", title: "Publications et calendrier financier", xp: 15 },
      { id: "12-2", title: "AGO, AGE et annonces réglementées", xp: 15 },
      { id: "12-3", title: "OPA, fusion, scission", xp: 20 },
    ]
  },
  {
    id: 13, icon: "🛡️", title: "Gestion des risques",
    color: "#B71C1C", lightColor: "#FFEBEE",
    lessons: [
      { id: "13-1", title: "Risques de marché, liquidité, change", xp: 20 },
      { id: "13-2", title: "Risque politique et réglementaire", xp: 15 },
      { id: "13-3", title: "Stop-loss, sizing, diversification", xp: 25 },
    ]
  },
  {
    id: 14, icon: "🧠", title: "Psychologie de l'investisseur",
    color: "#4A148C", lightColor: "#F3E5F5",
    lessons: [
      { id: "14-1", title: "Biais cognitifs (confirmation, confiance)", xp: 20 },
      { id: "14-2", title: "Aversion aux pertes et effet de disposition", xp: 20 },
      { id: "14-3", title: "Discipline et plan d'investissement", xp: 25 },
    ]
  },
  {
    id: 15, icon: "🏢", title: "Études de cas BRVM",
    color: "#1A237E", lightColor: "#E8EAF6",
    lessons: [
      { id: "15-1", title: "Analyse SIB et BOA", xp: 40 },
      { id: "15-2", title: "Analyse ORANGE CI et SONATEL", xp: 40 },
      { id: "15-3", title: "Analyse SOLIBRA et TOTAL CI", xp: 40 },
      { id: "15-4", title: "Méthode standardisée appliquée", xp: 50 },
    ]
  },
  {
    id: 16, icon: "🎓", title: "Projet final",
    color: "#1B5E20", lightColor: "#E8F5E9",
    lessons: [
      { id: "16-1", title: "Analyse complète d'une société BRVM", xp: 100 },
    ]
  },
];

const TOTAL_XP = MODULES.reduce((s, m) => s + m.lessons.reduce((ls, l) => ls + l.xp, 0), 0);

// ── STORAGE HELPERS ──────────────────────────────────────────────────────────
async function load(key) {
  try {
    const r = await window.storage.get(key);
    return r ? JSON.parse(r.value) : null;
  } catch { return null; }
}
async function save(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
}

function todayStr() { return new Date().toISOString().split("T")[0]; }

function levelFromXP(xp) {
  if (xp < 100) return { level: 1, title: "Épargnant" };
  if (xp < 250) return { level: 2, title: "Observateur" };
  if (xp < 500) return { level: 3, title: "Analyste junior" };
  if (xp < 800) return { level: 4, title: "Analyste confirmé" };
  if (xp < 1200) return { level: 5, title: "Investisseur BRVM" };
  return { level: 6, title: "Maître analyste" };
}

// ── QUIZ ENGINE (Claude API) ─────────────────────────────────────────────────
async function fetchQuiz(lessonTitle, moduleTitle) {
  const prompt = `Tu es un formateur expert en finance de marché, spécialisé sur la BRVM (Bourse Régionale des Valeurs Mobilières, Afrique de l'Ouest).

Génère exactement 4 questions QCM sur le thème : "${lessonTitle}" (module : "${moduleTitle}").

Règles strictes :
- Questions précises, factuelles et adaptées à la BRVM/UEMOA
- 4 choix par question (A, B, C, D)
- Une seule bonne réponse par question
- Explication courte (1-2 phrases) après la bonne réponse

Réponds UNIQUEMENT en JSON valide, sans balises markdown, exactement ce format :
{
  "questions": [
    {
      "question": "texte de la question ?",
      "choices": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct": 0,
      "explanation": "Explication de la bonne réponse."
    }
  ]
}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await res.json();
  const text = data.content?.find(b => b.type === "text")?.text || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ── COMPONENTS ───────────────────────────────────────────────────────────────
function XPBar({ xp }) {
  const { level, title } = levelFromXP(xp);
  const next = [0,100,250,500,800,1200,TOTAL_XP];
  const lo = next[level-1], hi = next[level];
  const pct = Math.min(100, Math.round(((xp - lo) / (hi - lo)) * 100));
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <div style={{
        width:38, height:38, borderRadius:"50%", background:C.gold,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontWeight:700, fontSize:15, color:C.navy, flexShrink:0
      }}>{level}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:11, color:C.muted, marginBottom:3 }}>{title}</div>
        <div style={{ background:C.border, borderRadius:8, height:8, overflow:"hidden" }}>
          <div style={{
            width:`${pct}%`, height:"100%",
            background:`linear-gradient(90deg, ${C.gold}, ${C.amber})`,
            borderRadius:8, transition:"width .4s ease"
          }}/>
        </div>
        <div style={{ fontSize:10, color:C.muted, marginTop:2 }}>{xp} XP • {pct}% vers niveau {level+1}</div>
      </div>
    </div>
  );
}

function StreakBadge({ streak }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:6,
      background: streak > 0 ? "#FFF3E0" : C.bg,
      border:`1.5px solid ${streak > 0 ? C.amber : C.border}`,
      borderRadius:20, padding:"5px 12px"
    }}>
      <span style={{ fontSize:18 }}>🔥</span>
      <span style={{ fontWeight:700, fontSize:15, color: streak > 0 ? C.amber : C.slateL }}>{streak}</span>
      <span style={{ fontSize:11, color:C.muted }}>jours</span>
    </div>
  );
}

function ModuleCard({ mod, progress, onSelect, locked }) {
  const done = mod.lessons.filter(l => progress?.completed?.includes(l.id)).length;
  const total = mod.lessons.length;
  const pct = Math.round((done/total)*100);
  const allDone = done === total;
  return (
    <div
      onClick={() => !locked && onSelect(mod)}
      style={{
        background: C.card, borderRadius:16,
        border:`2px solid ${locked ? C.border : allDone ? mod.color : C.border}`,
        padding:"18px 20px", cursor: locked ? "not-allowed" : "pointer",
        opacity: locked ? .45 : 1,
        transition:"transform .15s, box-shadow .15s",
        position:"relative", overflow:"hidden"
      }}
      onMouseEnter={e => { if(!locked) { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 24px rgba(0,0,0,.10)"; }}}
      onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
    >
      {allDone && (
        <div style={{
          position:"absolute", top:10, right:10,
          background:mod.color, color:"#fff", borderRadius:12,
          fontSize:11, fontWeight:700, padding:"2px 8px"
        }}>✓ TERMINÉ</div>
      )}
      <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
        <div style={{
          width:48, height:48, borderRadius:14,
          background: locked ? C.border : mod.lightColor,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:24, flexShrink:0
        }}>{locked ? "🔒" : mod.icon}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:2 }}>MODULE {mod.id}</div>
          <div style={{ fontSize:14, fontWeight:700, color:C.text, lineHeight:1.3 }}>{mod.title}</div>
          <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>{total} leçon{total>1?"s":""} • {mod.lessons.reduce((s,l)=>s+l.xp,0)} XP</div>
        </div>
      </div>
      <div style={{ marginTop:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
          <span style={{ fontSize:11, color:C.muted }}>{done}/{total} leçons</span>
          <span style={{ fontSize:11, fontWeight:700, color: mod.color }}>{pct}%</span>
        </div>
        <div style={{ background:C.bg, borderRadius:8, height:6, overflow:"hidden" }}>
          <div style={{
            width:`${pct}%`, height:"100%",
            background: mod.color, borderRadius:8,
            transition:"width .4s"
          }}/>
        </div>
      </div>
    </div>
  );
}

function LessonRow({ lesson, done, current, onStart }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:14,
      padding:"14px 18px", borderRadius:12,
      background: current ? "#EBF4FF" : done ? "#F1FBF4" : C.card,
      border:`1.5px solid ${current ? C.sky : done ? C.greenL : C.border}`,
      marginBottom:8, cursor: done || current ? "pointer" : "default"
    }}
    onClick={() => (done || current) && onStart(lesson)}
    >
      <div style={{
        width:36, height:36, borderRadius:"50%", flexShrink:0,
        background: done ? C.greenL : current ? C.sky : C.border,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:16, color:"#fff"
      }}>
        {done ? "✓" : current ? "▶" : "○"}
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{lesson.title}</div>
        <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>+{lesson.xp} XP</div>
      </div>
      {current && (
        <div style={{
          background:C.sky, color:"#fff", borderRadius:20,
          padding:"4px 12px", fontSize:11, fontWeight:700
        }}>Commencer</div>
      )}
      {done && (
        <div style={{ fontSize:11, color:C.greenL, fontWeight:600 }}>Acquis ✓</div>
      )}
    </div>
  );
}

function QuizScreen({ lesson, module: mod, onComplete, onBack }) {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setLoading(true); setError(null);
    fetchQuiz(lesson.title, mod.title)
      .then(q => { setQuiz(q); setLoading(false); })
      .catch(() => { setError("Erreur de génération. Vérifie ta connexion."); setLoading(false); });
  }, [lesson.title, mod.title]);

  if (loading) return (
    <div style={{ minHeight:"60vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16 }}>
      <div style={{ fontSize:40 }}>⏳</div>
      <div style={{ fontSize:16, color:C.slate, fontWeight:600 }}>Génération de votre quiz BRVM...</div>
      <div style={{ fontSize:13, color:C.muted }}>L'IA prépare des questions sur "{lesson.title}"</div>
    </div>
  );

  if (error) return (
    <div style={{ padding:40, textAlign:"center" }}>
      <div style={{ fontSize:40, marginBottom:16 }}>⚠️</div>
      <div style={{ color:C.red, marginBottom:16 }}>{error}</div>
      <button onClick={onBack} style={{ padding:"10px 24px", borderRadius:10, background:C.blue, color:"#fff", border:"none", cursor:"pointer" }}>Retour</button>
    </div>
  );

  if (finished) {
    const total = quiz.questions.length;
    const pct = Math.round((score/total)*100);
    const passed = pct >= 75;
    return (
      <div style={{ padding:"40px 24px", textAlign:"center", maxWidth:480, margin:"0 auto" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>{passed ? "🏆" : "📚"}</div>
        <div style={{ fontSize:24, fontWeight:800, color:C.text, marginBottom:8 }}>
          {passed ? "Leçon validée !" : "Encore un effort"}
        </div>
        <div style={{ fontSize:16, color:C.muted, marginBottom:24 }}>
          {score}/{total} bonnes réponses ({pct}%)
        </div>
        <div style={{
          padding:20, borderRadius:16,
          background: passed ? "#E8F5E9" : "#FFF3E0",
          border:`2px solid ${passed ? C.greenL : C.amber}`,
          marginBottom:28
        }}>
          <div style={{ fontSize:13, color:C.text, lineHeight:1.6 }}>
            {passed
              ? `✅ Tu maîtrises "${lesson.title}". +${lesson.xp} XP crédités !`
              : `⚠️ Score insuffisant (75% requis). Revois la leçon et réessaie — aucun XP accordé.`}
          </div>
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          {!passed && (
            <button onClick={() => { setIdx(0); setSelected(null); setShowResult(false); setScore(0); setFinished(false); setQuiz(null); setLoading(true);
              fetchQuiz(lesson.title, mod.title).then(q => { setQuiz(q); setLoading(false); }).catch(() => { setError("Erreur."); setLoading(false); });
            }} style={{ padding:"12px 24px", borderRadius:12, background:C.amber, color:"#fff", border:"none", cursor:"pointer", fontWeight:700 }}>
              🔄 Réessayer
            </button>
          )}
          <button onClick={() => onComplete(passed, score, quiz.questions.length)}
            style={{ padding:"12px 24px", borderRadius:12, background: passed ? C.green : C.slate, color:"#fff", border:"none", cursor:"pointer", fontWeight:700 }}>
            {passed ? "Continuer →" : "Retour"}
          </button>
        </div>
      </div>
    );
  }

  const q = quiz.questions[idx];
  return (
    <div style={{ maxWidth:560, margin:"0 auto", padding:"24px 16px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, fontSize:22 }}>←</button>
        <div style={{ fontSize:13, color:C.muted, fontWeight:600 }}>{idx+1} / {quiz.questions.length}</div>
        <div style={{ width:32 }}/>
      </div>
      <div style={{ background:C.border, borderRadius:8, height:8, marginBottom:24, overflow:"hidden" }}>
        <div style={{ width:`${((idx+1)/quiz.questions.length)*100}%`, height:"100%", background:mod.color, borderRadius:8, transition:"width .3s" }}/>
      </div>
      <div style={{ fontSize:17, fontWeight:700, color:C.text, lineHeight:1.5, marginBottom:24 }}>{q.question}</div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {q.choices.map((ch, i) => {
          let bg = C.card, border2 = `1.5px solid ${C.border}`, col = C.text;
          if (showResult) {
            if (i === q.correct) { bg="#E8F5E9"; border2=`2px solid ${C.greenL}`; col=C.green; }
            else if (i === selected) { bg="#FFEBEE"; border2=`2px solid ${C.red}`; col=C.red; }
          } else if (selected === i) {
            bg = mod.lightColor; border2 = `2px solid ${mod.color}`; col = mod.color;
          }
          return (
            <div key={i}
              onClick={() => { if (!showResult) setSelected(i); }}
              style={{
                padding:"14px 18px", borderRadius:12, cursor: showResult ? "default" : "pointer",
                background: bg, border: border2, color: col,
                fontWeight: showResult && i === q.correct ? 700 : 500,
                fontSize:14, lineHeight:1.4, transition:"all .15s"
              }}>
              {ch}
            </div>
          );
        })}
      </div>
      {showResult && (
        <div style={{
          marginTop:16, padding:14, borderRadius:12,
          background: selected === q.correct ? "#E8F5E9" : "#FFF3E0",
          border:`1.5px solid ${selected === q.correct ? C.greenL : C.amber}`,
          fontSize:13, color:C.text, lineHeight:1.5
        }}>
          {selected === q.correct ? "✅ " : "💡 "}{q.explanation}
        </div>
      )}
      <div style={{ marginTop:20, display:"flex", justifyContent:"flex-end" }}>
        {!showResult ? (
          <button
            disabled={selected === null}
            onClick={() => {
              setShowResult(true);
              if (selected === q.correct) setScore(s => s+1);
            }}
            style={{
              padding:"12px 28px", borderRadius:12, border:"none", cursor: selected === null ? "not-allowed" : "pointer",
              background: selected === null ? C.border : mod.color, color:"#fff",
              fontWeight:700, fontSize:14, opacity: selected === null ? .6 : 1
            }}>Valider</button>
        ) : (
          <button
            onClick={() => {
              if (idx < quiz.questions.length - 1) {
                setIdx(i => i+1); setSelected(null); setShowResult(false);
              } else { setFinished(true); }
            }}
            style={{ padding:"12px 28px", borderRadius:12, border:"none", cursor:"pointer",
              background: mod.color, color:"#fff", fontWeight:700, fontSize:14 }}>
            {idx < quiz.questions.length - 1 ? "Suivant →" : "Voir résultats"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function BRVMAcademy() {
  const [view, setView] = useState("home"); // home | module | quiz | stats
  const [selectedMod, setSelectedMod] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  // Persisted state
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState([]); // lesson ids
  const [lastActivity, setLastActivity] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Load
  useEffect(() => {
    (async () => {
      const data = await load("brvm-progress");
      if (data) {
        setXp(data.xp || 0);
        setStreak(data.streak || 0);
        setCompleted(data.completed || []);
        setLastActivity(data.lastActivity || null);
      }
      setLoaded(true);
    })();
  }, []);

  // Streak logic on load
  useEffect(() => {
    if (!loaded) return;
    const today = todayStr();
    const yesterday = new Date(Date.now()-86400000).toISOString().split("T")[0];
    if (lastActivity && lastActivity !== today && lastActivity !== yesterday) {
      setStreak(0);
    }
  }, [loaded]);

  const persist = useCallback(async (newXp, newStreak, newCompleted, newLast) => {
    await save("brvm-progress", { xp: newXp, streak: newStreak, completed: newCompleted, lastActivity: newLast });
  }, []);

  const modProgress = (mod) => ({
    completed: completed.filter(id => mod.lessons.some(l => l.id === id))
  });

  const isModLocked = (mod) => {
    if (mod.id === 1) return false;
    const prev = MODULES.find(m => m.id === mod.id - 1);
    if (!prev) return false;
    const prevDone = prev.lessons.filter(l => completed.includes(l.id)).length;
    return prevDone < prev.lessons.length;
  };

  const getCurrentLesson = (mod) => {
    for (const l of mod.lessons) {
      if (!completed.includes(l.id)) return l;
    }
    return mod.lessons[mod.lessons.length - 1];
  };

  const handleComplete = useCallback(async (passed, score, total) => {
    if (passed && activeLesson && !completed.includes(activeLesson.id)) {
      const newCompleted = [...completed, activeLesson.id];
      const lesson = activeLesson;
      const newXp = xp + lesson.xp;
      const today = todayStr();
      const yesterday = new Date(Date.now()-86400000).toISOString().split("T")[0];
      let newStreak = streak;
      if (lastActivity !== today) {
        newStreak = (lastActivity === yesterday) ? streak + 1 : 1;
      }
      setXp(newXp); setStreak(newStreak); setCompleted(newCompleted); setLastActivity(today);
      await persist(newXp, newStreak, newCompleted, today);
    }
    setActiveLesson(null);
    setView("module");
  }, [activeLesson, completed, xp, streak, lastActivity, persist]);

  const globalPct = Math.round((completed.length / MODULES.reduce((s,m)=>s+m.lessons.length,0))*100);

  if (!loaded) return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>📊</div>
        <div style={{ color:C.muted }}>Chargement...</div>
      </div>
    </div>
  );

  // ── QUIZ VIEW ──
  if (view === "quiz" && activeLesson && selectedMod) {
    return (
      <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ background:C.card, borderBottom:`1px solid ${C.border}`, padding:"14px 20px", display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ fontSize:22 }}>{selectedMod.icon}</div>
          <div>
            <div style={{ fontSize:11, color:C.muted, fontWeight:600 }}>Module {selectedMod.id}</div>
            <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{activeLesson.title}</div>
          </div>
        </div>
        <QuizScreen
          lesson={activeLesson}
          module={selectedMod}
          onComplete={handleComplete}
          onBack={() => { setView("module"); setActiveLesson(null); }}
        />
      </div>
    );
  }

  // ── MODULE VIEW ──
  if (view === "module" && selectedMod) {
    const prog = modProgress(selectedMod);
    const cur = getCurrentLesson(selectedMod);
    return (
      <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ background:selectedMod.color, padding:"24px 20px 28px" }}>
          <button onClick={() => setView("home")} style={{ background:"rgba(255,255,255,.2)", border:"none", color:"#fff", borderRadius:8, padding:"6px 12px", cursor:"pointer", marginBottom:16, fontSize:13 }}>← Retour</button>
          <div style={{ fontSize:40, marginBottom:8 }}>{selectedMod.icon}</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,.7)", fontWeight:600 }}>MODULE {selectedMod.id}</div>
          <div style={{ fontSize:20, fontWeight:800, color:"#fff", lineHeight:1.3 }}>{selectedMod.title}</div>
          <div style={{ marginTop:14, display:"flex", gap:16 }}>
            <div style={{ fontSize:12, color:"rgba(255,255,255,.8)" }}>{selectedMod.lessons.length} leçons</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,.8)" }}>{selectedMod.lessons.reduce((s,l)=>s+l.xp,0)} XP</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,.8)" }}>{prog.completed.length}/{selectedMod.lessons.length} terminées</div>
          </div>
        </div>
        <div style={{ padding:20, maxWidth:600, margin:"0 auto" }}>
          {selectedMod.lessons.map((lesson, i) => {
            const done = completed.includes(lesson.id);
            const isCurrent = lesson.id === cur.id && !done;
            return (
              <LessonRow key={lesson.id} lesson={lesson} done={done} current={isCurrent}
                onStart={(l) => { setActiveLesson(l); setView("quiz"); }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // ── STATS VIEW ──
  if (view === "stats") {
    const { level, title } = levelFromXP(xp);
    return (
      <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ background:C.navy, padding:"24px 20px" }}>
          <button onClick={() => setView("home")} style={{ background:"rgba(255,255,255,.15)", border:"none", color:"#fff", borderRadius:8, padding:"6px 12px", cursor:"pointer", marginBottom:16, fontSize:13 }}>← Retour</button>
          <div style={{ fontSize:22, fontWeight:800, color:"#fff" }}>Mes statistiques</div>
        </div>
        <div style={{ padding:20, maxWidth:600, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
            {[
              { label:"Niveau", val: level, sub: title, icon:"⭐" },
              { label:"XP Total", val: xp, sub:`/ ${TOTAL_XP} XP`, icon:"💎" },
              { label:"Streak", val:`${streak}j`, sub:"jours consécutifs", icon:"🔥" },
              { label:"Progression", val:`${globalPct}%`, sub:`${completed.length} leçons`, icon:"📈" },
            ].map((s,i) => (
              <div key={i} style={{ background:C.card, borderRadius:14, padding:18, border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:28, marginBottom:6 }}>{s.icon}</div>
                <div style={{ fontSize:26, fontWeight:800, color:C.text }}>{s.val}</div>
                <div style={{ fontSize:11, color:C.muted }}>{s.label}</div>
                <div style={{ fontSize:11, color:C.blue }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ background:C.card, borderRadius:14, padding:18, border:`1px solid ${C.border}`, marginBottom:12 }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:14 }}>Progression par module</div>
            {MODULES.map(mod => {
              const done = mod.lessons.filter(l => completed.includes(l.id)).length;
              const pct = Math.round((done/mod.lessons.length)*100);
              return (
                <div key={mod.id} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:12, color:C.text }}>{mod.icon} {mod.title}</span>
                    <span style={{ fontSize:12, fontWeight:700, color:mod.color }}>{pct}%</span>
                  </div>
                  <div style={{ background:C.bg, borderRadius:8, height:6, overflow:"hidden" }}>
                    <div style={{ width:`${pct}%`, height:"100%", background:mod.color, borderRadius:8 }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── HOME VIEW ──
  const nextMod = MODULES.find(m => {
    const done = m.lessons.filter(l => completed.includes(l.id)).length;
    return done < m.lessons.length && !isModLocked(m);
  });

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background:C.navy, padding:"16px 20px 20px", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,.2)" }}>
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div>
              <div style={{ fontSize:18, fontWeight:800, color:"#fff", letterSpacing:.5 }}>BRVM Academy</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.5)" }}>Formation • Analyse • Investissement</div>
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <StreakBadge streak={streak}/>
              <button onClick={() => setView("stats")} style={{
                background:"rgba(255,255,255,.12)", border:"none", color:"#fff",
                borderRadius:12, padding:"8px 14px", cursor:"pointer", fontSize:13
              }}>📊 Stats</button>
            </div>
          </div>
          <XPBar xp={xp}/>
          <div style={{ marginTop:10 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ fontSize:11, color:"rgba(255,255,255,.6)" }}>Progression globale</span>
              <span style={{ fontSize:11, color:"rgba(255,255,255,.6)" }}>{globalPct}% ({completed.length}/{MODULES.reduce((s,m)=>s+m.lessons.length,0)} leçons)</span>
            </div>
            <div style={{ background:"rgba(255,255,255,.15)", borderRadius:8, height:6, overflow:"hidden" }}>
              <div style={{ width:`${globalPct}%`, height:"100%", background:C.gold, borderRadius:8, transition:"width .4s" }}/>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:700, margin:"0 auto", padding:"20px 16px 40px" }}>
        {/* CTA continuer */}
        {nextMod && (
          <div style={{
            background:`linear-gradient(135deg, ${nextMod.color}, ${nextMod.color}CC)`,
            borderRadius:16, padding:"20px 22px", marginBottom:24, cursor:"pointer",
            display:"flex", alignItems:"center", gap:16
          }} onClick={() => { setSelectedMod(nextMod); setView("module"); }}>
            <div style={{ fontSize:36 }}>{nextMod.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.75)", fontWeight:600, marginBottom:2 }}>CONTINUER</div>
              <div style={{ fontSize:16, fontWeight:800, color:"#fff" }}>{nextMod.title}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,.75)", marginTop:3 }}>
                {nextMod.lessons.filter(l => completed.includes(l.id)).length}/{nextMod.lessons.length} leçons terminées
              </div>
            </div>
            <div style={{ color:"rgba(255,255,255,.8)", fontSize:22 }}>→</div>
          </div>
        )}

        {/* Alerte streak */}
        {streak === 0 && completed.length === 0 && (
          <div style={{
            background:"#FFF8E1", border:`1.5px solid ${C.gold}`, borderRadius:12,
            padding:"14px 16px", marginBottom:20, display:"flex", gap:12, alignItems:"flex-start"
          }}>
            <span style={{ fontSize:22 }}>🔥</span>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:C.amber }}>Commence aujourd'hui !</div>
              <div style={{ fontSize:12, color:C.slate, marginTop:2 }}>Complete au moins une leçon par jour pour maintenir ton streak. La régularité fait la différence.</div>
            </div>
          </div>
        )}

        {/* Grid modules */}
        <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:14 }}>Les 16 modules</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:12 }}>
          {MODULES.map(mod => (
            <ModuleCard
              key={mod.id} mod={mod}
              progress={modProgress(mod)}
              locked={isModLocked(mod)}
              onSelect={m => { setSelectedMod(m); setView("module"); }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
