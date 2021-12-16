import { Paginator } from "../src/paginator";

describe("Pagination", () => {
    describe("Initialization", () => {
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
        });

        describe("Invalid Initialization", () => {
            it("should not accept negative total items", () => {
                expect(() => {
                    Paginator.create({
                        totalItems: -1
                    });
                }).toThrow('total items cannot be negative');
            });

            it("should not accept negative page size", () => {
                expect(() => {
                    Paginator.create({
                        pageSize: -1
                    });
                }).toThrow('page size must be bigger than zero');
            });

            it("should not accept zero page size", () => {
                expect(() => {
                    Paginator.create({
                        pageSize: 0
                    });
                }).toThrow('page size must be bigger than zero');
            });

            it("should not accept negative page window size", () => {
                expect(() => {
                    Paginator.create({
                        pageWindowSize: -1
                    });
                }).toThrow('page window size must be bigger than zero');
            });

            it("should not accept zero page window size", () => {
                expect(() => {
                    Paginator.create({
                        pageWindowSize: 0
                    });
                }).toThrow('page window size must be bigger than zero');
            });
        });
    });

    describe("API", () => {
        describe("getPagesCount()", () => {
            it("should provide many pages", () => {
                const paginator = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                });

                expect(paginator.getPagesCount()).toEqual(10);
            });

            it("should provide one page", () => {
                const paginator = Paginator.create({
                    totalItems: 5,
                    pageSize: 10,
                });

                expect(paginator.getPagesCount()).toEqual(1);
            });
        });
        describe("getPagedWindow()", () => {
            it("should provide..", () => {
                const paginator = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                expect(paginator.getPageWindow()).toEqual([1, 2, 3, 4, 5]);
            });
        });
    });
});
