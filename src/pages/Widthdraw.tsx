import { widthdrawFunds } from '../api/api'
import { useOutletContext } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { LoaderCircle } from 'lucide-react';

const Widthdraw = () => {
  const [ammount, setAmmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setUpdate } = useOutletContext<any>()
  const { toast } = useToast()

  const handleWidthdrawFunds = async() => {
    setIsLoading(true)
    const id = localStorage.getItem('userId')||''
    const parsedID:number|null = parseInt(id)
    const parsedAmmount:number = parseFloat(ammount)
    const response = await widthdrawFunds(parsedID, parsedAmmount)
    if(response){
      const data = await response.json()
    if(response.ok){
      toast({
        title: "Widthdraw",
        description: data.message,
      })
    }else{
      toast({ 
        variant:"destructive",
        title: "Widthdraw",
        description: data.message,
      })
    }
    setAmmount('')
    setUpdate((prev:boolean) => !prev)
    }else{
      toast({
        variant:"destructive",
        title: "Widthdraw",
        description: "Network Error",
      })
    }
    setIsLoading(false)

  }
  return (
    <Card className="w-full p-5">
    <CardHeader>
      <CardTitle >Widthdraw</CardTitle>
    </CardHeader>
    <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5 items-start">
            {/* <Label htmlFor="email">Email</Label> */}
            <Input id="quantity" placeholder="Quantity" type="number" value={ammount} onChange={(e) => setAmmount(e.target.value)}/>
          </div>

          <Button disabled = {ammount === '' || isLoading} onClick={handleWidthdrawFunds}>
          {isLoading && <LoaderCircle className="h-4 w-4 mx-2 animate-spin"/>}
          {!isLoading && "Widthdraw"}
          </Button>
        </div>
    </CardContent>
  </Card>
  )
}

export default Widthdraw