import { formatDate } from "./formatDate";

describe("utils tests", () => {
    it("formats a date correctly", () => {
        const dateString = "2025-08-18T12:00:00Z";
        const formattedDate = formatDate(dateString);
        expect(formattedDate).toBe("August 18, 2025");
    });
})