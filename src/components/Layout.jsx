import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { themeSelect } from "../utils/themeSelectors"; // Correct import
import { motion } from "framer-motion";
import { Code2, Users, Rocket, Smartphone } from "lucide-react";

const Layout = () => {
  const theme = useSelector(themeSelect); // Corrected selector usage
  const textColorClass = theme === "dark" ? "text-white" : "text-zinc-900"; // Fixed theme check

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-center px-6"
        style={{ backgroundImage: "url('https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp')" }} 
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay */}
        <h1 className="text-5xl font-bold z-10">Welcome to DevTinder</h1>
        <p className="text-lg mt-3 z-10">Find your perfect coding partner</p>
        <div className="mt-6 z-10">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg mr-4 shadow-lg">
            Sign Up
          </button>
          <button className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
            Log In
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How DevTinder Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
  {[
    { icon: <Code2 />, title: "Create Profile", text: "Build your developer profile with your skills and preferences" },
    { icon: <Users />, title: "Swipe & Match", text: "Find your perfect code partner with our intuitive swipe interface" },
    { icon: <Rocket />, title: "Start Coding", text: "Begin your collaboration journey together" }
  ].map(({ icon, title, text }, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.05 }}
      className="text-center animate-on-scroll bg-gray-800 rounded-3xl shadow-xl border border-gray-600 p-6 transition-transform duration-300 ease-in-out"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
        {index + 1}
      </div>
      <div className="w-16 h-16 mx-auto mb-4 text-rose-500">
        {React.cloneElement(icon, { size: 48 })} {/* Increased icon size */}
      </div>
      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-300">{text}</p>
    </motion.div>
  ))}
</div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-pink-700 text-white text-center">
        <h2 className="text-4xl font-bold">Why Choose DevTinder?</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
          {[
            { title: "Smart Matching", text: "AI finds coders based on your skills and interests" },
            { title: "Global Reach", text: "Connect with developers worldwide instantly" },
            { title: "Quick Connect", text: "Start collaborating immediately after matching" }
          ].map(({ title, text }, index) => (
            <div key={index} className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-lg">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-2 text-gray-200">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="animate-on-scroll"
            >
              <h3 className={`text-2xl font-bold mb-4 ${textColorClass}`}>
                Take DevTinder Everywhere
              </h3>
              <p className={`mb-6 ${textColorClass}`}>
                Download our mobile app and find code partners on the go.
                Available for iOS and Android.
              </p>
              <div className="flex gap-4">
                <Smartphone className="w-12 h-12 text-rose-500" />
                <div>
                  <p className="font-bold">Get the App</p>
                  <p className={textColorClass}>Swipe anytime, anywhere</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src="https://i.postimg.cc/C5xhz0f4/model.png"
                alt="Mobile app mockup"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Layout;
