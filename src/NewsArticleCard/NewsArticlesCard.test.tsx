import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { mockArticle } from "../utils/mockData";
import NewsArticlesCard from "./NewsArticlesCard";


describe("NewsArticlesCard", () => {
    it("renders article title and summary", () => {
        render(
            <BrowserRouter>
                <NewsArticlesCard article={mockArticle} />
            </BrowserRouter>);
        expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
        expect(screen.getByText(mockArticle.summary)).toBeInTheDocument();
    });

    it("renders article image", () => {
        render(
            <BrowserRouter>
                <NewsArticlesCard article={mockArticle} />
            </BrowserRouter>);
        expect(screen.getByAltText(mockArticle.title)).toHaveAttribute("src", mockArticle.image_url);
    });

    it("renders View More button with correct link", () => {
        render(
            <BrowserRouter>
                <NewsArticlesCard article={mockArticle} />
            </BrowserRouter>);
        const button = screen.getByRole("link");
        expect(button).toHaveAttribute("href", `/details/${mockArticle.id}`);
        expect(button).toHaveTextContent("View More");
    });
});