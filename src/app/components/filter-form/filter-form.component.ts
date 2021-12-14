import { ApplicationInitStatus, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VacancyFilterFields } from '../../models/vacancy-filter-fields.model';
import { VacancyService } from '../../services/vacancy.service';
import { Vacancy } from '../../vacancy';
import { TableModule } from 'primeng/table';
import { Application } from 'src/app/models/application.model';


@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {
  
  filter: VacancyFilterFields ={
    functionTitle: "",
    contractType: "",
    industry: "",
    country: "",
    requiredYearsOfExperience: 0
  };
  vacancies$: Observable<Vacancy[]>

  application: Application = {
    timeCreated: '',
    status: "",
    vacancyId: 0,
    userId: 0,
  };

  countries: string[] =["Belgium", "France"];
  
  constructor(private vacancyService: VacancyService) {
    this.vacancies$ = this.vacancyService.getAllVacancies();
   }

  ngOnInit(): void {
    
  }

  getFilteredVacancies(){
    this.vacancies$ = this.vacancyService.getFilteredVacancies(this.filter);
  }

  onSubmit(){
    this.getFilteredVacancies();
  }

  handleClick(vacancy: Vacancy){
    this.application.timeCreated = new Date().toLocaleString();
    this.application.status = "new";
    this.application.vacancyId = vacancy.id;
    this.application.userId = 1; //todo hardcoded for the moment

    console.log("pre applied");
    
    this.vacancyService.applyForVacancy(this.application);
    console.log("applied");
  
  }

}
