import { useEffect, useState } from "react";
import { NewsArticle } from "./NewArticlesPage";
import NewsArticlesCard from "./NewsArticlesCard";

export default function NewsArticlesGrid() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                //articles are being fetched from the Space Flight news API: https://www.spaceflightnewsapi.net/
                //fetching only articles from before the date of 8/18/25 due to odity in the API images after this date
                //this would never be done in a real life scendario but done here to avoid confusing UI issue not related to the code
                const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=8&published_at_lte=2025-08-18T00%3A00%3A00Z');
                const data = await response.json();
                setArticles(data.results);
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    if (error) {
        return <div className="text-center text-white w-full h-screen">Error loading articles: {error.message}</div>;
    }

    if (loading) {
        //skeleton grid?
        return <div className="text-center text-white w-full h-screen">Loading articles...</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {articles.map((article) => {
                return (
                    <NewsArticlesCard article={article} key={article.id} />
                );
            })}
        </div>
    );
};