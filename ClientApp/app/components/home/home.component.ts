import { Component, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router, Route } from '@angular/router';
import { MatSort } from '@angular/material';
import { GenericDatabase, GenericDataSource, Paginator, PaggingOptions, PaggingResult } from 'nglib';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
    routes: Array<Route>

    displayedColumns = ['path'];
    exampleDatabase: GenericDatabase<Route>;
    dataSource: GenericDataSource<Route> | null;

    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatSort) sort: MatSort;

    paginator = new Paginator(
        (options) => this.refresh(options),
        (r, e) => this.refreshComplete(r, e));

    constructor(
        private _router: Router) {
        this.routes = _router.config;
        console.log(this.routes);

    }

    ngOnInit() {
        this.exampleDatabase = new GenericDatabase<Route>(() => this.getData());
        this.dataSource = new GenericDataSource<Route>(
            () => this.getData(),
            this.sort,
            d => d.path);

        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
            });

        this.paginator.page();
    }

    private getData() {
        return new Observable<any>(observe => {
            observe.next(this.routes);
        });
    }

    refresh(options: PaggingOptions) {
        return new Observable<PaggingResult<Route>>(observe => {
            observe.next(
                {
                    items: this.routes,
                    current: 1,
                    total: 1,
                    canNext: false,
                    canPrev: false,
                    pageNumbers: new Int32Array(1)
                });
        })
    }

    refreshComplete(result: PaggingResult<Route>, error: any) {
        if (error != null) {
            console.log(`refresh data error\n${error}`)
        }

        this.routes = result.items;
        this.dataSource.refresh();
    }
}