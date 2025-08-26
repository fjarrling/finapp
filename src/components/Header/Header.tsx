import {NavLink, useLocation} from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {useMediaQuery} from "@/hooks/useMediaQuery.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {ChevronDown} from "lucide-react";
import {useEffect, useState} from "react";

const Header = () => {
  const headerNavigation = [
    {label: "Dashboard", to: "/"},
    {label: "Accounts", to: "/accounts"},
    {label: "Transactions", to: "/transactions"},
    {label: "Categories", to: "/categories"}
  ]
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentPage = headerNavigation.find(nav => nav.to === location.pathname)?.label || "Menu";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className='w-full border-b fixed bg-background z-10'>
      <div className='container'>
        <div className='flex items-center py-5'>
          <NavLink to='/'>
            FinApp
          </NavLink>
          {
            !isMobile &&
            <NavigationMenu className="ml-auto mr-8">
              <NavigationMenuList className='flex items-center'>
                {
                  headerNavigation.map((navigation) => (
                    <NavigationMenuItem key={navigation.label}>
                      <NavigationMenuLink asChild={true}>
                        <NavLink to={`${navigation.to}`}>
                          {navigation.label}
                        </NavLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))
                }
              </NavigationMenuList>
            </NavigationMenu>
          }
          {
            isMobile &&
            (
              <div className="ml-auto mr-8">
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger className='flex items-center gap-2'>
                    {currentPage}
                    <ChevronDown width="16" height="16"/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {
                      headerNavigation.map((navigation) => (
                        <DropdownMenuItem key={navigation.label}>
                          <NavLink to={`${navigation.to}`}>
                            {navigation.label}
                          </NavLink>
                        </DropdownMenuItem>
                      ))
                    }
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          }
          <ThemeSwitcher/>
        </div>
      </div>
    </header>
  )
}

export default Header