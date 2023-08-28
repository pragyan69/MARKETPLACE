
import { createGlobalState } from "react-hooks-global-state";

const {setGlobalState , useGlobalState , getGlobalState} = createGlobalState(
    {
        modal: 'scale-0',
        updateModal: 'scale-0',
        showModal: 'scale-0',
        alert: { show: false, msg: '', color: '' },
        loading: { show: false, msg: '' },
        connectedAccount: '',
        nft: null,
        nfts: [],
        transactions: [],
        contract: null,
    }
)

// alert set

const setAlert = (msg  , color = green)=>{
    // to show the alert we have to make the loading system false
    setGlobalState('loading' , false)
    // now set the alert the true
    setGlobalState('alert' , {show:true , msg , color})

    // now we have to make a timeout function that will make the alert disappear

    const setTimeout = ()=>{
        setGlobalState('alert' , {show:false , msg:'' , color} , 6000)
    }
}

const setLoadingMessage = (msg)=>{
    const loading = getGlobalState('loading')
    setGlobalState('loading' , {...loading , msg}) // we are using the spread operator to show all the loading files one by one in a loop format

}
// this function is for the big big text that we want to make it small and look good 

const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
      var start = text.substring(0, startChars)
      var end = text.substring(text.length - endChars, text.length)
      while (start.length + end.length < maxLength) {
        start = start + '.'
      }
      return start + end
    }
    return text
  }

 export{
    useGlobalState,
    setGlobalState,
    getGlobalState,
    setAlert,
    setLoadingMessage,
    truncate
 }