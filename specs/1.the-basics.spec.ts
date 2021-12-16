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

        describe("isFirstPageActive()", () => {
            it("should return true if yes", () => {
                const paginator = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1
                });

                expect(paginator.isFirstPageActive()).toBe(true);
            });

            it("should return false if no", () => {
                const paginator = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 2
                });

                expect(paginator.isFirstPageActive()).toBe(false);
            });
        });

        describe("isLastPageActive()", () => {
            it("should return true if yes", () => {
                const paginator = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 10
                });

                expect(paginator.isLastPageActive()).toBe(true);
            });

            it("should return false if no", () => {
                const paginator = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 9
                });

                expect(paginator.isLastPageActive()).toBe(false);
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
                    const paginator = Paginator.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 1,
                        pageWindowSize: 5
                    });

                    expect(paginator.getPageWindow()).toEqual([1, 2, 3, 4, 5]);
                    paginator.nextPage();
                    expect(paginator.getPageWindow()).toEqual([1, 2, 3, 4, 5]);
                    paginator.nextPage();
                    expect(paginator.getPageWindow()).toEqual([1, 2, 3, 4, 5]);
                });

                it("should move after first items", () => {
                    const paginator = Paginator.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 4,
                        pageWindowSize: 5
                    });

                    expect(paginator.getPageWindow()).toEqual([2, 3, 4, 5, 6]);
                    paginator.nextPage();
                    expect(paginator.getPageWindow()).toEqual([3, 4, 5, 6, 7]);
                    paginator.nextPage();
                    expect(paginator.getPageWindow()).toEqual([4, 5, 6, 7, 8]);
                    paginator.nextPage();
                    expect(paginator.getPageWindow()).toEqual([5, 6, 7, 8, 9]);
                });

                it("should not move after last items", () => {
                    const paginator = Paginator.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 8,
                        pageWindowSize: 5
                    });

                    expect(paginator.getPageWindow()).toEqual([6, 7, 8, 9, 10]);
                    paginator.nextPage();
                    expect(paginator.getPageWindow()).toEqual([6, 7, 8, 9, 10]);
                    paginator.nextPage();
                    expect(paginator.getPageWindow()).toEqual([6, 7, 8, 9, 10]);
                });
            });
        });

        describe("setCurrentPage()", () => {
            it("should increment page", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                paginator1.setCurrentPage(2);
                expect(paginator1.getCurrentPage()).toBe(2);
            });

            it("should not be bigger than pages count", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 10,
                    pageWindowSize: 5
                });

                paginator1.setCurrentPage(12);
                expect(paginator1.getCurrentPage()).toBe(10);
            });

            it("should not be smaller than 1", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 10,
                    pageWindowSize: 5
                });

                paginator1.setCurrentPage(-1);
                expect(paginator1.getCurrentPage()).toBe(1);
            });
        });

        describe("setPageWindowSize()", () => {
            it("should set page window size", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                paginator1.setPageWindowSize(3);
                expect(paginator1.getPageWindowSize()).toBe(3);
            });

            it("should not be smaller than 1", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 10,
                    pageWindowSize: 5
                });

                paginator1.setCurrentPage(-1);
                expect(paginator1.getCurrentPage()).toBe(1);
            });
        });

        describe("setPageSize()", () => {
            it("should set page size", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                paginator1.setPageSize(5);
                expect(paginator1.getPageSize()).toBe(5);
            });

            it("should not be smaller than 1", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                paginator1.setPageSize(0);
                expect(paginator1.getPageSize()).toBe(1);
            });
        });

        describe("firstPage()", () => {
            it("should go to first page", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 5,
                });

                expect(paginator1.getCurrentPage()).toBe(5);
                paginator1.firstPage();
                expect(paginator1.getCurrentPage()).toBe(1);
            });
        });

        describe("lastPage()", () => {
            it("should go to last page", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 5,
                });

                expect(paginator1.getCurrentPage()).toBe(5);
                paginator1.lastPage();
                expect(paginator1.getCurrentPage()).toBe(10);
            });
        });

        describe("nextPage()", () => {
            it("should increment page", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                paginator1.nextPage();
                expect(paginator1.getCurrentPage()).toBe(2);
            });

            it("should not increment page if reached maximum count", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 10,
                    pageWindowSize: 5
                });

                paginator1.nextPage();
                expect(paginator1.getCurrentPage()).toBe(10);
            });
        });

        describe("previousPage()", () => {
            it("should decrement page", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 2,
                    pageWindowSize: 5
                });

                paginator1.previousPage();
                expect(paginator1.getCurrentPage()).toBe(1);
            });

            it("should not decrement page if reached minimum count", () => {
                const paginator1 = Paginator.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                paginator1.previousPage();
                expect(paginator1.getCurrentPage()).toBe(1);
            });
        });
    });
});
