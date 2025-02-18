
import Header from "@/components/Header";
import { BookmarkProvider } from "../context/BookmarksContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <BookmarkProvider>
      <Header />
      <Component {...pageProps} />
    </BookmarkProvider>
  );
}