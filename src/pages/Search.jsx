import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import Spin from "../components/ui/Spin";
import ListingItem from "../components/ui/ListingItem";

export const Search = () => {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    furnished: false,
    parking: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata?.searchTerm);
    urlParams.set("type", sidebardata?.type);
    urlParams.set("parking", sidebardata?.parking);
    urlParams.set("furnished", sidebardata?.furnished);
    urlParams.set("offer", sidebardata?.offer);
    urlParams.set("order", sidebardata?.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      // setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`${config.base_url}/listing?${searchQuery}`);
      const data = await res.json();
      // console.log(data.data);
      if (data.data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data.data);
      setLoading(false);
    };

    setTimeout(() => {
      fetchListings();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left side  */}
      <div className="p-7 border-b-2 sm:border-r-2 md:min-h-screen select-none">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label
              htmlFor="searchTerm"
              className="whitespace-nowrap font-semibold">
              SearchTerm:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search here..."
              className="border rounded-lg p-3 w-full"
              onChange={handleChange}
            />
          </div>

          {/* **** ALL CHECKBOX**** BELOW */}
          <div className=" flex gap-2 flex-wrap items-center ">
            <label className="font-semibold">Types: </label>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <label htmlFor="all" className="">
                Rent & Sale
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <label htmlFor="rent" className="">
                Rent
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <label htmlFor="sale" className="">
                Sale
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <label htmlFor="offer" className="">
                Offer
              </label>
            </div>
          </div>
          <div className=" flex gap-2 flex-wrap items-center">
            <label>Amenities: </label>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <label htmlFor="parking" className="">
                Parking
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <label htmlFor="furnished" className="">
                Furnished
              </label>
            </div>
          </div>
          <div className=" flex gap-2 flex-wrap items-center">
            <label htmlFor="sort_order" className="font-semibold">
              Sort:{" "}
            </label>

            <div className="flex gap-2">
              <select
                onChange={handleChange}
                defaultValue={`created_at_desc`}
                id="sort_order"
                className="border rounded-lg p-3">
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">oldest</option>
              </select>
            </div>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
          {/* **** ALL CHECKBOX**** END*/}
        </form>
      </div>

      {/* Right side */}
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Result :
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-400 text-center">
              No listing founds !
            </p>
          )}
          {loading && <Spin text={`Please wait...`}></Spin>}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  );
};
