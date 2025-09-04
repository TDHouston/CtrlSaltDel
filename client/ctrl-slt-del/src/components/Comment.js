import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";
import { API_ENDPOINTS } from "../config/api";

function Comment({ comment, onCommentDeleted }) {
  const { user, token } = useContext(AuthContext);

  const handleDeleteComment = async () => {
    // Check if user is authenticated and authorized to delete
    if (!user || !token) {
      alert("Please log in to delete comments.");
      return;
    }

    const canDelete = comment.userId === user.userId || user.role === "ADMIN";
    if (!canDelete) {
      alert("You can only delete your own comments.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.COMMENTS.BY_ID(comment.commentId), {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          alert("You are not authorized to delete this comment.");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Call the callback to remove the comment from the parent component's state
      if (onCommentDeleted) {
        onCommentDeleted(comment.commentId);
      } else {
        // Fallback to page reload if callback not provided
        window.location.reload();
      }
    } catch (err) {
      console.error("Comment deletion error:", err);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const canDelete = comment.userId === user?.userId || user?.role === "ADMIN";
  
  return (
    <article className="group bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 border border-gray-100 dark:border-gray-700/50 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300">
      <header className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar placeholder */}
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {comment.author?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {comment.author}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {comment.userId === user?.userId ? (
                <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">
                  You
                </span>
              ) : (
                'Community Member'
              )}
            </p>
          </div>
        </div>

        {canDelete && (
          <button
            onClick={handleDeleteComment}
            className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
            title="Delete comment"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </header>

      <div className="pl-13">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {comment.content}
        </p>
        
        {/* Comment actions */}
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
          <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Like
          </button>
          
          <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Reply
          </button>
          
          <span className="text-xs">
            Just now
          </span>
        </div>
      </div>
    </article>
  );
}

export default Comment;
