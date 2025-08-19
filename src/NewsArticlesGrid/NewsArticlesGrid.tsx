import { useCallback, useEffect, useRef, useState } from "react";
import { NewsArticle } from "../utils/types";
import NewsArticlesCard from "../NewsArticleCard/NewsArticlesCard";
import SkeletonCard from "../Components/Skeleton/SkeletonCard";
import GridLayout from "../Components/GridLayout";
import LoadingSpinner from "../Components/LoadingSpinner";

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
                // articles are being fetched from the Space Flight news API: https://www.spaceflightnewsapi.net/
                // the first 8 articles are fetched and the remaining articles are fetched on scroll
                const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=8');
                const data = await response.json();
                setArticles(data.results);
                //set the next URL from the data response so that we can fetch next round of articles on scroll
                setNextUrl(data.next);
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    //if this fetch pattern is going to be used in other places, we could extract into the custom hook
    const fetchMoreArticles = useCallback(async () => {
        if (!nextUrl || loadingMore || loading) return;
        setLoadingMore(true);
        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            setArticles((prevArticles) => [...prevArticles, ...data.results]);
            //set the next URL from the data response so that we can fetch next round of articles on scroll
            setNextUrl(data.next);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoadingMore(false);
        }
    }, [nextUrl, loadingMore, loading]);

    useEffect(() => {
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
    }, [fetchMoreArticles]);

    if (error) {
        return <div className="text-center w-full h-screen">Error loading articles: {error.message}</div>;
    }

    if (loading) {
        return (
            <GridLayout>
                {Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </GridLayout>
        )
    }

    return (
        <GridLayout>
            {articles.map((article) => {
                return (
                    <NewsArticlesCard article={article} key={article.id} />
                );
            })}
            <div ref={targetRef}></div>
            {loadingMore && <LoadingSpinner />}
        </GridLayout>
    );
};