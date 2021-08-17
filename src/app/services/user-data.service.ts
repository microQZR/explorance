import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import User from '../models/User';

export enum ActionFormState {
  None = 'none',
  Add = 'add',
  Edit = 'edit',
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private _users = [
    new User('Ali', 'Delshad', 0, '2021-01-01'),
    new User('Hamid', 'Sadeghi', 0, '2021-01-01'),
    new User('Amir', 'Olfat', 0, '2021-01-01'),
    new User('Keyvan', 'Nasr', 0, '2021-01-01'),
  ];
  private _usersDataSource = new BehaviorSubject(this._users);
  usersData$ = this._usersDataSource.asObservable();

  private _showActionForm = new BehaviorSubject(ActionFormState.None);
  showActionForm$ = this._showActionForm.asObservable();

  private _editableUserSource = new Subject<User>();
  editableUser$ = this._editableUserSource.asObservable();

  private _editingIndexSource = new Subject<number>();
  editingIndex$ = this._editingIndexSource.asObservable();

  constructor() {}

  showAddForm() {
    this._showActionForm.next(ActionFormState.Add);
  }

  showEditForm(index) {
    this._editableUserSource.next(this._users[index]);
    this._editingIndexSource.next(index);
    this._showActionForm.next(ActionFormState.Edit);
  }

  hideActionForm() {
    this._showActionForm.next(ActionFormState.None);
  }

  addUserEntry(user: User) {
    this._users.push(user);
    this._usersDataSource.next(this._users);
  }

  updateUserEntry(index: number, user: User) {
    this._users[index] = user;
    this._usersDataSource.next(this._users);
  }

  deleteUserEntry(index) {
    this._users.splice(index, 1);
    this._usersDataSource.next(this._users);
  }
}
