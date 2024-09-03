import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from 'lucide-react';

import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"

const Login = () => {
  const { toast } = useToast()
  const { setIsLoggedIn } = useOutletContext<any>();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault();
    
    const payload = {username, password}
    console.log("Logging in with:", {payload});

    try {
      const response = await fetch(import.meta.env.VITE_API_URL+'/auth/login',
        {
          method : 'POST',
          headers : {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })
        const data = await response.json();
        console.log(data)
        if (!response.ok) {
          toast({
          variant: "destructive",
          title: "Log In",
          description: data.message,
        })
          setIsLoading(false)
          throw new Error(data.message);
          
        }
        
        console.log('Response data:', data);
        toast({
          title: "Log In",
          description: data.message,
        })
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.id);
        setIsLoading(false)
        navigate('/account')

    } catch (error) {
      console.error('Error:', error)
      setIsLoading(false)
    }
  }
  return (
    <div className="flex-auto flex items-center justify-center">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">SR Bank</CardTitle>
        <CardDescription className="text-center">Provide your credentials to log in.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 items-start">
              {/* <Label htmlFor="email">Email</Label> */}
              <Input id="username" placeholder="Username" type="text" onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5 items-start">
                {/* <Label htmlFor="password">Password</Label> */}
                <Input id="password" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)}/>
            </div>
            <Button disabled={isLoading || !username || !password}>
              {isLoading && <LoaderCircle className="h-4 w-4 mx-2 animate-spin"/>}
             {!isLoading && "LogIn"}
              </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link to='/signup'>Create an Account</Link>
      </CardFooter>
    </Card>
    </div>
  );
};

export default Login;
