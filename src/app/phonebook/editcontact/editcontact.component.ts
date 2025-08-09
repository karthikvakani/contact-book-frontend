import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControlName, Validators, MaxLengthValidator } from '@angular/forms';
import { DataService } from '../data.service';

interface bodyStruct {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  mobile_number: number,
  address?: string,
  birthday?: Date,
  group?: string,
  is_favourite: boolean
}

@Component({
  selector: 'app-editcontact',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './editcontact.component.html',
  styleUrl: './editcontact.component.css'
})
export class EditcontactComponent {

  editContactForm !: FormGroup;
  @Output() editpopUpClose = new EventEmitter<boolean>();
  @Input() selectedContact: any = {}

  constructor(private fb: FormBuilder, private service: DataService) { }

  tags: string[] = ['Family', 'Friends', 'Work', 'School'];

  ngOnInit() {
    this.editContactForm = this.fb.group({
      firstName: [this.selectedContact.first_name, [Validators.required]],
      lastName: [this.selectedContact.last_name, [Validators.required]],
      email: [this.selectedContact.email, [Validators.required, Validators.email]],
      contact: [this.selectedContact.mobile_number, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      address: [this.selectedContact?.address || ""],
      birthday: [this.selectedContact.birthday || null],
      tags: [this.selectedContact.group || ""],
    });

  }

  editContact() {
    if (this.editContactForm.valid && this.editContactForm.touched) {
      const firstName = this.editContactForm.get('firstName')?.value || ""
      const lastName = this.editContactForm.get('lastName')?.value || ""
      const email = this.editContactForm.get('email')?.value || ""
      const contact = this.editContactForm.get('contact')?.value
      const address = this.editContactForm.get('address')?.value || ""
      const birthday = this.editContactForm.get('birthday')?.value || null
      const tags = this.editContactForm.get('tags')?.value || ""

      var body: bodyStruct = {
        id: this.selectedContact.id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile_number: contact,
        is_favourite: this.selectedContact.is_favourite
      }

      console.log(birthday)

      if (address !== this.selectedContact.address) {
        body['address'] = address
      }

      if (birthday !== this.selectedContact.birthday) {
        body.birthday = birthday
      }

      if (tags !== this.selectedContact.group) {
        body.group = tags
      }

      console.log(body)


      this.service.editContact(body).subscribe({
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

  closePopup() {
    this.editpopUpClose.emit(true);
  }

}
