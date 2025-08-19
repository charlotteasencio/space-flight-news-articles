import NewsArticlesGrid from "./NewsArticlesGrid/NewsArticlesGrid";

export default function NewsArticlesPage() {
    return (
        <div className="p-6 md:p-8 lg:p-10 w-screen">
            <h1 className="text-2xl font-bold mb-10">What's New in Spaceflight News</h1>
            <NewsArticlesGrid />
        </div >
    );
};