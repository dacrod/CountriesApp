import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';
import { tap } from 'node:test/reporters';

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';
   
    constructor(private http: HttpClient) { }

    private getCountriesRequest( url: string ): Observable<Country[]> {
        return this.http.get<Country[]>( url )
            .pipe(
                catchError( () => ([]) ),
                delay( 2000 )
            );
    }

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
        return this.getCountriesRequest( url );

    }

    searchByCountry ( pais: string ): Observable<Country[]> {

        const url = `${ this.apiUrl }/name/${ pais }`;
        return this.getCountriesRequest( url );

    }

    searchByRegion ( region: string ): Observable<Country[]> {

        const url = `${ this.apiUrl }/region/${ region }`;
        return this.getCountriesRequest( url );

    }
    
}