import {AdminLoginForm} from '../../components/admin/signIn';

const AdminsignIn = () => {
  return (
    <div className="w-screen h-screen bg-[#2C2C2C] flex flex-col justify-start items-center pt-60">
      <h1 className="text-5xl font-semibold text-gray-300 font-K2D">
        Crevio
      </h1>      
      <h1 className="mt-2 text-3xl font-light text-gray-300">
        Admin Room
      </h1> 
      <div className='mt-12'>
        <AdminLoginForm/>
      </div>
      
    </div>
  );
};

export default AdminsignIn;
