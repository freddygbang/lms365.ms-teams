import { Message, Session, EntityRecognizer } from 'botbuilder';
import { ActionDefinition } from './action';
import { LmsContext } from '../lms-context';
import { Course } from '../models';
import { ResourceSet } from '../resource-set';

const resourceSet = ResourceSet.instance;

export const None: ActionDefinition = {
    action: (session: Session, lmsContext: LmsContext, args: any, next: () => void) => {
        session.send(resourceSet.Error);

        next();
    },
    key: 'None',
    title: 'None'
};