import { Author, NewsArticle } from "../utils/types";

export const MockAuthors: Author[] = [
    { name: "Author 1", socials: { instagram: "https://instagram.com/author1" } },
    { name: "Author 2", socials: { x: "https://x.com/author2", youtube: "https://youtube.com/author2" } },
]

export const mockArticle: NewsArticle = {
    authors: MockAuthors,
    featured: false,
    id: 1,
    image_url: "https://example.com/image2.jpg",
    news_site: "test news site 1",
    published_at: "2023-01-02T00:00:00Z",
    summary: "short summary of test article 1",
    title: "Test Article 1",
    updated_at: "",
    url: "https://example.com/article1",
    events: [],
    launches: [],
}

export const mockArticles: NewsArticle[] = [
    {
        authors: [],
        featured: false,
        id: 1,
        image_url: "https://example.com/image2.jpg",
        news_site: "test news site 1",
        published_at: "2023-01-02T00:00:00Z",
        summary: "short summary of test article 1",
        title: "Test Article 1",
        updated_at: "",
        url: "https://example.com/article1",
        events: [],
        launches: [],
    },
    {
        authors: [],
        featured: false,
        id: 2,
        image_url: "https://example.com/image4.jpg",
        news_site: "test news site 2",
        published_at: "2023-01-02T00:00:00Z",
        summary: "short summary of test article 2",
        title: "Test Article 2",
        updated_at: "",
        url: "https://example.com/article2",
        events: [],
        launches: [],
    },
];