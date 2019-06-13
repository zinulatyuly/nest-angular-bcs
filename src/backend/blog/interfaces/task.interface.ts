import { Document } from 'mongoose';

export interface Task extends Document {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly body: string;
  readonly datePosted: Date;
}
