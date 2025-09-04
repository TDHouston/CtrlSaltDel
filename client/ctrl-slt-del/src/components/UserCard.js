function UserCard({ user }) {
  return (
    <div className="recipe-card flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm md:flex-row md:max-w-xl transition-colors duration-300">
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {user.username}
        </h5>
        {user.role === "ADMIN" && (
          <p className="bg-green-300 dark:bg-green-600 text-green-800 dark:text-green-100 text-center rounded-xl transition-colors duration-300">ADMIN</p>
        )}
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {user.email}
        </p>
      </div>
    </div>
  );
}

export default UserCard;
