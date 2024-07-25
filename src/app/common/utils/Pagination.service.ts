import { ElementRef, Injectable } from '@angular/core';
import { HttpResponse } from '@common/models';
import { Observable } from 'rxjs';

@Injectable()
export class PaginationService {
  trackScrollFunction = <T>(
    container: ElementRef<HTMLDivElement>,
    action: (...args: any) => Observable<HttpResponse<T>>,
    options: {
      conditions: boolean[];
      output: { value: any; returned: boolean; triggered: boolean };
      args?: any[];
    }
  ): T | null => {
    const currentHeight = container.nativeElement.scrollTop;
    if (
      currentHeight == 0 &&
      options.conditions.every((condition) => condition)
    ) {
      options.output.triggered = true;
      action(...options.args).subscribe({
        next: ({ data }) => {
          data;
          container.nativeElement.scrollBy({
            top: 10,
            behavior: 'smooth',
          });
          options.output.value = data;
          options.output.returned = true;
          options.output.triggered = false;
        },
      });
    }
    return null;
  };
  public scrollBottom(container: ElementRef<HTMLDivElement>) {
    setTimeout(() => {
      if (container && container.nativeElement) {
        container.nativeElement.scrollBy({
          top: container.nativeElement.scrollHeight,
          behavior: 'instant',
        });
      }
    });
  }
}
