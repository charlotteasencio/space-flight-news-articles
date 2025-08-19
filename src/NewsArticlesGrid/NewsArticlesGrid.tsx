import { useEffect, useRef, useState } from "react";
import { NewsArticle } from "../utils/types";
import NewsArticlesCard from "../NewsArticleCard/NewsArticlesCard";
import SkeletonCard from "../Components/Skeleton/SkeletonCard";

export default function NewsArticlesGrid() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                //articles are being fetched from the Space Flight news API: https://www.spaceflightnewsapi.net/
                //fetching only articles from before the date of 8/18/25 due to an odity in the API images being used for some articles after this date
                //this would not likely be done in a real life scenario but done here to avoid confusing UI issue not related to the code
                const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=8&published_at_lte=2025-08-18T00%3A00%3A00Z');
                const data = await response.json();
                setArticles(data.results);
                setNextUrl(data.next);
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    useEffect(() => {
        const fetchMoreArticles = async () => {
            if (!nextUrl || loadingMore || loading) return;
            setLoadingMore(true);
            try {
                const response = await fetch(nextUrl);
                const data = await response.json();
                setArticles((prevArticles) => [...prevArticles, ...data.results]);
                setNextUrl(data.next);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoadingMore(false);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchMoreArticles();
            }
        });

        const currentTarget = targetRef.current;

        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            };
            observer.disconnect();
        };
    }, [nextUrl, loadingMore, loading]);

    if (error) {
        return <div className="text-center w-full h-screen">Error loading articles: {error.message}</div>;
    }

    //if loading, show skeleton cards
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {articles.map((article) => {
                return (
                    <NewsArticlesCard article={article} key={article.id} />
                );
            })}
            <div ref={targetRef}></div>
            {loadingMore && (
                <div className="flex justify-center items-center col-span-full">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};