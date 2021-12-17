import { EuiPagination, DefaultConfig, range } from "../src/eui-pagination";

describe("Pagination", () => {
    describe("Default Config", () => {
        it("should provide correct defaults", () => {
            expect(DefaultConfig).toEqual({
                totalItems: 0,
                pageSize: 10,
                currentPage: 1,
                pageWindowSize: 5
            })
        });
    });
    describe("Initialization", () => {
        describe("Valid", () => {
            it("should init without config using defaults", () => {
                const paginator = EuiPagination.create();

                expect(paginator.getTotalItems()).toBe(DefaultConfig.totalItems);
                expect(paginator.getPageSize()).toBe(DefaultConfig.pageSize);
                expect(paginator.getCurrentPage()).toBe(DefaultConfig.currentPage);
                expect(paginator.getPageWindowSize()).toBe(DefaultConfig.pageWindowSize);
            });

            it("should init with empty config using defaults", () => {
                const paginator = EuiPagination.create({});

                expect(paginator.getTotalItems()).toBe(DefaultConfig.totalItems);
                expect(paginator.getPageSize()).toBe(DefaultConfig.pageSize);
                expect(paginator.getCurrentPage()).toBe(DefaultConfig.currentPage);
                expect(paginator.getPageWindowSize()).toBe(DefaultConfig.pageWindowSize);
            });

            it("should init with provided config", () => {
                const paginator = EuiPagination.create({
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

            it("should init with partially provided config", () => {
                const paginator = EuiPagination.create({
                    totalItems: 15,
                    pageSize: 5
                });

                expect(paginator.getTotalItems()).toBe(15);
                expect(paginator.getPageSize()).toBe(5);
                expect(paginator.getCurrentPage()).toBe(DefaultConfig.currentPage);
                expect(paginator.getPageWindowSize()).toBe(DefaultConfig.pageWindowSize);
            });
        });

        describe("Invalid", () => {
            it("should not accept negative total items", () => {
                expect(() => {
                    EuiPagination.create({
                        totalItems: -1
                    });
                }).toThrow('total items cannot be negative');
            });

            it("should not accept negative page size", () => {
                expect(() => {
                    EuiPagination.create({
                        pageSize: -1
                    });
                }).toThrow('page size must be bigger than zero');
            });

            it("should not accept zero page size", () => {
                expect(() => {
                    EuiPagination.create({
                        pageSize: 0
                    });
                }).toThrow('page size must be bigger than zero');
            });

            it("should not accept negative page window size", () => {
                expect(() => {
                    EuiPagination.create({
                        pageWindowSize: -1
                    });
                }).toThrow('page window size must be bigger than zero');
            });

            it("should not accept zero page window size", () => {
                expect(() => {
                    EuiPagination.create({
                        pageWindowSize: 0
                    });
                }).toThrow('page window size must be bigger than zero');
            });
        });
    });

    describe("API", () => {
        describe("hasItems()", () => {
            it("should return true if any items", () => {
                const paginator = EuiPagination.create({
                    totalItems: 10,
                });

                expect(paginator.hasItems()).toBe(true);
            });

            it("should return false if no items", () => {
                const paginator = EuiPagination.create({
                    totalItems: 0,
                });

                expect(paginator.hasItems()).toBe(false);
            });
        });

        describe("isFirstPageActive()", () => {
            it("should return true if yes", () => {
                const paginator = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1
                });

                expect(paginator.isFirstPageActive()).toBe(true);
            });

            it("should return false if no", () => {
                const paginator = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 2
                });

                expect(paginator.isFirstPageActive()).toBe(false);
            });
        });

        describe("isLastPageActive()", () => {
            it("should return true if yes", () => {
                const paginator = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 10
                });

                expect(paginator.isLastPageActive()).toBe(true);
            });

            it("should return false if no", () => {
                const paginator = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 9
                });

                expect(paginator.isLastPageActive()).toBe(false);
            });
        });

        describe("isGoToPreviousPageEnabled()", () => {
            it("should return true if yes", () => {
                const paginator = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 2
                });

                expect(paginator.isGoToPreviousPageEnabled()).toBe(true);
            });

            it("should return false if no", () => {
                const paginator = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1
                });

                expect(paginator.isGoToPreviousPageEnabled()).toBe(false);
            });
        });

        describe("isGoToNextPageEnabled()", () => {
            it("should return true if yes", () => {
                const paginator = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 9
                });

                expect(paginator.isGoToNextPageEnabled()).toBe(true);
            });

            it("should return false if no", () => {
                const paginator = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 10
                });

                expect(paginator.isGoToNextPageEnabled()).toBe(false);
            });
        });

        describe("getFirstPage()", () => {
            it("should return 1", () => {
                const paginator = EuiPagination.create({
                    totalItems: 10,
                    pageSize: 10,
                });

                expect(paginator.getFirstPage()).toBe(1);
            });
        });

        describe("getLastPage()", () => {
            it("should return last valid page", () => {
                const paginator = EuiPagination.create({
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
                const paginator11 = EuiPagination.create({
                    totalItems: 11,
                    pageSize: 10,
                });
                const paginator25 = EuiPagination.create({
                    totalItems: 25,
                    pageSize: 10,
                });
                const paginator100 = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                });

                expect(paginator11.getPagesCount()).toEqual(2);
                expect(paginator25.getPagesCount()).toEqual(3);
                expect(paginator100.getPagesCount()).toEqual(10);
            });

            it("should provide one page", () => {
                const paginator0 = EuiPagination.create({
                    totalItems: 0,
                    pageSize: 10,
                });
                const paginator9 = EuiPagination.create({
                    totalItems: 0,
                    pageSize: 10,
                });
                const paginator10 = EuiPagination.create({
                    totalItems: 0,
                    pageSize: 10,
                });

                expect(paginator0.getPagesCount()).toEqual(1);
                expect(paginator9.getPagesCount()).toEqual(1);
                expect(paginator10.getPagesCount()).toEqual(1);
            });
        });

        describe("getPages()", () => {
            describe("Symmetrical / odd page window size", () => {
                it("should not move for first items", () => {
                    const paginator = EuiPagination.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 1,
                        pageWindowSize: 5
                    });

                    expect(paginator.getPages()).toEqual([1, 2, 3, 4, 5]);
                    paginator.goToNextPage();
                    expect(paginator.getPages()).toEqual([1, 2, 3, 4, 5]);
                    paginator.goToNextPage();
                    expect(paginator.getPages()).toEqual([1, 2, 3, 4, 5]);
                });

                it("should move after first items", () => {
                    const paginator = EuiPagination.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 4,
                        pageWindowSize: 5
                    });

                    expect(paginator.getPages()).toEqual([2, 3, 4, 5, 6]);
                    paginator.goToNextPage();
                    expect(paginator.getPages()).toEqual([3, 4, 5, 6, 7]);
                    paginator.goToNextPage();
                    expect(paginator.getPages()).toEqual([4, 5, 6, 7, 8]);
                    paginator.goToNextPage();
                    expect(paginator.getPages()).toEqual([5, 6, 7, 8, 9]);
                });

                it("should not move after last items", () => {
                    const paginator = EuiPagination.create({
                        totalItems: 100,
                        pageSize: 10,
                        currentPage: 8,
                        pageWindowSize: 5
                    });

                    expect(paginator.getPages()).toEqual([6, 7, 8, 9, 10]);
                    paginator.goToNextPage();
                    expect(paginator.getPages()).toEqual([6, 7, 8, 9, 10]);
                    paginator.goToNextPage();
                    expect(paginator.getPages()).toEqual([6, 7, 8, 9, 10]);
                });
            });
        });

        describe("getShowingFrom()", () => {
            it("should provide item number", () => {
                const paginator = EuiPagination.create({
                    totalItems: 85,
                    pageSize: 10,
                    currentPage: 5,
                });

                expect(paginator.getShowingFrom()).toEqual(41);
            });

            it("should provide item number on last page", () => {
                const paginator = EuiPagination.create({
                    totalItems: 85,
                    pageSize: 10,
                    currentPage: 9,
                });

                expect(paginator.getShowingFrom()).toEqual(81);
            });

            it("should provide correct item number if total items is zero", () => {
                const paginator = EuiPagination.create({
                    totalItems: 0,
                    pageSize: 10,
                    currentPage: 9,
                });

                expect(paginator.getShowingFrom()).toEqual(0);
            });
        });

        describe("getShowingTo()", () => {
            it("should provide item number", () => {
                const paginator = EuiPagination.create({
                    totalItems: 85,
                    pageSize: 10,
                    currentPage: 5,
                });

                expect(paginator.getShowingTo()).toEqual(50);
            });

            it("should provide item number on last page", () => {
                const paginator = EuiPagination.create({
                    totalItems: 85,
                    pageSize: 10,
                    currentPage: 9,
                });

                expect(paginator.getShowingTo()).toEqual(85);
            });

            it("should provide correct item number if total items is zero", () => {
                const paginator = EuiPagination.create({
                    totalItems: 0,
                    pageSize: 10,
                    currentPage: 9,
                });

                expect(paginator.getShowingTo()).toEqual(0);
            });
        });

        describe("setCurrentPage()", () => {
            it("should increment page", () => {
                const paginator1 = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                paginator1.setCurrentPage(2);
                expect(paginator1.getCurrentPage()).toBe(2);
            });

            it("should not be bigger than pages count", () => {
                const paginator1 = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 10,
                    pageWindowSize: 5
                });

                paginator1.setCurrentPage(12);
                expect(paginator1.getCurrentPage()).toBe(10);
            });

            it("should not be smaller than 1", () => {
                const paginator1 = EuiPagination.create({
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
                const paginator1 = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                paginator1.setPageWindowSize(3);
                expect(paginator1.getPageWindowSize()).toBe(3);
            });

            it("should not be smaller than 1", () => {
                const paginator1 = EuiPagination.create({
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
                const paginator1 = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                paginator1.setPageSize(5);
                expect(paginator1.getPageSize()).toBe(5);
            });

            it("should not be smaller than 1", () => {
                const paginator1 = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                paginator1.setPageSize(0);
                expect(paginator1.getPageSize()).toBe(1);
            });
        });

        describe("goToFirstPage()", () => {
            it("should go to first page", () => {
                const paginator1 = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 5,
                });

                expect(paginator1.getCurrentPage()).toBe(5);
                paginator1.goToFirstPage();
                expect(paginator1.getCurrentPage()).toBe(1);
            });
        });

        describe("goToLastPage()", () => {
            it("should go to last page", () => {
                const paginator1 = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 5,
                });

                expect(paginator1.getCurrentPage()).toBe(5);
                paginator1.goToLastPage();
                expect(paginator1.getCurrentPage()).toBe(10);
            });
        });

        describe("goToNextPage()", () => {
            it("should increment page", () => {
                const paginator1 = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                paginator1.goToNextPage();
                expect(paginator1.getCurrentPage()).toBe(2);
            });

            it("should not increment page if reached maximum count", () => {
                const paginator1 = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 10,
                    pageWindowSize: 5
                });

                paginator1.goToNextPage();
                expect(paginator1.getCurrentPage()).toBe(10);
            });
        });

        describe("goToPreviousPage()", () => {
            it("should decrement page", () => {
                const paginator1 = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 2,
                    pageWindowSize: 5
                });

                paginator1.goToPreviousPage();
                expect(paginator1.getCurrentPage()).toBe(1);
            });

            it("should not decrement page if reached minimum count", () => {
                const paginator1 = EuiPagination.create({
                    totalItems: 100,
                    pageSize: 10,
                    currentPage: 1,
                    pageWindowSize: 5
                });

                paginator1.goToPreviousPage();
                expect(paginator1.getCurrentPage()).toBe(1);
            });
        });
    });
});

describe("range", () => {
    describe("API", () => {
        it("should provide range from start to end", () => {
            expect(range(1, 5)).toEqual([1, 2, 3, 4]);
        });

        it("should provide range from start to end with step", () => {
            expect(range(1, 11, 3)).toEqual([1, 4, 7, 10]);
        });

        it("should provide range without end", () => {
            expect(range(5)).toEqual([0, 1, 2, 3, 4]);
        });
    });
});
