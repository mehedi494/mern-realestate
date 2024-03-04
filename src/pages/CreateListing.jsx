import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"; // Import storage and related functions from Firebase

import { app } from "../firebase/firebase.config";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ imageUrls: [] });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);-

  // console.log(files);
  console.log(app);
  console.log(formData);
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    try {
      if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
        setUploading(true)
        setImageUploadError(false)
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
        setUploading(false)
        
      } else {
        setImageUploadError(
          "Please select at least one image and no more than 6 images."
        );
        setUploading(false)
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>

      <form className="flex flex-col gap-4 sm:flex-row ">
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength={62}
            minLength={4}
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="name"
            required
          />

          <div className=" flex flex-col gap-4">
            {/* checkbox */}
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-2 items-center select-none ">
                <input type="checkbox" id="sale" className="w-5 h-5" />
                <label htmlFor="sale">Sell</label>
              </div>
              <div className="flex gap-2 items-center select-none ">
                <input type="checkbox" id="rent" className="w-5 h-5" />
                <label htmlFor="rent">Rent</label>
              </div>
              <div className="flex gap-2 items-center select-none ">
                <input type="checkbox" id="parking_spot" className="w-5 h-5" />
                <label htmlFor="parking_spot">Parking spot</label>
              </div>
              <div className="flex gap-2 items-center select-none ">
                <input type="checkbox" id="furnished" className="w-5 h-5" />
                <label htmlFor="furnished">Furnished</label>
              </div>
              <div className="flex gap-2 items-center select-none ">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 h-5  text-green-500 transition duration-150 ease-in-out"
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
                />
                <label htmlFor="bedrooms"> Beds</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-20 p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="bedrooms"
                  minLength={1}
                  maxLength={10}
                  required
                />
                <label htmlFor="bathrooms">Bathrooms</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-20 p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="bedrooms"
                  minLength={1}
                  maxLength={10}
                  required
                />
                <div className="flex flex-col">
                  <label htmlFor="regularPrice"> Regular price</label>
                  <label className="text-sm" htmlFor="regularPrice">
                    ($ / month)
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-20 p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="bedrooms"
                  minLength={1}
                  maxLength={10}
                  required
                />
                <div className="flex flex-col">
                  <label htmlFor="discountPrice">Discount Price</label>
                  <label className="text-sm" htmlFor="regularPrice">
                    ($ / month)
                  </label>
                </div>
              </div>
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
              {uploading? "uploading..." : "upload"}
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
                  onClick={()=>handleRemoveImage(index)}
                  className="border border-red-700 p-2 rounded hover:bg-red-200 hover:opacity-75 text-red-700">
                  DELETE
                </button>
              </div>
            ))}
          <button className="p-3  bg-slate-700  text-white rounded-lg  uppercase  hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
