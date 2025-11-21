// import React, { useContext, useState, useEffect } from "react";
// import { assets } from "../assets/assets";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MyProfile = () => {
//   const {
//     userData,
//     setUserData,
//     token,
//     backendUrl,
//     loadUserProfileData,
//   } = useContext(AppContext);

//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(null);

//   // fetch user profile on mount
//   useEffect(() => {
//     if (token) {
//       loadUserProfileData();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]);

//   // function to update profile
//   const updateUserProfileData = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", userData?.name || "");
//       formData.append("phone", userData?.phone || "");
//       formData.append("gender", userData?.gender || "");
//       formData.append("dob", userData?.dob || "");

//       // Handle both object and flat fields
//       formData.append("addressLine1", userData?.address?.line1 || userData?.addressLine1 || "");
//       formData.append("addressLine2", userData?.address?.line2 || userData?.addressLine2 || "");

//       if (image) {
//         formData.append("image", image);
//       }

//       const { data } = await axios.post(
//         backendUrl + "/api/user/update-profile",
//         formData,
//         { headers: { token } }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         await loadUserProfileData(); // reload updated profile
//         setIsEdit(false);
//         setImage(null);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   if (!userData) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-gray-500">Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-lg flex flex-col gap-4 text-sm p-6">
//       {/* Profile Image */}
//       {isEdit ? (
//         <label htmlFor="image" className="cursor-pointer">
//           <div className="inline-block relative cursor-pointer">
//             <img
//               className="w-36 h-36 rounded object-cover"
//               src={image ? URL.createObjectURL(image) : userData.image}
//               alt="profile"
//             />
//             {!image && (
//               <img
//                 src={assets.upload_icon}
//                 alt="upload"
//                 className="absolute bottom-2 right-2 w-8 h-8"
//               />
//             )}
//           </div>
//           <input
//             onChange={(e) => setImage(e.target.files[0])}
//             type="file"
//             id="image"
//             hidden
//           />
//         </label>
//       ) : (
//         <img
//           className="w-36 h-36 rounded object-cover"
//           src={userData.image}
//           alt="profile"
//         />
//       )}

//       {/* Name */}
//       {isEdit ? (
//         <input
//           className="bg-gray-50 text-2xl font-medium max-w-60 mt-4 p-1 rounded"
//           type="text"
//           value={userData.name || ""}
//           onChange={(e) =>
//             setUserData((prev) => ({ ...prev, name: e.target.value }))
//           }
//         />
//       ) : (
//         <p className="font-medium text-2xl text-neutral-800 mt-4">
//           {userData.name}
//         </p>
//       )}

//       <hr className="bg-zinc-400 h-[1px] border-none" />

//       {/* Contact Info */}
//       <div>
//         <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
//         <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
//           <p className="font-medium">Email Id:</p>
//           <p className="text-blue-500">{userData.email}</p>

//           <p className="font-medium">Phone:</p>
//           {isEdit ? (
//             <input
//               className="bg-gray-100 max-w-52 p-1 rounded"
//               type="text"
//               value={userData.phone || ""}
//               onChange={(e) =>
//                 setUserData((prev) => ({ ...prev, phone: e.target.value }))
//               }
//             />
//           ) : (
//             <p className="text-blue-500">{userData.phone}</p>
//           )}

//           <p className="font-medium">Address:</p>
//           {isEdit ? (
//             <div className="flex flex-col gap-1">
//               <input
//                 className="bg-gray-50 p-1 rounded"
//                 onChange={(e) =>
//                   setUserData((prev) => ({
//                     ...prev,
//                     address: {
//                       ...prev.address,
//                       line1: e.target.value,
//                     },
//                     addressLine1: e.target.value,
//                   }))
//                 }
//                 value={userData.address?.line1 || userData.addressLine1 || ""}
//                 type="text"
//               />
//               <input
//                 className="bg-gray-50 p-1 rounded"
//                 onChange={(e) =>
//                   setUserData((prev) => ({
//                     ...prev,
//                     address: {
//                       ...prev.address,
//                       line2: e.target.value,
//                     },
//                     addressLine2: e.target.value,
//                   }))
//                 }
//                 value={userData.address?.line2 || userData.addressLine2 || ""}
//                 type="text"
//               />
//             </div>
//           ) : (
//             <p className="text-gray-500">
//               {userData.address?.line1 || userData.addressLine1}
//               <br />
//               {userData.address?.line2 || userData.addressLine2}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Basic Info */}
//       <div>
//         <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
//         <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
//           <p className="font-medium">Gender:</p>
//           {isEdit ? (
//             <select
//               className="max-w-24 bg-gray-100 p-1 rounded"
//               onChange={(e) =>
//                 setUserData((prev) => ({ ...prev, gender: e.target.value }))
//               }
//               value={userData.gender || ""}
//             >
//               <option value="">Select</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           ) : (
//             <p className="text-gray-400">{userData.gender}</p>
//           )}

//           <p className="font-medium">Date of Birth:</p>
//           {isEdit ? (
//             <input
//               className="max-w-36 bg-gray-100 p-1 rounded"
//               type="date"
//               value={userData.dob || ""}
//               onChange={(e) =>
//                 setUserData((prev) => ({ ...prev, dob: e.target.value }))
//               }
//             />
//           ) : (
//             <p className="text-gray-400">{userData.dob}</p>
//           )}
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="mt-10 flex gap-4">
//         {isEdit ? (
//           <>
//             <button
//               className="border border-green-600 px-6 py-2 rounded-full hover:bg-green-600 hover:text-white transition-all"
//               onClick={updateUserProfileData}
//             >
//               Save Information
//             </button>
//             <button
//               className="border border-gray-500 px-6 py-2 rounded-full hover:bg-gray-500 hover:text-white transition-all"
//               onClick={() => setIsEdit(false)}
//             >
//               Cancel
//             </button>
//           </>
//         ) : (
//           <button
//             className="border border-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
//             onClick={() => setIsEdit(true)}
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProfile;
import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const {
    userData,
    setUserData,
    token,
    backendUrl,
    loadUserProfileData,
  } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  // fetch user profile on mount
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // function to update profile
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData?.name || "");
      formData.append("phone", userData?.phone || "");
      formData.append("gender", userData?.gender || "");
      formData.append("dob", userData?.dob || "");

      // Handle both object and flat fields
      formData.append(
        "addressLine1",
        userData?.address?.line1 || userData?.addressLine1 || ""
      );
      formData.append(
        "addressLine2",
        userData?.address?.line2 || userData?.addressLine2 || ""
      );

      if (image) {
        formData.append("image", image);
      }

      // ✅ FIXED: Send token in Authorization header
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData(); // reload updated profile
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!userData) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg flex flex-col gap-4 text-sm p-6">
      {/* Profile Image */}
      {isEdit ? (
        <label htmlFor="image" className="cursor-pointer">
          <div className="inline-block relative cursor-pointer">
            <img
              className="w-36 h-36 rounded object-cover"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="profile"
            />
            {!image && (
              <img
                src={assets.upload_icon}
                alt="upload"
                className="absolute bottom-2 right-2 w-8 h-8"
              />
            )}
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img
          className="w-36 h-36 rounded object-cover"
          src={userData.image}
          alt="profile"
        />
      )}

      {/* Name */}
      {isEdit ? (
        <input
          className="bg-gray-50 text-2xl font-medium max-w-60 mt-4 p-1 rounded"
          type="text"
          value={userData.name || ""}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-2xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* Contact Info */}
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
          <p className="font-medium">Email Id:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52 p-1 rounded"
              type="text"
              value={userData.phone || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-1">
              <input
                className="bg-gray-50 p-1 rounded"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line1: e.target.value,
                    },
                    addressLine1: e.target.value,
                  }))
                }
                value={userData.address?.line1 || userData.addressLine1 || ""}
                type="text"
              />
              <input
                className="bg-gray-50 p-1 rounded"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line2: e.target.value,
                    },
                    addressLine2: e.target.value,
                  }))
                }
                value={userData.address?.line2 || userData.addressLine2 || ""}
                type="text"
              />
            </div>
          ) : (
            <p className="text-gray-500">
              {userData.address?.line1 || userData.addressLine1}
              <br />
              {userData.address?.line2 || userData.addressLine2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-24 bg-gray-100 p-1 rounded"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender || ""}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}

          <p className="font-medium">Date of Birth:</p>
          {isEdit ? (
            <input
              className="max-w-36 bg-gray-100 p-1 rounded"
              type="date"
              value={userData.dob || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex gap-4">
        {isEdit ? (
          <>
            <button
              className="border border-green-600 px-6 py-2 rounded-full hover:bg-green-600 hover:text-white transition-all"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
            <button
              className="border border-gray-500 px-6 py-2 rounded-full hover:bg-gray-500 hover:text-white transition-all"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="border border-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

