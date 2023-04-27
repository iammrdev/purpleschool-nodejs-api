type Props = {
  title: string;
  description: string;
  url: string;
  startAt: Date;
  endAt: Date;
  cityId: number;
  topicId: number;
  tags: number[];
};

export class Offer {
  private _title: string;
  private _description: string;
  private _url: string;
  private _startAt: Date;
  private _endAt: Date;
  private _cityId: number;
  private _topicId: number;
  private _tags: number[];

  constructor(props: Props) {
    this._title = props.title;
    this._description = props.description;
    this._url = props.url;
    this._startAt = props.startAt;
    this._endAt = props.endAt;
    this._cityId = props.cityId;
    this._topicId = props.topicId;
    this._tags = props.tags;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get url(): string {
    return this._url;
  }

  get startAt(): Date {
    return this._startAt;
  }

  get endAt(): Date {
    return this._endAt;
  }

  get cityId(): number {
    return this._cityId;
  }

  get topicId(): number {
    return this._topicId;
  }

  get tags(): number[] {
    return this._tags;
  }
}
