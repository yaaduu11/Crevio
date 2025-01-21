import { LoginForm } from '../../components/user/sign-up'

const SignUp = () => {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF5E3]">
        <h1 className="text-[#00835B] font-K2D text-5xl mb-2 font-semibold">Crevio</h1>
        
        <div className="w-full max-w-lg p-8">
          <LoginForm />
        </div>
      </div>
    );
}

export default SignUp
