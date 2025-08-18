export type Socials = {
    bluesky?: string;
    instagram?: string;
    linkedin?: string;
    mastodon?: string;
    x?: string;
    youtube?: string;
}

export type Author = {
    name: string;
    socials: Socials;
};

type Launches = {
    launch_id: string;
    provider: string;
}

type Event = {
    event_id: string;
    provider: string;
}

export type NewsArticle = {
    authors: Author[];
    events: Event[];
    featured: boolean
    id: number;
    image_url: string;
    launches: Launches[];
    news_site: string;
    published_at: string;
    summary: string;
    title: string;
    updated_at: string;
    url: string;
};