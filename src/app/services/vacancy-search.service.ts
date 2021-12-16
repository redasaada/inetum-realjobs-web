import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable, of, catchError} from 'rxjs';
import {VacancyFilterFields} from '../models/vacancy-filter-fields.model';
import {Vacancy} from '../models/vacancy';

@Injectable({
  providedIn: 'root'
})
export class VacancySearchService {

  vacancies: Vacancy[] = [];
  allVacanciesUrl: string = "http://localhost:8080/api/vacancies/all";

  constructor(private httpClient: HttpClient) {
  }

  getFilteredVacancies(filter: VacancyFilterFields): Observable<Vacancy[]> {
    let params = new HttpParams();
    params = params.append('functionTitle', filter.functionTitle);
    params = params.append('contractType', filter.contractType);
    params = params.append('industry', filter.industry);
    params = params.append('country', filter.country);
    params = params.append('requiredYearsOfExperience', filter.requiredYearsOfExperience);

    return this.httpClient
      .get<Vacancy[]>("http://localhost:8080/api/vacancies/",
        {observe: 'body', responseType: 'json', params: params});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as  T);
    };
  }

  getAllVacancies(): Observable<Vacancy[]> {
      return this.httpClient.get<Vacancy[]>(this.allVacanciesUrl)
        .pipe(
          catchError(this.handleError<Vacancy[]>('getAllVacancies', []))
        );
  }
}
