import Header from '@/components/ui/Header'
import { Toaster } from '@/components/ui/toaster'

import {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {   
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className='flex flex-col items-center min-h-screen w-screen bg-background text-foreground'>
        <Header isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn}/>
        <Outlet context={{setIsLoggedIn, isLoggedIn}}/>
        <Toaster />
    </div>
  )
}

export default Layout