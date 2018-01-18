import { Message, Session, EntityRecognizer } from 'botbuilder';
import { ActionDefinition } from './action';
import { LmsContext } from '../lms-context';
import { Course } from '../models';

export const None: ActionDefinition = {
    action: (session: Session, lmsContext: LmsContext, args: any, next: () => void) => {
        session.send(`Sorry! I don't understand you.`);

        next();
    },
    key: 'None',
    title: 'None'
};