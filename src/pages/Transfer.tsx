import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useOutletContext } from 'react-router-dom'
import { useState } from 'react'
import { transferFunds } from '../api/api'
import { useToast } from '@/components/ui/use-toast'

const Transfer = () => {
  const [ammount, setAmmount] = useState('')
  const [toAccount, setToAccount] = useState('')
  const { toast } = useToast()
  const { setUpdate } = useOutletContext<any>()
  
  const handleTransfer = async() => {
    const id = localStorage.getItem('userId')||''
    const parsedID:number|null = parseInt(id)
    const parsedAmmount = parseFloat(ammount)
    const response = await transferFunds(parsedID, toAccount ,parsedAmmount)
    if(response){
      const data = await response.json()
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
    setToAccount('')
    setUpdate((prev:boolean) => !prev)
    }
    

  }
  return (
    <Card className="w-full">
    <CardHeader>
      <CardTitle >Transfer</CardTitle>
    </CardHeader>
    <CardContent>
        <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5 items-start">
            {/* <Label htmlFor="email">Email</Label> */}
            <Input id="account" placeholder="Account Number" type="number" value={toAccount} onChange={(e) => setToAccount(e.target.value)}/>
          </div>
          <div className="flex flex-col space-y-1.5 items-start">
            {/* <Label htmlFor="email">Email</Label> */}
            <Input id="quantity" placeholder="Quantity" type="number" value={ammount} onChange={(e) => setAmmount(e.target.value)}/>
          </div>

          <Button disabled = {ammount === '' || toAccount === ''} onClick={handleTransfer}>Transfer</Button>
        </div>
    </CardContent>
  </Card>
  )
}

export default Transfer