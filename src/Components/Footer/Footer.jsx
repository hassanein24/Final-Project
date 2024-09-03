import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Get the FreshCart app
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We will send you a link, open it on your phone to download the
              app.
            </p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Email .."
                className="flex-grow rounded-l-md border border-gray-300 p-2"
                style={{ flex: '2 1 0' }} // Flex-grow to grow and flex-basis to 2/3 of the container
              />
              <button
                type="submit"
                className="rounded-r-md bg-green-500 text-white px-4"
                style={{ flex: '1 1 0' }} // Flex-grow to grow and flex-basis to 1/3 of the container
              >
                Share App Link
              </button>
            </form>
          </div>

          {/* Middle Column */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-medium text-gray-900">
              {/* You can add content here if needed */}
            </h3>
          </div>

          {/* Right Column */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-medium text-gray-900">
              Get deliveries with FreshCart
            </h3>
            {/* You can add additional content or links here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
