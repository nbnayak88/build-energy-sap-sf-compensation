import { Milestone, Phase, ProjectIssue, StickyNote } from '../types/journal';

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeCSV(val: string | number | boolean | undefined | null): string {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export function exportMilestonesToCSV(milestones: Milestone[], phases: Phase[]) {
  const phaseMap = new Map(phases.map(p => [p.id, p.title]));
  
  const headers = [
    'Milestone Number',
    'Milestone Title',
    'Phase',
    'Status',
    'Progress %',
    'Tasks Completed',
    'Total Tasks',
    'Assignee Name',
    'Assignee Role',
    'Due Date',
    'Completed Date',
    'Dependencies',
    'OmniVerse Context',
    'Key Deliverables'
  ];

  const rows = milestones.map(m => {
    const completedTasks = m.tasks.filter(t => t.completed).length;
    const progress = m.tasks.length ? Math.round((completedTasks / m.tasks.length) * 100) : (m.status === 'completed' ? 100 : 0);
    
    return [
      escapeCSV(m.number),
      escapeCSV(m.title),
      escapeCSV(phaseMap.get(m.phaseId) || m.phaseId),
      escapeCSV(m.status.toUpperCase()),
      escapeCSV(`${progress}%`),
      escapeCSV(completedTasks),
      escapeCSV(m.tasks.length),
      escapeCSV(m.assignee.name),
      escapeCSV(m.assignee.role),
      escapeCSV(m.dueDate),
      escapeCSV(m.completedDate || 'N/A'),
      escapeCSV(m.dependencies.join('; ') || 'None'),
      escapeCSV(m.omniVerseContext),
      escapeCSV(m.deliverables.join('; '))
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  downloadFile(csvContent, `OmniVerse_Comp_Configuration_Milestones_${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv;charset=utf-8;');
}

export function exportIssuesToCSV(issues: ProjectIssue[]) {
  const headers = [
    'Issue ID',
    'Title',
    'Severity',
    'Status',
    'Phase',
    'Milestone ID',
    'Assignee',
    'Reporter',
    'Reported Date',
    'Description',
    'Resolution Notes'
  ];

  const rows = issues.map(iss => [
    escapeCSV(iss.id),
    escapeCSV(iss.title),
    escapeCSV(iss.severity.toUpperCase()),
    escapeCSV(iss.status.toUpperCase()),
    escapeCSV(iss.phaseId),
    escapeCSV(iss.milestoneId),
    escapeCSV(iss.assignee),
    escapeCSV(iss.reporter),
    escapeCSV(iss.reportedDate),
    escapeCSV(iss.description),
    escapeCSV(iss.resolutionNotes || 'In Progress')
  ].join(','));

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  downloadFile(csvContent, `OmniVerse_Comp_Issue_Log_${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv;charset=utf-8;');
}

export function exportStickyNotesToCSV(notes: StickyNote[]) {
  const headers = [
    'Note ID',
    'Title',
    'Color',
    'Pinned',
    'Author',
    'Created At',
    'Tags',
    'Milestone Ref',
    'Content'
  ];

  const rows = notes.map(n => [
    escapeCSV(n.id),
    escapeCSV(n.title),
    escapeCSV(n.color),
    escapeCSV(n.pinned ? 'YES' : 'NO'),
    escapeCSV(n.author),
    escapeCSV(n.createdAt),
    escapeCSV(n.tags.join('; ')),
    escapeCSV(n.milestoneId || 'Global'),
    escapeCSV(n.content)
  ].join(','));

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  downloadFile(csvContent, `OmniVerse_Comp_StickyNotes_${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv;charset=utf-8;');
}

export function triggerBrowserPrint() {
  try {
    if (typeof window !== 'undefined') {
      window.print();
    }
  } catch (err) {
    console.warn('Browser print blocked or unsupported in current container:', err);
  }
}

export function exportDossierHTML(
  phases: Phase[],
  milestones: Milestone[],
  issues: ProjectIssue[],
  stickyNotes: StickyNote[]
) {
  const completedMilestones = milestones.filter(m => m.status === 'completed');
  const totalTasks = milestones.reduce((sum, m) => sum + m.tasks.length, 0);
  const completedTasks = milestones.reduce((sum, m) => sum + m.tasks.filter(t => t.completed).length, 0);
  const taskPct = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OmniVerse Energy Ltd. - Compensation Configuration Sequence Journal Dossier</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 40px; color: #1e293b; line-height: 1.5; }
    h1 { color: #0f172a; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 8px; }
    .badge { display: inline-block; background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 8px; }
    .meta { font-size: 13px; color: #64748b; margin-bottom: 24px; }
    .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 32px; }
    .metric-value { font-size: 22px; font-weight: bold; color: #2563eb; }
    .metric-label { font-size: 12px; color: #64748b; }
    .phase-block { margin-bottom: 28px; }
    .phase-title { background: #f1f5f9; padding: 8px 12px; border-radius: 6px; font-weight: bold; font-size: 14px; margin-bottom: 12px; border-left: 4px solid #2563eb; }
    .milestone-item { border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 10px; background: #fff; }
    .status-completed { color: #166534; background: #dcfce7; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: bold; }
    .status-other { color: #1e40af; background: #dbeafe; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: bold; }
    .issues-table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
    .issues-table th, .issues-table td { border: 1px solid #e2e8f0; padding: 8px 12px; text-align: left; }
    .issues-table th { background: #f8fafc; font-weight: 600; }
    .signatures { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px; padding-top: 24px; border-top: 2px solid #0f172a; }
    .sig-box { border: 1px solid #cbd5e1; border-radius: 6px; padding: 16px; }
    .sig-line { border-bottom: 1px dashed #94a3b8; height: 40px; margin-top: 16px; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
  <div class="badge">SAP SuccessFactors Compensation Implementation Dossier</div>
  <h1>OmniVerse Energy Ltd. Configuration Sequence Journal</h1>
  <div class="meta">
    <strong>Lead Enterprise Architect:</strong> Dr. Niladri Nayak | <strong>Generated:</strong> ${new Date().toLocaleDateString()} | <strong>Environment:</strong> OmniVerse Production Tenant
  </div>

  <div class="summary-grid">
    <div>
      <div class="metric-label">Milestones Signed Off</div>
      <div class="metric-value">${completedMilestones.length} / ${milestones.length}</div>
    </div>
    <div>
      <div class="metric-label">Task Progress</div>
      <div class="metric-value">${taskPct}%</div>
    </div>
    <div>
      <div class="metric-label">Open Issues / Defects</div>
      <div class="metric-value">${issues.length}</div>
    </div>
    <div>
      <div class="metric-label">Planning Cycle Window</div>
      <div class="metric-value">2026 - 2027</div>
    </div>
  </div>

  <h2>1. Implementation Sequence & Milestones Audit</h2>
  ${phases.map(phase => {
    const pMilestones = milestones.filter(m => m.phaseId === phase.id);
    return `
      <div class="phase-block">
        <div class="phase-title">Phase ${phase.number}: ${phase.subtitle}</div>
        ${pMilestones.map(m => `
          <div class="milestone-item">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong>Step ${m.number}: ${m.title}</strong>
              <span class="${m.status === 'completed' ? 'status-completed' : 'status-other'}">${m.status.toUpperCase()}</span>
            </div>
            <div style="font-size: 12px; color: #475569; margin-bottom: 6px;">${m.shortDesc}</div>
            <div style="font-size: 11px; color: #64748b;">
              Assignee: ${m.assignee.name} (${m.assignee.role}) | Due: ${m.dueDate} ${m.completedDate ? `| Signed Off: ${m.completedDate}` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }).join('')}

  <h2>2. Configuration Defect & Issue Tracking Log</h2>
  <table class="issues-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Severity</th>
        <th>Status</th>
        <th>Title</th>
        <th>Assignee</th>
        <th>Reported Date</th>
      </tr>
    </thead>
    <tbody>
      ${issues.map(iss => `
        <tr>
          <td><strong>${iss.id}</strong></td>
          <td>${iss.severity.toUpperCase()}</td>
          <td>${iss.status.toUpperCase()}</td>
          <td>${iss.title}</td>
          <td>${iss.assignee}</td>
          <td>${iss.reportedDate}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="signatures">
    <div class="sig-box">
      <strong>Lead Consultant:</strong><br>Dr. Niladri Nayak
      <div class="sig-line"></div>
      <small style="color: #64748b;">Date & Signature</small>
    </div>
    <div class="sig-box">
      <strong>OmniVerse Project Sponsor:</strong><br>VP Global Total Rewards
      <div class="sig-line"></div>
      <small style="color: #64748b;">Date & Signature</small>
    </div>
    <div class="sig-box">
      <strong>OmniVerse Finance / Payroll:</strong><br>VP Financial Planning & Analysis
      <div class="sig-line"></div>
      <small style="color: #64748b;">Date & Signature</small>
    </div>
  </div>
</body>
</html>`;

  downloadFile(htmlContent, `OmniVerse_Comp_Implementation_Dossier_${new Date().toISOString().slice(0, 10)}.html`, 'text/html;charset=utf-8;');
}
