import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
interface Transaction {
  date: string,
  type: string,
  category: string,
  ammount: number,
  to_account_number?: string
}
interface TransactionsProps {
  transactions: Transaction[];
}
const TransactionHistory: React.FC<TransactionsProps> = ({transactions}) => {

  return (
    <div className='max-h-52 overflow-scroll no-scrollbar'>
    <Table >
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
            {Object.keys(transactions[0]).map(key => key !== 'to_account_number' && <TableHead className={key==='ammount' ? 'text-right' : ''}>{key}</TableHead>)}

          {/* <TableHead className="text-right">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody >
        {transactions.map(t => {
          let date = new Date(t.date)
          let formattedDate = date.toLocaleString() 
          return(<TableRow>
                            <TableCell className="font-medium">{formattedDate}</TableCell>
                            <TableCell>{t.type}</TableCell>
                            <TableCell>{t.category}</TableCell>
                            <TableCell className="text-right">${t.ammount}</TableCell>
                        </TableRow>)})}
      </TableBody>
    </Table>
    </div>

  )
}

export default TransactionHistory