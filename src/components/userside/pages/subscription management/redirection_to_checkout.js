const redirectToCheckout = async (sessionId) =>{
    const stripe = await window.Stripe(import.meta.env.VITE_PUBLISHABLE_KEY);
    const {error} = await stripe.redirectToCheckout({
      sessionId : sessionId,
    })
    if (error){
          console.log('error ',error);
    }

} 
export default redirectToCheckout