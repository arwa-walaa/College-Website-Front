import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  public crumbsSubject = new BehaviorSubject<{ label: string, path?: string }[]>([]);

  addCrumb(label: string, path?: string): void {
    const crumbs = this.crumbsSubject.value;
    const newCrumbs = [...crumbs, { label, path }];
    this.crumbsSubject.next(newCrumbs);
  }

  removeLastCrumb(): void {
    const crumbs = this.crumbsSubject.value;
    const newCrumbs = crumbs.slice(0, -1);
    this.crumbsSubject.next(newCrumbs);
  }

  get crumbs$() {
    return this.crumbsSubject.asObservable();
  }
}
