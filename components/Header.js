import Link from "next/link";

export default function Header({ news }) {

    return (
        <div>
        <nav  className="bg-gray-100 dark:bg-gray-900  w-full z-20 top-0 start-0 border-b p-5 border-gray-200 dark:border-gray-600">
            <Link href="/" className="bg-gray-200 no-underline text-sky-900 p-3 text-lg hover:bg-sky-900 hover:text-white rounded-lg">Home</Link> | 
            <Link href="/category/sports" className="bg-gray-200 no-underline text-sky-900 p-3 text-lg hover:bg-sky-900 hover:text-white rounded-lg">Sports</Link> |  
            <Link href="/category/technology" className="bg-gray-200 no-underline text-sky-900 p-3 text-lg hover:bg-sky-900 hover:text-white rounded-lg">Technology</Link> | 
            <Link href="/bookmarks" className="bg-gray-200 no-underline text-sky-900 p-3 text-lg hover:bg-sky-900 hover:text-white rounded-lg"> Bookmarks </Link>
        </nav>
        </div>
    );
}