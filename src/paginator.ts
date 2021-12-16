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
        if (config.totalItems && config.totalItems < 0) {
            throw new Error('total items cannot be negative');
        }

        return new Paginator(
            config.totalItems,
            config.pageSize,
            config.currentPage,
            config.pageWindowSize
        );
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

    getPageWindowindowSize(): number {
        return this.pageWindowSize;
    }
}