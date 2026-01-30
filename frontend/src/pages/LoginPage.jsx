import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const url = isRegister
      ? "http://localhost:8080/api/v1/auth/register"
      : "http://localhost:8080/api/v1/auth/login";

    try {
      const bodyData = isRegister
        ? { name, email, password }
        : { email, password };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const result = await response.text();

      if (!isRegister) {
        localStorage.setItem("token", result);
        navigate("/dashboard");
      } else {
        alert("Account created successfully. Please login.");
        setIsRegister(false);
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 text-white relative overflow-hidden">

      <div className="absolute w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-white opacity-5 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10 bg-white text-black p-10 w-96 rounded-2xl shadow-2xl">

        <h2 className="text-2xl font-bold text-center mb-8">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>

        {isRegister && (
          <input
            type="text"
            placeholder="Full Name"
            className="border border-black p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="border border-black p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-black p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white p-3 rounded-lg hover:opacity-80 transition"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <p className="text-center mt-6 text-sm">
          {isRegister ? "Already have an account?" : "New user?"}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className="ml-2 underline cursor-pointer hover:opacity-70 transition"
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;













// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/v1/auth/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({ email, password })
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Invalid credentials");
//       }

//       const token = await response.text();

//       localStorage.setItem("token", token);

//       navigate("/dashboard");   // 👈 YAHAN HOGA
//     } catch (err) {
//       setError(err.message);
//     }
//   };


// // return (
// //   <div className="min-h-screen flex items-center justify-center bg-white text-black">

// //     <div className="border border-black p-8 w-96">

// //       <h2 className="text-2xl font-bold mb-6 text-center">
// //         iManager Login
// //       </h2>

// //       <form onSubmit={handleLogin} className="flex flex-col gap-4">

// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           className="border border-black p-2"
// //         />

// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           className="border border-black p-2"
// //         />

// //         <button
// //           type="submit"
// //           className="border border-black py-2 hover:bg-black hover:text-white transition"
// //         >
// //           Login
// //         </button>

// //       </form>

// //     </div>
// //   </div>
// // );

//   return (
//   <div className="min-h-screen flex items-center justify-center bg-white bg-animated">

//     <div className="backdrop-blur-md border border-black p-10 w-96 transition duration-300 hover:shadow-xl">

//       <h2 className="text-3xl font-bold mb-8 text-center tracking-wide">
//         iManager
//       </h2>

//       <form onSubmit={handleLogin} className="flex flex-col gap-5">

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border-b border-black p-2 focus:outline-none"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border-b border-black p-2 focus:outline-none"
//         />

//         <button
//           type="submit"
//           className="border border-black py-2 mt-4 hover:bg-black hover:text-white transition duration-300"
//         >
//           Login
//         </button>

//       </form>

//     </div>
//   </div>
// );


// }

// export default LoginPage;
