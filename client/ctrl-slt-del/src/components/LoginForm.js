// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../helpers/AuthContext";

// function LoginForm({ user, setUser, setPage }) {
//   const [errors, setErrors] = useState([]);
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   function handleChange(event) {
//     setUser({ ...user, [event.target.name]: event.target.value });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     const init = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: user.email,
//         password: user.password,
//       }),
//     };

//     fetch("http://localhost:8080/api/auth/login", init)
//       .then((res) => {
//         if (res.status === 200) return res.json();
//         if (res.status === 403) throw new Error("Invalid login");
//         throw new Error("Unexpected response");
//       })
//       .then((data) => {
//         if (data.token && data.user) {
//           login(data.token, data.user);
//           navigate("/");
//         }
//       })
//       .catch((err) => {
//         setErrors([err.message]);
//       });
//   }

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900">
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[calc(100vh-200px)] lg:py-0">
//         <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//               Sign in to your account
//             </h1>

//             {/* Show errors if any */}
//             {errors.length > 0 && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                 <ul className="list-disc pl-5">
//                   {errors.map((err, idx) => (
//                     <li key={idx}>{err}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Your email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={user.email}
//                   onChange={handleChange}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="name@company.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   value={user.password}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-start">
//                   <div className="flex items-center h-5">
//                     <input
//                       id="remember"
//                       aria-describedby="remember"
//                       type="checkbox"
//                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
//                     />
//                   </div>
//                   <div className="ml-3 text-sm">
//                     <label
//                       htmlFor="remember"
//                       className="text-gray-500 dark:text-gray-300"
//                     >
//                       Remember me
//                     </label>
//                   </div>
//                 </div>
//                 <Link
//                   to="#"
//                   className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//               >
//                 Sign in
//               </button>
//               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                 Don’t have an account yet?{" "}
//                 <Link
//                   to="#"
//                   className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                   onClick={() => setPage("signup")}
//                 >
//                   Sign up
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default LoginForm;
