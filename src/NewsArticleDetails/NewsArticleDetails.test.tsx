import { render, screen } from "@testing-library/react";
import { mockArticle } from "../utils/mockData";
import { BrowserRouter } from "react-router-dom";
import NewsArticleDetails from "./NewsArticleDetails";

describe("NewsArticlesDetails", () => {
    it("renders article title, summary, and image after fetching", async () => {
        //@ts-ignore
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockArticle,
        });

        render(
            <BrowserRouter>
                <NewsArticleDetails />
            </BrowserRouter >
        );

        // Check that loading skeleton shows initially
        expect(screen.getByTestId("skeleton-details")).toBeInTheDocument();

        //check that article details are rendered
        expect(await screen.findByText(mockArticle.title)).toBeInTheDocument();
        expect(await screen.findByText(mockArticle.summary)).toBeInTheDocument();
        expect(await screen.findByAltText(mockArticle.title)).toHaveAttribute("src", mockArticle.image_url);
    });

    it("renders error message if fetch fails", async () => {
        // @ts-ignore
        fetch.mockRejectedValueOnce(new Error("API failure"));

        render(
            <BrowserRouter>
                <NewsArticleDetails />
            </BrowserRouter >
        );

        //Check that error message is displayed
        expect(await screen.findByText(/Error loading article details/i)).toBeInTheDocument();
    });
})