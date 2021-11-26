import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Filter } from './filter';
import { Vacancy } from './vacancy';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private baseUrl = "http://localhost::8080/api/vacancies"

  vacancies: Vacancy[] = [];

  constructor(private httpClient: HttpClient) { }

  getFilteredVacancies(filter: Filter): Observable<Vacancy[]>{
    let params = new HttpParams();
    params = params.append('functionTitle', filter.functionTitle);
    params = params.append('contractType', filter.contractType);
    params = params.append('industry', filter.industry);
    params = params.append('country', filter.country);
    params = params.append('requiredYearsOfExperience', filter.requiredYearsOfExperience);


    let result = this.httpClient.get<Vacancy[]>('http://localhost:8080/api/vacancies/filter/', {observe:'body',  responseType :'json' , params: params})

    return result;
    
  }
}
