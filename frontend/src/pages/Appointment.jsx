/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData,
    userData,
  } = useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch doctor info
  const fetchDocInfo = () => {
    const doc = doctors.find((doc) => doc._id === docId);
    setDocInfo(doc);
  };

  // Generate available slots for the next 7 days
  const getAvailableSlots = () => {
    const today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // 9 PM

      if (i === 0) {
        // Today → start from next available half hour
        const now = new Date();
        currentDate.setHours(now.getHours() >= 10 ? now.getHours() + 1 : 10);
        currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const daySlots = [];
      while (currentDate <= endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

let day =currentDate.getDate()
let  month= currentDate.getMonth()+1
let year = currentDate.getFullYear()

const slotDate=day + "_" + month + "_" + year
const slotTime = formattedTime

const isSlotAvailable = docInfo.slots_booked[slotDate] &&  docInfo.slots_booked[slotDate].includes(slotTime) ? false:true

if (isSlotAvailable) {
          daySlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });       // ← FIXED (timeSlots → daySlots)
        }
       

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(daySlots);
    }

    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      const selectedSlot = docSlots[slotIndex]?.find(
        (slot) => slot.time === slotTime
      );

      if (!selectedSlot) {
        toast.error("Please select a slot before booking.");
        return;
      }

      const date = selectedSlot.dateTime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      // 👇 Choose the correct payment structure based on your backend schema
      const payload = {
        docId,
        slotDate,
        slotTime,
        userId: userData?._id,
        userData: {
          name: userData?.name,
          email: userData?.email,
          phone: userData?.phone,
        },
        // CASE 1: if backend expects a string
        payment: "pending",

        // CASE 2: if backend expects an object → uncomment and use instead
        /*
        payment: {
          status: "pending",
          amount: docInfo?.fees,
          method: "cash",
        },
        */
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Appointment booked successfully ✅");
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to book appointment."
      );
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  if (!docInfo)
    return (
      <p className="text-center mt-10 text-gray-500">Loading doctor info...</p>
    );

  return (
    <div>
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-[18rem] rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}{" "}
            <img className="w-5" src={assets.verified_icon} alt="verified" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="info" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>

        {/* Days */}
        <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 ">
          {docSlots.length > 0 &&
            docSlots.map((daySlots, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-200 hover:bg-gray-100"
                }`}
              >
                <p className="font-semibold">
                  {daySlots[0] && daysOfWeek[daySlots[0].dateTime.getDay()]}
                </p>
                <p>{daySlots[0] && daySlots[0].dateTime.getDate()}</p>
              </div>
            ))}
        </div>

        {/* Times */}
        <div className="flex items-center gap-3 w-full overflow-x-auto mt-4 pb-2">
          {docSlots.length > 0 &&
            docSlots[slotIndex]?.map((slot, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(slot.time)}
                className={`text-sm font-light flex-shrink-0 px-4 py-2 rounded-full cursor-pointer transition-all ${
                  slot.time === slotTime
                    ? "bg-primary text-white"
                    : "text-gray-400 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {slot.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 hover:opacity-90 transition"
        >
          Book an Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
