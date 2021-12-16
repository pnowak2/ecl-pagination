import { Paginator } from "../src/paginator";

describe("Pagination", () => {
    describe("Initialization", () => {
        it("should init without config", () => {
            const paginator = Paginator.create();

            expect(paginator.getTotalItems()).toBe(10);
            expect(paginator.getPageSize()).toBe(10);
            expect(paginator.getCurrentPage()).toBe(1);
            expect(paginator.getPageWindowindowSize()).toBe(5);
        });

        it("should init with empty config", () => {
            const paginator = Paginator.create({});

            expect(paginator.getTotalItems()).toBe(10);
            expect(paginator.getPageSize()).toBe(10);
            expect(paginator.getCurrentPage()).toBe(1);
            expect(paginator.getPageWindowindowSize()).toBe(5);
        });

        it("should init with provided config", () => {
            const paginator = Paginator.create({
                totalItems: 5,
                pageSize: 5,
                currentPage: 3,
                pageWindowSize: 3
            });

            expect(paginator.getTotalItems()).toBe(5);
            expect(paginator.getPageSize()).toBe(5);
            expect(paginator.getCurrentPage()).toBe(3);
            expect(paginator.getPageWindowindowSize()).toBe(3);
        });

        it("should not accept invalid arguments", () => {
            expect(() => {
                Paginator.create({
                    totalItems: -1
                });
            }).toThrow('total items cannot be negative');
        });
    });
});
