import React from 'react';
import { AuditResult, LeadInfo } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend 
} from 'recharts';
import { Check, AlertTriangle, TrendingUp, Download, Share2 } from 'lucide-react';

interface ResultsDashboardProps {
  results: AuditResult;
  lead: LeadInfo;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, lead }) => {
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 animate-fade-in pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Growth Audit Report</h1>
          <p className="text-slate-400">Prepared for <span className="text-white font-medium">{lead.companyName}</span></p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors">
            <Share2 size={16} className="mr-2" /> Share
          </button>
          <button className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
            <Download size={16} className="mr-2" /> Export PDF
          </button>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl border-l-4 border-blue-500">
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Overall Health Score</h3>
          <div className="flex items-end gap-3">
            <span className={`text-5xl font-bold ${getScoreColor(results.overallScore)}`}>
              {results.overallScore}
            </span>
            <span className="text-slate-500 mb-2">/ 100</span>
          </div>
          <p className="text-slate-400 text-sm mt-4">{results.executiveSummary}</p>
        </div>

        <div className="glass-panel p-6 rounded-xl col-span-2">
           <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-6">Efficiency Analysis</h3>
           <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={results.efficiencyMetrics}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Recommendations & SWOT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            <TrendingUp className="mr-2 text-blue-400" /> Strategic Recommendations
          </h2>
          <div className="space-y-4">
            {results.recommendations.map((rec, idx) => (
              <div key={idx} className="glass-panel p-5 rounded-lg border border-slate-700/50 hover:border-blue-500/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white">{rec.title}</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700">Effort: {rec.effort}</span>
                    <span className={`px-2 py-1 rounded text-xs border font-medium ${rec.impact === 'High' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>Impact: {rec.impact}</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">SWOT Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="glass-panel p-5 rounded-lg border border-emerald-500/20 bg-emerald-900/10">
                <h4 className="text-emerald-400 font-semibold mb-3 flex items-center"><Check size={16} className="mr-2"/> Strengths</h4>
                <ul className="space-y-2">
                  {results.strengths.map((s, i) => (
                    <li key={i} className="text-slate-300 text-sm flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></span>
                      {s}
                    </li>
                  ))}
                </ul>
             </div>
             <div className="glass-panel p-5 rounded-lg border border-red-500/20 bg-red-900/10">
                <h4 className="text-red-400 font-semibold mb-3 flex items-center"><AlertTriangle size={16} className="mr-2"/> Weaknesses</h4>
                <ul className="space-y-2">
                  {results.weaknesses.map((w, i) => (
                    <li key={i} className="text-slate-300 text-sm flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 mr-2 flex-shrink-0"></span>
                      {w}
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          <div className="glass-panel p-6 rounded-xl mt-4">
             <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-4">Projected Revenue Growth</h3>
             <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={results.revenueProjection}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} />
                    <YAxis stroke="#94a3b8" tick={{fontSize: 12}} tickFormatter={(val) => `$${val}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    />
                    <Legend />
                    <Bar dataKey="current" name="Current Trajectory" fill="#64748b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="potential" name="AI Optimized" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>

      </div>

      <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-xl p-8 text-center mt-12">
        <h2 className="text-2xl font-bold text-white mb-2">Ready to execute this plan?</h2>
        <p className="text-slate-300 mb-6 max-w-xl mx-auto">
          Our team of implementation specialists can help you deploy these strategies in under 30 days.
        </p>
        <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-colors shadow-xl">
          Schedule Consultation
        </button>
      </div>

    </div>
  );
};

export default ResultsDashboard;
