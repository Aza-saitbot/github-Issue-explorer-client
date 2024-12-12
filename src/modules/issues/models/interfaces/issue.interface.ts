import {EIssueState} from '@src/modules/issues/models/enums/issue-state';

interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string | null;
}

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}


interface Reactions {
  url: string;
  total_count: number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}


export interface IIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: EIssueState;
  locked: boolean;
  assignee: User | null;
  assignees: User[];
  milestone: any; // может быть описаным интерфейсом, если известна структура
  comments: number;
  created_at: string; // ISO 8601 формат
  updated_at: string; // ISO 8601 формат
  closed_at: string | null; // ISO 8601 формат
  author_association: string; // Например: "NONE", "COLLABORATOR", и т.д.
  active_lock_reason: string | null; // Возможные причины блокировки
  body: string; // Тело issue
  closed_by: User | null; // Пользователь, закрывший issue
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: any; // Если используется GitHub App
  state_reason: string | null; // Опциональное пояснение состояния
}