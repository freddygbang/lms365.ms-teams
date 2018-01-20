import { Message, Session, EntityRecognizer } from 'botbuilder';
import { ActionDefinition } from './action';
import { LmsContext } from '../lms-context';
import { Course } from '../models';

export const None: ActionDefinition = {
    action: (session: Session, lmsContext: LmsContext, args: any, next: () => void) => {
        session.send(`I am sorry, I didn’t really understand that, can you try rephrase the question? Alternatively type ‘Help’ and I will try and help you further.`);

        next();
    },
    key: 'None',
    title: 'None'
};