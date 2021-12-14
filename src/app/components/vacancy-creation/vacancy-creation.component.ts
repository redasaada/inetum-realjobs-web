import { Component, OnInit } from '@angular/core';
import { Vacancy } from 'src/app/vacancy';
import { Country } from 'src/app/models/country.model';
import { FormGroup, FormControl, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { VacancyService } from 'src/app/services/vacancy.service';
import { Validators } from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';
import { textValidation, numberValidation } from 'src/app/validators/vacancy.validator';
import { ContractType } from 'src/app/models/contractTypes.model';


@Component({
  selector: 'app-vacancy-creation',
  templateUrl: './vacancy-creation.component.html',
  styleUrls: ['./vacancy-creation.component.css']
})



export class VacancyCreationComponent {

  vacancy: Vacancy;

  selectedSlider: number;

  vacancyForm = new FormGroup({
    functionTitle: new FormControl('', [textValidation]),
    contractType: new FormControl('', [textValidation]),
    offer: new FormControl('', [textValidation]),
    postalCode: new FormControl('', [numberValidation]),
    requiredYearsOfExperience: new FormControl(''),
    city: new FormControl('',[textValidation]),
    country: new FormControl('', [textValidation]),
    nr: new FormControl('',[numberValidation]),
    streetName: new FormControl('',[textValidation]),
    requiredExperienceSkillsEducation: new FormControl(''),
    functionDescription: new FormControl('',[textValidation]),
    companyName: new FormControl('',[textValidation]),
    industry: new FormControl(''),
    box: new FormControl(''),

  });
  
  countries: Country[] =[
    {name: 'Belgium'},
    {name: 'France'},
    {name: 'Germany'},
    {name: 'Italy'},
    {name: 'Spain'}
  ];

  contractTypes: ContractType[] =[
    {name: 'Fixed-term'},
    {name: 'Permanent'},
  ];

  constructor(private vacancyService: VacancyService) {
   }

  onSubmit(){
    if(!this.vacancyForm.invalid){
      console.log('valid');
      this.vacancy = {...this.vacancyForm.value};

      console.log(this.vacancy);

      this.vacancyService.submitVacancy(this.vacancy).subscribe(data => this.vacancy);
    }
    else{
      console.log('invalid');
    }
    

    
  };

  

}
