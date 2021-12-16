export interface PaginatorConfig {
    totalItems?: number;
    pageSize?: number;
    currentPage?: number;
    pageWindowSize?: number;
}

const DefaultConfig: PaginatorConfig = {
    totalItems: 10,
    pageSize: 10,
    currentPage: 1,
    pageWindowSize: 5
}

export class Paginator {
    private constructor(
        private totalItems: number = 10,
        private pageSize: number = 10,
        private currentPage: number = 1,
        private pageWindowSize: number = 5) {
    }

    public static create(config: PaginatorConfig = DefaultConfig): Paginator {
        if (config.totalItems < 0) {
            throw new Error('total items cannot be negative');
        }

        if (config.pageSize <= 0) {
            throw new Error('page size must be bigger than zero');
        }

        if (config.pageWindowSize <= 0) {
            throw new Error('page window size must be bigger than zero');
        }

        return new Paginator(
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

    hasItems(): boolean {
        return this.getTotalItems() > 0;
    }

    getPagesCount(): number {
        const pagesCount = Math.ceil(this.totalItems / this.pageSize);
        return Math.max(pagesCount, 1);
    }

    getPageWindow(): Array<number> {
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

        return this.range(startPage, endPage + 1);
    }

    getTotalItems(): number {
        return this.totalItems;
    }

    getPageSize(): number {
        return this.pageSize;
    }

    getCurrentPage(): number {
        return this.currentPage;
    }

    getPageWindowSize(): number {
        return this.pageWindowSize;
    }

    private range(start: number, end: number, step: number = 1): Array<number> {
        let output = [];
        if (typeof end === 'undefined') {
            end = start;
            start = 0;
        }
        for (let i = start; i < end; i += step) {
            output.push(i);
        }
        return output;
    };
}