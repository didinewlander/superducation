import { SidebarRoutes } from "./NavbarRoutes"
import { Logo } from "./Logo"

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm  select-none">
      <div className="p-2 items-center">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}

export default Sidebar