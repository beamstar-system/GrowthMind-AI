import React, { useState } from 'react';
import { AppState, UserInput, AuditResult, LeadInfo } from './types';
import Hero from './components/Hero';
import AssessmentForm from './components/AssessmentForm';
import AnalysisLoader from './components/AnalysisLoader';
import LeadCapture from './components/LeadCapture';
import ResultsDashboard from './components/ResultsDashboard';
import { generateGrowthAudit } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  
  // Data State
  const [userData, setUserData] = useState<UserInput>({
    industry: '',
    role: '',
    companySize: '',
    revenueRange: '',
    primaryChallenge: '',
    marketingChannels: []
  });

  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [leadInfo, setLeadInfo] = useState<LeadInfo | null>(null);

  const updateUserData = (key: keyof UserInput, value: any) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };

  const handleAssessmentSubmit = async () => {
    setAppState(AppState.ANALYZING);
    try {
      // Fetch AI results
      const result = await generateGrowthAudit(userData);
      setAuditResult(result);
      
      // Artificial delay to let the animation play out and build suspense
      setTimeout(() => {
        setAppState(AppState.LEAD_CAPTURE);
      }, 3000);
    } catch (error) {
      console.error("Failed to generate audit", error);
      // In a real app, handle error state gracefully
      setAppState(AppState.ASSESSMENT);
    }
  };

  const handleLeadSubmit = (info: LeadInfo) => {
    setLeadInfo(info);
    // In a real app, you would send this to your CRM/Backend here
    console.log("Lead Captured:", info);
    console.log("Audit Data:", userData);
    setAppState(AppState.RESULTS);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* Navigation / Header Logo (Always visible except dashboard maybe) */}
      {appState !== AppState.RESULTS && (
         <div className="fixed top-0 left-0 w-full p-6 z-50 pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/50">G</div>
              <span className="font-bold text-xl tracking-tight text-white">GrowthMind</span>
            </div>
         </div>
      )}

      {/* State Router */}
      <main>
        {appState === AppState.LANDING && (
          <Hero onStart={() => setAppState(AppState.ASSESSMENT)} />
        )}

        {appState === AppState.ASSESSMENT && (
          <AssessmentForm 
            data={userData} 
            updateData={updateUserData} 
            onSubmit={handleAssessmentSubmit} 
          />
        )}

        {appState === AppState.ANALYZING && (
          <AnalysisLoader />
        )}

        {appState === AppState.LEAD_CAPTURE && auditResult && (
          <LeadCapture 
            previewScore={auditResult.overallScore} 
            onSubmit={handleLeadSubmit} 
          />
        )}

        {appState === AppState.RESULTS && auditResult && leadInfo && (
          <ResultsDashboard results={auditResult} lead={leadInfo} />
        )}
      </main>

    </div>
  );
};

export default App;
