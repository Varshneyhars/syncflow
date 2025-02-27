import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">ChronoTask</div>
          <div className="flex space-x-8">
            <a href="www.google.com" className="text-gray-700 hover:text-gray-900">Features</a>
            <a href="www.google.com" className="text-gray-700 hover:text-gray-900">Solutions</a>
            <a href="www.google.com" className="text-gray-700 hover:text-gray-900">Resources</a>
            <a href="www.google.com" className="text-gray-700 hover:text-gray-900">Pricing</a>
          </div>
          <div className="flex space-x-4">
            <a href="www.google.com" className="text-gray-700 hover:text-gray-900">Sign in</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Get demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Think, plan, and track all in one place
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Organize your tasks, set reminders, and integrate with your favorite tools seamlessly.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
            Get free demo
          </button>
        </div>

        {/* Floating UI Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Sticky Note */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100 p-4 rounded-lg shadow-lg w-48 h-48 rotate-3">
            <p className="text-gray-700">Meeting at 3 PM</p>
          </div>

          {/* Reminders Card */}
          <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg w-56 h-32 -rotate-2">
            <p className="text-gray-700 font-semibold">Reminders</p>
            <p className="text-gray-600">Submit report by EOD</p>
          </div>

          {/* To-Do List */}
          <div className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2 bg-white p-4 rounded-lg shadow-lg w-64 h-48 rotate-1">
            <p className="text-gray-700 font-semibold mb-2">To-Do List</p>
            <ul className="text-gray-600">
              <li>Buy groceries</li>
              <li>Call client</li>
              <li>Finish presentation</li>
            </ul>
          </div>

          {/* Integration Icons */}
          <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 flex space-x-4">
            <img src="/icons/gmail.svg" alt="Gmail" className="w-10 h-10" />
            <img src="/icons/slack.svg" alt="Slack" className="w-10 h-10" />
            <img src="/icons/google-calendar.svg" alt="Google Calendar" className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;