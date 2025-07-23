import React from "react";
import AboutCard from "../components/AboutCard";
import { us } from "../data/aboutUsData";

function AboutUs() {
  return (
    <main className="min-h-[calc(100vh-200px)] bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
          Meet The Team
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged.
        </p>

        {/* Cards Row */}
        <div className="flex justify-center gap-6">
          {us.map((user) => (
            <AboutCard user={user} key={user.user_id} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default AboutUs;
