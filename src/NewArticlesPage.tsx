import { useEffect, useState } from "react";
import NewsArticlesCard from "./NewsArticlesCard";

export default function NewsArticlesPage() {
    const [articles, setArticles] = useState<object[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles?limit=20');
                const data = await response.json();
                setArticles(data.results);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };
        fetchArticles();
    }, []);

    return (
        <div>
            {articles && articles.length > 0 ? (
                <ul onClick={() => console.log('List clicked')}>
                    {articles.map((article) => {
                        const a = article as any;
                        return (
                            <li key={a.id}>
                                <NewsArticlesCard article={article} />
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No articles found.</p>
            )}
        </div>
    );
};