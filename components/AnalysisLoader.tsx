import React, { useEffect, useState } from 'react';
import { BrainCircuit, Server, CheckCircle2 } from 'lucide-react';

const AnalysisLoader: React.FC = () => {
  const [stage, setStage] = useState(0);
  const stages = [
    "Connecting to Gemini AI Neural Network...",
    "Analyzing industry benchmarks...",
    "Evaluating competitive landscape...",
    "Calculating growth trajectories...",
    "Finalizing strategic recommendations..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStage(prev => {
        if (prev < stages.length - 1) return prev + 1;
        return prev;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="relative w-32 h-32 mb-12">
        {/* Pulsing rings */}
        <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping" />
        <div className="absolute inset-0 border-4 border-blue-500/50 rounded-full animate-ping delay-150" />
        <div className="absolute inset-0 bg-blue-600/10 rounded-full backdrop-blur-sm flex items-center justify-center border border-blue-400">
           <BrainCircuit className="text-blue-400 w-16 h-16 animate-pulse" />
        </div>
      </div>

      <div className="max-w-md w-full glass-panel rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">Generating Growth Audit</h3>
        <div className="space-y-4">
          {stages.map((text, index) => (
            <div key={index} className={`flex items-center gap-3 transition-all duration-500 ${index > stage ? 'opacity-30' : 'opacity-100'}`}>
              {index < stage ? (
                <CheckCircle2 className="text-emerald-400 w-5 h-5 flex-shrink-0" />
              ) : index === stage ? (
                <Server className="text-blue-400 w-5 h-5 animate-bounce flex-shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex-shrink-0" />
              )}
              <span className={`text-sm ${index === stage ? 'text-white font-medium' : 'text-slate-400'}`}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisLoader;
