import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import User from 'src/app/models/User';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css'],
})
export class DataViewComponent implements OnInit, OnDestroy {
  usersData: User[];
  usersDataSubscription: Subscription;

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.usersDataSubscription = this.userDataService.usersData$.subscribe(
      (currentUsersData) => (this.usersData = currentUsersData)
    );
  }

  ngOnDestroy() {
    this.usersDataSubscription.unsubscribe();
  }

  showAddForm() {
    this.userDataService.showAddForm();
  }

  delete(i: number) {
    this.userDataService.deleteUserEntry(i);
  }

  setEditUser(i: number) {
    this.userDataService.showEditForm(i);
  }
}
