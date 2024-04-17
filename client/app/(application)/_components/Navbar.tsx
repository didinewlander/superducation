import { SidebarRoutes } from "./NavbarRoutes"
import MobileSidebar from "./MobileSidebar";

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <div className="flex text-center">
        <h1>{"Don't remember what's this for"}</h1>
      </div>
      <SidebarRoutes />
    </div>
  );
}
