// import LocalDate from './LocalDate';

export default class User {
  private _name: string;
  private _family: string;
  private _itemNum: number;
  private _birthday: string;

  constructor(
    name: string,
    family: string,
    itemNum?: number,
    birthday?: string
  ) {
    this._name = name;
    this._family = family;
    this._itemNum = itemNum;
    this._birthday = birthday;
  }

  get name(): string {
    return this._name;
  }

  get family(): string {
    return this._family;
  }

  get itemNum(): number {
    return this._itemNum;
  }

  get birthday(): string {
    return this._birthday;
  }
}
