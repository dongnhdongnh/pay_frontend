export class PaginationService {
    //status
    isError: boolean = false;
    isLoading: boolean = false;

    public total: number = 0;
    public offset: number = 0;
    public limit: number = 8;
    public step: number = 2;

    constructor() {
        this.isError = false;
        this.isLoading = false;
        this.total = 0;
        this.offset = 0;
        this.limit = 8;
        this.step = 2;
    }

    get size() {
        return Math.ceil(this.total / this.limit);
    }

    get page() {
        return parseInt(`${this.offset / this.limit}`) + 1;
    }

    get pages() {
        var list = Array.from(Array(this.size).keys()).map(x => x + 1);

        if (this.size < this.step * 2 + 6) {
            return list;
        }

        if (this.page < this.step * 2 + 1) {
            list = Array.from(Array(this.step * 2 + 3).keys()).map(x => x + 1);
            return [...list, 0, this.size];
        }

        if (this.page > this.size - this.step * 2) {
            list = list.slice(this.size - this.step * 2 - 3);
            return [1, 0, ...list];
        }

        list = list.slice(this.page - this.step - 1, this.page + this.step);
        return [1, 0, ...list, 0, this.size];
    }

    get hasPrev() {
        return this.page > 1
    }
    get hasNext() {
        return (this.total - this.page * this.limit) > 0;
    }

    refresh() {
        throw new Error('Not found function refresh in service');
    }
}