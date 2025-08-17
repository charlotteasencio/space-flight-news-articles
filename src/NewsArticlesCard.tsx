export default function NewsArticlesCard({ article }: any) {
    return article ? (
        <div>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">article link</a>
        </div>
    ) : (
        <div>No article available</div>
    );
};