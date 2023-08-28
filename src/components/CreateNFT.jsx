import React from 'react'
import { useGlobalState , setGlobalState,setLoadingMessage,setAlert } from '../store'
import {FaTimes} from 'react-icons/fa'
import { mintNFT } from '../blockchain.Services'
import {create} from 'ipfs-http-client'
import {useState} from 'react'

// creating the authorization server

const auth =
  Buffer.from('Bearer ' + process.env.REACT_APP_INFURA_IPFS_API_KEY).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});






const CreateNFT = () => {
    // now we will create all the functionalities to make this website run

    const [modal]  = useGlobalState('modal')
    const[title , setTitle] = useState('')
    const [price , setPrice] = useState('')
    const [description , setDescription] = useState('')
    const[fileURL, setFileURL] = useState('')
    const [imgBase64 , setImgBase64] = useState(null)

    // now we wil make a function that will prevent the default loading of a function when a event will be triggred and it will not lead to the reloading of the page

    const handleSubmit = async(e)=>{

         e.preventDefault();
         if(!title || !price || !description) return // if neithier of the following conditions satisfies,  then the function will simply return



    }


  return (
    <div className =  {`fixed top-0 left-0 w-screen h-screen flex items-center
    justify-center bg-black bg-opacity-50 transform
    transition-transform duration-300 ${modal}`}>

        <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
            <form className="flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <p className="font-semibold text-gray-400"> ADD </p>
                        <button  type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none">
                 <FaTimes className="text-gray-400" />

                        </button>
                    
                </div>
                 {/* development after creating the button */}
                <div className="flex flex-row justify-center items-center rounded-xl mt-5">
                    <div  className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                    <img
                alt="NFT"
                className="h-full w-full object-cover cursor-pointer"
                src={
                  imgBase64 ||
                  'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'
                }
              />
              </div>
             </div>

             {/* making the div where i will choose the profile photo */}

             <div>
                <label>
                    <span className="sr-only">CHOOSE YOUR FILE TO BE UPLOADED</span>
                    <input  type="file"
                accept="image/png, image/gif, image/jpeg, image/webp"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#19212c] file:text-gray-400
                  hover:file:bg-[#1d2631]
                  cursor-pointer focus:ring-0 focus:outline-none"
                onChange={changeImage}
                required/>
                </label>
             </div>

             {/* now we will create the text areas where we will set the title,price, description and the button to mint the nft so that it will be deployed in the main net */}

             {/* div for the title  */}
              <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                <input className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required/>
             </div>


             {/* div for the price  */}
             <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                <input  className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="price"
              placeholder="Price (Eth)"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required/>
             </div>

             


             {/* div for the description  */}
             <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5" >
                <textarea className="block w-full text-sm resize-none
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required>

                </textarea>
             </div>


             {/* div for the button to mint the nft  */}
             <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                <button type="submit"
            onClick={handleSubmit}
            className="flex flex-row justify-center items-center
              w-full text-white text-md bg-[#e32970]
              hover:bg-[#bd255f] py-2 px-5 rounded-full
              drop-shadow-xl border border-transparent
              hover:bg-transparent hover:text-[#e32970]
              hover:border hover:border-[#bd255f]
              focus:outline-none focus:ring mt-5" >


                GAIN ON BITHES
                </button>
             </div>
        <div>
         </div>
            </form>
        </div>

      
    </div>
  )
}

export default CreateNFT
