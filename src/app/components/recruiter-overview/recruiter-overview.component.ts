import { Component, OnInit } from '@angular/core';
import {Vacancy} from "../../models/vacancy";
import {VacancySearchService} from "../../services/vacancy-search.service";

@Component({
  selector: 'app-recruiter-overview',
  templateUrl: './recruiter-overview.component.html',
  styleUrls: ['./recruiter-overview.component.scss']
})
export class RecruiterOverviewComponent implements OnInit {
  vacancies: Vacancy[] = [];

  constructor(private vacancyService: VacancySearchService) { }

  ngOnInit(): void {
    this.getAllVacancies();
  }

  getAllVacancies(): void {
    this.vacancyService.getAllVacancies()
      .subscribe(vacancies => this.vacancies = vacancies);
  }

}
