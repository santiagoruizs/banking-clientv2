import { widthdrawFunds } from '../api/api'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { LoaderCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { HandCoins } from 'lucide-react';

const Widthdraw = () => {
  const [ammount, setAmmount] = useState('')
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setUpdate } = useOutletContext<any>()
  const { toast } = useToast()
  const navigate = useNavigate()
  
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
    navigate('/account')

  }
  return (
  <Dialog>
  <DialogTrigger><HandCoins className='w-10 h-10 m-2 rounded-full border-2 p-1 border-slate-700 cursor-pointer'/></DialogTrigger>
  <DialogContent className='p-10'>
    <DialogHeader>
      <DialogTitle>Widthdraw</DialogTitle>
      <DialogDescription>
        <div className="grid w-full items-center gap-4 mt-5">
           <div className="flex flex-col space-y-1.5 items-start">
             {/* <Label htmlFor="email">Email</Label> */}
             <Input id="quantity" placeholder="Quantity" type="number" value={ammount} onChange={(e) => setAmmount(e.target.value)}/>
             <Input id="category" placeholder="Category" type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
           </div>
           <DialogClose asChild>
            <Button disabled = {ammount === '' || isLoading} onClick={handleWidthdrawFunds}>
            {isLoading && <LoaderCircle className="h-4 w-4 mx-2 animate-spin"/>}
            {!isLoading && "Widthdraw"}
            </Button>
           </DialogClose>
          
         </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default Widthdraw