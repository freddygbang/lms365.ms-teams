import { IMessage, Session } from 'botbuilder';
import { EnvironmentConfig } from 'lms365';
import { AttachmentBuilderFactory } from './attachment-builders';
import { Helper } from './helper';
import { ModelStorageFactory } from './model-storages';
import { CourseCatalog } from './models';
import { QueryExecuter } from './query-executer';
import { UserStorage } from './user-storage';

interface LmsContextProps {
    environmentConfig: EnvironmentConfig;
    message: IMessage;
    session: Session;
    userStorage: UserStorage;
}

export class LmsContext {
    private readonly _attachmentBuilders: AttachmentBuilderFactory;
    private readonly _modelStorages: ModelStorageFactory;
    private readonly _queryExecuter: QueryExecuter;
    private readonly _props: LmsContextProps;

    public constructor(props: LmsContextProps) {
        this._props = props;

        this._attachmentBuilders = new AttachmentBuilderFactory(this);
        this._modelStorages = new ModelStorageFactory(this);
        this._queryExecuter = new QueryExecuter(this);
    }

    public get attachmentBuilders(): AttachmentBuilderFactory {
        return this._attachmentBuilders;
    }

    public get courseCatalog(): CourseCatalog {
        return this.userStorage.get(Helper.Keys.CourseCatalog);
    }

    public get environmentConfig(): EnvironmentConfig {
        return this._props.environmentConfig;
    }

    public get message(): IMessage {
        return this._props.message;
    }

    public get modelStorages(): ModelStorageFactory {
        return this._modelStorages;
    }

    public get session(): Session {
        return this._props.session;
    }

    public get tenantId(): string {
        return this.message.sourceEvent.tenant.id;
    }

    public get queryExecuter(): QueryExecuter {
        return this._queryExecuter;
    }

    public get userStorage(): UserStorage {
        return this._props.userStorage;
    }
}