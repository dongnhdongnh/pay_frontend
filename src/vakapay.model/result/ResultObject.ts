export class ResultObject {
    status: string;
    message: string;
    data: any;
    constructor(result: any) {
        try {
            this.status = 'success';
            this.message = '';
            this.data = null;

            if (result == null) {
                throw new Error(`Data result is NULL.`);
            }

            result.status && (this.status = result.status);
            result.Status && (this.status = result.Status);

            result.message && (this.message = result.message);
            result.Message && (this.message = result.Message);

            result.data && (this.data = result.data);
            result.Data && (this.data = result.Data);

            //parse data if data is JSON string
            if (this.data !== null && typeof this.data === 'string') {
                try {
                    this.data = JSON.parse(this.data);
                } catch (error) {
                    return;
                }
            }

            return this;
        } catch (error) {
            throw error;
        }
    }
}