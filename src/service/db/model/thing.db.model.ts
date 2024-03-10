import { CbDbModel } from '@service/db/model/cb.bd.model';
import { TotpDbModel } from '@service/db/model/totp.db.mode';
import { CodeDbModel } from '@service/db/model/code.bd.model';
import { NoteDbModel } from '@service/db/model/note.bd.model';
import { CredentialDbModel } from '@service/db/model/credential.bd.model';

export interface ThingDbModel {
  id: string;
  label: string;
  description?: string;
  type: string;
  cb?: CbDbModel;
  code?: CodeDbModel;
  credential?: CredentialDbModel;
  note?: NoteDbModel;
  totp?: TotpDbModel;
  author_id: string;
  chest_id: string;
  active: boolean;
}
