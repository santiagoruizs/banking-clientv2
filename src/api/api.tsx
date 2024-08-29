export const Signup = async (username : string, password: string) => {
    const payload = {username, password}
    console.log("Logging in with:", {payload});

    try {
      const response = await fetch(import.meta.env.VITE_API_URL +'/auth/login',
        {
          method : 'POST',
          headers : {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })
        return response

    } catch (error) {
      console.error('Error:', error);
    }
}

export const Login = async (username:string, email:string, password:string) => {

    const payload = {username, email, password}
    console.log("Signing up with:", {payload});

    try {
        const response = await fetch(import.meta.env.VITE_API_URL +'/auth/signup',
        {
            method : 'POST',
            headers : {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })

        return response

   } catch (error) {
        console.error('Error:', error);
    }
}


export const getAccount = async (id:number) => {

    // console.log("Signing up with:", {payload});

    try {
        const response = await fetch(import.meta.env.VITE_API_URL +'/account/'+id,
        {
            method : 'GET',
            headers : {
            'Content-Type': 'application/json',
            },
        })

        return response
        
    } catch (error) {
        console.error('Error:', error);
    }
}

export const depositFunds = async (id:number, ammount:number) => {

    const payload = {ammount}
    console.log("Deposit :", {payload});

    try {
        const response = await fetch(import.meta.env.VITE_API_URL +'/account/'+id+'/deposit',
        {
            method : 'PUT',
            headers : {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })

        return response

    } catch (error) {
        console.error('Error:', error);
    }
}

export const widthdrawFunds = async (id:number, ammount:number) => {

    const payload = {ammount}
    console.log("Widthdraw :", {payload});

    try {
        const response = await fetch(import.meta.env.VITE_API_URL +'/account/'+id+'/widthdraw',
        {
            method : 'PUT',
            headers : {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })

        return response
    } catch (error) {
        console.error('Error:', error);
    }
}

export const transferFunds = async (id:number, toAccountNumber:string, ammount:number) => {

    const payload = {ammount, toAccountNumber}
    
    console.log("Transfer :", {payload});

    try {
        const response = await fetch(import.meta.env.VITE_API_URL +'/account/'+id+'/transfer',
        {
            method : 'PUT',
            headers : {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })

        return response
    } catch (error) {
        console.error('Error:', error);
    }
}