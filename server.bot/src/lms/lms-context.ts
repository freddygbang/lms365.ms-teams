import { IMessage, Session } from 'botbuilder';
import { EnvironmentConfig } from 'ef.lms365';
import { AttachmentBuilderFactory } from './attachment-builders';
import { ModelCreator } from './model-creator';
import { ModelFilterFactory } from './model-filters';
import { ModelStorageFactory } from './model-storages';
import { ModelMetadataProviderFactory, ModelMetadataProvider } from './model-metadata-providers';
import { CourseCatalog } from './models';
import { QueryExecuter } from './query-executer';
import { UserStorage } from './user-storage';
import { CommonHelper } from './helpers/common-helper';
import { Formatter } from './formatter';

interface LmsContextProps {
    environmentConfig: EnvironmentConfig;
    message: IMessage;
    session: Session;
    userStorage: UserStorage;
}

export class LmsContext {
    private readonly _attachmentBuilders: AttachmentBuilderFactory;
    private readonly _modelCreator: ModelCreator;
    private readonly _modelMetadataProviders: ModelMetadataProviderFactory;
    private readonly _modelStorages: ModelStorageFactory;
    private readonly _queryExecuter: QueryExecuter;
    private readonly _props: LmsContextProps;

    public constructor(props: LmsContextProps) {
        this._props = props;

        const modelFilters = new ModelFilterFactory();
        const formatter = new Formatter();

        this._attachmentBuilders = new AttachmentBuilderFactory(this);
        this._modelCreator = new ModelCreator();
        this._modelMetadataProviders = new ModelMetadataProviderFactory(modelFilters, formatter);
        this._modelStorages = new ModelStorageFactory(this);
        this._queryExecuter = new QueryExecuter(this);
    }

    public get attachmentBuilders(): AttachmentBuilderFactory {
        return this._attachmentBuilders;
    }

    public get courseCatalog(): CourseCatalog {
        return this.userStorage.get(CommonHelper.Keys.CourseCatalog);
    }

    public get environmentConfig(): EnvironmentConfig {
        return this._props.environmentConfig;
    }

    public get message(): IMessage {
        return this._props.message;
    }

    public get modelCreator(): ModelCreator {
        return this._modelCreator;
    }

    public get modelMetadataProviders(): ModelMetadataProviderFactory {
        return this._modelMetadataProviders;
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