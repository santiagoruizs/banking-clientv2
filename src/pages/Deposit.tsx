import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { depositFunds } from '../api/api'
import { useOutletContext } from 'react-router-dom'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { LoaderCircle } from 'lucide-react';

const Deposit = () => {
  const [ammount, setAmmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { setUpdate } = useOutletContext<any>()
  
  const handleDeposit = async() => {
    setIsLoading(true)
    const id:string|null = localStorage.getItem('userId')||''
    const parsedID:number|null = parseInt(id)
    const parsedAmmount = parseFloat(ammount)
    const response = await depositFunds(parsedID, parsedAmmount)
    if (response){
      const data = await response.json()
    console.log(data)
    if(response.ok){
      toast({
        title: "Deposit",
        description: data.message, 
      })
    }else{
      toast({
        variant:"destructive",
        title: "Deposit",
        description: data.message,
      })
    }
    setAmmount('')
    setUpdate((prev: boolean) => !prev)
    }else{
      toast({
        variant:"destructive",
        title: "Deposit",
        description: "Network Error",
      })
    }
    setIsLoading(false)
    // navigate('/account')
  }
  return (
    <Card className="w-full">
    <CardHeader>
      <CardTitle >Deposit</CardTitle>
    </CardHeader>
    <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5 items-start">
            {/* <Label htmlFor="email">Email</Label> */}
            <Input id="quantity" placeholder="Quantity" type="number" value={ammount} onChange={(e) => setAmmount(e.target.value)}/>
          </div>

          <Button disabled = {ammount === '' || isLoading} onClick={handleDeposit}>
          {isLoading && <LoaderCircle className="h-4 w-4 mx-2 animate-spin"/>}
          {!isLoading && "Deposit"}
          </Button>
        </div>
    </CardContent>
  </Card>
  )
}

export default Deposit