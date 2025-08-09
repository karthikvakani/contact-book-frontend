import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CreatecontactComponent } from '../createcontact/createcontact.component';
import { EditcontactComponent } from '../editcontact/editcontact.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CreatecontactComponent, EditcontactComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user_details: any
  profilePopup: boolean = false
  addContactPopup: boolean = false
  AlluserContacts: any[] = []
  favContactsCount: number = 0
  groupContactsCount: number = 0
  allcontactsCount: number = 0;
  selectedTab: string = "All Contacts"
  addFavPopup: boolean = false
  viewContactPopup: boolean = false
  selectedContact: any = null
  deleteContactPopup: boolean = false;
  logoutPopup: boolean = false;
  editContactPopup: boolean = false;
  searchString: string = "";
  pageLimit: number = 9;
  currentPage: number = 1;
  totalPages: number = 1;


  mapHeading: any = {
    'All Contacts': 'All Contacts',
    'Fav Contacts': 'Favourites',
    'Group Contacts': 'Groups'
  }

  constructor(private service: DataService, private router: Router) { }
  ngOnInit() {
    this.getUserDetails()
    this.getUserContacts()
    console.log(this.searchString)
  }

  onSearchChange(value: string) {
    this.searchString = value;
    console.log(this.searchString)

    if (this.selectedTab === "All Contacts") {
      this.getUserContacts(this.searchString, "")
    } else if (this.selectedTab === "Fav Contacts") {
      this.getUserContacts(this.searchString, "fav")
    } else {
      this.getUserContacts(this.searchString, "group")
    }
  }

  logout() {
    this.router.navigate(["/auth/login"])
  }

  getUserDetails() {
    this.service.getUserDetails().subscribe({
      next: res => {
        console.log(res);
        this.user_details = res
      },
      error: err => {
        console.error('Login failed:', err?.error?.detail);
      }
    })
  }

  getUserContacts(searchString: string = "", type: string = "") {
    this.groupContactsCount = 0
    this.favContactsCount = 0
    this.service.getUserContacts(searchString, this.currentPage, type).subscribe({
      next: res => {
        console.log(res);
        this.AlluserContacts = res?.contacts || []
        this.groupContactsCount = res?.all_counts?.grouped_contacts
        this.favContactsCount = res?.all_counts?.favourite_contacts
        this.allcontactsCount = res?.all_counts?.total_contacts
        if (this.selectedTab === "All Contacts") {
          this.totalPages = Math.ceil(this.allcontactsCount / 9);
        } else if (this.selectedTab === "Fav Contacts") {
          this.totalPages = Math.ceil(this.favContactsCount / 9);
        } else {
          this.totalPages = Math.ceil(this.groupContactsCount / 9);
        }
        console.log(this.AlluserContacts)
        this.AlluserContacts.sort((a, b) => a.first_name.localeCompare(b.first_name));
        // this.getRespectiveCount()
      },
      error: err => {
        console.error('Login failed:', err?.error?.detail);
      }
    })
  }

  onPopupClose() {
    this.addContactPopup = false
    if (this.selectedTab === "All Contacts") {
      this.getUserContacts(this.searchString, "")
    } else if (this.selectedTab === "Fav Contacts") {
      this.getUserContacts(this.searchString, "fav")
    } else {
      this.getUserContacts(this.searchString, "group")
    }
  }

  tabSelection(currentTab: string) {
    this.selectedTab = currentTab;
    if (currentTab === "All Contacts") {
      this.getUserContacts(this.searchString)
    } else if (currentTab === "Fav Contacts") {
      this.getUserContacts(this.searchString, "fav")
    } else {
      this.getUserContacts(this.searchString, "group")
    }
  }

  addFavourite(record: any) {
    record.is_favourite = true
    const body = {
      id: record.id,
      is_favourite: record.is_favourite
    }

    this.service.editContact(body).subscribe({
      next: res => {
        console.log(res);
        this.addFavPopup = false
        if (this.selectedTab === "All Contacts") {
          this.getUserContacts(this.searchString, "")
        } else if (this.selectedTab === "Fav Contacts") {
          this.getUserContacts(this.searchString, "fav")
        } else {
          this.getUserContacts(this.searchString, "group")
        }
      },
      error: err => {
        console.error('Login failed:', err?.error?.detail);
      }
    })
  }

  viewContactDetails(record: any) {
    this.viewContactPopup = true
    this.selectedContact = record
  }

  deleteContact() {
    this.service.deleteContact(this.selectedContact.id).subscribe({
      next: res => {
        console.log(res);
        if (this.selectedTab === "All Contacts") {
          this.getUserContacts(this.searchString, "")
        } else if (this.selectedTab === "Fav Contacts") {
          this.getUserContacts(this.searchString, "fav")
        } else {
          this.getUserContacts(this.searchString, "group")
        }
        this.deleteContactPopup = false
        this.viewContactPopup = false
        this.selectedContact = {}
      },
      error: err => {
        console.error('Login failed:', err?.error?.detail);
      }
    })
  }

  changefavStatus() {
    this.selectedContact.is_favourite = !this.selectedContact.is_favourite

    const body = {
      id: this.selectedContact.id,
      is_favourite: this.selectedContact.is_favourite
    }

    this.service.editContact(body).subscribe({
      next: res => {
        console.log(res);
        if (this.selectedTab === "All Contacts") {
          this.getUserContacts(this.searchString, "")
        } else if (this.selectedTab === "Fav Contacts") {
          this.getUserContacts(this.searchString, "fav")
        } else {
          this.getUserContacts(this.searchString, "group")
        }
      },
      error: err => {
        console.error('Login failed:', err?.error?.detail);
      }
    })
  }

  closeEditPopup() {
    this.editContactPopup = false
    this.viewContactPopup = false
    if (this.selectedTab === "All Contacts") {
      this.getUserContacts(this.searchString, "")
    } else if (this.selectedTab === "Fav Contacts") {
      this.getUserContacts(this.searchString, "fav")
    } else {
      this.getUserContacts(this.searchString, "group")
    }
  }


  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.selectedTab === "All Contacts") {
        this.getUserContacts(this.searchString, "")
      } else if (this.selectedTab === "Fav Contacts") {
        this.getUserContacts(this.searchString, "fav")
      } else {
        this.getUserContacts(this.searchString, "group")
      }
      // this.fetchContacts(); // Call your API
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      // this.fetchContacts(); // Call your API
      if (this.selectedTab === "All Contacts") {
        this.getUserContacts(this.searchString, "")
      } else if (this.selectedTab === "Fav Contacts") {
        this.getUserContacts(this.searchString, "fav")
      } else {
        this.getUserContacts(this.searchString, "group")
      }
    }
  }

}
