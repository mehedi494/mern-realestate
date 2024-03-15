import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ListingItem from "../components/ui/ListingItem";
import TypeWritter from "../components/ui/TypeWritter";
import { config } from "../config";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [color, setColor] = useState("");
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
  const typeWriterText = [
    "ease",
    "comfort",
    "simplicity",
    "facility",
    "convenience",
  ];
  const colors = [
    "text-red-600",
    "text-blue-600",
    "text-green-600",
    "text-yellow-600",
    "text-indigo-600",
    "text-purple-600",
    "text-pink-600",
  ];
  setTimeout(() => {
    setColor("");
    const randomColor = Math.round(Math.random() * 5) + 1;

    setColor(colors[randomColor]);
  }, 5000);

  return (
    <div>
      {/* TOP SIDE  */}
      <div className="flex flex-col gap-6 p-20 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl ">
          Find your next <span className="text-slate-500">perfect</span> <br />
          place with{" "}
          {
            <span className="inline">
              <TypeWritter
                className="inline"
                words={typeWriterText} color={color}></TypeWritter>
            </span>
          }
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          RealEstate is the best place to find your next perfect place to live.{" "}
          <br />
          We have a wide range of properties for you to choose from.
        </div>

        <Link className={`hover:opacity-80 text-xs sm:text-sm  font-bold ${color}`}>
          <button className="  bg-gray-200 p-3 rounded-lg border border-gray-400">{`Let's get started`} {<FaArrowRight className="inline-block ml-2  transform transition-transform duration-300 ease-in-out group-hover:translate-x-5" />}</button>
        </Link>
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
