import { Session } from 'botbuilder';
import { LmsContext } from '../lms-context';
import { LmsContextProvider } from '../lms-context-provider';

export interface ActionDefinition {
    action: (session: Session, lmsContext: LmsContext, args?: any, next?: any) => void; 
    key: string;
    title: string;
    titleFormat?: (...args: any[]) => string;
}

export const wrapAction = (actionDefinition: ActionDefinition) =>
    (session: Session, args: any, next: any) => {
        LmsContextProvider.instance.get(session)
            .then(lmsContext => {
                actionDefinition.action(session, lmsContext, args, next);
            });
    };