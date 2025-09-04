import React from "react";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";

function AboutCard({ user }) {
  return (
    <div className="w-full max-w-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-colors duration-300">
      <div className="flex flex-col items-center px-4 py-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={user.img}
          alt={`${user.first_name} ${user.last_name}`}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user.first_name} {user.last_name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.title}
        </span>

        <div className="flex gap-4 mt-4 md:mt-6">
          {user.github && (
            <a
              href={user.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white transition-colors duration-300"
            >
              <FaGithub size={20} />
            </a>
          )}
          {user.linkedin && (
            <a
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-blue-700 dark:text-blue-400 transition-colors duration-300"
            >
              <FaLinkedin size={20} />
            </a>
          )}
          {user.resume && (
            <a
              href={user.resume}
              download
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-green-700 dark:text-green-400 transition-colors duration-300"
            >
              <FaFileDownload size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutCard;
