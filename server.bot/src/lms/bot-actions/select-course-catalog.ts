import { Message, Session, EntityRecognizer } from 'botbuilder';
import { ActionDefinition } from './action';
import { LmsContext } from '../lms-context';
import { CourseCatalog } from '../models';
import { CommonHelper } from '../helpers/common-helper';

export const SelectCourseCatalog: ActionDefinition = {
    action: (session: Session, lmsContext: LmsContext, args: any) => {
        const urlEntity = EntityRecognizer.findEntity(args.intent.entities, 'builtin.url');
        const message = lmsContext.message;

        if (urlEntity) {
            const url = decodeURI((urlEntity as any).entity);

            lmsContext.modelStorages.courseCatalogs.getByUrl(url)
                .then(courseCatalog => {
                    if (courseCatalog) {
                        lmsContext.userStorage.set(CommonHelper.Keys.CourseCatalog, courseCatalog);
                        
                        session.send(`Course Catalog was selected (url: ${courseCatalog.url}).`);
                    } else {
                        session.send(`Course Catalog is not found.`);
                    }
                });
        } else {
            session.send('You need to use url of Course Catalog.');
        }

        session.endDialog();
    },
    key: 'SelectCourseCatalog',
    title: 'Select Course Catalog',
    titleFormat: (courseCatalog: CourseCatalog) => `Select Course Catalog by ${encodeURI(courseCatalog.url)}`
};