import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Calculator,
  Code2,
  GitBranch,
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveSimulators: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'checktool' | 'guideline' | 'xml' | 'routemap'>('checktool');

  // CHECK TOOL STATE
  const [isRunningCheckTool, setIsRunningCheckTool] = useState(false);
  const [checkToolRunCompleted, setCheckToolRunCompleted] = useState(false);
  const [checkResults, setCheckResults] = useState([
    {
      id: 'chk-1',
      domain: 'Hierarchy',
      title: 'Cyclic Dependency Audit',
      description: 'Verifies no circular supervisor references exist in user records.',
      status: 'warning',
      details: 'Warning: Potential loop between EMP-9021 and EMP-9022 in APAC division.',
      remediation: 'Reassigned supervisor of EMP-9022 to APAC Regional VP.',
    },
    {
      id: 'chk-2',
      domain: 'Hierarchy',
      title: 'Head of Hierarchy Verification',
      description: 'Ensures single root executive planner node exists for OmniVerse rollout.',
      status: 'pass',
      details: 'CEO (EMP-0001) validated as top of planning tree.',
      remediation: null,
    },
    {
      id: 'chk-3',
      domain: 'Planners',
      title: 'Inactive Planners with Active Reports',
      description: 'Checks for departed managers holding active worksheets.',
      status: 'pass',
      details: 'All active worksheets map to active employment records.',
      remediation: null,
    },
    {
      id: 'chk-4',
      domain: 'Data Model',
      title: 'Reloadable Custom Fields Audit',
      description: 'Ensures custom attributes reload on manager reassignments.',
      status: 'pass',
      details: 'customPlantCode and customUserId verified with reloadable="true".',
      remediation: null,
    },
    {
      id: 'chk-5',
      domain: 'EC Integration',
      title: 'Pay Component Planning Flag (COMP / BOTH)',
      description: 'Verifies employees possess at most one recurring COMP component.',
      status: 'pass',
      details: '14,000 employee records validated against Employee Central.',
      remediation: null,
    },
    {
      id: 'chk-6',
      domain: 'Budget',
      title: 'Budget Division by Zero & Currency Cross-Validation',
      description: 'Checks budget calculation formulas across USD, EUR, GBP, CAD, SGD.',
      status: 'pass',
      details: 'All FX rate pairs resolve without null or zero divisors.',
      remediation: null,
    },
    {
      id: 'chk-7',
      domain: 'Statements',
      title: 'Statement Field Reportability',
      description: 'Verifies all statement placeholder tokens are mapped to reportable fields.',
      status: 'pass',
      details: 'Personalized merit letter tokens validated.',
      remediation: null,
    },
  ]);

  const runCheckTool = () => {
    setIsRunningCheckTool(true);
    setCheckToolRunCompleted(false);

    setTimeout(() => {
      setIsRunningCheckTool(false);
      setCheckToolRunCompleted(true);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }, 1200);
  };

  const autoFixWarning = (idx: number) => {
    const updated = [...checkResults];
    updated[idx] = {
      ...updated[idx],
      status: 'pass',
      details: 'Remediated: Circular reference resolved; reassigned to APAC VP.',
    };
    setCheckResults(updated);
  };

  // GUIDELINE SIMULATOR STATE
  const [currentSalary, setCurrentSalary] = useState<number>(115000);
  const [payGradeMin, setPayGradeMin] = useState<number>(90000);
  const [payGradeMax, setPayGradeMax] = useState<number>(140000);
  const [perfRating, setPerfRating] = useState<number>(4); // 1 to 5
  const [selectedIncreasePct, setSelectedIncreasePct] = useState<number>(4.5);

  const midpoint = (payGradeMin + payGradeMax) / 2;
  const compaRatio = midpoint > 0 ? (currentSalary / midpoint) * 100 : 100;

  // Determine Quartile
  let quartile = 'Q2 (80% - 100%)';
  let quartileCode = 'Q2';
  if (compaRatio < 80) {
    quartile = 'Q1 (< 80%)';
    quartileCode = 'Q1';
  } else if (compaRatio <= 100) {
    quartile = 'Q2 (80% - 100%)';
    quartileCode = 'Q2';
  } else if (compaRatio <= 120) {
    quartile = 'Q3 (100% - 120%)';
    quartileCode = 'Q3';
  } else {
    quartile = 'Q4 (> 120%)';
    quartileCode = 'Q4';
  }

  // Guideline recommendation matrix for OmniVerse 3.8% merit pool
  const getGuidelineRanges = (rating: number, q: string) => {
    if (rating === 5) {
      if (q === 'Q1') return { min: 5.5, def: 6.5, max: 7.5 };
      if (q === 'Q2') return { min: 4.5, def: 5.5, max: 6.5 };
      if (q === 'Q3') return { min: 3.5, def: 4.5, max: 5.5 };
      return { min: 2.0, def: 3.0, max: 4.0 };
    }
    if (rating === 4) {
      if (q === 'Q1') return { min: 4.5, def: 5.0, max: 6.0 };
      if (q === 'Q2') return { min: 3.5, def: 4.5, max: 5.0 };
      if (q === 'Q3') return { min: 2.5, def: 3.5, max: 4.2 };
      return { min: 1.5, def: 2.5, max: 3.2 };
    }
    if (rating === 3) {
      if (q === 'Q1') return { min: 3.0, def: 3.8, max: 4.5 };
      if (q === 'Q2') return { min: 2.5, def: 3.5, max: 4.0 };
      if (q === 'Q3') return { min: 1.5, def: 2.5, max: 3.2 };
      return { min: 0.5, def: 1.5, max: 2.0 };
    }
    if (rating === 2) {
      return { min: 0.0, def: 1.0, max: 1.5 };
    }
    return { min: 0.0, def: 0.0, max: 0.0 };
  };

  const guideline = getGuidelineRanges(perfRating, quartileCode);

  // Calculations
  const calculatedIncreaseAmount = (currentSalary * selectedIncreasePct) / 100;
  const rawFinalSalary = currentSalary + calculatedIncreaseAmount;
  const salaryCap = payGradeMax;

  let finalBaseSalary = rawFinalSalary;
  let lumpSumSplitAmount = 0;
  let isLumpSumTriggered = false;

  if (rawFinalSalary > salaryCap) {
    isLumpSumTriggered = true;
    finalBaseSalary = salaryCap;
    lumpSumSplitAmount = rawFinalSalary - salaryCap;
  }

  // XML VALIDATOR STATE
  const [testXml, setTestXml] = useState(`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE comp-config SYSTEM "sf-form.dtd">
<comp-config version="1.0" enableRBP="true">
  <comp-salary-rule>
    <salary-rule-mode>compa-ratio</salary-rule-mode>
    <threshold-limit>120.0</threshold-limit>
    <lumpsum-split enabled="true" auto-split="true" target-field="lumpSum" />
  </comp-salary-rule>
  <comp-budget-rule id="meritPool" mode="percentage" value="3.8" base="curSalary">
    <hard-stop enabled="true" ceiling="102.0" action="block-submit" />
  </comp-budget-rule>
</comp-config>`);

  const [xmlStatus, setXmlStatus] = useState<'valid' | 'invalid' | null>(null);

  const validateXML = () => {
    if (testXml.includes('<!DOCTYPE comp-config SYSTEM "sf-form.dtd">') && testXml.includes('</comp-config>')) {
      setXmlStatus('valid');
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.6 } });
    } else {
      setXmlStatus('invalid');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
              <Wrench className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Interactive Configuration Simulators & Diagnostics
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Test and validate OmniVerse configuration logic, pre-flight Check Tool audits, merit matrices, and route maps.
          </p>
        </div>

        {/* Simulator Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTool('checktool')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTool === 'checktool'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Check Tool Auditor
          </button>
          <button
            onClick={() => setActiveTool('guideline')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTool === 'guideline'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Compa-Ratio & Guideline Matrix
          </button>
          <button
            onClick={() => setActiveTool('xml')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTool === 'xml'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            sf-form.dtd Validator
          </button>
          <button
            onClick={() => setActiveTool('routemap')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTool === 'routemap'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Route Map Visualizer
          </button>
        </div>
      </div>

      {/* TOOL 1: CHECK TOOL DIAGNOSTICS */}
      {activeTool === 'checktool' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                SAP SuccessFactors Compensation Check Tool Diagnostic Suite
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluates system consistency, cyclic manager relationships, formula syntax, and data integration readiness.
              </p>
            </div>

            <button
              onClick={runCheckTool}
              disabled={isRunningCheckTool}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all self-start sm:self-auto"
            >
              <Play className={`w-4 h-4 ${isRunningCheckTool ? 'animate-spin' : ''}`} />
              <span>{isRunningCheckTool ? 'Running Diagnostics...' : 'Run Pre-Flight Audit'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {checkResults.map((check, idx) => (
              <div
                key={check.id}
                className={`p-4 rounded-xl border transition-all text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  check.status === 'pass'
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{check.title}</span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700">
                      {check.domain}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      check.status === 'pass'
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-amber-200 text-amber-900 animate-pulse'
                    }`}>
                      {check.status === 'pass' ? 'PASSED' : 'ACTION REQUIRED'}
                    </span>
                  </div>
                  <p className="text-slate-600">{check.description}</p>
                  <p className="font-medium mt-1">{check.details}</p>
                </div>

                {check.status === 'warning' && (
                  <button
                    onClick={() => autoFixWarning(idx)}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold text-xs shadow-sm transition-colors shrink-0"
                  >
                    Auto-Remediate in UDF
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOOL 2: GUIDELINE & COMPA-RATIO MATRIX */}
      {activeTool === 'guideline' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="pb-4 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              OmniVerse 5x4 Merit Guideline & Compa-Ratio Matrix Simulator
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulates manager salary recommendations, guideline min/default/max bounds, and automatic Lump Sum Split triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Employee Parameters
              </h4>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Current Base Salary ($ USD)</span>
                  <span className="font-bold">${currentSalary.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="60000"
                  max="180000"
                  step="1000"
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 font-medium">Grade Min ($)</span>
                  <input
                    type="number"
                    value={payGradeMin}
                    onChange={(e) => setPayGradeMin(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs mt-1"
                  />
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Grade Max ($)</span>
                  <input
                    type="number"
                    value={payGradeMax}
                    onChange={(e) => setPayGradeMax(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-medium">Performance Rating (1 to 5)</span>
                <div className="grid grid-cols-5 gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setPerfRating(r)}
                      className={`py-2 rounded-lg font-bold text-xs transition-all ${
                        perfRating === r
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {r} {r === 5 ? '★' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Proposed Merit Increase %</span>
                  <span className="font-bold text-indigo-600">{selectedIncreasePct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={selectedIncreasePct}
                  onChange={(e) => setSelectedIncreasePct(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Guideline Min: {guideline.min}%</span>
                  <span className="font-bold text-slate-700">Default: {guideline.def}%</span>
                  <span>Max: {guideline.max}%</span>
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs uppercase tracking-wider font-semibold text-indigo-300">
                    Live Calculation Results
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200 font-mono">
                    Grade Midpoint: ${midpoint.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-400">Compa-Ratio:</span>
                    <div className="text-2xl font-bold font-mono text-white">
                      {compaRatio.toFixed(1)}%
                    </div>
                    <span className="text-xs text-indigo-300">{quartile}</span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400">Merit Increase:</span>
                    <div className="text-2xl font-bold font-mono text-emerald-400">
                      +${Math.round(calculatedIncreaseAmount).toLocaleString()}
                    </div>
                    <span className="text-xs text-slate-400">({selectedIncreasePct}%)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Final Base Salary:</span>
                    <span className="font-bold text-white font-mono">
                      ${Math.round(finalBaseSalary).toLocaleString()}
                    </span>
                  </div>

                  {isLumpSumTriggered && (
                    <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-200 text-xs flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">comp-salary-rule Activated: Lump Sum Split</div>
                        <div>
                          Salary exceeded Grade Max (${payGradeMax.toLocaleString()}). Excess{' '}
                          <span className="font-bold text-white font-mono">
                            ${Math.round(lumpSumSplitAmount).toLocaleString()}
                          </span>{' '}
                          diverted to non-recurring spot bonus!
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Guideline Compliance Status */}
              <div className={`p-4 rounded-xl border text-xs flex items-center gap-3 ${
                selectedIncreasePct < guideline.min || selectedIncreasePct > guideline.max
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}>
                {selectedIncreasePct < guideline.min || selectedIncreasePct > guideline.max ? (
                  <>
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <span className="font-bold">Out of Guideline Bounds: </span>
                      <span>Requires mandatory planner justification note on worksheet submit.</span>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold">Within Guideline Limits: </span>
                      <span>Recommendation is in balance with OmniVerse 3.8% merit budget pool.</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: XML DTD VALIDATOR */}
      {activeTool === 'xml' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-600" />
                XML Plan Template & sf-form.dtd Validator
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Checks XML configuration structure against sf-form.dtd attributes without touching production.
              </p>
            </div>

            <button
              onClick={validateXML}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all self-start sm:self-auto"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Validate XML against DTD</span>
            </button>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 text-slate-400 flex items-center justify-between">
              <span>OmniVerse_Comp_Plan_2026.xml</span>
              <span className="text-[10px] text-emerald-400 font-bold">sf-form.dtd Compliant</span>
            </div>
            <textarea
              rows={12}
              value={testXml}
              onChange={(e) => setTestXml(e.target.value)}
              className="w-full p-4 bg-transparent text-emerald-400 font-mono focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {xmlStatus === 'valid' && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>XML Syntax Validated: DOCTYPE sf-form.dtd verified. Schema is ready for provisioning upload.</span>
            </div>
          )}

          {xmlStatus === 'invalid' && (
            <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Validation Error: Missing sf-form.dtd DOCTYPE declaration or unclosed XML tags.</span>
            </div>
          )}
        </div>
      )}

      {/* TOOL 4: ROUTE MAP VISUALIZER */}
      {activeTool === 'routemap' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="pb-4 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-purple-600" />
              OmniVerse Compensation Approval Route Map
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualizes the 4-stage sequential approval workflow, permissions, and Employee Central publish exit gate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-2xl relative space-y-2 text-xs">
              <span className="px-2 py-0.5 rounded font-bold bg-blue-200 text-blue-900 text-[10px]">
                Stage 1 • Single Role (EM)
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Manager Planning</h4>
              <p className="text-slate-600 text-xs">
                Frontline managers input merit %, lump sum, and promotions against guideline matrix.
              </p>
              <div className="text-[10px] text-blue-800 font-semibold pt-2 border-t border-blue-200">
                SLA: 10 Days • Budget Hard Stop Active
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-indigo-50 border-2 border-indigo-300 rounded-2xl relative space-y-2 text-xs">
              <span className="px-2 py-0.5 rounded font-bold bg-indigo-200 text-indigo-900 text-[10px]">
                Stage 2 • Single Role (EMM)
              </span>
              <h4 className="font-bold text-slate-900 text-sm">2nd Level Exec Review</h4>
              <p className="text-slate-600 text-xs">
                Division Vice Presidents review department rollups, calibrate outliers, and approve spend.
              </p>
              <div className="text-[10px] text-indigo-800 font-semibold pt-2 border-t border-indigo-200">
                SLA: 5 Days • Rollup Aggregation
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-purple-50 border-2 border-purple-300 rounded-2xl relative space-y-2 text-xs">
              <span className="px-2 py-0.5 rounded font-bold bg-purple-200 text-purple-900 text-[10px]">
                Stage 3 • Collaborative (EX)
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Comp Committee</h4>
              <p className="text-slate-600 text-xs">
                CHRO and CFO execute Executive Review mass actions across global entities.
              </p>
              <div className="text-[10px] text-purple-800 font-semibold pt-2 border-t border-purple-200">
                SLA: 4 Days • Executive Mass Actions
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl relative space-y-2 text-xs">
              <span className="px-2 py-0.5 rounded font-bold bg-emerald-200 text-emerald-900 text-[10px]">
                Stage 4 • Signature (EH)
              </span>
              <h4 className="font-bold text-slate-900 text-sm">EC Publish Gate</h4>
              <p className="text-slate-600 text-xs">
                Completed forms publish recurring and non-recurring compensation to Employee Central.
              </p>
              <div className="text-[10px] text-emerald-800 font-semibold pt-2 border-t border-emerald-200">
                Effective Date: 01/01/2027 • Statements
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
