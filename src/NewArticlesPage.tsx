import NewsArticlesGrid from "./NewsArticlesGrid/NewsArticlesGrid";

export default function NewsArticlesPage() {
    return (
        <div className="p-4 w-screen">
            <h1 className="text-2xl font-bold mb-4">What's New in Space Launch News</h1>
            <NewsArticlesGrid />
        </div >
    );
};