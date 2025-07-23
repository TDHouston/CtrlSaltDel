function Comment({ comment }) {
  return (
    <>
      <article className="p-6 text-base bg-white border-2 my-1 rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-m text-gray-900 dark:text-white font-semibold">
              {comment.author}
            </p>
          </div>
          <div
            id="dropdownComment1"
            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li></li>
            </ul>
          </div>
        </footer>
        <p className="text-gray-800 dark:text-gray-400">{comment.content}</p>
        <div className="flex items-center mt-4 space-x-4"></div>
      </article>
    </>
  );
}

export default Comment;
