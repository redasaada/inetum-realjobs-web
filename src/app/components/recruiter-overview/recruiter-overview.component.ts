import {Component, OnInit} from '@angular/core';
import {Vacancy} from "../../models/vacancy";
import {VacancySearchService} from "../../services/vacancy-search.service";

@Component({
  selector: 'app-recruiter-overview',
  templateUrl: './recruiter-overview.component.html',
  styleUrls: ['./recruiter-overview.component.scss']
})
export class RecruiterOverviewComponent implements OnInit {
  vacancies: Vacancy[] = [];
  title: string = "Overview: My vacancies";
  columns: any[];
  defaultMessage: string = "Your vacancies will appear here." +
    " Get started and post your first vacancy by clicking 'Post new vacancy'";

  constructor(private vacancyService: VacancySearchService) {
  }

  ngOnInit(): void {
    this.getAllVacancies();
    this.columns = [
      {field: 'functionTitle', header: 'Function title'},
      {field: 'createdOn', header: 'Date posted'},
      {field: 'createdBy', header: 'Vacancy manager'},
      {field: 'applicants', header: 'Applicants'}
    ];
  }

  getAllVacancies(): void {
    this.vacancyService.getAllVacancies()
      .subscribe(vacancies => this.vacancies = vacancies);
  }

}
