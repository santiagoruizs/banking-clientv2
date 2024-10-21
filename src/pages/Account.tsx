
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
// import { useToast } from '@/components/ui/use-toast'
import { getAccount, getTransactions } from '../api/api'
import CountUp from 'react-countup';
import { WalletMinimal } from 'lucide-react';

import Deposit from './Deposit';
import { useOutletContext } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import TransactionHistory from '../components/TransactionHistory'
import Widthdraw from './Widthdraw';
import Transfer from './Transfer';

type Account = {
  balance: number
  account_number: string
}
const Account = () => {
    // const { toast } = useToast()
    // const location = useLocation()
    const {setIsLoggedIn} = useOutletContext<any>();
    const [username, setUsername] = useState<string | null>('')
    const [account, setAccount] = useState<Account>({balance:0,account_number:''})
    const [update, setUpdate] = useState(false)
    const [transactions, setTransactions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
      const getAccountInfo = async (user_id:number) => {
        
        const response = await getAccount(user_id)
        if(response){
          const data = await response.json()
         //console.log(data);
          setAccount(data)
          const transactionsResponse = await getTransactions(data.account_number)
          const transact = await transactionsResponse?.json()
          setTransactions(transact)
          //console.log(transactions)
          setUsername(localStorage.getItem('username'))
        }else{
          console.log('Network Error')
        }
      }
      const id:string|null = localStorage.getItem('userId')||''
      if (id){
        const parsedID:number|null = parseInt(id)
        setIsLoggedIn(true)
        getAccountInfo(parsedID)   
      }else{
        navigate('/home')
      }
  
    }, [update])

  return (
    <div className='w-11/12 sm:px-10 sm:w-[600px] pt-[100px]'>
      <Sheet >
      <h3 className='text-2xl mb-5'>Welcome back <strong>{username}</strong></h3>
      <SheetTrigger className='w-full text-left'>
      <Card className='mb-5 cursor-pointer p-5'>
        <CardHeader className='flex flex-row justify-between items-center'>
          <h3 className='font-bold text-xl'>Main Account</h3>
          <WalletMinimal className='w-6'/>
        </CardHeader>
        <CardContent>
        <CountUp 
            end={account.balance}
            decimal='.' 
            decimals={2} 
            prefix="$"
            duration={1}
            className='font-bold text-2xl'
        />
        </CardContent>
      </Card>
      </SheetTrigger>
      
      <div className='flex flex-row mb-5 justify-center'>
      <Deposit />
      <Widthdraw />
      <Transfer />
      </div>
      {transactions.length > 0 && (<div>
        <h2 className='text-xl font-bold mb-5'>Transactions</h2>
        <TransactionHistory transactions={transactions} />
      </div>)}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Account Information</SheetTitle>
          <SheetDescription>
            <h1>Username: {username}</h1>
            <p>Account Number : {account.account_number}</p>
            <p>Balance : {account.balance}</p>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
      </Sheet>
    </div>
    
  )
}

export default Account