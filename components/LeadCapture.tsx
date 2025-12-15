import React, { useState } from 'react';
import { Lock, FileCheck, Star } from 'lucide-react';
import { LeadInfo } from '../types';

interface LeadCaptureProps {
  onSubmit: (info: LeadInfo) => void;
  previewScore: number;
}

const LeadCapture: React.FC<LeadCaptureProps> = ({ onSubmit, previewScore }) => {
  const [info, setInfo] = useState<LeadInfo>({ name: '', email: '', companyName: '' });
  const [errors, setErrors] = useState<Partial<LeadInfo>>({});

  const validate = () => {
    const newErrors: Partial<LeadInfo> = {};
    if (!info.name.trim()) newErrors.name = "Name is required";
    if (!info.email.includes('@')) newErrors.email = "Valid email is required";
    if (!info.companyName.trim()) newErrors.companyName = "Company name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(info);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel max-w-lg w-full rounded-2xl p-8 md:p-10 shadow-2xl text-center relative overflow-hidden border border-slate-700/50">
        
        {/* Teaser Data */}
        <div className="mb-8">
           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 mb-4">
              <span className="text-3xl font-bold text-white">{previewScore}</span>
           </div>
           <h2 className="text-2xl font-bold text-white">Your Growth Audit is Ready</h2>
           <p className="text-slate-400 mt-2">
             We've identified 3 critical opportunities to increase your revenue.
           </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 mb-8 text-left border border-slate-700/50">
          <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Report Includes:</h4>
          <ul className="space-y-2">
            <li className="flex items-center text-slate-400 text-sm">
              <FileCheck className="w-4 h-4 text-emerald-400 mr-2" /> Comprehensive SWOT Analysis
            </li>
            <li className="flex items-center text-slate-400 text-sm">
              <FileCheck className="w-4 h-4 text-emerald-400 mr-2" /> 4-Quarter Revenue Projection Model
            </li>
            <li className="flex items-center text-slate-400 text-sm">
              <FileCheck className="w-4 h-4 text-emerald-400 mr-2" /> Tech Stack Efficiency Audit
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <input 
              type="text" 
              placeholder="Full Name"
              className={`w-full bg-slate-900 border ${errors.name ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none`}
              value={info.name}
              onChange={(e) => setInfo({...info, name: e.target.value})}
            />
             {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="text-left">
             <input 
              type="email" 
              placeholder="Work Email Address"
              className={`w-full bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none`}
              value={info.email}
              onChange={(e) => setInfo({...info, email: e.target.value})}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="text-left">
             <input 
              type="text" 
              placeholder="Company Name"
              className={`w-full bg-slate-900 border ${errors.companyName ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none`}
              value={info.companyName}
              onChange={(e) => setInfo({...info, companyName: e.target.value})}
            />
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-white text-slate-900 font-bold py-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center shadow-lg"
          >
            <Lock className="w-4 h-4 mr-2" /> Unlock Full Report
          </button>
        </form>
        
        <p className="mt-4 text-xs text-slate-500">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </div>
  );
};

export default LeadCapture;
