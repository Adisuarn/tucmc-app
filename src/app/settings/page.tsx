import { cn } from "@/libs/utils";
import { SettingsCards } from "@daveyplate/better-auth-ui";

const SettingsPage = () => {
  return (
    <section className="w-full flex justify-center items-center h-screen">
      <SettingsCards
        classNames={{
          base: 'border rounded-lg p-4 bg-white shadow-lg',
          tabs: {
            trigger: cn(
              'hover:bg-[#f687b3] hover:text-white transition-colors duration-200',
              'data-[state=active]:bg-[#f687b3] data-[state=active]:text-white'
            ),
            list: 'gap-x-2',
          },
          card: {
            button: cn(
              'border border-[#f687b3] bg-white text-[#f687b3] hover:bg-[#f687b3] hover:text-white',
              'transition-colors duration-200'
            ),
          }
        }}
      />
    </section>
  )
}

export default SettingsPage;
