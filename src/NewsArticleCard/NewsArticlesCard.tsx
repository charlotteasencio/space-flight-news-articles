import { NewsArticle } from "../utils/types";
import LinkButton from "../Components/LinkButton";
import imageNotFound from "../images/image-not-found.png";

type Props = {
    article: NewsArticle;
};

export default function NewsArticlesCard({ article }: Props) {
    // The API is returning some images with http instead of https.
    // This causes mixed content warnings and issues. 
    // Replacing http with https for secure image loading.
    // This will only work if the image is available with https, but since we can't control the API, this is better than doing nothing.
    // If the image is not available, we will use a placeholder image in onError or if it doesn't have an image_url.
    const secureUrl = article.image_url ? article.image_url.replace(/^http:\/\//i, "https://") : imageNotFound;

    return (
        <div className="block rounded-lg bg-neutral-800 h-[460px] flex flex-col overflow-hidden">
            <div className="mb-2 h-48 w-full overflow-hidden rounded-lg flex-shrink-0">
                <img className="w-full h-full object-cover" src={secureUrl} alt={article.title} onError={(e) => (e.currentTarget.src = imageNotFound)} loading="lazy" />
            </div>
            <div className="p-4 flex justify-between flex-col flex-1">
                <div>
                    <h2 className="mb-2 text-lg font-semibold overflow-hidden line-clamp-3">{article.title}</h2>
                    <p className="overflow-hidden text-medium line-clamp-3 font-light">{article.summary}</p>
                </div>
                <div className="flex justify-end flex-shrink-0">
                    <LinkButton path={`/details/${article.id}`}>View More</LinkButton>
                </div>
            </div>
        </div>
    );
};