import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import BookBoxList from "./BookBoxList";
import { BookBox } from "../data/mockBookBoxes";

const mockBoxes: BookBox[] = [
    {
        id: "1",
        name: "Test Box",
        address: "123 Test St",
        city: "Test City",
        lat: 0,
        lng: 0,
        description: "Test Description"
    }
];

describe("BookBoxList", () => {
    afterEach(() => {
        cleanup();
    });

    it("renders book box titles as links", () => {
        const onSelectBox = vi.fn();
        render(<BookBoxList bookBoxes={mockBoxes} onSelectBox={onSelectBox} />);

        const link = screen.getByRole("link", { name: /Test Box/i });
        expect(link).toBeDefined();
        expect(link.getAttribute("href")).toBe("/address/1");
    });
});
