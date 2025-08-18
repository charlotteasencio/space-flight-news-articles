import { formatDate } from "./formatDate";

describe("utils tests", () => {
    it("formats a date correctly", () => {
        const dateString = "2023-10-01T12:00:00Z";
        const formattedDate = formatDate(dateString);
        expect(formattedDate).toBe("October 1, 2023");
    });
})