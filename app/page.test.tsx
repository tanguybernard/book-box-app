import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import HomePage from "./page";

// Handle the Next.js font loading mocking if necessary
// But for now, just mocking the MapContainer which is dynamic
vi.mock("./containers/MapContainer", () => ({
    MapContainer: () => <div data-testid="map-container">Map Mock</div>,
}));

describe("HomePage", () => {
    afterEach(() => {
        cleanup();
    });

    it("renders the search bar", () => {
        render(<HomePage />);
        expect(screen.getByPlaceholderText(/rechercher/i)).toBeDefined();
    });

    it("renders the list of book boxes", () => {
        render(<HomePage />);
        // Check for the first item in the mock data
        expect(screen.getByText("Paris Eiffel Tower Book Box")).toBeDefined();
    });

    it("renders the map container", () => {
        render(<HomePage />);
        expect(screen.getByTestId("map-container")).toBeDefined();
    });
});
