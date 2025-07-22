function Comment({ comment }) {
  return (
    <>
      <article class="p-6 text-base bg-white border-2 my-1 rounded-lg dark:bg-gray-900">
        <footer class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <p class="inline-flex items-center mr-3 text-m text-gray-900 dark:text-white font-semibold">
              {comment.user}
            </p>
          </div>
          <div
            id="dropdownComment1"
            class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              class="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li></li>
            </ul>
          </div>
        </footer>
        <p class="text-gray-800 dark:text-gray-400">{comment.comment}</p>
        <div class="flex items-center mt-4 space-x-4"></div>
      </article>
    </>
  );
}

export default Comment;
