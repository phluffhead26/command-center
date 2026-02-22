import KanbanBoard from '@/components/KanbanBoard';
import { TaskData } from '@/types';
import fs from 'fs';
import path from 'path';

async function getTaskData(): Promise<TaskData> {
  const filePath = path.join(process.cwd(), '..', 'command-center', 'public', 'tasks.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Home() {
  const data = await getTaskData();

  return (
    <main className="h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Command Center
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Project & Task Management
            </p>
          </div>
          
          {/* Goals Summary */}
          <div className="hidden md:flex items-center gap-6">
            {data.goals.map((goal) => (
              <div key={goal.id} className="text-right">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Goal
                </div>
                <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {goal.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Focus */}
        {data.brief?.focusToday && (
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Today&apos;s Focus
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.brief.focusToday.map((item, idx) => (
                <span
                  key={idx}
                  className="text-sm px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <KanbanBoard data={data} />
      </div>
    </main>
  );
}
