import React, { useState } from 'react';
import { UserInput } from '../types';
import { ChevronRight, ChevronLeft, Building2, Users, DollarSign, Target, Megaphone } from 'lucide-react';

interface AssessmentFormProps {
  data: UserInput;
  updateData: (key: keyof UserInput, value: any) => void;
  onSubmit: () => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ data, updateData, onSubmit }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else onSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return data.industry && data.role;
      case 2: return data.companySize && data.revenueRange;
      case 3: return data.primaryChallenge;
      case 4: return data.marketingChannels.length > 0;
      default: return false;
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-between mb-8 relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 rounded-full" />
      {[1, 2, 3, 4].map((s) => (
        <div 
          key={s}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
            step >= s 
              ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]' 
              : 'bg-slate-800 text-slate-500 border border-slate-700'
          }`}
        >
          {s}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-2xl rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Business Profile</h2>
        <p className="text-slate-400 text-center mb-8">Let's gather some intelligence to calibrate your audit.</p>

        {renderStepIndicator()}

        <div className="min-h-[300px]">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-slate-300 mb-1">
                  <Building2 size={18} /> Industry
                </label>
                <select 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={data.industry}
                  onChange={(e) => updateData('industry', e.target.value)}
                >
                  <option value="">Select an industry...</option>
                  <option value="SaaS">SaaS / Software</option>
                  <option value="Ecommerce">E-commerce</option>
                  <option value="Agency">Agency / Services</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-slate-300 mb-1">
                  <Users size={18} /> Your Role
                </label>
                <input 
                  type="text"
                  placeholder="e.g. CEO, Marketing Director"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={data.role}
                  onChange={(e) => updateData('role', e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-slate-300 mb-1">
                  <Users size={18} /> Company Size (Employees)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['1-10', '11-50', '51-200', '201-500', '500+'].map((size) => (
                    <button
                      key={size}
                      onClick={() => updateData('companySize', size)}
                      className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                        data.companySize === size 
                          ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                          : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-slate-300 mb-1">
                  <DollarSign size={18} /> Monthly Revenue
                </label>
                <select 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  value={data.revenueRange}
                  onChange={(e) => updateData('revenueRange', e.target.value)}
                >
                  <option value="">Select revenue range...</option>
                  <option value="Pre-revenue">Pre-revenue</option>
                  <option value="$1k - $10k">$1k - $10k</option>
                  <option value="$10k - $50k">$10k - $50k</option>
                  <option value="$50k - $200k">$50k - $200k</option>
                  <option value="$200k - $1M">$200k - $1M</option>
                  <option value="$1M+">$1M+</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-slate-300 mb-4">
                  <Target size={18} /> What is your primary growth bottleneck?
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Low Traffic / Awareness",
                    "Poor Lead Quality",
                    "Low Conversion Rates",
                    "High Customer Churn",
                    "Operational Inefficiency",
                    "Hiring / Team Scaling"
                  ].map((challenge) => (
                    <button
                      key={challenge}
                      onClick={() => updateData('primaryChallenge', challenge)}
                      className={`px-4 py-4 text-left rounded-lg border transition-all ${
                        data.primaryChallenge === challenge 
                          ? 'bg-blue-600 border-blue-500 text-white shadow-lg translate-x-1' 
                          : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:translate-x-1'
                      }`}
                    >
                      {challenge}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-slate-300 mb-4">
                  <Megaphone size={18} /> Active Marketing Channels (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "SEO / Content", "Paid Ads (PPC)", "Cold Email", 
                    "Social Media", "Events / Webinars", "Referrals", "Partnerships"
                  ].map((channel) => {
                    const isSelected = data.marketingChannels.includes(channel);
                    return (
                      <button
                        key={channel}
                        onClick={() => {
                          const newChannels = isSelected 
                            ? data.marketingChannels.filter(c => c !== channel)
                            : [...data.marketingChannels, channel];
                          updateData('marketingChannels', newChannels);
                        }}
                        className={`px-3 py-3 rounded-lg border text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-blue-300' 
                            : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        {channel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-slate-700/50">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className={`flex items-center px-6 py-2 rounded-lg transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <ChevronLeft size={20} className="mr-1" /> Back
          </button>
          
          <button 
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-500/25"
          >
            {step === totalSteps ? 'Generate Audit' : 'Next'}
            {step !== totalSteps && <ChevronRight size={20} className="ml-1" />}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AssessmentForm;
