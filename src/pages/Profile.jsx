import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const {userName,email}= currentUser;
  const handleOnChange = (e) => {
    e.preventDefault();
  };
  return (
    <div className="p-5 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center text-slate-500 ">Profile</h1>
      <form onSubmit={handleOnChange} className="flex flex-col gap-3 ">
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
          src={currentUser?.avatar}
          alt=""
        />
     
        <input 
          className="p-3 border  rounded-lg focus:outline-green-500"
          type="text"
          placeholder="user_name"
          value={userName}
        />
        
        <input
          className="p-3 border  rounded-lg focus:outline-green-500"
          type="text"
          placeholder="email"
          defaultValue={email}
        />
        <input
          className="p-3 border  rounded-lg focus:outline-green-500"
          type="text"
          placeholder="New password"
        />
        <button
          type="submit"
          className="bg-slate-700 hover:opacity-85 text-white uppercase p-3 border  rounded-lg"
          placeholder="password">
          update
        </button>
        <button
         
          className="bg-green-700 hover:opacity-85 text-white uppercase p-3 border  rounded-lg"
          placeholder="password">
          create listing
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <button className="bg-red-500 p-2  text-white rounded-lg hover:opacity-85">Delete account</button>
        <button className="bg-gray-500 p-2  text-white rounded-lg hover:opacity-85">Sign out</button>
      </div>
    </div>
  );
}
