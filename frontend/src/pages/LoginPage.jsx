import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const token = await response.text();

      localStorage.setItem("token", token);

      navigate("/dashboard");   // 👈 YAHAN HOGA
    } catch (err) {
      setError(err.message);
    }
  };


// return (
//   <div className="min-h-screen flex items-center justify-center bg-white text-black">

//     <div className="border border-black p-8 w-96">

//       <h2 className="text-2xl font-bold mb-6 text-center">
//         iManager Login
//       </h2>

//       <form onSubmit={handleLogin} className="flex flex-col gap-4">

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border border-black p-2"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border border-black p-2"
//         />

//         <button
//           type="submit"
//           className="border border-black py-2 hover:bg-black hover:text-white transition"
//         >
//           Login
//         </button>

//       </form>

//     </div>
//   </div>
// );

  return (
  <div className="min-h-screen flex items-center justify-center bg-white bg-animated">

    <div className="backdrop-blur-md border border-black p-10 w-96 transition duration-300 hover:shadow-xl">

      <h2 className="text-3xl font-bold mb-8 text-center tracking-wide">
        iManager
      </h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-black p-2 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-b border-black p-2 focus:outline-none"
        />

        <button
          type="submit"
          className="border border-black py-2 mt-4 hover:bg-black hover:text-white transition duration-300"
        >
          Login
        </button>

      </form>

    </div>
  </div>
);


}

export default LoginPage;
