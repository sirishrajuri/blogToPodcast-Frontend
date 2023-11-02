export interface ResponseDataItem {
  Audio: boolean;
  Conversation: boolean;
  Video: boolean;
}

export interface ResponseData {
  [key: string]: ResponseDataItem;
}