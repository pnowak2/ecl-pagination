import { Paginator } from "../src/paginator";

describe("Pagination", () => {
    describe("Initialization", () => {
        describe("Initialization", () => {
            it("should init without config", () => {
                const paginator = Paginator.create();

                expect(paginator.getTotalItems()).toBe(10);
                expect(paginator.getPageSize()).toBe(10);
                expect(paginator.getCurrentPage()).toBe(1);
                expect(paginator.getPageWindowSize()).toBe(5);
            });

            it("should init with empty config", () => {
                const paginator = Paginator.create({});

                expect(paginator.getTotalItems()).toBe(10);
                expect(paginator.getPageSize()).toBe(10);
                expect(paginator.getCurrentPage()).toBe(1);
                expect(paginator.getPageWindowSize()).toBe(5);
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
                expect(paginator.getPageWindowSize()).toBe(3);
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
        describe("hasItems()", () => {
            it("should return true if any items", () => {
                const paginator = Paginator.create({
                    totalItems: 10,
                });

                expect(paginator.hasItems()).toBe(true);
            });

            it("should return false if no items", () => {
                const paginator = Paginator.create({
                    totalItems: 0,
                });

                expect(paginator.hasItems()).toBe(false);
            });
        });

        describe("getFirstPage()", () => {
            it("should return 1", () => {
                const paginator = Paginator.create({
                    totalItems: 10,
                    pageSize: 10,
                });

                expect(paginator.getFirstPage()).toBe(1);
            });
        });

        describe("getLastPage()", () => {
            it("should return last valid page", () => {
                const paginator = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                expect(paginator.getLastPage()).toBe(10);
            });
        });

        describe("getPagesCount()", () => {
            it("should provide many pages", () => {
                const paginator11 = Paginator.create({
                    totalItems: 11,
                    pageSize: 10,
                });
                const paginator25 = Paginator.create({
                    totalItems: 25,
                    pageSize: 10,
                });
                const paginator100 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                });

                expect(paginator11.getPagesCount()).toEqual(2);
                expect(paginator25.getPagesCount()).toEqual(3);
                expect(paginator100.getPagesCount()).toEqual(10);
            });

            it("should provide one page", () => {
                const paginator0 = Paginator.create({
                    totalItems: 0,
                    pageSize: 10,
                });
                const paginator9 = Paginator.create({
                    totalItems: 0,
                    pageSize: 10,
                });
                const paginator10 = Paginator.create({
                    totalItems: 0,
                    pageSize: 10,
                });

                expect(paginator0.getPagesCount()).toEqual(1);
                expect(paginator9.getPagesCount()).toEqual(1);
                expect(paginator10.getPagesCount()).toEqual(1);
            });
        });

        describe("getPageWindow()", () => {
            describe("Symmetrical / odd page window size", () => {
                it("should not move for first items", () => {
                    const paginator1 = Paginator.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 1,
                        pageWindowSize: 5
                    });
                    const paginator2 = Paginator.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 2,
                        pageWindowSize: 5
                    });
                    const paginator3 = Paginator.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 3,
                        pageWindowSize: 5
                    });

                    expect(paginator1.getPageWindow()).toEqual([1, 2, 3, 4, 5]);
                    expect(paginator2.getPageWindow()).toEqual([1, 2, 3, 4, 5]);
                    expect(paginator3.getPageWindow()).toEqual([1, 2, 3, 4, 5]);
                });

                it("should move after first items", () => {
                    const paginator4 = Paginator.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 4,
                        pageWindowSize: 5
                    });
                    const paginator5 = Paginator.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 5,
                        pageWindowSize: 5
                    });
                    const paginator6 = Paginator.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 6,
                        pageWindowSize: 5
                    });
                    const paginator7 = Paginator.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 7,
                        pageWindowSize: 5
                    });

                    expect(paginator4.getPageWindow()).toEqual([2, 3, 4, 5, 6]);
                    expect(paginator5.getPageWindow()).toEqual([3, 4, 5, 6, 7]);
                    expect(paginator6.getPageWindow()).toEqual([4, 5, 6, 7, 8]);
                    expect(paginator7.getPageWindow()).toEqual([5, 6, 7, 8, 9]);
                });

                it("should not move after last items", () => {
                    const paginator8 = Paginator.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 8,
                        pageWindowSize: 5
                    });
                    const paginator9 = Paginator.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 9,
                        pageWindowSize: 5
                    });
                    const paginator10 = Paginator.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 10,
                        pageWindowSize: 5
                    });

                    expect(paginator8.getPageWindow()).toEqual([6, 7, 8, 9, 10]);
                    expect(paginator9.getPageWindow()).toEqual([6, 7, 8, 9, 10]);
                    expect(paginator10.getPageWindow()).toEqual([6, 7, 8, 9, 10]);
                });
            });
        });

        describe("setCurrentPage()", () => {
            it("should ..", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                paginator1.setCurrentPage(2);

                expect(paginator1.getCurrentPage()).toBe(2);
            });
        });

        describe("nextPage()", () => {
            it("should..", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 3,
                    pageWindowSize: 5
                });

                expect(paginator1.getPageWindow()).toEqual([1, 2, 3, 4, 5]);
                paginator1.nextPage();
                expect(paginator1.getPageWindow()).toEqual([2, 3, 4, 5, 6]);
            });
        });
    });
});
