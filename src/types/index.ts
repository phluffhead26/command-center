export interface Column {
  id: string;
  title: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface Card {
  id: string;
  title: string;
  type: 'Project' | 'Task' | 'Idea' | 'Recurring' | 'Setup' | 'Automation' | 'Bug Fix' | 'Research' | 'Infrastructure';
  column: string;
  owner: string;
  category: string;
  tags: string[];
  goal?: string;
  notes?: string;
  parent?: string;
}

export interface Goal {
  id: string;
  title: string;
  summary: string;
}

export interface Brief {
  focusToday: string[];
  weeklyPowerMoves: string[];
}

export interface TaskData {
  columns: Column[];
  categories: Category[];
  cards: Card[];
  goals: Goal[];
  brief: Brief;
}
