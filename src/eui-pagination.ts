export interface EuiPaginationConfig {
    totalItems?: number;
    pageSize?: number;
    currentPage?: number;
    pageWindowSize?: number;
}

export const DefaultConfig: EuiPaginationConfig = {
    totalItems: 0,
    pageSize: 10,
    currentPage: 1,
    pageWindowSize: 5
}

export class EuiPagination {
    private constructor(
        private totalItems: number = DefaultConfig.totalItems,
        private pageSize: number = DefaultConfig.pageSize,
        private currentPage: number = DefaultConfig.currentPage,
        private pageWindowSize: number = DefaultConfig.pageWindowSize) {
    }

    public static create(config: EuiPaginationConfig = DefaultConfig): EuiPagination {
        if (config.totalItems < 0) {
            throw new Error('total items cannot be negative');
        }

        if (config.pageSize <= 0) {
            throw new Error('page size must be bigger than zero');
        }

        if (config.pageWindowSize <= 0) {
            throw new Error('page window size must be bigger than zero');
        }

        return new EuiPagination(
            config.totalItems,
            config.pageSize,
            config.currentPage,
            config.pageWindowSize
        );
    }

    getFirstPage(): number {
        return 1;
    }

    getLastPage(): number {
        return this.getPagesCount();
    }

    isFirstPageActive(): boolean {
        return this.getCurrentPage() === 1;
    }

    isLastPageActive(): boolean {
        return this.getCurrentPage() === this.getPagesCount();
    }

    hasItems(): boolean {
        return this.getTotalItems() > 0;
    }

    getPagesCount(): number {
        const pagesCount = Math.ceil(this.totalItems / this.pageSize);
        return Math.max(pagesCount, 1);
    }

    getPages(): Array<number> {
        const pageWindowSize = this.getPageWindowSize();
        const pagesCount = this.getPagesCount();
        const currentPage = this.getCurrentPage();

        let truncatedPageWindowSize;
        let leftPageWindowSize;
        let rightPageWindowSize;
        let startPage;
        let endPage;

        // should not be bigger than pages count
        truncatedPageWindowSize = Math.min(...[this.getPageWindowSize(), this.getPagesCount()]);

        if (truncatedPageWindowSize % 2 === 0) {
            // nonsymetrical pager (...*....)
            leftPageWindowSize = (truncatedPageWindowSize / 2) - 1;
            rightPageWindowSize = leftPageWindowSize + 1;
        } else {
            // symmetrical pager (...*...)
            leftPageWindowSize = rightPageWindowSize = Math.floor(pageWindowSize / 2);
        }

        if (currentPage <= leftPageWindowSize) {
            // start
            startPage = 1;
            endPage = truncatedPageWindowSize;
        } else if (currentPage > (pagesCount - rightPageWindowSize)) {
            // end
            startPage = pagesCount - truncatedPageWindowSize + 1;
            endPage = pagesCount;
        } else {
            // middle
            startPage = currentPage - leftPageWindowSize;
            endPage = currentPage + rightPageWindowSize;
        }

        return range(startPage, endPage + 1);
    }

    goToFirstPage(): void {
        this.setCurrentPage(1);
    }

    goToLastPage(): void {
        const lastPage = this.getPagesCount();
        this.setCurrentPage(lastPage);
    }

    goToNextPage(): void {
        const nextPage = this.getCurrentPage() + 1;
        this.setCurrentPage(nextPage);
    }

    goToPreviousPage(): void {
        const previousPage = this.getCurrentPage() - 1;
        this.setCurrentPage(previousPage);
    }

    isGoToPreviousPageEnabled(): boolean {
        return this.getCurrentPage() > 1;
    }

    isGoToNextPageEnabled(): boolean {
        return this.getCurrentPage() < this.getPagesCount();
    }

    getTotalItems(): number {
        return this.totalItems;
    }

    getPageSize(): number {
        return this.pageSize;
    }

    setPageSize(size: number): void {
        const truncated = Math.max(...[size, 1]);
        this.pageSize = truncated;
    }

    getCurrentPage(): number {
        return this.currentPage;
    }

    setCurrentPage(page: number): void {
        var pagesCount, upperTrunc, truncated;

        pagesCount = this.getPagesCount();
        upperTrunc = Math.min(...[page, pagesCount]);
        truncated = Math.max(...[upperTrunc, 1]);

        this.currentPage = truncated;
    }

    getPageWindowSize(): number {
        return this.pageWindowSize;
    }

    setPageWindowSize(size: number): void {
        const truncated = Math.max(...[size, 1]);
        this.pageWindowSize = truncated;
    }

    getShowingFrom(): number {
        const startingIndex = (this.getCurrentPage() - 1) * this.getPageSize();
        let startingPage = startingIndex + 1;

        if (!this.hasItems()) {
            startingPage = 0;
        }

        return startingPage;
    }

    getShowingTo(): number {
        const displayStartItem = this.getShowingFrom();
        const pageSize = this.getPageSize();
        const totalItems = this.getTotalItems();
        let pageEnd: number;

        if (!this.hasItems()) {
            return 0;
        }

        pageEnd = Math.min(...[displayStartItem + pageSize - 1, totalItems]);

        return pageEnd;
    }
}

export const range = (start: number, end?: number, step: number = 1): Array<number> => {
    let output = [];
    if (typeof end === 'undefined') {
        end = start;
        start = 0;
    }
    for (let i = start; i < end; i += step) {
        output.push(i);
    }
    return output;
}