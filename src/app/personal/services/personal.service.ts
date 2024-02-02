import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Personal } from '../interfaces/personal.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class PersonalService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }

    getPersonal():Observable<Personal[]>{
        return this.http.get<Personal[]>(`${ this.baseUrl }/personal/listar`);
    }

    findPersonal( term: string ):Observable<Personal[]>{
        return this.http.get<Personal[]>(`${ this.baseUrl }/personal/searchPersonal?terminoBusqueda=${ term }`);
    }

    findPersonalById( id: string ):Observable<Personal[]>{
        return this.http.get<Personal[]>(`${ this.baseUrl }/personal/searchPersonalId?id=${ id }`);
    }

    addPersonal( personal: Personal ):Observable<Personal>{
        return this.http.post<Personal>(`${ this.baseUrl }/personal`, personal);
    }

    updatePersonal( personal: Personal ):Observable<Personal>{
        if ( !personal.id ) throw new Error('Personal id is required');
        return this.http.patch<Personal>(`${ this.baseUrl }/personal/${ personal.id }`, personal);
    }

    deletePersonalById( id: string ):Observable<boolean>{
        if ( !id ) throw new Error('Id is required');
        return this.http.delete(`${ this.baseUrl }/personal/eliminar?id=${ id }`)
            .pipe(
                catchError( err => of(false)),
                map( resp => true )
            );
    }
    
}