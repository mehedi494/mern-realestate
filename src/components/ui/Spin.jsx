

// eslint-disable-next-line react/prop-types
export default function Spin({className,text}) {

  
  return (
   <div className="flex flex-col my-40 justify-center items-center">
 <div
      className={
        className
          ? `${className} border-2  border-b-4 border-gray-700 rounded-full animate-spin`
          : "w-12 h-12 border-2  border-b-4 border-gray-700 rounded-full animate-spin"
      }></div>
      <p>{text}</p>


   </div>
  );
}
