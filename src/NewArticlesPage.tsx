import NewsArticlesGrid from "./NewsArticlesGrid/NewsArticlesGrid";

export default function NewsArticlesPage() {
    return (
        <div className="p-4 w-screen text-white">
            <h1 className="text-2xl font-bold mb-4">Space News Articles</h1>
            <NewsArticlesGrid />
        </div >
    );
};