import { useState, useCallback } from 'react';
import { useAction, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function SpyPage() {
  const [comps, setComps] = useState(''); const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false); const [result, setResult] = useState<any>(null);
  const analyze = useAction(api.ai.analyze); const save = useMutation(api.functions.saveAnalysis);

  const handleAnalyze = useCallback(async () => {
    if (!comps.trim()) return; setLoading(true);
    const list = comps.split(',').map(s => s.trim()).filter(Boolean);
    try {
      const r = await analyze({ competitors: list, industry: industry || undefined }); setResult(r); await save({ competitors: list, industry: industry || undefined, ...r });
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, [comps, industry, analyze, save]);

  return (
    <div className="mc"><div className="pg">
      <h1 className="title">Spy on Your <span className="a">Competitors</span></h1>
      <p className="sub">Enter competitor names or URLs and get a detailed competitive analysis.</p>
      <input className="inp" value={comps} onChange={e => setComps(e.target.value)} placeholder="Competitors (comma-separated, e.g. Notion, Coda, Obsidian)" />
      <input className="inp" value={industry} onChange={e => setIndustry(e.target.value)} placeholder="Industry (optional, e.g. Productivity Software)" />
      <button className="btn" disabled={!comps.trim() || loading} onClick={handleAnalyze}>{loading ? '⏳ Analyzing...' : '🔍 Analyze Competitors'}</button>
      {loading && <div className="ld"><span /><span /><span /></div>}
      {result && !loading && <>
        {result.overview && <div className="overview-box">📊 {result.overview}</div>}
        {result.comparison?.map((c: any, i: number) => (
          <div key={i} className="comp-card">
            <div className="comp-name">{c.name} <span className={`threat ${c.threatLevel}`}>{c.threatLevel} threat</span></div>
            <div className="sw-grid">
              <div className="sw str"><h4>✓ Strengths</h4><ul>{c.strengths?.map((s: string, j: number) => <li key={j}>{s}</li>)}</ul></div>
              <div className="sw wk"><h4>✗ Weaknesses</h4><ul>{c.weaknesses?.map((w: string, j: number) => <li key={j}>{w}</li>)}</ul></div>
            </div>
            <div className="uv">💎 <strong>Unique Value:</strong> {c.uniqueValue}</div>
          </div>
        ))}
        {result.opportunities?.length > 0 && <div className="section"><div className="section-title">🎯 Opportunities</div>{result.opportunities.map((o: string, i: number) => <div key={i} className="opp-item">✦ {o}</div>)}</div>}
        {result.recommendations?.length > 0 && <div className="section"><div className="section-title">💡 Recommendations</div>{result.recommendations.map((r: string, i: number) => <div key={i} className="rec-item">→ {r}</div>)}</div>}
      </>}
    </div></div>
  );
}

function App() {
  return (<BrowserRouter><div className="app">
    <header className="hdr"><a href="/"><span style={{ fontSize: '1.5rem' }}>🔍</span><div><h1>CompetitorSpy</h1></div></a></header>
    <Routes><Route path="/" element={<SpyPage />} /></Routes>
    <footer className="ftr">© {new Date().getFullYear()} CompetitorSpy — An AVS Media App.</footer>
  </div></BrowserRouter>);
}
export default App;
