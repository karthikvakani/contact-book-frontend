import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControlName, Validators, MaxLengthValidator } from '@angular/forms';
import { DataService } from '../data.service';


interface bodyStruct{
  first_name: string,
  last_name: string,
  email: string,
  mobile_number: number,
  address?: string,
  birthday?: Date,
  group?: string
}

@Component({
  selector: 'app-createcontact',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './createcontact.component.html',
  styleUrl: './createcontact.component.css'
})

export class CreatecontactComponent {

  tags: string[] = ['Family', 'Friends', 'Work', 'School'];
  selectedTags: string[] = [];
  addContactForm !: FormGroup;
  @Output() popUpClose = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private service: DataService) { }

  ngOnInit() {
    this.addContactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      address: [''],
      birthday: [''],
      tags: [''],
    });
  }

  saveContact() {
    if (this.addContactForm.valid && this.addContactForm.touched) {
      const firstName=this.addContactForm.get('firstName')?.value || ""
      const lastName=this.addContactForm.get('lastName')?.value || ""
      const email=this.addContactForm.get('email')?.value || ""
      const contact=this.addContactForm.get('contact')?.value
      const address=this.addContactForm.get('address')?.value || ""
      const birthday=this.addContactForm.get('birthday')?.value || ""
      const tags=this.addContactForm.get('tags')?.value || ""

      var body: bodyStruct= {
        first_name:firstName,
        last_name:lastName,
        email:email,
        mobile_number:contact,
      }

      if(address!=="") {
        body['address']=address
      }

      if(birthday!=="") {
        body.birthday=birthday
      }

      if(tags!=="") {
        body.group=tags
      }

      console.log(body)


      this.service.createContact(body).subscribe({
        next: res => {
          console.log(res);
          this.closePopup();
        },
        error: err => {
          console.error('Login failed:', err?.error?.detail);
        }
      })
    }
  }

  closePopup () {
    this.popUpClose.emit(true);
  }

}
