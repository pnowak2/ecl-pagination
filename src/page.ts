export interface PageConfig {
    index: number;
    isCurrent: boolean;
}

export class Page {
    private constructor(
        public index: number,
        public isCurrent: boolean) {
    }

    public static create(config: PageConfig): Page {
        if (config.index < 0) {
            throw new Error('index cannot be negative');
        }

        return new Page (
            config.index,
            config.isCurrent
        );
    }
}