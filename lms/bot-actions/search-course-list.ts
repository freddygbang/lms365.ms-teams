import { Message, Session, EntityRecognizer } from 'botbuilder';
import { ActionDefinition } from './action';
import { LmsContext } from '../lms-context';
import { Course } from '../models';

export const SearchCourseList: ActionDefinition = {
    action: (session: Session, lmsContext: LmsContext, args: any) => {
        const courseTypeEntity = EntityRecognizer.findEntity(args.intent.entities, 'CourseType');
        let promise: Promise<Course[]>;

        if (courseTypeEntity) {
            const courseType = (courseTypeEntity as any).resolution.values[0];
            let domainCourseType: string;

            session.send(`Displaying ${courseType} courses...`);

            switch (courseType) {
                case 'e-Learning':
                    domainCourseType = 'ELearning';
                    break;
                case 'Webinar':
                    domainCourseType = 'Webinar';
                    break;
                case 'Training Plan':
                    domainCourseType = 'TrainingPlan';
                    break;
                case 'Classroom & Blended':
                    domainCourseType = 'ClassRoom';
                    break;
            }

            promise = lmsContext.modelStorages.courses.getByType(domainCourseType);
        } else {
            session.send(`Displaying all courses...`);

            promise = lmsContext.modelStorages.courses.getAll();
        }

        promise.then(courses => {
                if (courses.length) {
                    for (let i = 0; i < courses.length; i++) {
                        const course = courses[i];
                        const attachment = lmsContext.attachmentBuilders.courses.build(course);
                        const message = new Message(session).addAttachment(attachment);
    
                        session.send(message);
                    }
                } else {
                    session.send('There are no courses to display.');
                }

                session.endDialog();
            })
            .catch(x => {
                console.log(x);
                session.send('Opps!!!');
            });
    },
    key: 'SearchCourseList',
    title: 'Search Courses'
};