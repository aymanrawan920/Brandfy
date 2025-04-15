import { Component } from '@angular/core';
import { BrandRegistrationService } from 'src/app/services/brand-registration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reg-three',
  templateUrl: './reg-three.component.html',
  styleUrls: ['./reg-three.component.css']
})
export class RegThreeComponent {
  isSubmitted = false;
  selectedPlan = '';

  constructor(
    private registrationService: BrandRegistrationService,
    private http: HttpClient
  ) {}

  selectPlan(plan: string) {
    this.selectedPlan = plan;
    this.registrationService.selectedPlan = plan;
  }

  submitRequest(): void {
    const finalData = this.registrationService.getFinalRegistrationData();
    console.log('Final Data:', finalData);

    this.http.post('http://localhost:5090/api/Account/register/Brand', finalData).subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.isSubmitted = true;
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Something went wrong!');
      }
    });
  }

  closePopup(): void {
    this.isSubmitted = false;
  }
}
