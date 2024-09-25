import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from 'lucide-react';


const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault();
    if (password === confirmPassword){
      const payload = {username, email, password}
      console.log("Signing up with:", {payload});

      try {
        const response = await fetch(import.meta.env.VITE_API_URL+'/auth/signup',
          {
            method : 'POST',
            headers : {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
          })
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Response data:', data);
          navigate('/login')
          setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error('Error:', error);
      }
    }else{
      toast({
        variant: "destructive",
        title: "Sign In",
        description: "Passwords do not match",
      })
      setIsLoading(false)

    }
    
  }
  return (
    <div className="flex-auto flex items-center justify-center">
    <Card className="w-[350px] border-none">
      <CardHeader>
        <CardTitle className="text-center">SR Bank</CardTitle>
        <CardDescription className="text-center">Provide the required information to create an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={e => handleSignup(e)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 items-start">
              <Input required id="username" placeholder="Username" type="text" value ={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5 items-start">
              <Input required id="email" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5 items-start">
              <Input required id="password" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5 items-start">
              <Input required id="password" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <Button disabled={isLoading || !username || !email || !password || !confirmPassword }>
              {isLoading && <LoaderCircle className="h-4 w-4 mx-2 animate-spin"/>}
             {!isLoading && "Create Account"}</Button>
          </div>
        </form>
      </CardContent>
      {/* <CardFooter className="flex justify-center">
        <Link to='/login'>Already have an Account?</Link>
      </CardFooter> */}
    </Card>
    </div>

  );
};


export default Signup