import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { config } from "../config";
import { app } from "../firebase/firebase.config";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
  userUpdateFailure,
  userUpdateStart,
  userUpdateSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import Modal from "../components/ui/Modal";

export default function Profile() {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  // Separate state variables for each modal
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [isDeleteListingModalOpen, setIsDeleteListingModalOpen] =
    useState(false);

  const { currentUser, loading } = useSelector((state) => state.user);
  const { userName, email } = currentUser;
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setFilePerc(progress);
      },
      // geting error
      () => {
        setFileUploadError(true);
      },
      // getting success
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      console.log(currentUser._id);
      dispatch(userUpdateStart());
      console.log(`${config.base_url}/user/update/${currentUser._id}`);
      const res = await fetch(
        `${config.base_url}/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        toast.error("Update failed error occured!");
        return dispatch(userUpdateFailure(data.message));
      }
      dispatch(userUpdateSuccess(data));
      return toast("Updated Successfully 🎉! ");
    } catch (error) {
      dispatch(userUpdateFailure(error.message));
      toast.error("❌ Update failed error occured!");
    }
  };

  const openDeleteUserModal = () => {
    setIsDeleteUserModalOpen(true);
  };
  const closeDeleteUserModal = () => {
    setIsDeleteUserModalOpen(false);
  };

  const openDeleteListingModal = () => {
    setIsDeleteListingModalOpen(true);
  };
  const closeDeleteListingModal = () => {
    setIsDeleteListingModalOpen(false);
  };

  const handleDeleteUser = async (user) => {
    dispatch(deleteUserStart());
    const res = await fetch(`${config.base_url}/user/delete/${user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (data.success === false) {
      toast.error("Delete failed error occured!");
      return dispatch(deleteUserFailure(data.message));
    }
    dispatch(deleteUserSuccess(data));
    return toast("Deleted Successfully ! ");
  };

  const handleSignOut = async () => {
    try {
      // console.log(`${config.base_url}/auth/sign-out`);
      const res = await fetch(`${config.base_url}/auth/sign-out`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error("log out failed");
        return dispatch(userUpdateFailure(data.message));
      }
      dispatch(signOut());
      return toast("You are signed out!");
    } catch (error) {
      dispatch(userUpdateFailure(error.message));
      toast.error("error occurred!");
    }
  };
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(
        `${config.base_url}/user/listings/${currentUser._id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data.data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleDeleteListing = async (listingId) => {
    setShowListingsError(false);
    const res = await fetch(`${config.base_url}/listing/delete/${listingId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (data.success === false) {
      setShowListingsError(true);
      return;
    }
    setUserListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
    );
  };
  return (
    <div className="p-5 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center text-slate-500 ">
        Profile
      </h1>
      <form onSubmit={handleUpdateUser} className="flex flex-col gap-3 ">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          id="avatar"
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center hover:opacity-75"
          src={formData.avatar || currentUser?.avatar}
          alt=""
        />

        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              ⚠️ Error image upload (image must be less than 2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">✅ Image successfully upload</span>
          ) : (
            ""
          )}
        </p>
        <input
          title="user_name"
          className="p-3 border  rounded-lg focus:outline-green-500"
          type="text"
          id="userName"
          placeholder="user_name"
          defaultValue={userName}
          onChange={handleOnChange}
        />

        <input
          title="email"
          readOnly
          id="email"
          className="p-3 border  rounded-lg focus:outline-green-500"
          type="text"
          placeholder="email"
          defaultValue={email}
          onChange={handleOnChange}
        />
        <input
          title="new password"
          id="password"
          className="p-3 border  rounded-lg focus:outline-green-500"
          type="text"
          placeholder="New password"
          onChange={handleOnChange}
        />
        <button
          // type="submit"

          disabled={loading}
          className="disabled:cursor-not-allowed bg-slate-700 hover:opacity-85 text-white uppercase p-3 border  rounded-lg">
          {loading ? "Loading..." : "UPDATE"}
          {/*  update */}
        </button>
        <Link
          to="/create-listing"
          className="text-center bg-green-700 hover:opacity-85 text-white uppercase p-3 border  rounded-lg">
          create listing
        </Link>
      </form>
      <button
        onClick={() => handleShowListings()}
        className="w-full text-green-700 p-2 mt-4 bg-green-400">
        Show Listings
      </button>

      <div className="flex justify-between mt-5">
        <button
          onClick={openDeleteUserModal}
          className="bg-red-500 p-2  text-white rounded-lg hover:opacity-85">
          Delete account
        </button>
        <button
          onClick={handleSignOut}
          className="bg-gray-500 p-2  text-white rounded-lg hover:opacity-85">
          Sign out
        </button>
      </div>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4">
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}>
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={openDeleteListingModal}
                  className="text-red-700 uppercase">
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>

              {
                <Modal
                  isOpen={isDeleteListingModalOpen}
                  closeModal={closeDeleteListingModal}
                  confirmAction={() =>
                    handleDeleteListing(listing._id) &&
                    setIsDeleteListingModalOpen(false)
                  }
                />
              }
            </div>
          ))}
        </div>
      )}

      {
        <Modal
          isOpen={isDeleteUserModalOpen}
          closeModal={closeDeleteUserModal}
          confirmAction={() => handleDeleteUser(currentUser)}
          /* currentUser={currentUser} */
        />
      }
    </div>
  );
}
