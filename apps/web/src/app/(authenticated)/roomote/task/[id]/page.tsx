import { redirect } from 'next/navigation';

import { authorize } from '@/actions/auth';
import { authorizeRoomotes } from '@/lib/roomotes';

interface TaskPageProps {
  params: Promise<{ id: string }>;
}

export default async function TaskPage({ params }: TaskPageProps) {
  const { id } = await params;
  const authResult = await authorize();

  if (!authResult.success) {
    redirect('/select-org');
  }

  const { success } = await authorizeRoomotes();

  if (!success) {
    redirect('/usage?error=roomotes_not_enabled');
  }

  // Redirect to roomote page with task ID as query parameter
  // This allows the existing TaskModal integration in Jobs.tsx to handle the task display
  redirect(`/roomote?taskId=${id}`);

  // This should never be reached due to redirects above, but Next.js requires a component return
  return null;
}