import { AttachmentLayout, EntityRecognizer, Message, Session, IIsAttachment } from 'botbuilder';
import { ActionDefinition } from './action';
import { LmsContext } from '../lms-context';
import { Course, CourseCategory, CourseType } from '../models';
import { ResourceSet } from '../resource-set';
import { ArrayHelper } from '../helpers/array-helper';

const resourceSet = ResourceSet.instance;

export class SearchCourseCategoryListActionHandler {
    public static readonly instance: SearchCourseCategoryListActionHandler = new SearchCourseCategoryListActionHandler();

    public async handle(session: Session, lmsContext: LmsContext, args: any) {
        const courseCategories = await lmsContext.modelStorages.courseCategories.getAll();
        const attachment = lmsContext.attachmentBuilders.courseCategories.buildList(courseCategories);
        const message = new Message(session).addAttachment(attachment);

        session.send(resourceSet.CourseCategoryList_Loading);
        session.send(message);

        session.endDialog();
    }
}

export const ShowCourseCategoryList: ActionDefinition = {
    action: SearchCourseCategoryListActionHandler.instance.handle.bind(SearchCourseCategoryListActionHandler.instance),
    key: 'ShowCourseCategoryList',
    title: 'Show Course Categories'
};