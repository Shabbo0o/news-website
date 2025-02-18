import { useBookmarks } from "../../context/BookmarksContext";

export async function getStaticPaths() {
    const result = await fetch(
        `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = await result.json();

    const paths = data.results.map((article) => ({
        params: { articleId: article.article_id },
    }));

    return { paths, fallback: false };
    }


export async function getStaticProps({ params }) {
    const result = await fetch(
        `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = await result.json();

    const article = data.results.find((article) => article.article_id === params.articleId);

    return {
        props: { article },
        revalidate: 60,
    };
    }


export default function Article({ article }) {
    const { bookmarks, toggleBookmark } = useBookmarks();
    const isBookmarked = bookmarks.some((b) => b.article_id === article.article_id);

    return (
        <div>
        <h2>{article.title}</h2>
        <img width={800} className=" object-cover rounded-md mb-3" src={article.image_url} />
        <p>{article.description}</p>

        <button className="bg-white hover:bg-gray-200 text-2xl cursor-pointer ml-3" onClick={() => toggleBookmark(article)} style={{
            }}>
            {isBookmarked ? "♥️" : "♡" }
        </button>
        </div>
    );
}
