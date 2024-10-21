
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Account from './pages/Account';
import Layout from './pages/Layout';
import { ThemeProvider } from './components/ui/theme-provider';
import Home from './pages/Home';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
      <Route path="/account" element={<Account />} />
      <Route path='/home' element={<Home />}/>
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
