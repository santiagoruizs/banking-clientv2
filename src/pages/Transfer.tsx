import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useOutletContext } from 'react-router-dom'
import { useState } from 'react'
import { transferFunds } from '../api/api'
import { useToast } from '@/components/ui/use-toast'
import { LoaderCircle } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"

const Transfer = () => {
  const [ammount, setAmmount] = useState('')
  const [category, setCategory] = useState('')
  const [toAccount, setToAccount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { setUpdate } = useOutletContext<any>()
  
  const handleTransfer = async() => {
    setIsLoading(true)
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
    
    setIsLoading(false)
  }
  return (

  <Dialog>
  <DialogTrigger><ArrowRight className='w-10 h-10 m-2 rounded-full border-2 p-1 border-slate-700 cursor-pointer'/></DialogTrigger>
  <DialogContent className='p-10'>
    <DialogHeader>
      <DialogTitle>Transfer</DialogTitle>
      <DialogDescription>
      <div className="grid w-full items-center gap-4 mt-5">
        <div className="flex flex-col space-y-1.5 items-start">
            {/* <Label htmlFor="email">Email</Label> */}
            <Input id="account" placeholder="Account Number" type="number" value={toAccount} onChange={(e) => setToAccount(e.target.value)}/>
            <Input id="category" placeholder="Category" type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
            <Input id="quantity" placeholder="Quantity" type="number" value={ammount} onChange={(e) => setAmmount(e.target.value)}/>
          </div>
          <DialogClose asChild>
            <Button disabled = {ammount === '' || toAccount === '' || isLoading} onClick={handleTransfer}>
            {isLoading && <LoaderCircle className="h-4 w-4 mx-2 animate-spin"/>}
            {!isLoading && "Transfer"}
            </Button>
          </DialogClose>
          
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default Transfer