import { prepareSingle, prepareMultiple } from "./prepare";

describe("single", () => {
    test("with colons", () => {
        const result = prepareSingle("78:50:7c:21:fc:13");
        expect(result).toBe("78507c21fc13");
    });
    test("with garbage", () => {
        const result = prepareSingle("#78:5^0:gy:7C:2&1:fc:%13");
        expect(result).toBe("78507c21fc13");
    });
});

describe("multiple", () => {
    test("basic", () => {
        const result = prepareMultiple(["78:50:7c:21:fc:13", "00:50:56:00:00:00"]);
        expect(result).toBe("78507c21fc13,005056000000");
    });
    test("with garbage", () => {
        const result = prepareMultiple(["78:50:z7c:&21:ghfc:13", "0%0:&50:5(6:00:00:@00"]);
        expect(result).toBe("78507c21fc13,005056000000");
    });
    test("with extra invalid elements", () => {
        const result = prepareMultiple([
            "78:50:7c:21:fc:13",
            "",
            "00:50:56:00:00:00",
            "@(#&$&(&^%",
            "wrong",
        ]);
        expect(result).toBe("78507c21fc13,005056000000");
    });
});
