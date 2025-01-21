import { Button } from "../../components/user/button"

const LandingPage = () => {
  return (
    <>
      <div className='w-full h-[800px] bg-[#D7FEC8] rounded-br-[160px] shadow-md' style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', position:'fixed' }}>
        <h1 className="text-[#00835B] font-K2D text-5xl mb-2 font-semibold ml-8 mt-3">
          Crevio
        </h1>

        <div className="flex items-center justify-start mt-40 pl-[12%] " >
          <div className="flex flex-col">
            <h1 className='justify-center text-5xl font-semibold font-Inter'> Find the Right Talent,<br/>Get the Job Done.</h1>

            <p className="mt-5 text-lg">All-in-one platform to connect businesses with top freelancers for <br />projects, collaboration.</p>
            
            <Button type="submit" className="w-2/5 text-xl h-[68px] mt-12 rounded-2xl font-normal" >Get Started</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage