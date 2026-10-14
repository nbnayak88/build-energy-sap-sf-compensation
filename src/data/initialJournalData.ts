import { Phase, Milestone, StickyNote, CollaborationRoom, ProjectIssue } from '../types/journal';

export const INITIAL_PHASES: Phase[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Phase 1: Getting Started and Initial Preparation',
    subtitle: 'Scope, Readiness & Provisioning Setup',
    color: 'sky',
    badge: 'Foundation',
    description: 'Establish governance, align OmniVerse Energy Ltd. business rules with SAP SuccessFactors Compensation capabilities, locate authoritative implementation resources, and complete preliminary Provisioning, Upgrade Center, and Role-Based Permissions (RBP).',
    milestoneIds: ['m-1-1', 'm-1-2'],
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Phase 2: Core Configuration and Data Integration',
    subtitle: 'Data Architecture, UDF, Tables & EC Integration',
    color: 'indigo',
    badge: 'Integration',
    description: 'Determine system of record integrations, configure the User Data File (UDF), build currency and pay matrix tables, validate XML against sf-form.dtd, and establish bidirectional Employee Central (EC) field mapping and promotion rules.',
    milestoneIds: ['m-2-1', 'm-2-2', 'm-2-3', 'm-2-4', 'm-2-5'],
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Phase 3: Designing the Compensation Plan',
    subtitle: 'Plan Templates, Budgets, Guidelines & Hierarchies',
    color: 'emerald',
    badge: 'Plan Design',
    description: 'Design the core compensation plan template from SuccessStore, configure Salary and Stock worksheets, define hierarchy and route maps, establish cascading budgets, set up eligibility rules, and integrate performance rating sources.',
    milestoneIds: ['m-3-1', 'm-3-2', 'm-3-3', 'm-3-4', 'm-3-5', 'm-3-6'],
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'Phase 4: Running the Compensation Cycle',
    subtitle: 'Check Tool Audits, Worksheet Launches & Updates',
    color: 'amber',
    badge: 'Execution',
    description: 'Execute pre-flight Check Tool diagnostics, resolve cyclic dependencies, launch staggered worksheets across OmniVerse global entities, handle mid-cycle organizational updates, and manage planner membership.',
    milestoneIds: ['m-4-1', 'm-4-2', 'm-4-3'],
  },
  {
    id: 'phase-5',
    number: 5,
    title: 'Phase 5: Post-Planning and Reporting',
    subtitle: 'EC Publishing, Executive Review & Total Reward Statements',
    color: 'purple',
    badge: 'Finalization',
    description: 'Publish completed compensation records back to Employee Central recurring and non-recurring pay components, run Executive Review mass actions, configure Report Center canvases, and generate dynamic employee compensation statements.',
    milestoneIds: ['m-5-1', 'm-5-2', 'm-5-3'],
  },
];

export const INITIAL_MILESTONES: Milestone[] = [
  // PHASE 1
  {
    id: 'm-1-1',
    phaseId: 'phase-1',
    number: '1.1',
    title: 'Understand Functionality and Locate Authoritative Resources',
    shortDesc: 'Establish project scope, align OmniVerse Energy Ltd. objectives, and gather official SAP implementation assets.',
    omniVerseContext: 'OmniVerse Energy Ltd. operates across North America, EMEA, and APAC with 14,000 employees. Goal: standardize merit reviews, enforce budget caps, retain high-potential energy engineers, and automate total rewards.',
    deliverables: [
      'OmniVerse Compensation Objectives Charter',
      'Authoritative Resource Repository link list',
      'Consultant & OmniVerse Core Team RACI matrix',
      'SAP PartnerEdge course and XML template asset package'
    ],
    keyDecisions: [
      'Utilize Employee Central as the core System of Record for 85% of workforce, with legacy UDF feeds for newly acquired APAC units.',
      'Establish certified consultant governance via Partner Delivery Community and ONE Support Launchpad.',
      'Standardize on annual merit review with quarterly equity grant tracking.'
    ],
    detailedGuide: [
      'Summarize the core functionality of SAP SuccessFactors Compensation for OmniVerse Energy Ltd., focusing on standardizing compensation planning, assuring equitable pay distribution, and retaining top performers.',
      'Access SAP SuccessFactors Community and Partner Delivery Community for certified implementation best practices, release notes, and troubleshooting.',
      'Obtain SAP Activate project timeline templates from SAP PartnerEdge and verify "Production" status guides on the SAP Help Portal.',
      'Ensure the implementation team has access to SAP ONE Support Launchpad to log system tickets and monitor incident SLAs.',
      'Download the standard sf-form.dtd and base compensation course files to seed OmniVerse template building.'
    ],
    status: 'completed',
    assignee: {
      name: 'Dr. Niladri Nayak',
      role: 'Lead Enterprise Architect & SuccessFactors Consultant',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-10-18',
    completedDate: '2026-10-14',
    dependencies: [],
    xmlSnippet: `<!-- Initial Resource & Template Reference -->
<!DOCTYPE comp-config SYSTEM "sf-form.dtd">
<!-- Project: OmniVerse Energy Ltd. Global Compensation Cycle 2026-2027 -->`,
    checkToolTips: [
      'Verify consultant S-User ID authorizations for Provisioning and SAP Support Portal access.',
      'Ensure customer authorization letter on file for Provisioning modifications.'
    ],
    tasks: [
      { id: 't-1-1-1', title: 'Conduct discovery session with OmniVerse Energy Ltd. VP of Total Rewards', completed: true, isCritical: true },
      { id: 't-1-1-2', title: 'Download latest SAP Activate compensation project schedule from PartnerEdge', completed: true },
      { id: 't-1-1-3', title: 'Verify consultant provisioning credentials and Partner Delivery Community forum access', completed: true },
      { id: 't-1-1-4', title: 'Assemble base course and reference XML templates package for team review', completed: true }
    ]
  },
  {
    id: 'm-1-2',
    phaseId: 'phase-1',
    number: '1.2',
    title: 'Preliminary System Setup (Provisioning, Upgrades & RBP)',
    shortDesc: 'Enable essential features in Upgrade Center, configure Provisioning flags, and grant administrator role permissions.',
    omniVerseContext: 'OmniVerse administrator security groups must be segregated between Global System Admins, Regional Compensation Specialists, and Executive Reviewers.',
    deliverables: [
      'Upgrade Center Activation Audit Report',
      'Provisioning Feature Checklist Sign-Off',
      'OmniVerse Compensation Admin RBP Matrix'
    ],
    keyDecisions: [
      'Activate Reward and Recognition, Intelligent Services, and Role-Based Permissions (RBP) Upgrades simultaneously.',
      'Enable all Compensation Management settings in Provisioning under customer authorization before transitioning management to Compensation Home.',
      'Enforce full Administrator Permissions for System Admin role before importing data models.'
    ],
    detailedGuide: [
      'Navigate to Admin Center → Upgrade Center. Review and execute the recommended upgrades: "Reward and Recognition", "Intelligent Services", and "Compensation and Variable Pay Role-Based Permissions Upgrade".',
      'Log into Provisioning with customer authorization: enable Compensation management flags, multi-currency support, and audit trail retention.',
      'Post-provisioning, verify settings reflect within the Compensation Home interface for customer administrative autonomy.',
      'Configure Role-Based Permissions: Navigate to Admin Center → Manage Permission Roles → System Admin.',
      'Under Administrator Permissions, select "Manage Compensation & Variable Pay" → Select All; "Manage Compensation" → Select All.',
      'Under User Permissions, select "Compensation and Variable Pay" → Select All. Save changes, log out, and log back in to refresh permission caches.'
    ],
    status: 'completed',
    assignee: {
      name: 'Sarah Chen',
      role: 'OmniVerse Cloud Security & System Admin',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-10-21',
    completedDate: '2026-10-15',
    dependencies: ['m-1-1'],
    xmlSnippet: `<!-- RBP Verification Marker in Corporate Config -->
<permission-group name="OmniVerse_Comp_Admins">
  <permission id="manage-compensation-all" access="true" />
  <permission id="compensation-variable-pay-all" access="true" />
</permission-group>`,
    checkToolTips: [
      'Check Tool: Run Permission Role Validity check to confirm no orphaned security roles.',
      'Ensure admin users log out and log back in to bust security session cache.'
    ],
    tasks: [
      { id: 't-1-2-1', title: 'Execute Upgrade Center items: Reward & Recognition + Intelligent Services', completed: true, isCritical: true },
      { id: 't-1-2-2', title: 'Execute Compensation and Variable Pay RBP Upgrade in Upgrade Center', completed: true, isCritical: true },
      { id: 't-1-2-3', title: 'Enable Provisioning compensation switches for multi-currency & audit tracking', completed: true },
      { id: 't-1-2-4', title: 'Grant System Admin full permissions in Administrator & User Permission trees', completed: true, isCritical: true },
      { id: 't-1-2-5', title: 'Perform test login with non-admin planner to verify role segregation', completed: true }
    ]
  },

  // PHASE 2
  {
    id: 'm-2-1',
    phaseId: 'phase-2',
    number: '2.1',
    title: 'Data Integration Strategy & Configuration Workbook',
    shortDesc: 'Establish data intake architecture between EC / HRIS and formalize customer workbook requirements.',
    omniVerseContext: 'OmniVerse uses SAP SuccessFactors Employee Central as primary system of record. Two acquired joint ventures in Houston and Singapore rely on SFTP UDF data batch feeds.',
    deliverables: [
      'Signed OmniVerse Compensation Configuration Workbook (v2.4)',
      'Data Integration Mapping Blueprint',
      'Pre-delivered Standard vs Custom Compensation Fields Inventory'
    ],
    keyDecisions: [
      'Pull employee demographic, job, and current pay data live from Employee Central via MDF integration.',
      'Schedule daily SFTP batch ingestion for non-EC acquired personnel into the User Data File (UDF).',
      'Lock workbook specifications after formal sign-off to prevent out-of-scope schema drift during XML builds.'
    ],
    detailedGuide: [
      'Determine HRIS integration method: Most customers combining EC and Compensation pull employee records directly from EC.',
      'For external HRIS feeds, establish whether automated API, secure SFTP, or manual UDF batch uploads are utilized.',
      'Obtain the latest official SAP SuccessFactors Compensation Configuration Workbook from SAP PartnerEdge.',
      'Collaborate with OmniVerse stakeholders to review each sheet: General Settings, Salary Planning, Stock Rules, and Data Integration.',
      'Document every standard compensation field and custom field required (e.g., customDivisionCode, specialAllowances, plantLocation).',
      'Obtain formal sign-off from OmniVerse Total Rewards steering committee before initiating XML modifications.'
    ],
    status: 'in_progress',
    assignee: {
      name: 'Dr. Niladri Nayak',
      role: 'Lead Enterprise Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-10-25',
    dependencies: ['m-1-2'],
    xmlSnippet: `<!-- Configuration Workbook Field Map Specification -->
<comp-field-definition id="customPlantCode" type="string">
  <mapping source="EC" entity="jobInfo" field="location-id" />
</comp-field-definition>`,
    checkToolTips: [
      'Validate that every custom field documented in the workbook has an exact data type definition.',
      'Check data protection and privacy (DPP) requirements for sensitive compensation attributes.'
    ],
    tasks: [
      { id: 't-2-1-1', title: 'Download latest SAP PartnerEdge Compensation Configuration Workbook', completed: true },
      { id: 't-2-1-2', title: 'Complete Data Integration tab mapping standard fields to EC Job/Comp entities', completed: true, isCritical: true },
      { id: 't-2-1-3', title: 'Document custom fields inventory with field types and read/write visibility', completed: true },
      { id: 't-2-1-4', title: 'Conduct workbook sign-off meeting with OmniVerse project sponsor', completed: false, isCritical: true }
    ]
  },
  {
    id: 'm-2-2',
    phaseId: 'phase-2',
    number: '2.2',
    title: 'Manage User Data File (UDF) & Succession Data Model',
    shortDesc: 'Map general user fields, duplicate non-mappable fields, and enforce data cleaning standards.',
    omniVerseContext: 'OmniVerse records had leading zeros stripped in legacy payroll exports and mixed date formats (DD/MM/YYYY vs MM/DD/YYYY). Strict formatting rules must be applied.',
    deliverables: [
      'Succession Data Model XML with mapped custom fields',
      'Cleansed and validated UDF master test file',
      'Scheduled recurring UDF import job in Admin Center'
    ],
    keyDecisions: [
      'Duplicate non-mappable general fields (STATUS, USERID) into custom compensation fields so they can appear on worksheets.',
      'Strictly enforce MM/DD/YYYY date formatting and strip currency ($) and percentage (%) characters during ETL.',
      'Ensure all active employees exist in the UDF; inactive employees or missing records receive automatic N/A assignment.'
    ],
    detailedGuide: [
      'Identify and map general user and compensation fields within the UDF via the Succession Data Model XML.',
      'Note: Certain standard fields like STATUS and USERID cannot be mapped directly to compensation worksheet columns; duplicate them as custom fields (e.g., customStatus, customUserId) in the data model.',
      'Observe strict data import guidelines: Never import currency symbols ($) or percent signs (%); avoid leading zeros in numeric IDs; strictly use MM/DD/YYYY for all date fields.',
      'Ensure all active employees are present in the UDF before planning launch; absent users cause worksheet calculation failures.',
      'Import the UDF without compensation fields during baseline testing, and with compensation fields on a need-only basis.',
      'Configure scheduled recurring UDF imports in Admin Center if continuous salary baseline refreshes are required.'
    ],
    status: 'in_progress',
    assignee: {
      name: 'Elena Rostova',
      role: 'Senior Data Integration Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-10-28',
    dependencies: ['m-2-1'],
    xmlSnippet: `<!-- Succession Data Model UDF Custom Mapping -->
<standard-element id="customStatus" max-length="100" required="false">
  <label>OmniVerse Employee Status</label>
</standard-element>`,
    checkToolTips: [
      'Run Data File Validator in Admin Center prior to batch import.',
      'Verify that inactive planners do not have active reports without a designated surrogate planner.'
    ],
    tasks: [
      { id: 't-2-2-1', title: 'Review Succession Data Model for duplicate custom field mappings (STATUS, USERID)', completed: true },
      { id: 't-2-2-2', title: 'Run regex sanitation script to remove currency symbols and force MM/DD/YYYY dates', completed: true, isCritical: true },
      { id: 't-2-2-3', title: 'Execute test import of 500-record UDF sample in staging environment', completed: true },
      { id: 't-2-2-4', title: 'Schedule automated daily SFTP delta import for non-EC business units', completed: false }
    ]
  },
  {
    id: 'm-2-3',
    phaseId: 'phase-2',
    number: '2.3',
    title: 'Create Compensation Tables & Plan-Specific Data',
    shortDesc: 'Build Currency Conversion, Salary Pay Matrix, Job Selector, and Stock Guideline tables.',
    omniVerseContext: 'OmniVerse trades globally: Base functional currency is USD, with operations in EUR, GBP, CAD, and SGD. Salary pay ranges differ across engineering pay grades 10 to 18.',
    deliverables: [
      '2026-2027 Currency Conversion Table (CSV)',
      'Salary Pay Matrix (Pay Ranges Min/Mid/Max by Grade and Country)',
      'Job Code & Pay Grade Mapping Table for Job Selector',
      'Stock Value & Factor Tables for Long-Term Incentives (LTI)'
    ],
    keyDecisions: [
      'Create a brand-new Currency Conversion table specifically for planning year 2026-2027 (do not alter prior cycle tables).',
      'Salary Pay Matrix configured with 3 key attributes: Pay Grade, Country, and Location Tier.',
      'Enable encryption for proprietary compensation lookup tables holding executive retention factors.'
    ],
    detailedGuide: [
      'Currency Conversion Tables: Create a conversion table in CSV format (no header row, no trailing commas, exact ISO code pairs: Source, Target, Exchange Rate). Create a new table for each annual planning cycle.',
      'Salary Pay Matrix (Pay Ranges): Define minimum, midpoint, and maximum salaries for each pay grade. Supports up to 3 attributes without EC, unlimited with EC integration.',
      'Manager Promotion Map: Define allowable target pay grades when managers recommend promotions on worksheets.',
      'Job Code and Pay Grade Mapping Tables: Required if enabling the Job Selector tool. Two-column CSV (Jobcode, Paygrade).',
      'Lookup Tables: Build multi-attribute tables for complex formula calculations (e.g., location allowances). Encrypt sensitive tables in Admin Center.',
      'Stock Tables (LTI): Create Stock Value, Stock Factor, and Stock Participation Guideline tables for RSU and stock option distribution.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Marcus Vance',
      role: 'Compensation Specialist & Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-11-02',
    dependencies: ['m-2-2'],
    xmlSnippet: `<!-- Currency Table Reference in XML -->
<comp-currency-conversion-table id="OmniVerse_FX_2026">
  <currency-pair from="EUR" to="USD" rate="1.0850" />
  <currency-pair from="GBP" to="USD" rate="1.2950" />
  <currency-pair from="SGD" to="USD" rate="0.7550" />
</comp-currency-conversion-table>`,
    checkToolTips: [
      'Ensure exchange rate CSV has no currency symbols and no header row.',
      'Verify midpoint calculation matches (Min + Max) / 2 in pay matrix.'
    ],
    tasks: [
      { id: 't-2-3-1', title: 'Format and upload 2026 Currency Conversion CSV with USD/EUR/GBP/CAD/SGD rates', completed: false, isCritical: true },
      { id: 't-2-3-2', title: 'Upload Salary Pay Matrix table for Grades 10 through 18 across 4 geographic tiers', completed: false, isCritical: true },
      { id: 't-2-3-3', title: 'Configure Job Code to Pay Grade mapping table for Job Selector tool', completed: false },
      { id: 't-2-3-4', title: 'Configure Stock Value and Guideline tables for Long-Term Incentive plans', completed: false }
    ]
  },
  {
    id: 'm-2-4',
    phaseId: 'phase-2',
    number: '2.4',
    title: 'XML DTD Validation (sf-form.dtd & Schema Audit)',
    shortDesc: 'Download plan XML, configure local DTD validation, modify tags, and validate against sf-form.dtd.',
    omniVerseContext: 'OmniVerse requires specialized lump-sum split calculations and custom executive review filters that necessitate precise XML edits rather than purely UI-based setup.',
    deliverables: [
      'Locally validated XML Plan file',
      'DTD Compliance Verification Log',
      'Clean XML Plan uploaded to Provisioning / Compensation Home'
    ],
    keyDecisions: [
      'Use sf-form.dtd as the absolute source of truth XML dictionary for all element and attribute definitions.',
      'Switch XML DOCTYPE system URL to local relative path during editing to prevent network timeouts during syntax checks.',
      'Strictly prohibit uploading unvalidated XML to customer production tenant.'
    ],
    detailedGuide: [
      'Understand Data Type Definition (DTD): The sf-form.dtd acts as the XML dictionary defining legal tags, attributes, and nesting rules for SAP SuccessFactors Compensation.',
      'Download the target XML plan from Provisioning or clone a pre-configured plan template.',
      'Copy sf-form.dtd into the exact same folder as the XML plan on your local workstation.',
      'Open both files in an XML editor (e.g., VS Code or Oxygen XML).',
      'Modify the SYSTEM declaration URL at the top of the XML plan to reference the local sf-form.dtd file for instantaneous offline validation.',
      'Implement desired configuration enhancements (e.g., comp-salary-rule, custom reloadable flags, hidden columns).',
      'Run the XML validator. Confirm zero schema errors or unclosed elements.',
      'Re-upload the validated XML plan as a new plan or update the existing template.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Dr. Niladri Nayak',
      role: 'Lead Enterprise Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-11-06',
    dependencies: ['m-2-3'],
    xmlSnippet: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE comp-config SYSTEM "sf-form.dtd">
<comp-config version="1.0" enableRBP="true">
  <!-- Validated against sf-form.dtd -->
</comp-config>`,
    checkToolTips: [
      'Always test XML schema in a non-production staging instance first.',
      'Verify all custom formula column IDs follow camelCase naming convention.'
    ],
    tasks: [
      { id: 't-2-4-1', title: 'Obtain sf-form.dtd and clone base XML plan template', completed: false },
      { id: 't-2-4-2', title: 'Set up local XML validation workspace referencing sf-form.dtd', completed: false },
      { id: 't-2-4-3', title: 'Validate schema syntax, tag ordering, and mandatory XML attributes', completed: false, isCritical: true },
      { id: 't-2-4-4', title: 'Upload validated XML plan into OmniVerse development tenant', completed: false, isCritical: true }
    ]
  },
  {
    id: 'm-2-5',
    phaseId: 'phase-2',
    number: '2.5',
    title: 'Integrate Compensation Template with Employee Central',
    shortDesc: 'Establish field mappings, pay component flags, annualized planning methods, and EC promotion rules.',
    omniVerseContext: 'OmniVerse uses EC Job Information and Compensation Information. Worksheet Effective Date must capture mid-year promotions effective on January 1st.',
    deliverables: [
      'EC to Compensation Field Mapping Matrix',
      'Pay Component Planning Flag Configuration (COMP vs BOTH)',
      'EC Promotion Integration Settings & RBP Configuration',
      'Annualized Rate vs User Pay Rate decision document'
    ],
    keyDecisions: [
      'Set Worksheet Effective Date to 12/31/2026 to capture all end-of-year organizational changes and pending transfers.',
      'Employees may only have ONE pay component flagged as COMP or BOTH to prevent double-counting base salary.',
      'Enable EC Promotion Integration in Actions for All Plans → Company Settings with reloadable and read-only promotion fields.'
    ],
    detailedGuide: [
      'Define Field Mapping: Map compensation fields to Employee Central entities (Job Information, Compensation Information, Pay Component Recurring/NonRecurring, Personal Information, Job Relationships, and MDF objects).',
      'Configure Pay Components: Specify which pay components are used for compensation planning (Comp, Varpay, or Both). An employee can only have one pay component flagged as COMP or BOTH.',
      'Determine Planning Method: Decide between annualized amounts and user pay rate. Note: If using Pay Component Groups for annualized planning, publishing currently only supports individual pay components.',
      'Set Worksheet Effective Date: Controls which records are pulled from EC into the worksheet. A future date (e.g., 12/31/2026) ensures current and future changes are captured. Note: This cannot be modified once worksheets are launched!',
      'Configure Publish Settings: Map source compensation fields to target EC pay components with event reasons.',
      'Enable EC Promotion Integration: Enable company setting, grant RBP under User Permissions → Employee Central-Compensation Integration, map promotion fields, set finalAttribute in Calculation Settings to avoid miscalculated post-promotion ranges.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Elena Rostova',
      role: 'Senior Data Integration Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-11-10',
    dependencies: ['m-2-4'],
    xmlSnippet: `<!-- EC Field Mapping & Promotion Final Attribute -->
<comp-field-definition id="finalSalary" type="money">
  <mapping source="EC" entity="compInfo" field="paycomponentvalue" component="BASE_SALARY" />
</comp-field-definition>
<comp-calculation-settings finalAttribute="promotionPayGrade" />`,
    checkToolTips: [
      'Check Tool: Run Employee Central Mapping Diagnostics to confirm valid field IDs.',
      'Verify corporate data model has Pay Grade as the primary association.'
    ],
    tasks: [
      { id: 't-2-5-1', title: 'Configure EC field mappings for Base Salary, Grade, Job Code, and Department', completed: false, isCritical: true },
      { id: 't-2-5-2', title: 'Verify single COMP/BOTH flag per employee across recurring pay components', completed: false, isCritical: true },
      { id: 't-2-5-3', title: 'Set Worksheet Effective Date to 12/31/2026 in Plan Setup settings', completed: false, isCritical: true },
      { id: 't-2-5-4', title: 'Enable EC Promotion Planning checkbox and configure finalAttribute XML tag', completed: false }
    ]
  },

  // PHASE 3
  {
    id: 'm-3-1',
    phaseId: 'phase-3',
    number: '3.1',
    title: 'Create and Configure Compensation Plan Template',
    shortDesc: 'Instantiate template from SuccessStore, configure Salary and Stock tabs, and apply comp-salary-rule.',
    omniVerseContext: 'OmniVerse compensation plan covers Base Salary, Merit Increases, Lump Sums for employees above pay range maximum, and Equity LTI grants.',
    deliverables: [
      'OmniVerse Annual Compensation Plan Template (EC-Integrated)',
      'Worksheet Layout Specifications (Salary, Stock, Summary tabs)',
      'comp-salary-rule XML configuration for Lump Sum split'
    ],
    keyDecisions: [
      'Clone "Salary Planning (EC-Integrated)" from SuccessStore as the foundational template.',
      'Configure comp-salary-rule to automatically divert merit raises above 120% compa-ratio into non-recurring lump-sum bonuses.',
      'Enable Advanced Mass Actions to allow planners and executives to adjust compensation values across filtered populations.'
    ],
    detailedGuide: [
      'Start with a template: In Admin Center → Compensation Home, instantiate a new template from SuccessStore (e.g. "Salary Planning (EC-Integrated)") or clone an existing plan.',
      'Define Plan Information: Enter formal plan name ("OmniVerse 2026-2027 Global Compensation Cycle"), fiscal year end date, and base currency.',
      'Configure Worksheet tabs: Establish Salary Sheet, Stock Sheet (LTI awards, RSUs, Options), and Summary Sheet.',
      'Configure comp-salary-rule: Define threshold limits for Final Salary and Final Pay based on compa-ratio or Position in Range. Configure "Lumpsum split" so excess salary beyond the pay range maximum is diverted into a lump-sum award.',
      'Enable Advanced Filtering on worksheets and Executive Review to allow slicing by division, grade, and performance rating.',
      'Enable Custom Views and Compensation Profile to provide managers with multi-year pay history and demographic context.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Dr. Niladri Nayak',
      role: 'Lead Enterprise Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-11-15',
    dependencies: ['m-2-5'],
    xmlSnippet: `<!-- Comp Salary Rule: Lump Sum Split at Max Compa-Ratio -->
<comp-salary-rule>
  <salary-rule-mode>compa-ratio</salary-rule-mode>
  <threshold-limit>120.0</threshold-limit>
  <lumpsum-split enabled="true" auto-split="true" target-field="lumpSum" />
</comp-salary-rule>`,
    checkToolTips: [
      'Verify that lump-sum column is reloadable and reportable.',
      'Ensure summary tab formulas aggregate salary and stock totals accurately.'
    ],
    tasks: [
      { id: 't-3-1-1', title: 'Clone "Salary Planning (EC-Integrated)" template in Compensation Home', completed: false, isCritical: true },
      { id: 't-3-1-2', title: 'Configure Salary, Stock, and Summary worksheet tabs with required columns', completed: false },
      { id: 't-3-1-3', title: 'Configure comp-salary-rule with 120% compa-ratio threshold for automatic lump-sum split', completed: false, isCritical: true },
      { id: 't-3-1-4', title: 'Enable Advanced Mass Action permissions on worksheet columns', completed: false }
    ]
  },
  {
    id: 'm-3-2',
    phaseId: 'phase-3',
    number: '3.2',
    title: 'Define Hierarchy and Route Maps',
    shortDesc: 'Select planning hierarchy method and build multi-stage approval workflow route map.',
    omniVerseContext: 'OmniVerse hierarchy requires Rollup Hierarchy to support division managers rolling up recommendations to Business Unit Executive VPs before HR review.',
    deliverables: [
      'OmniVerse Hierarchy Decision Document',
      'Multi-Stage Compensation Route Map XML',
      'Rollup Planner Configuration & Permissions'
    ],
    keyDecisions: [
      'Adopt Rollup Hierarchy over Standard Suite hierarchy to shield worksheets from frequent frontline re-orgs.',
      'Build 4-stage route map: Planner Planning -> 2nd Level Manager Review -> HR Compensation Committee -> Executive Sign-Off.',
      'Set collaborative routing step between Finance and HR Director during final stage.'
    ],
    detailedGuide: [
      'Choose a Hierarchy Method: Options include Standard Suite Hierarchy (simplest, every manager with direct reports plans, susceptible to re-orgs), Compensation Manager Hierarchy (designated second manager), and Rollup Hierarchy.',
      'For OmniVerse Energy Ltd., select Rollup Hierarchy: organizes planners into distinct parent-child tiers and enables dynamic rollup aggregation.',
      'Design Route Map in Admin Center → Manage Route Maps.',
      'Define step types: Single Role, Iterative (back-and-forth between manager and compensation specialist), Collaborative (multiple reviewers simultaneous access), and Signature steps.',
      'Establish exit criteria and automated reminder notifications for each stage of the review window.',
      'Assign the completed Route Map to the Compensation Plan Template in Plan Setup → Plan Details.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Sarah Chen',
      role: 'Cloud Security & System Admin',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-11-20',
    dependencies: ['m-3-1'],
    xmlSnippet: `<!-- Route Map Definition -->
<route-map id="OmniVerse_Comp_2026_RouteMap">
  <step id="1" type="single" role="EM" name="Manager Planning" />
  <step id="2" type="single" role="EMM" name="2nd Level Executive Review" />
  <step id="3" type="collaborative" role="EX" name="Comp Committee Alignment" />
  <step id="4" type="signature" role="EH" name="HR Final Sign-Off" />
</route-map>`,
    checkToolTips: [
      'Check Tool: Perform Cyclic Dependency and Head of Hierarchy checks.',
      'Ensure every user in the UDF resolves to a top-level planner.'
    ],
    tasks: [
      { id: 't-3-2-1', title: 'Evaluate hierarchy tradeoffs and obtain Rollup Hierarchy approval', completed: false, isCritical: true },
      { id: 't-3-2-2', title: 'Build 4-stage Route Map with SLA alerts in Manage Route Maps', completed: false },
      { id: 't-3-2-3', title: 'Link Route Map to compensation template in Plan Setup', completed: false, isCritical: true },
      { id: 't-3-2-4', title: 'Test routing forward and send-back behaviors across test personas', completed: false }
    ]
  },
  {
    id: 'm-3-3',
    phaseId: 'phase-3',
    number: '3.3',
    title: 'Develop Budgets for the Compensation Plan',
    shortDesc: 'Establish budget components, cascading rules, base currency conversions, and hard/soft stops.',
    omniVerseContext: 'OmniVerse allocated a global 3.8% merit pool and a 1.2% discretionary equity pool. Over-budget submissions require hard stop blocks unless approved by CFO.',
    deliverables: [
      'Merit & Stock Budget Allocation Rules',
      'Cascading Budget Hierarchy Tree',
      'Hard/Soft Budget Threshold Settings'
    ],
    keyDecisions: [
      'Calculate Merit Budget based on 3.8% of Total Current Salary in Functional Currency (USD).',
      'Implement Cascading Budgets from Division Executive to frontline managers.',
      'Enforce Soft Warning at 100.0% budget utilization, and Hard Stop block at 102.0% with mandatory override authorization.'
    ],
    detailedGuide: [
      'Configure Budget Calculations: Define budget mode (Percentage of Target, Total Budget, or Formula-driven).',
      'Select Base Currency: All budget pools roll up to USD while displaying in local planner currency views.',
      'Implement Cascading Budgets: Allow higher-level executives to allocate discretionary pools downwards to individual department managers.',
      'Configure Budget Warning Thresholds: Set soft warnings (yellow alert when budget exceeds 100%) and hard stops (red block preventing worksheet submission when exceeding 102%).',
      'Configure Separate Budgets for Merit, Promotion, and Lump Sum to prevent cross-component leakage.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Marcus Vance',
      role: 'Compensation Specialist & Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-11-25',
    dependencies: ['m-3-2'],
    xmlSnippet: `<!-- Budget Configuration with Hard Stop Warning -->
<comp-budget-rule id="meritBudget" mode="percentage" value="3.8" base="curSalary">
  <hard-stop enabled="true" ceiling="102.0" action="block-submit" />
  <warning-threshold ceiling="100.0" color="#F59E0B" />
</comp-budget-rule>`,
    checkToolTips: [
      'Check Tool: Run Budget Calculation audit to ensure no division by zero or missing base salary components.',
      'Test multi-currency conversions on sample worksheet to confirm budget stays in balance.'
    ],
    tasks: [
      { id: 't-3-3-1', title: 'Define Merit (3.8%) and Equity (1.2%) budget pool percentages', completed: false, isCritical: true },
      { id: 't-3-3-2', title: 'Configure Cascading Budget distribution down the Rollup Hierarchy', completed: false },
      { id: 't-3-3-3', title: 'Configure hard stop validation at 102.0% budget ceiling', completed: false, isCritical: true },
      { id: 't-3-3-4', title: 'Simulate over-budget submission test to verify form submission lock', completed: false }
    ]
  },
  {
    id: 'm-3-4',
    phaseId: 'phase-3',
    number: '3.4',
    title: 'Define Eligibility Rules (MDF Rule Engine)',
    shortDesc: 'Build eligibility logic for merit, lump sum, and stock using MDF Business Rules engine.',
    omniVerseContext: 'Employees hired after October 1, 2026, interns, and employees on performance improvement plans (PIP) are excluded from merit review.',
    deliverables: [
      'MDF Eligibility Rules configured in Admin Center',
      'Exclusion Criteria Specification Document',
      'Eligibility Engine Test Run Audit'
    ],
    keyDecisions: [
      'Transition from legacy XML eligibility rules to the modern MDF Business Rules engine for compensation.',
      'Cutoff hire date set to October 1, 2026: Employees hired on or after this date receive 0% merit eligibility.',
      'Ensure rule priority is ordered: Global Ineligibility -> Country-Specific Ineligibility -> Component Ineligibility.'
    ],
    detailedGuide: [
      'Navigate to Admin Center → Configure Business Rules. Create new rule under Compensation Eligibility scenario.',
      'Define exclusion criteria: Hire Date >= 10/01/2026, Employment Status = "Terminated", or Custom Employee Subgroup = "Intern".',
      'Assign rules in Plan Setup → Plan Details → Eligibility Rules.',
      'Set component-level eligibility: Employees eligible for Merit may be ineligible for Stock options based on grade thresholds (Grades 10-13 merit only; Grades 14+ merit and stock).',
      'Execute eligibility pre-check: Verify that flagged ineligible employees are grayed out on worksheets with zero budget impact.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Elena Rostova',
      role: 'Senior Data Integration Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-11-28',
    dependencies: ['m-3-3'],
    xmlSnippet: `<!-- MDF Eligibility Engine Reference -->
<comp-eligibility-rule id="OMNIVERSE_MERIT_ELIG" scenario="compensationRule">
  <condition field="hireDate" operator="lessThan" value="2026-10-01" />
  <condition field="employeeStatus" operator="equals" value="Active" />
</comp-eligibility-rule>`,
    checkToolTips: [
      'Check Tool: Run Eligibility Rule Syntax and Dependency check.',
      'Verify that newly transferred employees do not trigger dual-eligibility conflicts.'
    ],
    tasks: [
      { id: 't-3-4-1', title: 'Create MDF Business Rule OMNIVERSE_MERIT_ELIG with October 1 cutoff date', completed: false, isCritical: true },
      { id: 't-3-4-2', title: 'Create LTI Equity eligibility rule restricting grants to Grades 14 and higher', completed: false },
      { id: 't-3-4-3', title: 'Attach eligibility rules to Plan Setup and test with synthetic test employees', completed: false, isCritical: true },
      { id: 't-3-4-4', title: 'Verify grayed-out column behavior for ineligible employees', completed: false }
    ]
  },
  {
    id: 'm-3-5',
    phaseId: 'phase-3',
    number: '3.5',
    title: 'Define and Create Guidelines',
    shortDesc: 'Build guideline recommendation matrices based on Performance Rating and Compa-Ratio / Range Penetration.',
    omniVerseContext: 'OmniVerse enforces pay-for-performance: High performers low in pay range receive up to 6.5% merit; low performers or those above range ceiling receive 0%.',
    deliverables: [
      '5x4 Performance vs Compa-Ratio Merit Guideline Matrix',
      'Stock Award Guideline Table by Job Grade',
      'Guideline Hard Stop vs Soft Warning Thresholds'
    ],
    keyDecisions: [
      'Use 5 Performance Rating tiers (1-Unsatisfactory to 5-Exceptional) cross-referenced with 4 Compa-Ratio Quartiles (Q1 <80%, Q2 80-100%, Q3 100-120%, Q4 >120%).',
      'Provide Min, Default, and Max percentages for each matrix cell to give planners calibrated discretion.',
      'Enable Guideline Optimization so guideline updates reflect instantly without full worksheet regeneration.'
    ],
    detailedGuide: [
      'Navigate to Plan Setup → Plan Details → Guidelines.',
      'Create Guideline Table for Merit: Choose formula criteria based on Performance Rating and Compa-Ratio or Range Penetration.',
      'Populate matrix cells with Min, Default, and Max recommendation percentages (e.g. Rating 5 & Q1: Min 5.0%, Default 6.0%, Max 7.5%).',
      'Configure guideline violation alerts: Highlight out-of-guideline entries in orange, and require planners to enter a mandatory justification comment.',
      'Build Stock/LTI Guidelines: Set share quantity or target monetary award guidelines based on Job Grade and Country Tier.',
      'Enable Guideline Optimization in Admin Center to allow rapid guideline adjustments during executive calibrations.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Marcus Vance',
      role: 'Compensation Specialist & Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-12-02',
    dependencies: ['m-3-4'],
    xmlSnippet: `<!-- Guideline Matrix Definition: Merit by Rating and Compa-Ratio -->
<comp-guideline-table id="OmniVerse_Merit_Guideline" mode="matrix">
  <axis-x field="performanceRating" />
  <axis-y field="compaRatioQuartile" />
  <cell rating="5" quartile="Q1" min="5.0" default="6.0" max="7.5" />
  <cell rating="3" quartile="Q2" min="2.5" default="3.5" max="4.5" />
  <cell rating="1" quartile="any" min="0.0" default="0.0" max="0.0" />
</comp-guideline-table>`,
    checkToolTips: [
      'Check Tool: Run Guideline Completeness check to ensure no missing rating/quartile combinations.',
      'Verify guideline justification comment box is required on out-of-bounds inputs.'
    ],
    tasks: [
      { id: 't-3-5-1', title: 'Construct 5x4 Merit Guideline Matrix with calibrated Min/Default/Max ranges', completed: false, isCritical: true },
      { id: 't-3-5-2', title: 'Configure mandatory planner justification notes for out-of-guideline entries', completed: false },
      { id: 't-3-5-3', title: 'Build Stock LTI guideline table by engineering job grade', completed: false },
      { id: 't-3-5-4', title: 'Enable Guideline Optimization switch in Compensation Home', completed: false }
    ]
  },
  {
    id: 'm-3-6',
    phaseId: 'phase-3',
    number: '3.6',
    title: 'Add Rating Source to Compensation Plan',
    shortDesc: 'Connect Performance Management forms, Employee Profile live ratings, or Calibration sources.',
    omniVerseContext: 'OmniVerse uses SAP SuccessFactors Performance Management (PM) review forms completed by October 31st, with Employee Profile fallback for new acquisitions.',
    deliverables: [
      'Configured Rating Source in Plan Details',
      'Rating Scale Normalization Mapping (1-5 point scale)',
      'Fallback Comp Rating Field Definition'
    ],
    keyDecisions: [
      'Primary Rating Source: Pull from completed PM Annual Review 2026 forms.',
      'Secondary Fallback: Pull from Employee Profile overallPerformance rating if PM form is missing.',
      'Only one rating source and type (PM or Employee Profile) is permitted per pay component.'
    ],
    detailedGuide: [
      'Navigate to Plan Setup → Plan Details → Rating Sources.',
      'Add New Rating Source: Specify form template name (e.g., "OmniVerse 2026 Annual Performance Review"), completed status requirement, and calculated vs manual rating.',
      'Choose Rating Type: overallPerformance is standard for merit planning.',
      'If PM forms are unavailable for certain acquired units, enable Combination mode: pulls from PM form if found, allows manual entry in compRating field if absent.',
      'Consider checkRatingSourceAcrossTemplates XML attribute when employees have multiple reviews across business units.',
      'Verify that rating scale labels (1-Needs Improvement to 5-Role Model) align with guideline matrix.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Dr. Niladri Nayak',
      role: 'Lead Enterprise Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-12-05',
    dependencies: ['m-3-5'],
    xmlSnippet: `<!-- Rating Source Configuration in Plan Details -->
<comp-rating-source form-id="OmniVerse_PM_2026" form-status="completed">
  <rating-type>overallPerformance</rating-type>
  <fallback-source>employeeProfile</fallback-source>
  <scale id="5_POINT_SCALE" min="1.0" max="5.0" />
</comp-rating-source>`,
    checkToolTips: [
      'Check Tool: Run Rating Source Form ID check to confirm target PM form exists and is active.',
      'Confirm PM form routing stage before compensation cycle launch.'
    ],
    tasks: [
      { id: 't-3-6-1', title: 'Link OmniVerse 2026 Annual Performance Review form in Rating Sources', completed: false, isCritical: true },
      { id: 't-3-6-2', title: 'Configure fallback to Employee Profile live rating for unlinked employees', completed: false },
      { id: 't-3-6-3', title: 'Verify rating point rounding and 1.0 - 5.0 scale normalization', completed: false },
      { id: 't-3-6-4', title: 'Test compensation rating auto-population on sample worksheet', completed: false, isCritical: true }
    ]
  },

  // PHASE 4
  {
    id: 'm-4-1',
    phaseId: 'phase-4',
    number: '4.1',
    title: 'Check Tool Pre-Flight Diagnostics',
    shortDesc: 'Execute exhaustive system checks before launching live worksheets to identify configuration defects.',
    omniVerseContext: 'OmniVerse pre-flight checklist must detect any cyclic manager loops, inactive planners, and reloadable field mistakes before sending worksheets to 650 managers.',
    deliverables: [
      'Check Tool Diagnostic Execution Log',
      'Remediation Ticket Sign-Off for all Warning/Error items',
      'Pre-Launch Readiness Certification'
    ],
    keyDecisions: [
      'Zero Tolerance for Check Tool errors: All cyclic dependencies and orphaned employees must be resolved before launching forms.',
      'Grant Check Tool permissions: "Access Check Tool" and "Allow Configuration Export" to lead architect.',
      'Audit custom fields: Ensure every calculated field is correctly flagged as reloadable or reportable.'
    ],
    detailedGuide: [
      'Navigate to Admin Center → Check Tool. Select Compensation & Variable Pay application domain.',
      'Grant required RBP permissions: Administrator Permissions → Check Tool → Access Check Tool & Allow Configuration Export.',
      'Execute critical diagnostic checks: Cyclic Dependency (manager loops), Head of Hierarchy (ensuring single or valid top nodes), Inactive Planners with active subordinates, Users without Planners, Formula configuration syntax issues, and Invalid Custom Field flags.',
      'Review Statement setup checks: Ensure statement templates are linked and fields are reportable.',
      'Document every diagnostic failure in the Issue Log, remediate in UDF or XML, and re-run Check Tool until 100% green.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Sarah Chen',
      role: 'Cloud Security & System Admin',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-12-10',
    dependencies: ['m-3-6'],
    xmlSnippet: `<!-- Pre-Flight Verification Meta -->
<check-tool-audit domain="Compensation">
  <check id="cyclic_dependency" expected="PASS" />
  <check id="head_of_hierarchy" expected="PASS" />
  <check id="inactive_planners" expected="PASS" />
  <check id="reloadable_custom_fields" expected="PASS" />
</check-tool-audit>`,
    checkToolTips: [
      'Always export Check Tool findings report as documentation before launch.',
      'Pay special attention to cyclic reporting loops in matrix organizational units.'
    ],
    tasks: [
      { id: 't-4-1-1', title: 'Verify Check Tool permissions granted in Manage Permission Roles', completed: false },
      { id: 't-4-1-2', title: 'Execute full Check Tool test suite against OmniVerse compensation plan', completed: false, isCritical: true },
      { id: 't-4-1-3', title: 'Resolve any cyclic manager loops or inactive planner findings', completed: false, isCritical: true },
      { id: 't-4-1-4', title: 'Export Check Tool pre-flight clean bill of health report', completed: false }
    ]
  },
  {
    id: 'm-4-2',
    phaseId: 'phase-4',
    number: '4.2',
    title: 'Launch Compensation Worksheets',
    shortDesc: 'Create worksheets by employee groups, schedule launch windows, and monitor background jobs.',
    omniVerseContext: 'OmniVerse launches worksheets in staggered waves: North America (Wave 1), EMEA (Wave 2), and APAC (Wave 3). Worksheets must not duplicate employees.',
    deliverables: [
      'Staggered Wave Launch Schedule',
      'Batch Worksheet Creation Jobs in Admin Center',
      'Job Execution Status Log (Monitor Compensation Jobs)'
    ],
    keyDecisions: [
      'Use Employee Groups in Advanced Settings to launch worksheets separately by region without duplicating employees.',
      'Enable "Do not duplicate employees on worksheets" in Advanced Settings.',
      'Launch "Head of Planning only" test worksheet first to validate routing before bulk rollout.'
    ],
    detailedGuide: [
      'Navigate to Manage Worksheets → Create Worksheets.',
      'Enter worksheet name ("OmniVerse 2026 Annual Merit - Wave 1 NA"), start/end dates, and due date.',
      'Select top-level manager/planner.',
      'Configure launch parameters: "Include Inactive Users" (disabled), "Send Email Notifications" (enabled with custom template).',
      'For OmniVerse Energy Ltd., navigate to Advanced Settings → Select "Create worksheets by employee group" and check "Do not duplicate employees on worksheets".',
      'Monitor batch job execution via Admin Center → Monitor Compensation Jobs or Provisioning Monitor Jobs.',
      'Confirm all worksheets land in managers\' Compensation Inbox with accurate headcounts and budget pools.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Marcus Vance',
      role: 'Compensation Specialist & Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-12-14',
    dependencies: ['m-4-1'],
    xmlSnippet: `<!-- Worksheet Batch Launch Parameters -->
<worksheet-launch-group id="WAVE_1_NA">
  <group-filter field="country" operator="in" value="USA,CAN" />
  <deduplication-mode enabled="true" />
  <notification-template id="COMP_LAUNCH_NOTIF" />
</worksheet-launch-group>`,
    checkToolTips: [
      'Monitor Compensation Jobs in Admin Center for any failed sub-threads.',
      'Check email server deliverability for worksheet invitation emails.'
    ],
    tasks: [
      { id: 't-4-2-1', title: 'Launch pilot worksheet for CEO / Head of Planning to test workflow', completed: false, isCritical: true },
      { id: 't-4-2-2', title: 'Configure regional Employee Groups (NA, EMEA, APAC) in Admin Center', completed: false },
      { id: 't-4-2-3', title: 'Execute Wave 1 NA worksheet launch and monitor background job queues', completed: false, isCritical: true },
      { id: 't-4-2-4', title: 'Verify planner inbox population and validate initial budget balances', completed: false }
    ]
  },
  {
    id: 'm-4-3',
    phaseId: 'phase-4',
    number: '4.3',
    title: 'Worksheet Updates & Membership Management',
    shortDesc: 'Manage mid-cycle employee transfers, update budgets and guidelines, and purge obsolete forms.',
    omniVerseContext: 'During the 3-week planning window, OmniVerse averages 40 employee transfers and 15 manager departures requiring seamless worksheet updates without losing entered recommendations.',
    deliverables: [
      'Mid-Cycle Employee Membership Change Log',
      'Worksheet Update Execution Runbooks',
      'Purge Audit Documentation for Deleted Test Forms'
    ],
    keyDecisions: [
      'Use Update All Worksheets for global guideline and pay matrix recalculations.',
      'Use Manage Employee Membership to dynamically move transferring employees between worksheets while preserving recommendation history.',
      'Utilize Delete Document via Admin Center → Manage Forms by User for batch deletion of staging forms, and enable DRM auto-purging.'
    ],
    detailedGuide: [
      'Understand update triggers: Guideline optimization and pay matrix updates reflect automatically; organizational shifts and newly eligible personnel require manual update jobs.',
      'Execute updates: Navigate to Manage Worksheets → "Update All Worksheets" or "Update a Specific Worksheet".',
      'Select update options: Add new employees, create worksheets for new managers, remove inactive employees/planners, update eligibility, and refresh budget.',
      'Use "Manage Employee Membership" to move specific employees from former managers to new managers without resetting recommendation fields.',
      'Worksheet Deletion Protocol: For <100 forms, use Manage Worksheets; for >100 forms, use Delete Document in Admin Center.',
      'Enable automatic purging via Data Retention Management (DRM) to maintain tenant performance.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Sarah Chen',
      role: 'Cloud Security & System Admin',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2026-12-22',
    dependencies: ['m-4-2'],
    xmlSnippet: `<!-- Worksheet Membership Sync Config -->
<membership-management keep-recommendations="true">
  <on-manager-change action="move-employee-to-new-manager" />
  <on-termination action="mark-inactive-retain-history" />
</membership-management>`,
    checkToolTips: [
      'Always check "Keep existing recommendations" when running worksheet updates.',
      'Verify DRM retention policies comply with OmniVerse corporate compliance.'
    ],
    tasks: [
      { id: 't-4-3-1', title: 'Process weekly employee transfer batch via Manage Employee Membership', completed: false },
      { id: 't-4-3-2', title: 'Execute Update Worksheets job to refresh budget pools with new hires', completed: false, isCritical: true },
      { id: 't-4-3-3', title: 'Reassign worksheets for departed managers to designated interim surrogates', completed: false },
      { id: 't-4-3-4', title: 'Purge obsolete staging and pilot forms via Manage Forms by User', completed: false }
    ]
  },

  // PHASE 5
  {
    id: 'm-5-1',
    phaseId: 'phase-5',
    number: '5.1',
    title: 'Publish Data to SAP SuccessFactors Employee Central',
    shortDesc: 'Map source fields to EC recurring and non-recurring entities, configure event reasons, and execute publish jobs.',
    omniVerseContext: 'Merit increases publish as recurring pay components effective January 1, 2027 with Event Reason "DATA_CHANGE_MERIT". Lump sums publish as non-recurring spot bonuses.',
    deliverables: [
      'EC Publish Field Mapping Configuration Sheet',
      'Event Reason & Effective Date Publication Specs',
      'Employee Central Publish Report & Error Log'
    ],
    keyDecisions: [
      'Recurring pay components: First publish creates a new compensation record; subsequent publishes update the created record.',
      'Non-recurring pay components: Published as standalone one-time spot payouts with custom pay dates.',
      'Publish Job Information before Compensation Information if promotions involve job title or pay grade changes.'
    ],
    detailedGuide: [
      'Map Source to Target Fields: Ensure exact mapping between Compensation worksheet columns and Employee Central entities (payComponentRecurring and payComponentNonRecurring).',
      'Define componentType, componentCode, eventReason (e.g. MERIT_INCREASE), and effectiveDate (01/01/2027) for target records.',
      'Understand Publishing Behavior: Recurring pay components update existing records if re-published; non-recurring components can publish multiple standalone instances.',
      'Review crucial considerations: Only completed forms can be published; determine whether to check "Do not trigger EC rules" to avoid unwanted workflow loops; verify forward propagation behavior.',
      'Initiate Publishing: Navigate to Complete Compensation Cycle → Publish Data. Choose to publish all completed forms or filter by group.',
      'Generate Employee Central Publish Report to identify individual record failures or validation errors.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Elena Rostova',
      role: 'Senior Data Integration Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2027-01-05',
    dependencies: ['m-4-3'],
    xmlSnippet: `<!-- EC Publish Target Mapping Definition -->
<comp-publish-mapping entity="payComponentRecurring">
  <source-field id="finSalary" />
  <target-component code="BASE_PAY" />
  <event-reason id="MERIT_2027" />
  <effective-date>2027-01-01</effective-date>
</comp-publish-mapping>`,
    checkToolTips: [
      'Check Tool: Run EC Publish Target Mapping diagnostic.',
      'Verify that EC Business Rules on Compensation Information do not create recursive approval loops during publish.'
    ],
    tasks: [
      { id: 't-5-1-1', title: 'Configure recurring pay component mapping with Event Reason MERIT_2027', completed: false, isCritical: true },
      { id: 't-5-1-2', title: 'Configure non-recurring component mapping for lump-sum payouts', completed: false },
      { id: 't-5-1-3', title: 'Execute publish test on pilot group of 50 employees in staging', completed: false, isCritical: true },
      { id: 't-5-1-4', title: 'Download Employee Central Publish Report and verify zero synchronization errors', completed: false }
    ]
  },
  {
    id: 'm-5-2',
    phaseId: 'phase-5',
    number: '5.2',
    title: 'Executive Review, Standard & Custom Reports',
    shortDesc: 'Configure Executive Review permissions, build Report Center canvases, and run audit logs.',
    omniVerseContext: 'OmniVerse Compensation Committee requires cross-divisional Executive Review with Mass Action capability to adjust engineering salary distributions before final sign-off.',
    deliverables: [
      'Executive Review Access & Mass Action Permissions Matrix',
      'Report Center Canvas & Ad Hoc Report Package',
      'Planner Audit Tool Report Trail'
    ],
    keyDecisions: [
      'Configure Executive Review to allow CHRO and VP of Total Rewards to see all 14,000 employees regardless of route map stage.',
      'Grant Advanced Mass Action rights exclusively to the Compensation Committee.',
      'Enable production Audit Tool Reports in Manage Audit Configuration to track before-and-after values for every worksheet edit.'
    ],
    detailedGuide: [
      'Use Executive Review: Provides visibility across all employees from multiple worksheets on a single unified canvas, independent of route map status.',
      'Configure Permissions: Grant Read/Edit, Mass Action, and Export permissions under User Permissions → Manage Compensation.',
      'Define Filter Scopes: Individual View, Team View, and Advanced Filters (e.g. compa-ratio < 80% and rating = 5).',
      'Execute Mass Actions: Facilitate broad adjustments to recommendations (e.g. uniform 0.5% upward shift for high performers) while respecting guideline limits.',
      'Build Report Center Reports: Create Report Table (Ad Hoc) and Report Canvas queries for HR business partners.',
      'Audit Tool Reports: Track who made changes, timestamp, and before/after values for worksheets, compensation profiles, and EC fields.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Marcus Vance',
      role: 'Compensation Specialist & Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2027-01-10',
    dependencies: ['m-5-1'],
    xmlSnippet: `<!-- Executive Review Permissions & Mass Action -->
<executive-review-config enabled="true">
  <filter-capability mode="advanced" />
  <mass-action-capability allowed-roles="HR_EXEC" />
  <audit-trail-logging enabled="true" retention-days="730" />
</executive-review-config>`,
    checkToolTips: [
      'Confirm Audit Configuration is switched on in Manage Audit Configuration.',
      'Verify Executive Review export permissions are restricted to authorized personnel.'
    ],
    tasks: [
      { id: 't-5-2-1', title: 'Grant Executive Review permissions to OmniVerse Compensation Committee', completed: false, isCritical: true },
      { id: 't-5-2-2', title: 'Create Report Canvas dashboard displaying global spend vs budget allocation', completed: false },
      { id: 't-5-2-3', title: 'Simulate Executive Review Mass Action on test engineering sub-population', completed: false },
      { id: 't-5-2-4', title: 'Generate Planner Audit Tool report to verify before/after change tracking', completed: false }
    ]
  },
  {
    id: 'm-5-3',
    phaseId: 'phase-5',
    number: '5.3',
    title: 'Generate Compensation Statements & Total Rewards',
    shortDesc: 'Build branded statement templates, set dynamic statement groups, configure suppression rules, and publish to People Profile.',
    omniVerseContext: 'OmniVerse requires personalized statements in English, French, and Spanish with conditional congratulatory text for promoted engineers and People Profile self-service visibility.',
    deliverables: [
      'Branded OmniVerse Compensation Statement Templates (PDF)',
      'Dynamic Statement Group Assignments by Country/Language',
      'Statement Generation CSV Audit Report',
      'People Profile Compensation Portlet Display'
    ],
    keyDecisions: [
      'Create Dynamic Statement Groups to automatically route employees to localized templates based on Country and Language preference.',
      'Implement statement suppression rules for employees with $0 merit increase and no title promotion.',
      'Publish generated statements to People Profile for employee self-service download following executive sign-off date.'
    ],
    detailedGuide: [
      'Add Statement Templates: Use standard templates from SuccessStore or create branded custom templates with OmniVerse logo and typography.',
      'Edit Templates: Customize company header, title, body paragraphs, and conditional text sections triggered by worksheet variables (e.g. promotion recognition).',
      'Create Dynamic Statement Groups: Assign employees to appropriate reward statement templates (e.g. US Salaried, EMEA Multilingual, APAC).',
      'Configure Statement Suppression: Prevent statement generation for employees who received zero salary adjustments and zero bonus.',
      'Generate Statements: Run batch generation by statement template or upload employee username list.',
      'Run Reward Statement Generation Report: Generate a CSV report to verify 100% statement coverage across eligible population.',
      'Configure People Profile Display: Configure statement portlet under Employee Profile so employees can view and download their personalized reward letter.'
    ],
    status: 'not_started',
    assignee: {
      name: 'Dr. Niladri Nayak',
      role: 'Lead Enterprise Architect & SuccessFactors Consultant',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    dueDate: '2027-01-15',
    dependencies: ['m-5-2'],
    xmlSnippet: `<!-- Compensation Statement Template Definition -->
<comp-statement-template id="OmniVerse_Annual_Statement_2027">
  <dynamic-group attribute="country" />
  <suppression-rule condition="totalIncrease eq 0" />
  <people-profile-visible>true</people-profile-visible>
</comp-statement-template>`,
    checkToolTips: [
      'Check Tool: Run Statement Field Reportability diagnostic before batch generation.',
      'Verify image logo URL resolves via HTTPS on statement headers.'
    ],
    tasks: [
      { id: 't-5-3-1', title: 'Design branded statement template with OmniVerse logo and conditional promotion text', completed: false, isCritical: true },
      { id: 't-5-3-2', title: 'Configure Dynamic Statement Groups for US, EMEA, and APAC employee cohorts', completed: false },
      { id: 't-5-3-3', title: 'Set up statement suppression rules for non-adjusted employees', completed: false },
      { id: 't-5-3-4', title: 'Batch generate 14,000 statements and export Statement Generation CSV Report', completed: false, isCritical: true },
      { id: 't-5-3-5', title: 'Enable People Profile self-service display portlet for go-live release', completed: false }
    ]
  }
];

export const INITIAL_STICKY_NOTES: StickyNote[] = [
  {
    id: 'sn-1',
    title: 'OmniVerse Energy Scope Note',
    content: 'OmniVerse has 14,000 employees globally. Primary goal: standardize merit planning while preserving equity grants for high-potential offshore engineers.',
    color: 'yellow',
    milestoneId: 'm-1-1',
    phaseId: 'phase-1',
    pinned: true,
    author: 'Dr. Niladri Nayak',
    createdAt: '2026-10-14 09:30',
    tags: ['OmniVerse Requirement', 'Governance']
  },
  {
    id: 'sn-2',
    title: 'DTD Validation Reminder',
    content: 'When editing sf-form.dtd locally, always update the DOCTYPE URL to point to the local file to avoid external network lag during XML syntax checks.',
    color: 'blue',
    milestoneId: 'm-2-4',
    phaseId: 'phase-2',
    pinned: false,
    author: 'Dr. Niladri Nayak',
    createdAt: '2026-10-14 10:15',
    tags: ['XML Tweak', 'Technical']
  },
  {
    id: 'sn-3',
    title: 'Worksheet Effective Date Warning',
    content: 'CRITICAL: Worksheet Effective Date must be set to 12/31/2026 BEFORE launching forms. Once forms are launched, this date is locked and cannot be edited!',
    color: 'rose',
    milestoneId: 'm-2-5',
    phaseId: 'phase-2',
    pinned: true,
    author: 'Elena Rostova',
    createdAt: '2026-10-14 11:00',
    tags: ['Critical', 'EC Setting']
  },
  {
    id: 'sn-4',
    title: 'Budget Hard Stop Rule',
    content: 'OmniVerse Total Rewards committee requested a strict 102.0% hard stop on merit budget over-allocation. Forms cannot be routed unless brought back into compliance.',
    color: 'amber',
    milestoneId: 'm-3-3',
    phaseId: 'phase-3',
    pinned: false,
    author: 'Marcus Vance',
    createdAt: '2026-10-14 11:45',
    tags: ['Budget', 'Policy']
  },
  {
    id: 'sn-5',
    title: 'Lump Sum Split Rule',
    content: 'Configured comp-salary-rule to automatically route increases above the 120% compa-ratio cap into lump-sum bonuses to avoid permanent salary creep.',
    color: 'green',
    milestoneId: 'm-3-1',
    phaseId: 'phase-3',
    pinned: false,
    author: 'Sarah Chen',
    createdAt: '2026-10-14 14:10',
    tags: ['Salary Rule', 'Best Practice']
  },
  {
    id: 'sn-6',
    title: 'Check Tool Zero Tolerance',
    content: 'All cyclic manager loops must be resolved in staging before opening Wave 1 worksheets. 2 cyclic relationships identified in APAC branch.',
    color: 'purple',
    milestoneId: 'm-4-1',
    phaseId: 'phase-4',
    pinned: true,
    author: 'Sarah Chen',
    createdAt: '2026-10-14 15:20',
    tags: ['Check Tool', 'Blocked']
  }
];

export const INITIAL_ROOMS: CollaborationRoom[] = [
  {
    id: 'room-global-arch',
    name: 'OmniVerse Global Architecture Room',
    topic: 'Core architecture, governance, SAP Activate milestones, and steering committee alignment.',
    activeParticipants: [
      { name: 'Dr. Niladri Nayak', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80', status: 'active' },
      { name: 'Elena Rostova', role: 'Data Integration Lead', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80', status: 'active' },
      { name: 'Marcus Vance', role: 'Comp Specialist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80', status: 'away' },
      { name: 'Sarah Chen', role: 'Security & RBP Admin', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80', status: 'active' },
    ],
    messages: [
      {
        id: 'msg-1',
        author: 'Dr. Niladri Nayak',
        role: 'Lead Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        content: 'Welcome team to the OmniVerse Energy Ltd. Compensation Configuration Journal. We have completed Phase 1 setup and are progressing through Phase 2 Data Integration.',
        timestamp: '10:00 AM',
        milestoneRef: 'm-1-1'
      },
      {
        id: 'msg-2',
        author: 'Sarah Chen',
        role: 'Security & RBP Admin',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
        content: 'All Administrator and User Permissions for System Admin are granted. Upgrade Center packages are fully verified.',
        timestamp: '10:25 AM',
        milestoneRef: 'm-1-2'
      },
      {
        id: 'msg-3',
        author: 'Elena Rostova',
        role: 'Data Integration Lead',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
        content: 'The UDF sanitization script completed. Currency symbols and percentage signs have been stripped. Working on the final workbook sign-off with customer PM.',
        timestamp: '11:15 AM',
        milestoneRef: 'm-2-2',
        isDecision: true
      }
    ],
    sharedNotes: `OmniVerse Architecture Objectives:
• Standardize annual salary planning across North America, EMEA, and APAC.
• Integration with Employee Central as Primary System of Record.
• Rollup Hierarchy with 4-stage route map approval.
• 3.8% Merit Budget pool with 102% hard submission block.`
  },
  {
    id: 'room-ec-integration',
    name: 'EC & Data Integration Lab',
    topic: 'Field mappings, pay components (COMP/BOTH), MDF business rules, and XML validation.',
    activeParticipants: [
      { name: 'Elena Rostova', role: 'Data Integration Lead', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80', status: 'active' },
      { name: 'Dr. Niladri Nayak', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80', status: 'active' },
    ],
    messages: [
      {
        id: 'msg-ec-1',
        author: 'Elena Rostova',
        role: 'Data Integration Lead',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
        content: 'Note on Pay Components: We verified that no employee in OmniVerse has more than one recurring pay component flagged as COMP or BOTH.',
        timestamp: '09:40 AM',
        milestoneRef: 'm-2-5'
      },
      {
        id: 'msg-ec-2',
        author: 'Dr. Niladri Nayak',
        role: 'Lead Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        content: 'Confirmed. And remember that for EC promotion integration, finalAttribute must be set on promotionPayGrade in calculation settings.',
        timestamp: '10:05 AM',
        milestoneRef: 'm-2-5',
        isDecision: true
      }
    ],
    sharedNotes: `Data Integration Checkpoints:
1. UDF dates format: MM/DD/YYYY strictly.
2. Non-mappable fields (STATUS, USERID) duplicated as custom fields.
3. Worksheet Effective Date set to 12/31/2026.
4. Currency tables: No header row, no trailing commas.`
  },
  {
    id: 'room-comp-committee',
    name: 'Compensation Committee & Exec Review',
    topic: 'Budget pools, merit guideline matrices, lump sum splits, and executive approvals.',
    activeParticipants: [
      { name: 'Marcus Vance', role: 'Comp Specialist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80', status: 'active' },
      { name: 'Dr. Niladri Nayak', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80', status: 'active' },
    ],
    messages: [
      {
        id: 'msg-cc-1',
        author: 'Marcus Vance',
        role: 'Comp Specialist',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        content: 'The 5x4 Merit Guideline matrix has been formulated. Top performers in Q1 compa-ratio will receive up to 6.5% base increase.',
        timestamp: '11:30 AM',
        milestoneRef: 'm-3-5'
      }
    ],
    sharedNotes: `Executive Policy Decisions:
• Merit Guideline matrix is calibrated for 3.8% aggregate budget.
• Mandatory planner comments required on any guideline deviations.
• Executive Review mass action enabled for CHRO review.`
  },
  {
    id: 'room-war-room',
    name: 'Pre-Flight & Check Tool War Room',
    topic: 'Check Tool diagnostics, launch wave schedules, defect resolution, and EC publishing.',
    activeParticipants: [
      { name: 'Sarah Chen', role: 'Security & RBP Admin', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80', status: 'active' },
      { name: 'Elena Rostova', role: 'Data Integration Lead', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80', status: 'active' },
      { name: 'Dr. Niladri Nayak', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80', status: 'away' },
    ],
    messages: [
      {
        id: 'msg-wr-1',
        author: 'Sarah Chen',
        role: 'Security & RBP Admin',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
        content: 'Initial Check Tool run flagged 2 cyclic dependencies in APAC and 3 unmapped currency pairs for SGD. Logged in Issue Tracker as ISS-101 and ISS-102.',
        timestamp: '08:50 AM',
        milestoneRef: 'm-4-1'
      }
    ],
    sharedNotes: `Pre-Launch Criteria:
• 0 Check Tool Errors
• 0 Cyclic Dependencies
• All worksheets launched by regional Employee Groups
• Staged rollout: Wave 1 (NA), Wave 2 (EMEA), Wave 3 (APAC)`
  }
];

export const INITIAL_ISSUES: ProjectIssue[] = [
  {
    id: 'ISS-101',
    title: 'Cyclic manager hierarchy loop detected in APAC business unit',
    description: 'Check Tool identified a cyclic reporting loop between Manager A (EMP-9021) and Manager B (EMP-9022) in Singapore division.',
    phaseId: 'phase-4',
    milestoneId: 'm-4-1',
    severity: 'critical',
    status: 'investigating',
    assignee: 'Sarah Chen',
    reporter: 'Dr. Niladri Nayak',
    reportedDate: '2026-10-14',
    resolutionNotes: 'HR Operations contacted to provide correct supervisor hierarchy in UDF.'
  },
  {
    id: 'ISS-102',
    title: 'Pay component group annualized rate mismatch with EC recurring component',
    description: 'Annualized pay component group sum differs from the individual base salary pay component for 14 employees in UK subsidiary.',
    phaseId: 'phase-2',
    milestoneId: 'm-2-5',
    severity: 'high',
    status: 'in_fix',
    assignee: 'Elena Rostova',
    reporter: 'Elena Rostova',
    reportedDate: '2026-10-13',
    resolutionNotes: 'Adjusting frequency conversion factor in EC Corporate Data Model for monthly vs bi-weekly workers.'
  },
  {
    id: 'ISS-103',
    title: 'Compa-ratio rounding boundary exceeding guideline max in EUR currency conversion',
    description: 'When converting EUR to USD in guideline calculation, employees at exactly 120.00% round to 120.01% triggering unexpected lump sum split.',
    phaseId: 'phase-3',
    milestoneId: 'm-3-1',
    severity: 'medium',
    status: 'resolved',
    assignee: 'Marcus Vance',
    reporter: 'Marcus Vance',
    reportedDate: '2026-10-12',
    resolutionNotes: 'Updated XML calculation threshold to 120.05% with round="nearest" attribute.'
  },
  {
    id: 'ISS-104',
    title: 'Custom Plant Code field not flagged as reloadable in XML',
    description: 'Worksheet update job failed to refresh customPlantCode when employees transferred between facilities mid-cycle.',
    phaseId: 'phase-2',
    milestoneId: 'm-2-4',
    severity: 'medium',
    status: 'verified',
    assignee: 'Dr. Niladri Nayak',
    reporter: 'Sarah Chen',
    reportedDate: '2026-10-11',
    resolutionNotes: 'Added reloadable="true" to customPlantCode comp-field-definition and re-validated against sf-form.dtd.'
  }
];
