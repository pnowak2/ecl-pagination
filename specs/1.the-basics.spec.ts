import { Paginator } from "../src/paginator";

describe("1 Basic Types", () => {
    describe("Boolean", () => {
        it("should declare it", () => {
            const p = Paginator.fromPagination();
            expect(p).toBeInstanceOf(Paginator);
        })
    });
})