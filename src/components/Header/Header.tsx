import {NavLink} from "react-router";
import {
  NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const Header = () => {


  return (
    <header className='w-full shadow-md fixed bg-white z-10'>
      <div className='container'>
        <div className='flex items-center justify-between py-5'>
          <NavLink  to='/'>
            Finapp
          </NavLink>
          <NavigationMenu>
            <NavigationMenuList className='flex items-center'>
              <NavigationMenuItem>
                <NavigationMenuLink asChild={true}>
                  <NavLink to='/'>
                    Dashboard
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild={true}>
                  <NavLink to='/accounts'>
                    Accounts
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild={true}>
                  <NavLink to='/transactions'>
                    Transactions
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild={true}>
                  <NavLink to='/categories'>
                    Categories
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  )
}

export default Header