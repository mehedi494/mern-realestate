export const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Left side  */}
      <div className="p-7 border-b-2 sm:border-r-2 md:min-h-screen select-none">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label htmlFor="searchTerm" className="whitespace-nowrap font-semibold">
              SearchTerm:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search here..."
              className="border rounded-lg p-3 w-full"
            />
          </div>

          {/* **** ALL CHECKBOX**** BELOW */}
          <div className=" flex gap-2 flex-wrap items-center ">
            <label className="font-semibold">Types: </label>

            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <label htmlFor="all" className="">
                Rent & Sale
              </label>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <label htmlFor="rent" className="">
                Rent
              </label>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <label htmlFor="sale" className="">
                Sale
              </label>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <label htmlFor="offer" className="">
                Offer
              </label>
            </div>
          </div>
          <div className=" flex gap-2 flex-wrap items-center">
            <label>Amenities: </label>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <label htmlFor="parking" className="">
                Parking
              </label>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <label htmlFor="furnished" className="">
                Furnished
              </label>
            </div>
          </div>
          <div className=" flex gap-2 flex-wrap items-center">
            <label htmlFor="sort_order" className="font-semibold">Sort: </label>

            <div className="flex gap-2">
              <select id="sort_order" className="border rounded-lg p-3">
                <option>Price high to low</option>
                <option>Price low to high</option>
                <option>Latest</option>
                <option>oldest</option>
              </select>
            </div>
          </div>
          <button  className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Search</button>
          {/* **** ALL CHECKBOX**** END*/}
        </form>
      </div>

      {/* Right side */}
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Listing Result : </h1>
      </div>
    </div>
  );
};
