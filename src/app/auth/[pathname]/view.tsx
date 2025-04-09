import { AuthCard } from "@daveyplate/better-auth-ui"

export function AuthView({
  pathname
}: {
  pathname: string
}) {

  return (
    <div className="w-full flex justify-center h-screen">
      <section className="flex max-w-md flex-col grow p-4 items-center justify-center">
        <AuthCard
          pathname={pathname}
          classNames={{
            form: {
              providerButton: 'border border-[#f687b3] text-[#f687b3] hover:bg-[#f687b3] hover:text-white transition-colors duration-200',
            },
          }}
        />
      </section>
    </div>
  )
}
