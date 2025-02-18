import Link from "next/link";
import { useBookmarks } from "../context/BookmarksContext";

export default function BookmarksPage() {
    const { bookmarks, removeBookmark } = useBookmarks();

    return (
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto p-5">
            <h1 className="text-4xl font-bold mb-6">Bookmarked News</h1>

            {bookmarks.length === 0 ? (
                <p className="text-gray-600">No bookmarks yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {bookmarks.map((article) => (
                        <div key={article.article_id} className="bg-white p-4 rounded-lg shadow-md text-left transition-all  duration-300 ease-in-out transform  hover:scale-105 hover:shadow-lg">
                            <h2 className="text-xl font-semibold mb-2">
                                <Link href={`/article/${article.article_id}`} className="hover:text-blue-600">
                                    {article.title}
                                </Link>
                            </h2>
                            {article.image_url && (
                                <img 
                                    className="w-full h-48 object-cover rounded-md mb-3" 
                                    src={article.image_url} 
                                    alt={article.title} 
                                />
                            )}
                            {/* Remove Bookmark Button */}
                            <button 
                                className="bg-white hover:bg-gray-200 text-2xl cursor-pointer ml-3" 
                                onClick={() => removeBookmark(article.article_id)}
                            >
                                ♥️ 
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
