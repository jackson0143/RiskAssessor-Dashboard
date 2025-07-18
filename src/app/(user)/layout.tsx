// import { auth } from '@clerk/nextjs/server'
// import { redirect } from 'next/navigation'

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const { sessionClaims } = await auth()
  
  // Check if user has admin role and redirect them to admin area
  // if (sessionClaims?.metadata?.role === 'admin') {
  //   redirect('/admin/home') // Redirect admin users to admin area
  // }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
} 