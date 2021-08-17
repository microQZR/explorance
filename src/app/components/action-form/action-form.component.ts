import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import LocalDate from 'src/app/models/LocalDate';
import User from 'src/app/models/User';
import {
  ActionFormState,
  UserDataService,
} from 'src/app/services/user-data.service';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.css'],
})
export class ActionFormComponent implements OnInit, OnDestroy {
  name: string;
  family: string;
  birthday: string = '2021-01-01';
  itemNum: number | null;
  editingIndex: number | null;
  genericInvalidForm = false;

  showActionForm: ActionFormState;
  showActionFormSubscription: Subscription;
  editableUserSubscription: Subscription;
  editingIndexSubscription: Subscription;

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.showActionFormSubscription =
      this.userDataService.showActionForm$.subscribe(
        (state) => (this.showActionForm = state)
      );
    this.editableUserSubscription =
      this.userDataService.editableUser$.subscribe((userInfo) => {
        this.name = userInfo.name;
        this.family = userInfo.family;
        this.birthday = userInfo.birthday;
        this.itemNum = userInfo.itemNum;
      });
    this.editingIndexSubscription =
      this.userDataService.editingIndex$.subscribe(
        (index) => (this.editingIndex = index)
      );
  }

  ngOnDestroy() {
    this.showActionFormSubscription.unsubscribe();
    this.editableUserSubscription.unsubscribe();
    this.editingIndexSubscription.unsubscribe();
  }

  hideActionForm() {
    this.genericInvalidForm = false;
    this.name = '';
    this.family = '';
    this.birthday = '';
    this.itemNum = null;
    this.editingIndex = null;
    this.userDataService.hideActionForm();
  }

  addNewEntry() {
    const newEntry = new User(
      this.name,
      this.family,
      this.itemNum,
      this.birthday
    );
    this.userDataService.addUserEntry(newEntry);
    this.hideActionForm();
  }

  updateEntry() {
    const newEntry = new User(
      this.name,
      this.family,
      this.itemNum,
      this.birthday
    );
    this.userDataService.updateUserEntry(this.editingIndex, newEntry);
    this.hideActionForm();
  }

  stopPropagation($event: MouseEvent) {
    $event.stopPropagation();
    this.genericInvalidForm = false;
  }
}
