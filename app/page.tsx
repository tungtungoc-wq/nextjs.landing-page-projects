import { redirect } from 'next/navigation';

/**
 * Root page - Redirects to main landing page
 * When users visit the root domain (https://tiengtrungtuelam.vercel.app/)
 * they will be automatically redirected to /tieng-trung-tue-lam
 */
export default function Home() {
  redirect('/tieng-trung-tue-lam');
}
