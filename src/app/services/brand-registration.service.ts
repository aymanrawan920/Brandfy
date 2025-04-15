
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandRegistrationService {
  stepOneData: any = {};
  stepTwoData: any = {};
  selectedPlan: string = '';

  constructor() {}

  getFinalRegistrationData() {
    return {
      email: this.stepOneData.email,
      displayName: this.stepOneData.fullName,
      lastName: this.stepOneData.gender,
      phoneNumber: this.stepOneData.phoneNumber,
      password: this.stepOneData.password,
      brandName: this.stepTwoData.brandName,
      category: this.stepTwoData.category,
      country: this.stepTwoData.country,
      city: this.stepTwoData.city,
      plan: this.selectedPlan
    };
  }
}
