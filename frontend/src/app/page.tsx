import { SampleCard } from '@/components/SampleCard';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <h1 className="text-3xl font-bold text-slate-900">Frontend is running</h1>
        <p className="text-base text-slate-600">
          This is the starter frontend for the Pomodoro Task Tracker project.
        </p>
        <SampleCard />
      </div>
    </main>
  );
}
