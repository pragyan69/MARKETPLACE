import Header  from './components/Header'
import Hero from './components/Hero'
import Artworks from './components/Artworks'
import Transactions from './components/Transactions'
import CreateNFT from './components/CreateNFT'
const App = () => {
  return (
    <div className = "min-h screen">
      <div className = "gradient-bg-hero">
        <Header/>
        <Hero/>

      </div>

      <Artworks/>
      <Transactions/>
      {/* nft making component */}
      {/* <CreateNFT/> */}

         

    </div>
  )
}

export default App
