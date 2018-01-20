import { Session } from 'botbuilder';
import { Storage } from 'ef.lms365';

export class UserStorage implements Storage {
    private readonly _session: Session;

    public constructor(session: Session) {
        this._session = session;
    }

    public get(key: string): any {
        return this._session.userData[key];
    }

    public set(key: string, value: any): any {
        this._session.userData[key] = value;
        this._session.save();
    }
}