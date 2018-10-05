export class ResultObject {
    status: string;
    message: string;
    data: any;
    constructor(result: any) {
        try {
            this.status = 'success';
            this.message = '';
            this.data = null;

            if (result == null) return;

            //parse data if data is JSON string
            if (result !== null && typeof result === 'string') {
                try {
                    result = JSON.parse(result);
                } catch (error) {
                    return;
                }
            }



            if (result == null) {
                throw new Error(`Data result is NULL.`);
            }

            result.status && (this.status = result.status);
            result.Status && (this.status = result.Status);

            result.message && (this.message = result.message);
            result.Message && (this.message = result.Message);

            result.data && (this.data = result.data);
            result.Data && (this.data = result.Data);

            return this;
        } catch (error) {
            throw error;
        }
    }
}