import { CbDbModel } from '@service/db/model/cb.bd.model';
import { CodeDbModel } from '@service/db/model/code.bd.model';
import { CredentialDbModel } from '@service/db/model/credential.bd.model';
import { NoteDbModel } from './note.bd.model';

export interface ThingDbModel {
  id: string;
  label: string;
  description?: string;
  type: string;
  cb?: CbDbModel;
  code?: CodeDbModel;
  credential?: CredentialDbModel;
  note?: NoteDbModel;
  author_id: string;
  chest_id: string;
  active: boolean;
}
