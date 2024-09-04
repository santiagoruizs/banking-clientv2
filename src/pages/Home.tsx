import { Button } from "@/components/ui/button"
import CardImg from '../assets/image2.jpg'
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row h-ful items-center justify-center h-screen relative">
        <div className="w-full h-screen lg:w-1/2 p-10 flex flex-col items-center justify-center absolute lg:static left-0 z-10 bg-background/50 lg:bg-transparent">
            <h1 className="text-4xl lg:text-6xl m-5 text-center lg:text-left">Smart Banking to Manage Your Money & Transactions</h1>
            <p className="m-5 text-center lg:text-left">We Will help you manage your money and transactions easily, follow the instructions and you can manage your money here.</p>
            <div className="m-5 flex flex-row gap-1 justify-center lg:justify-start">
                <Link to='/signup'> <Button >Create Account</Button></Link>
                <Link to='/login'><Button >Log In</Button></Link>
            </div>
            
        </div>
        <div className="w-full lg:w-1/2 lg:rounded-s-full flex items-center justify-center overflow-hidden relative h-screen lg:h-5/6">
            <img src={CardImg} alt="card" className=" w-full  lg:rounded-s-full h-full lg:w-full object-cover"/>
        </div>
    </div>
  )
}

export default Home