import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

export class Root {
    websiteName = 'Vakapay';
    router: Router;

    constructor(
        titleService: Title,
        route: ActivatedRoute,
        router: Router
    ) {
        this.router = router;

        //Set title
        titleService.setTitle(`${route.snapshot.data['title']} - ${this.websiteName}`);
    }

    redirect(path = '/') {
        this.router.navigate([path]);
    }
}