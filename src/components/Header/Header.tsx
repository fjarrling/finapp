import {NavLink} from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Header = () => {
  return (
    <header className='w-full border-b fixed bg-background z-10'>
      <div className='container'>
        <div className='flex items-center py-5'>
          <NavLink  to='/'>
            Finapp
          </NavLink>
          <NavigationMenu className="ml-auto mr-8">
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
          <ThemeSwitcher/>
        </div>
      </div>
    </header>
  )
}

export default Header