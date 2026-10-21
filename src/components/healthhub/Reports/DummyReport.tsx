import React from 'react';
import { cn } from '../../../utils/cn';

const DummyReport: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Report Header */}
      <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Comprehensive Metabolic Panel</h2>
          <p className="text-sm text-slate-500">Patient ID: P-12345 | Date: Oct 21, 2026</p>
        </div>
        <div className="text-right">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">FINAL REPORT</span>
        </div>
      </div>

      {/* Report Body */}
      <div className="p-6 space-y-6">
        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
            <p className="text-xs font-medium text-emerald-600 uppercase">Glucose</p>
            <p className="text-2xl font-bold text-emerald-900">92 <span className="text-sm font-normal">mg/dL</span></p>
            <p className="text-xs text-emerald-700">Normal Range: 70-99</p>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
            <p className="text-xs font-medium text-amber-600 uppercase">Creatinine</p>
            <p className="text-2xl font-bold text-amber-900">1.4 <span className="text-sm font-normal">mg/dL</span></p>
            <p className="text-xs text-amber-700">High (Normal: 0.7-1.3)</p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-xs font-medium text-blue-600 uppercase">Albumin</p>
            <p className="text-2xl font-bold text-blue-900">4.2 <span className="text-sm font-normal">g/dL</span></p>
            <p className="text-xs text-blue-700">Normal Range: 3.4-5.4</p>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-medium">
                <th className="py-2">Test Parameter</th>
                <th className="py-2">Result</th>
                <th className="py-2">Reference Range</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 text-slate-700">BUN (Blood Urea Nitrogen)</td>
                <td className="py-3 font-semibold">22 mg/dL</td>
                <td className="py-3 text-slate-500">7-20 mg/dL</td>
                <td className="py-3"><span className="text-amber-600 text-xs font-bold">↑ HIGH</span></td>
              </tr>
              <tr>
                <td className="py-3 text-slate-700">Calcium</td>
                <td className="py-3 font-semibold">9.1 mg/dL</td>
                <td className="py-3 text-slate-500">8.5-10.2 mg/dL</td>
                <td className="py-3"><span className="text-emerald-600 text-xs font-bold">NORMAL</span></td>
              </tr>
              <tr>
                <td className="py-3 text-slate-700">Potassium</td>
                <td className="py-3 font-semibold">4.1 mEq/L</td>
                <td className="py-3 text-slate-500">3.5-5.1 mEq/L</td>
                <td className="py-3"><span className="text-emerald-600 text-xs font-bold">NORMAL</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Doctor's Note */}
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Clinical Impression</h4>
          <p className="text-sm text-slate-600 italic">
            "Patient shows slight elevation in creatinine and BUN, suggesting mild renal impairment. Recommend hydration and follow-up in 4 weeks."
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-100 border-t border-slate-200 text-center">
        <p className="text-[10px] text-slate-400">Digitally Signed by Dr. Sarah Jenkins, MD | Metropolis Laboratories</p>
      </div>
    </div>
  );
};

export default DummyReport;
