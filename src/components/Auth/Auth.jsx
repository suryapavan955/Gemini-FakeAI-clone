// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

// const schema = z.object({
//   countryCode: z.string().min(1, "Select country code"),
//   phoneNumber: z.string().min(10, "Phone number is required"),
// });

// const Auth = () => {
//   const [countries, setCountries] = useState([]);
//   const [otpSent, setOtpSent] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//   });

// useEffect(() => {
//   fetch("https://restcountries.com/v3.1/all?fields=name,idd")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Fetched countries:", data);

//       const formatted = data
//         .map((country) => ({
//           name: country.name.common,
//           code:
//             country.idd?.root && country.idd?.suffixes
//               ? `${country.idd.root}${country.idd.suffixes[0]}`
//               : "+1",
//         }))
//         .sort((a, b) => a.name.localeCompare(b.name));

//       console.log("Formatted countries:", formatted);

//       setCountries(formatted);
//     })
//     .catch((err) => console.error("Error fetching countries:", err));
// }, []);





//   const onSubmit = (data) => {
//     console.log("Sending OTP to:", data);
//     setOtpSent(true);

//     setTimeout(() => {
//       alert("OTP sent successfully!");

     
//       onLoginSuccess();
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white p-6 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-4">Login / Signup</h2>

//         <label className="block mb-2">Country Code</label>
//         <select
//           {...register("countryCode")}
//           className="w-full p-2 mb-4 border rounded"
//         >
//           <option value="">Select country code</option>
//           {countries.map((c, index) => (
//             <option key={index} value={c.code}>
//               {c.name} ({c.code})
//             </option>
//           ))}
//         </select>
//         {errors.countryCode && (
//           <p className="text-red-500 text-sm">{errors.countryCode.message}</p>
//         )}

//         <label className="block mb-2">Phone Number</label>
//         <input
//           type="text"
//           placeholder="Enter phone number"
//           {...register("phoneNumber")}
//           className="w-full p-2 mb-4 border rounded"
//         />
//         {errors.phoneNumber && (
//           <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded"
//         >
//           {otpSent ? "Resend OTP" : "Send OTP"}
//         </button>

//         {otpSent && (
//           <div className="mt-4 text-green-600">
//             OTP has been sent! Please check your phone.
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Auth;


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const phoneSchema = z.object({
  countryCode: z.string().min(1, "Select country code"),
  phoneNumber: z.string().min(10, "Phone number is required"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "Enter 6-digit OTP"),
});

const Auth = ({ onLoginSuccess }) => {
  const [countries, setCountries] = useState([]);
  const [otpSent, setOtpSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(phoneSchema),
  });

  const {
    register: otpRegister,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,idd")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data
          .map((country) => ({
            name: country.name.common,
            code:
              country.idd?.root && country.idd?.suffixes
                ? `${country.idd.root}${country.idd.suffixes[0]}`
                : "+1",
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  const onPhoneSubmit = (data) => {
    console.log("Sending OTP to:", data);
    setOtpSent(true);

    setTimeout(() => {
      alert("OTP sent successfully! Enter 123456 as OTP.");
    }, 1000);
  };

  const onOtpSubmit = (data) => {
    console.log("Entered OTP:", data.otp);
    if (data.otp === "123456") {
      alert("OTP Verified Successfully!");
      onLoginSuccess();
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      {!otpSent ? (
        <form
          onSubmit={handleSubmit(onPhoneSubmit)}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Login / Signup</h2>

          <label className="block mb-2">Country Code</label>
          <select
            {...register("countryCode")}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select country code</option>
            {countries.map((c, index) => (
              <option key={index} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
          {errors.countryCode && (
            <p className="text-red-500 text-sm">{errors.countryCode.message}</p>
          )}

          <label className="block mb-2">Phone Number</label>
          <input
            type="text"
            placeholder="Enter phone number"
            {...register("phoneNumber")}
            className="w-full p-2 mb-4 border rounded"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleOtpSubmit(onOtpSubmit)}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>

          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            {...otpRegister("otp")}
            className="w-full p-2 mb-4 border rounded"
          />
          {otpErrors.otp && (
            <p className="text-red-500 text-sm">{otpErrors.otp.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default Auth;
