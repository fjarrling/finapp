import styles from './Header.module.scss'
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
    <header className={styles.header}>
      <div className={'container'}>
        <div className={styles.headerInner}>
          <NavLink className={styles.headerLogo} to='/'>
            Finapp
          </NavLink>
          <NavigationMenu>
            <NavigationMenuList className={styles.headerMenuList}>
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  )
}

export default Header