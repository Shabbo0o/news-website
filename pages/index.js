import { useBookmarks } from "@/context/BookmarksContext";
import Link from "next/link";

export async function getStaticProps() {
  const result = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_API_KEY}&language=en`
  );

  const data = await result.json();
  // console.log(data)
  return {
    props: { news: data.results },
    revalidate: 60,
  };
}


export default function Home({ news }) {
  const { bookmarks, toggleBookmark } = useBookmarks();

  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto p-5">
      <h1 className="text-4xl font-bold mb-6">Top News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {news.map((article) => {
          const isBookmarked = bookmarks.some((b) => b.article_id === article.article_id);

          return (
            <div key={article.article_id} className="bg-white p-4 rounded-lg shadow-md text-left transition-all  duration-300 ease-in-out transform  hover:scale-105 hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/article/${article.article_id}`} className="hover:text-blue-600">
                  {article.title}
                </Link>
              </h2>
              {article.image_url && (
                <img className="w-full h-48 object-cover rounded-md mb-3" src={article.image_url} alt={article.title} />
              )}
            <button className="bg-white hover:bg-gray-200 text-2xl cursor-pointer ml-3" onClick={() => toggleBookmark(article)} style={{
            }}>
              {isBookmarked ? "♥️" : "♡" }
            </button>
          </div>
        );
      })}
      </div>
    </div>
  ); 
}
