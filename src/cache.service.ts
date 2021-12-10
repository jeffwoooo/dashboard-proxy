import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { from, mergeMap, Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  cacheWrap<T>(cacheKey: string, builder: () => Observable<T>) {
    const cacheFetching = from(this.cacheManager.get<T>(cacheKey));

    return cacheFetching.pipe(mergeMap(cache => {
      if (cache) {
        console.log("cache hit!")
        return of(cache)
      } else {
        console.log("no cache")
        return builder().pipe(tap(v => {
          this.cacheManager.set(cacheKey, v);
        }));
      }
    }));
  }
}
