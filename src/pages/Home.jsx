import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ui/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(
          `${config.base_url}/listing?offer=true&limit=3`
        );
        const data = await res.json();
        // console.log(data.data);
        setOfferListings(data.data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`${config.base_url}/listing?type=rent&limit=3`);
        const data = await res.json();
        setRentListings(data.data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`${config.base_url}/listing?type=sale&limit=3`);
        const data = await res.json();
        setSaleListings(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);
  // console.log(offerListings);
  console.log(saleListings);
  // console.log(rentListings);
  return (
    <div>
      {/* TOP SIDE  */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl ">
          Find your next <span className="text-slate-500">perfect</span> <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          RealEstate is the best place to find your next perfect place to live.{" "}
          <br />
          We have a wide range of properties for you to choose from.
        </div>

        <Link className=" text-xs sm:text-sm text-blue-800 font-bold hover:underline ">{`Let's get started...`}</Link>
      </div>
      {/***** TOP SIDE END**** */}

      {/* SWIPER SIDE  */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/***** SWIPER SIDE END**** */}

      {/* LISTING RESULT  ,  */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10  ">
        {/* - OFFER , */}
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?offer=true`}>
                Show more offers
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 ">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {/* RENT  */}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?type=rent`}>
                Show more places for rent
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 ">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {/* SALES  */}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sales
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?type=sale`}>
                Show more places for sales
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 ">
              {saleListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/*** LISTING RESULT END*** */}
    </div>
  );
}
