import { AuthCard } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"

export function generateStaticParams() {
  return Object.values(authViewPaths).map((pathname) => ({ pathname }))
}

export default async function AuthPage(
  { params }: { params: Promise<{ pathname: string }> }
) {
  const { pathname } = await params

  return (
    <div className="w-full flex justify-center h-screen">
      <section className="flex max-w-md flex-col grow p-4 items-center justify-center">
        <AuthCard
          pathname={pathname}
          classNames={{
            form: {
              providerButton: 'border border-[#f687b3] text-[#f687b3] hover:bg-black/5 transition-colors duration-200',
            },
          }}
        />
      </section>
    </div>
  )
}
