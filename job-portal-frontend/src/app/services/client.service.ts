import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CONSTANST } from '~utils/constanst';
import { Client } from '~app/models/client';
import { Response } from '~app/models/response';

import { Provider } from '~base/provider';
import { Observable } from 'rxjs';

@Injectable()
export class ClientService implements Provider {
  loading = true;

  constructor(
    private http: HttpClient,
  ) { }

  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  getList(sortActive: string, order: string, pageSize: number, page: number, search: string): Observable<Response> {


    return this.http.get<Response>(
      CONSTANST.routes.client.list,
      { headers: this.headers }
    );
  }

  getAppliedList(sortActive: string, order: string, pageSize: number, page: number, search: string): Observable<Response> {


    return this.http.get<Response>(
      CONSTANST.routes.client.appliedlist,
      { headers: this.headers }
    );
  }



  getOne(id: number): Observable<Response> {
    return this.http.get<Response>(
      CONSTANST.routes.client.get.replace(':id', String(id))+'/apply',
      { headers: this.headers }
    );
  }

  save(client: Client): Observable<Response> {
    return this.http.post<Response>(
      CONSTANST.routes.client.save,
      {
        company: client.company,
        description: client.description,
        experience: client.experience,
        location: client.location,
        profile: client.profile,
        skill: client.skill
      },
      { headers: this.headers }
    );
  }

}
