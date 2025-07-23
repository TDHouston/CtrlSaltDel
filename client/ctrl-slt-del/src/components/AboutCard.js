import React from "react";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";

function AboutCard({ user }) {
  return (
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
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
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-white"
            >
              <FaGithub size={20} />
            </a>
          )}
          {user.linkedin && (
            <a
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-blue-700 dark:text-white"
            >
              <FaLinkedin size={20} />
            </a>
          )}
          {user.resume && (
            <a
              href={user.resume}
              download
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-green-700 dark:text-white"
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
