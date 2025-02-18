import { createContext, useState, useContext, useEffect } from "react";

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
    const [bookmarks, setBookmarks] = useState([]);

    // Load bookmarks from localStorage on mount
    useEffect(() => {
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        setBookmarks(savedBookmarks);
    }, []);

    // Save bookmarks to localStorage 
    useEffect(() => {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    // Add a bookmark
    const addBookmark = (article) => {
        if (!bookmarks.some((b) => b.article_id === article.article_id)) {
            setBookmarks([...bookmarks, article]);
        }
    };

    // Remove a bookmark
    const removeBookmark = (articleId) => {
        setBookmarks(bookmarks.filter((b) => b.article_id !== articleId));
    };

    // Toggle bookmark (add if not exists, remove if exists)
    const toggleBookmark = (article) => {
        if (bookmarks.some((b) => b.article_id === article.article_id)) {
            removeBookmark(article.article_id);
        } else {
            addBookmark(article);
        }
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, toggleBookmark }}>
            {children}
        </BookmarkContext.Provider>
    );
}

export function useBookmarks() {
    return useContext(BookmarkContext);
}
