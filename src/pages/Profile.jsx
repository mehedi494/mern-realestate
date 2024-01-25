import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase/firebase.config";

export default function Profile() {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const { userName, email } = currentUser;
  const fileRef = useRef(null);
  console.log(filePerc);
  console.log(formData);
  console.log(fileUploadError);
  const handleOnChange = (e) => {
    e.preventDefault();
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
  return (
    <div className="p-5 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center text-slate-500 ">
        Profile
      </h1>
      <form onSubmit={handleOnChange} className="flex flex-col gap-3 ">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center hover:opacity-75"
          src={formData.avatar||currentUser?.avatar}
          alt=""
        />

        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">⚠️ Error image upload (image must be less than 2MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">✅ Image successfully upload</span>
          ) : (
            ""
          )}
        </p>
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
        <button className="bg-red-500 p-2  text-white rounded-lg hover:opacity-85">
          Delete account
        </button>
        <button className="bg-gray-500 p-2  text-white rounded-lg hover:opacity-85">
          Sign out
        </button>
      </div>
    </div>
  );
}
