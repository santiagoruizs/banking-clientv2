
import { CircleUserRound, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from './theme-provider';
import { useNavigate } from 'react-router-dom';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header: React.FC<HeaderProps> = ({isLoggedIn,setIsLoggedIn}) => {
  const { setTheme } = useTheme()
  const navigate = useNavigate();
  // const [theme, setTheme] = useState('light')
  const handleLogOut = () => {
    if(isLoggedIn){
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('/home')
  }else{
    navigate('/home')
  }
  }
  return (
    <div className='w-full flex-initial flex flex-row justify-between items-center h-20 px-5 fixed top-0 z-50 bg-background'>
        <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 cursor-pointer" onClick={() => setTheme("dark")}/>
        <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 cursor-pointer" onClick={() => setTheme("light")}/>
        <Link to={isLoggedIn ? '/account' : '/home'}><button className='border-none rounded-xl text-xl font-bold select-none'>SR Bank</button></Link>
        <Menubar className='rounded-full border-none'>
          <MenubarMenu>
            <MenubarTrigger className='rounded-full border-none m-0 p-0'><CircleUserRound className='h-[1.5rem] w-[1.5rem] cursor-pointer m-0'/></MenubarTrigger>
            <MenubarContent>
              {!isLoggedIn && <Link to='/login'><MenubarItem >LogIn</MenubarItem></Link>}
              {isLoggedIn &&<MenubarItem onClick={handleLogOut}>LogOut</MenubarItem>}
              {!isLoggedIn && <Link to='/signup'><MenubarItem>SignIn</MenubarItem></Link>}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        
    </div>
  )
}

export default Header