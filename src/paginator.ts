export class Paginator {
    constructor(
        private totalItems: number,
        private pageSize: number,
        private currentPage: number,
        private pageWindowSize: number) { 
            
        }

    public static fromPagination(): Paginator {
        return new Paginator(0, 0 , 0, 0);
    }

}