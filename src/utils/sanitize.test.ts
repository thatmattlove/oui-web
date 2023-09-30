import { sanitize } from "./sanitize";

describe("input sanitization", () => {
    test("multiple with colons", () => {
        const result = sanitize(`78:50:7c:21:fc:13
00:50:56:00:00:00`);
        expect(result).toEqual(["78507c21fc13", "005056000000"]);
    });
    test("multiple with dots", () => {
        const result = sanitize(`7850.7c21.fc13\n0050.5600.0000`);
        expect(result).toEqual(["78507c21fc13", "005056000000"]);
    });
    test("multiple with carriage return", () => {
        const result = sanitize(`7850.7c21.fc13\r0050.5600.0000`);
        expect(result).toEqual(["78507c21fc13", "005056000000"]);
    });
    test("multiple with carriage return & newline", () => {
        const result = sanitize(`7850.7c21.fc13\n\r0050.5600.0000`);
        expect(result).toEqual(["78507c21fc13", "005056000000"]);
    });
    test("multiple with space", () => {
        const result = sanitize(`7850.7c21.fc13 0050.5600.0000`);
        expect(result).toEqual(["78507c21fc13", "005056000000"]);
    });
    test("multiple with spaces", () => {
        const result = sanitize(`7850.7c21.fc13    0050.5600.0000`);
        expect(result).toEqual(["78507c21fc13", "005056000000"]);
    });
});
