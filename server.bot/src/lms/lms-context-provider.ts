import { IMessage, Session } from 'botbuilder';
import { LmsContext } from './lms-context';
import { EnvironmentConfigProvider } from './environment-config-provider';
import { UserStorage } from './user-storage';

export class LmsContextProvider {
    public static readonly instance: LmsContextProvider = new LmsContextProvider();

    public async get(session: Session, message?: IMessage): Promise<LmsContext> {
        message = message || session.message;

        const tenantId = message.sourceEvent.tenant.id;
        const userStorage = new UserStorage(session);
        const environmentConfigProvider = new EnvironmentConfigProvider(session, userStorage);
        const environmentConfig = await environmentConfigProvider.getById(tenantId);

        // const tenantId = null;
        // const userStorage = new UserStorage(session);
        // const environmentConfig = null;

        return new LmsContext({
            environmentConfig: environmentConfig,
            message: message,
            session: session,
            userStorage: userStorage
        });
    }
}