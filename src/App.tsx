
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Account from './pages/Account';
import Transfer from './pages/Transfer';
import Deposit from './pages/Deposit';
import Widthdraw from './pages/Widthdraw';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './pages/Layout';
import { ThemeProvider } from './components/ui/theme-provider';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
      <Route path="/account" element={<Account />} >
          <Route path="transfer" element={<Transfer />}/>
          <Route path="deposit" element={<Deposit />}/>
          <Route path="widthdraw" element={<Widthdraw />}/>
      </Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
    </Route>
))

function App() {

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme' >
       <RouterProvider router={router} /> 
    </ThemeProvider>
    
  )
}

export default App
