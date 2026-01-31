import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // 🔥 Prevent double click
    setLoading(true);

    try {
      const url = isRegister
        ? `${import.meta.env.VITE_API_URL}/api/v1/auth/register`
        : `${import.meta.env.VITE_API_URL}/api/v1/auth/login`;

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
        setName("");
        setEmail("");
        setPassword("");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false); // 🔥 Always reset
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 relative overflow-hidden">

      <div className="absolute w-96 h-96 bg-black opacity-5 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-black opacity-5 rounded-full blur-3xl bottom-0 right-0"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white text-black p-10 w-96 rounded-2xl shadow-2xl"
      >
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
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="border border-black p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-black p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:opacity-80"
          }`}
        >
          {loading
            ? "Please wait..."
            : isRegister
              ? "Register"
              : "Login"}
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
      </form>
    </div>
  );
}

export default LoginPage;










// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LoginPage() {
//   console.log("API-URL:", import.meta.env.VITE_API_URL);
//   const [isRegister, setIsRegister] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

  
//   const handleSubmit = async () => {
//     // const url = isRegister
//     //   ? "http://localhost:8080/api/v1/auth/register"
//     //   : "http://localhost:8080/api/v1/auth/login";

    
//     const url = isRegister 
//     ? `${import.meta.env.VITE_API_URL}/api/v1/auth/register` 
//     : `${import.meta.env.VITE_API_URL}/api/v1/auth/login`;

//     try {
//       const bodyData = isRegister
//         ? { name, email, password }
//         : { email, password };

//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(bodyData)
//       });

//       if (!response.ok) {
//         throw new Error("Authentication failed");
//       }

//       const result = await response.text();

//       if (!isRegister) {
//         localStorage.setItem("token", result);
//         navigate("/dashboard");
//       } else {
//         alert("Account created successfully. Please login.");
//         setIsRegister(false);
//       }

//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-zinc-100 text-white relative overflow-hidden">

//       <div className="absolute w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -top-20 -left-20"></div>
//       <div className="absolute w-96 h-96 bg-white opacity-5 rounded-full blur-3xl bottom-0 right-0"></div>

//       <div className="relative z-10 bg-white text-black p-10 w-96 rounded-2xl shadow-2xl">

//         <h2 className="text-2xl font-bold text-center mb-8">
//           {isRegister ? "Create Account" : "Welcome Back"}
//         </h2>

//         {isRegister && (
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="border border-black p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           className="border border-black p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="border border-black p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-black text-white p-3 rounded-lg hover:opacity-80 transition"
//         >
//           {isRegister ? "Register" : "Login"}
//         </button>

//         <p className="text-center mt-6 text-sm">
//           {isRegister ? "Already have an account?" : "New user?"}
//           <span
//             onClick={() => setIsRegister(!isRegister)}
//             className="ml-2 underline cursor-pointer hover:opacity-70 transition"
//           >
//             {isRegister ? "Login" : "Register"}
//           </span>
//         </p>

//       </div>
//     </div>
//   );
// }

// export default LoginPage;

