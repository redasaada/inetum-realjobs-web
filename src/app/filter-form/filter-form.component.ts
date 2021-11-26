import { Component, OnInit } from '@angular/core';
import { Filter } from '../filter';
import { FilterService } from '../filter.service';
import { Vacancy } from '../vacancy';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {

  filter: Filter = new Filter();
  vacancies: Vacancy[] = [];
  
  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
  }

  getFilteredVacancies(){
    this.filterService.getFilteredVacancies(this.filter).subscribe(val => this.vacancies = val);
    
  }

  onSubmit(){
    this.getFilteredVacancies();
  }

}
