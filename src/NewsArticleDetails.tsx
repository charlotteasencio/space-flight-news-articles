import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewsArticle, Socials } from "./NewArticlesPage";
import { FaInstagram, FaLinkedin, FaMastodon, FaTwitter, FaYoutube } from "react-icons/fa";
import { PiButterfly } from "react-icons/pi";
import LinkButton from "./Components/LinkButton";

export default function NewsArticleDetails() {
    const { id } = useParams();
    const [articleData, setArticleData] = useState<NewsArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const SocialsIcons: Record<string, ReactElement> = {
        bluesky: <PiButterfly />,
        instagram: <FaInstagram />,
        linkedin: <FaLinkedin />,
        mastodon: <FaMastodon />,
        x: <FaTwitter />,
        youtube: <FaYoutube />,
    }

    useEffect(() => {
        const fetchArticleDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles/' + id);
                const data = await response.json();
                setArticleData(data);
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false);
            }
        };
        fetchArticleDetails();
    }, [id]);

    if (error) {
        return <div className="text-center text-white w-full h-screen">Error loading article details: {error.message}</div>;
    }

    if (loading) {
        return <div className="text-center text-white w-full h-screen">Loading article details...</div>;
    }

    const renderAuthorSocials = (socials: Socials) => {
        if (!socials) {
            return null;
        }

        return Object.entries(socials).map(([platform, url]) => {
            if (!url) return null;
            //locate the correct icon based on the platform
            const icon = SocialsIcons[platform];
            if (!icon) return null;

            return (
                <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {icon}
                </a>
            );
        });
    }

    const renderAuthors = () => {
        if (!articleData || !articleData.authors || articleData.authors.length === 0) {
            return null;
        }
        return articleData.authors.map((author, index) => {
            const { socials, name } = author;
            return (
                <div key={index} className="mb-4">
                    <p className="mb-2">
                        {name}
                    </p>
                    {socials && Object.keys(socials).length > 0 && (
                        <div className="flex space-x-2">
                            {renderAuthorSocials(socials)}
                        </div>
                    )}
                </div>
            )
        });
    }

    return (
        <div className="p-12 w-screen h-full text-white">
            <LinkButton path="/">Back</LinkButton>
            {articleData && (
                <div className="max-w-3xl mx-auto border border-neutral-700 p-6 rounded-lg bg-neutral-800">
                    <h1 className="text-2xl font-bold mb-4">{articleData.title}</h1>
                    <div className="mb-4 w-60 overflow-hidden rounded-lg">
                        <img src={articleData.image_url} alt={articleData.title} />
                    </div>
                    <p className="mb-4">{articleData.summary}</p>
                    {renderAuthors()}
                    <a href={articleData.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Article</a>
                </div>
            )}
        </div>
    );
}