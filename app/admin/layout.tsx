// import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Temporarily disabled authentication
  // const user = await currentUser();
  // if (!user) {
  //   redirect('/sign-in');
  // }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {children}
      </div>
    </div>
  );
}
