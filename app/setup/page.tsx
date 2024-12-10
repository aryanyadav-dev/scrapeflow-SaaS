import { setupUser } from '@/actions/billing/setup-user';

export default async function SetupPage() {
  return await setupUser();
}
