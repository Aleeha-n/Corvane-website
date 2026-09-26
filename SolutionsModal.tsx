import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { useModalBehavior } from '../hooks/useModalBehavior';

interface SolutionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: (solutionTitle?: string) => void;
}

export const SolutionsModal: React.FC<SolutionsModalProps> = ({
  isOpen,
  onClose,
  onOpenQuote,
}) => {
  const dialogRef = useModalBehavior(isOpen, onClose);

  if (!isOpen) return null;

  const industries = [
    {
      title: 'Automotive & Heavy Machinery',
      desc: 'Complete project cargo, oversized vehicle transport, RO-RO, and containerized CKD/SKD automotive components.',
      tags: ['Flat racks', 'Break bulk', 'Route surveys', 'Engine blocks'],
    },
    {
      title: 'Industrial Manufacturing & Engineering',
      desc: 'Raw materials, precision equipment, hydraulic systems, and spare parts forwarded under strict delivery schedules.',
      tags: ['FCL ocean', 'Air express', 'Customs tariff concessions'],
    },
    {
      title: 'Perishables, Food & Agriculture',
      desc: 'Temperature-controlled reefer containers and refrigerated air freight strictly compliant with DAFF Australian biosecurity standards.',
      tags: ['Reefer 20/40ft', 'Cold chain monitoring', 'DAFF clearance'],
    },
    {
      title: 'Retail, FMCG & Apparel',
      desc: 'High-turnover retail stock, 3PL warehousing in Port Melbourne VIC, cross-docking, pick and pack, and wharf cartage.',
      tags: ['Consolidation LCL', 'Barcode tracking', 'Store distribution'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#243673]/40 transition-opacity"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Solutions by industry sector"
        className="relative w-full max-w-3xl bg-white text-[#243673] rounded shadow-2xl border border-[#243673]/10 overflow-hidden z-10 my-8 focus:outline-none"
      >
        <div className="p-6 border-b border-[#243673]/10 flex items-center justify-between bg-[#F4F6FA]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C2410C] font-semibold">
              <span>Industry Specialisations</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#243673] mt-1">
              Solutions by Industry Sector
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-[#C2410C] rounded-lg hover:bg-[#243673]/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
          <p className="text-xs sm:text-sm text-slate-600">
            Different industries need different handling. Here is how we approach the four sectors we move the most freight for.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="p-5 rounded bg-white border border-[#243673]/15 hover:border-[#FA6000] transition-colors flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-display text-base font-bold text-[#243673]">
                    {ind.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#243673]/10">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {ind.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4F6FA] border border-[#243673]/10 text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenQuote(ind.title);
                    }}
                    className="text-xs font-semibold text-[#C2410C] hover:text-[#FF8A42] flex items-center gap-1"
                  >
                    <span>Request Industry Solution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#F4F6FA] border-t border-[#243673]/10 flex items-center justify-between text-xs text-slate-500">
          <span>Custom multi-modal routing across air, ocean, and wharf transport.</span>
          <button
            onClick={onClose}
            className="text-[#243673] hover:text-[#C2410C] font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
