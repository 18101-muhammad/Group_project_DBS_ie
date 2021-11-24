import { Client } from '~app/models/client';
import { Response } from '~app/models/response';
import { Observable } from 'rxjs';

export abstract class Provider {

  constructor() { }

  abstract getList(sortActive: string, order: string, pageSize: number, page: number, search: string): Observable<Response>;

  abstract getAppliedList(sortActive: string, order: string, pageSize: number, page: number, search: string): Observable<Response>;

  abstract getOne(id: string): Observable<Response>;

  abstract save(client: Client): Observable<Response>;

  //abstract delete(id: number): Observable<Response>;

}
