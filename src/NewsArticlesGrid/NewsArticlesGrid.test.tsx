import { render, screen, waitFor } from "@testing-library/react";
import NewsArticlesGrid from "./NewsArticlesGrid";
import { BrowserRouter } from 'react-router-dom';
import { mockArticles } from "../utils/mockData";

//moch fetch globally
jest.spyOn(global, 'fetch');

describe("NewsArticlesGrid", () => {
    it("renders articles after fetching", async () => {
        //@ts-ignore
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ results: mockArticles }),
        });

        render(
            <BrowserRouter>
                <NewsArticlesGrid />
            </BrowserRouter >
        );

        // Check that loading text shows initially
        expect(screen.getByText(/Loading articles/i)).toBeInTheDocument();

        // Check that first article is present
        expect(await screen.findByText("Test Article 1")).toBeInTheDocument();

        // Check that second article is present
        expect(await screen.findByText("Test Article 1")).toBeInTheDocument();

        //Check that the correct number of articles are rendered
        const cards = screen.getAllByRole("img");
        expect(cards).toHaveLength(mockArticles.length);
    });

    it("renders error message if fetch fails", async () => {
        // @ts-ignore
        fetch.mockRejectedValueOnce(new Error("API failure"));

        render(<NewsArticlesGrid />);

        // Wait for error to appear
        await waitFor(() => {
            expect(screen.getByText(/Error loading articles/i)).toBeInTheDocument();
        });
    });
});