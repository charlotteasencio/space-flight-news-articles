import { NewsArticle } from "./NewArticlesPage";
import LinkButton from "./Components/LinkButton";

type Props = {
    article: NewsArticle;
};

export default function NewsArticlesCard({ article }: Props) {
    return (
        <div className="block rounded-lg bg-neutral-800 text-white h-[460px] flex flex-col overflow-hidden">
            <div className="mb-2 h-48 w-full overflow-hidden rounded-lg flex-shrink-0">
                <img className="w-full h-full object-cover" src={article.image_url} alt={article.title} loading="lazy" />
            </div>
            <div className="p-4 flex justify-between flex-col flex-1">
                <div>
                    <h2 className="mb-2 text-lg font-medium">{article.title}</h2>
                    <p className="overflow-hidden line-clamp-3 font-light">{article.summary}</p>
                </div>
                <div className="flex justify-end flex-shrink-0">
                    <LinkButton path={`/details/${article.id}`}>View More</LinkButton>
                </div>
            </div>
        </div>
    );
};