import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';
import { tap } from 'node:test/reporters';

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';
   


    constructor(private http: HttpClient) { }

    searchCountryByAlphaCode( code: string ): Observable<Country | null> {
        const url = `${ this.apiUrl }/alpha/${ code }`;
        return this.http.get<Country[]>( url )
            .pipe(
                map( countries => countries.length > 0 ? countries[0] : null ),
                catchError( () => of(null) )
            );
    }

    searchCapital( capital: string ): Observable<Country[]> {

        const url = `${ this.apiUrl }/capital/${ capital }`;

        return this.http.get<Country[]>( url )
            .pipe(
                catchError( error => ([]) )
            );

    }

    searchByCountry ( pais: string ): Observable<Country[]> {
        const url = `${ this.apiUrl }/name/${ pais }`;

        return this.http.get<Country[]>( url )
            .pipe(
                catchError( error => ([]) )
            );
    }

    searchByRegion ( region: string ): Observable<Country[]> {
        const url = `${ this.apiUrl }/region/${ region }`;

        return this.http.get<Country[]>( url )
            .pipe(
                catchError( error => ([]) )
            );
    }
    
}