import { BodyOutputType, Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

export class Root {
    websiteName = 'Vakapay';
    toasterService: ToasterService;
    config: ToasterConfig;
    router: Router;

    constructor(
        toasterService: ToasterService,
        titleService: Title,
        route: ActivatedRoute,
        router: Router
    ) {
        this.toasterService = toasterService;
        this.router = router;

        //Set title
        titleService.setTitle(`${route.snapshot.data['title']} - ${this.websiteName}`);
    }

    redirect(path = '/') {
        this.router.navigate([path]);
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