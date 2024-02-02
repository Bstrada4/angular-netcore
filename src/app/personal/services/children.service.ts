import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Children } from '../interfaces/children.interface';

@Injectable({providedIn: 'root'})
export class ChildrenService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }

    getChildren(id: string):Observable<Children[]>{
        return this.http.get<Children[]>(`${ this.baseUrl }/children/listar/${ id }`);
    }

    findChild( term: string, id: string ):Observable<Children[]>{
        return this.http.get<Children[]>(`${ this.baseUrl }/children/searchChild?terminoBusqueda=${ term }&idPersonal=${ id }`);
    }

    findChildById( id: string, idpersonal: string ):Observable<Children[]>{
        return this.http.get<Children[]>(`${ this.baseUrl }/children/searchChildId?id=${id}&idPersonal=${idpersonal}`);
    }

    addChild( children: Children ):Observable<Children>{
        return this.http.post<Children>(`${ this.baseUrl }/children`, children);
    }

    updateChild( children: Children ):Observable<Children>{
        if ( !children.id ) throw new Error('Child id is required');
        return this.http.patch<Children>(`${ this.baseUrl }/children/${ children.id }`, children);
    }

    deleteChildById( id: string ):Observable<boolean>{
        if ( !id ) throw new Error('Id is required');
        return this.http.delete(`${ this.baseUrl }/children/eliminar?id=${ id }`)
            .pipe(
                catchError( err => of(false)),
                map( resp => true )
            );
    }
    
}