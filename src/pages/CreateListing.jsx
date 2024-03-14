import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"; // Import storage and related functions from Firebase

import { app } from "../firebase/firebase.config";
import { config } from "../config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    try {
      if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
        setUploading(true);
        setImageUploadError(false);
        const promises = [];
        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }
        const urls = await Promise.all(promises);
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
      } else {
        setImageUploadError(
          "Please select at least one image and no more than 6 images."
        );
        setUploading(false);
      }
    } catch (error) {
      setImageUploadError("Image upload failed (2mb max per image)");
      setUploading(false);
      console.error("Error uploading images:", error);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.ceil(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          console.log(`upload is ${progress}`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
              resolve(downloadUrl);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  const handleRemoveImage = async (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  // console.log(currentUser._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.imageUrls.length)
        return setError("you must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("discount price must be lower than regular price");

      setLoading(true);
      setError(false);
      const response = await fetch(`${config.base_url}/listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const json = await response.json();

      setLoading(false);
      if (json.success === false) setError(json.message);
      console.log(json._id);
      navigate(`/listing/${json.data._id}`);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 sm:flex-row ">
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength={62}
            minLength={4}
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className=" flex flex-col gap-4">
            {/* checkbox */}
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-2 items-center select-none ">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <label htmlFor="sale">Sell</label>
              </div>
              <div className="flex gap-2 items-center select-none ">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <label htmlFor="rent">Rent</label>
              </div>
              <div className="flex gap-2 items-center select-none ">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <label htmlFor="parking">Parking spot</label>
              </div>
              <div className="flex gap-2 items-center select-none ">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <label htmlFor="furnished">Furnished</label>
              </div>
              <div className="flex gap-2 items-center select-none ">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 h-5  text-green-500 transition duration-150 ease-in-out"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <label htmlFor="offer">Offer</label>
              </div>
            </div>

            {/*  */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  className="w-20 p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="bedrooms"
                  minLength={1}
                  maxLength={10}
                  required
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <label htmlFor="bedrooms"> Beds</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-20 p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="bathrooms"
                  minLength={1}
                  maxLength={10}
                  required
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <label htmlFor="bathrooms">Bathrooms</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-20 p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="regularPrice"
                  minLength={50}
                  maxLength={1000000}
                  required
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col">
                  <label htmlFor="regularPrice"> Regular price</label>
                  <label className="text-sm" htmlFor="regularPrice">
                    ($ / month)
                  </label>
                </div>
              </div>
              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    className="w-20 p-3 border border-gray-300 rounded-lg"
                    type="number"
                    id="discountPrice"
                    minLength={50}
                    maxLength={1000000}
                    required
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col">
                    <label htmlFor="discountPrice">Discount Price</label>
                    <label className="text-sm" htmlFor="regularPrice">
                      ($ / month)
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/*  */}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <div className="flex  gap-2">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6){" "}
              </span>
            </p>
          </div>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button
              disabled={uploading}
              type="button"
              onClick={handleImageSubmit}
              className="p-2 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg  disabled:opacity-80">
              {uploading ? `uploading- (${progress}%)` : "upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={url} className="flex items-center justify-between">
                <img
                  src={url}
                  alt="listing img"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="border border-red-700 p-2 rounded hover:bg-red-200 hover:opacity-75 text-red-700">
                  DELETE
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3  bg-slate-700  text-white rounded-lg  uppercase  hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed">
            {loading ? "Loading" : "Create listing"}
          </button>
          {error && <p className=" text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
