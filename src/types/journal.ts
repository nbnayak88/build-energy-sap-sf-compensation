export type MilestoneStatus = 'not_started' | 'in_progress' | 'in_review' | 'completed' | 'blocked';
export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low';
export type IssueStatus = 'open' | 'investigating' | 'in_fix' | 'resolved' | 'verified';
export type NoteColor = 'yellow' | 'blue' | 'green' | 'purple' | 'amber' | 'rose';

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
  isCritical?: boolean;
}

export interface Milestone {
  id: string;
  phaseId: string;
  number: string;
  title: string;
  shortDesc: string;
  detailedGuide: string[];
  omniVerseContext: string;
  deliverables: string[];
  keyDecisions: string[];
  status: MilestoneStatus;
  assignee: {
    name: string;
    role: string;
    avatar: string;
  };
  dueDate: string;
  completedDate?: string;
  tasks: TaskItem[];
  dependencies: string[]; // List of previous milestone IDs required
  xmlSnippet?: string;
  checkToolTips?: string[];
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  color: string;
  badge: string;
  description: string;
  milestoneIds: string[];
}

export interface StickyNote {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  milestoneId?: string;
  phaseId?: string;
  pinned: boolean;
  author: string;
  createdAt: string;
  tags: string[];
}

export interface RoomMessage {
  id: string;
  author: string;
  role: string;
  avatar: string;
  content: string;
  timestamp: string;
  milestoneRef?: string;
  isDecision?: boolean;
}

export interface CollaborationRoom {
  id: string;
  name: string;
  topic: string;
  activeParticipants: Array<{
    name: string;
    role: string;
    avatar: string;
    status: 'active' | 'away';
  }>;
  messages: RoomMessage[];
  sharedNotes: string;
}

export interface ProjectIssue {
  id: string;
  title: string;
  description: string;
  phaseId: string;
  milestoneId: string;
  severity: IssueSeverity;
  status: IssueStatus;
  assignee: string;
  reporter: string;
  reportedDate: string;
  resolutionNotes?: string;
}
