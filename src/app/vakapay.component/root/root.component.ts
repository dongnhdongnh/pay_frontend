import { BodyOutputType, Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

export class Root {
    toasterService: ToasterService;
    config: ToasterConfig;

    constructor(toasterService: ToasterService) {
        this.toasterService = toasterService;
    }

    showToastError(message: string) {
        this.showToast('string', 'Error', message);
    }

    showToastSuccess(message: string) {
        this.showToast('string', 'Success', message);
    }

    setConfigToast() {
        this.config = new ToasterConfig({
            positionClass: 'toast-top-right',
            timeout: 10000,
            newestOnTop: true,
            tapToDismiss: true,
            preventDuplicates: false,
            animation: 'slideDown',
            limit: 1,
        });
    }

    showToast(type: string, title: string, body: string) {
        this.setConfigToast();
        const toast: Toast = {
            type: type,
            title: title,
            body: body,
            timeout: 10000,
            showCloseButton: true,
            bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
    }
}