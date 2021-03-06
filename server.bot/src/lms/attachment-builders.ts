import { CardAction, CardImage, IAttachment, IIsAttachment, Message, Session, ThumbnailCard, HeroCard } from 'botbuilder';
import { AppInfo, AppType } from 'ef.lms365';
import { SelectCourseCatalog } from './bot-actions/select-course-catalog';
import { ShowCourseCatalogList } from './bot-actions/show-course-catalog-list';
import { ShowCourseCategoryList } from './bot-actions/show-course-category-list';
import { LmsContext } from './lms-context';
import { Course, CourseCatalog, CourseType, CourseCategory } from './models';
import { DeepLinkBuilder } from './deep-link-builder';
import { CommonHelper } from './helpers/common-helper';
import { ResourceSet } from './resource-set';

const courseFields = CommonHelper.Fields.Course;
const resourceSet = ResourceSet.instance;

const allCourseFields = [
    courseFields.CourseId,
    courseFields.Duration,
    courseFields.CategoryNames,
    courseFields.Session_Location,
    courseFields.Points,
    courseFields.AdminNames
];
const allWebinarFields = [
    courseFields.CourseId,
    courseFields.Duration,
    courseFields.CategoryNames,
    courseFields.Points,
    courseFields.AdminNames
];

export class CourseAttachmentBuilder {
    private readonly _lmsContext: LmsContext;

    public constructor(lmsContext: LmsContext) {
        this._lmsContext = lmsContext;
    }

    public build(course: Course): IIsAttachment {
        const lmsContext = this._lmsContext;
        const session = lmsContext.session;
        const courseImageUrl = CommonHelper.Urls.Course.getImage(lmsContext.tenantId, lmsContext.environmentConfig, course);

        return new ThumbnailCard(session)
            .title(course.title)
            .text(course.description)
            .images([CardImage.create(session, courseImageUrl)])
            .buttons([
                CardAction.openUrl(
                    session, DeepLinkBuilder.buildCourseLink(course.url),
                    (course.type != CourseType.TrainingPlan) ? resourceSet.ViewTrainingPlan : resourceSet.ViewTrainingPlan)
            ]);
    }

    public buildListItem(course: Course, index: number, allItemCount: number): IIsAttachment {
        const lmsContext = this._lmsContext;
        const session = lmsContext.session;
        const courseImageUrl = CommonHelper.Urls.Course.getImage(lmsContext.tenantId, lmsContext.environmentConfig, course);
        const courseUrl = DeepLinkBuilder.buildCourseLink(course.url);
        const viewLinkTitle = (course.type != CourseType.TrainingPlan) ? resourceSet.ViewCourse : resourceSet.ViewTrainingPlan;
        const fields = (course.type != CourseType.Webinar) ? allCourseFields : allWebinarFields;
        const fieldsHtml = fields
            .map(x => {
                const metadata = lmsContext.modelMetadataProviders.courses.get(x);

                return {
                    field: x,
                    title: metadata.titleGetter(course),
                    value: metadata.valueGetter(course)
                };
            })
            .filter(x => x.value)
            .map(x => `<b>${x.title}</b>: ${x.value}<br>`)
            .join('');

        console.log(courseUrl);

        return new HeroCard(session)
            .title(course.title)
            .subtitle(course.description)
            .text(`
<span style="font-size:1.2rem; color:#858c98; font-weight:100; width:100%; text-align:center; display:inline-block; padding-top:5px">${index + 1}/${allItemCount < 10 ? allItemCount : 10}</span><br>
${fieldsHtml}
            `)
            .images([CardImage.create(session, courseImageUrl)])
            .buttons([CardAction.openUrl(session, courseUrl, viewLinkTitle)]);
    }
}

export class CourseCatalogAttachmentBuilder {
    private readonly _lmsContext: LmsContext;

    public constructor(lmsContext: LmsContext) {
        this._lmsContext = lmsContext;
    }

    public buildListItem(courseCatalog: CourseCatalog, index: number, allItemCount: number): IIsAttachment {
        const lmsContext = this._lmsContext;
        const session = lmsContext.session;

        return new HeroCard(session)
            .title(courseCatalog.title)
            .subtitle(courseCatalog.description)
            .text(`
<b>${resourceSet.Url}</b>: ${courseCatalog.url}<br>
<span style="font-size:1.2rem; color:#858c98; font-weight:100; width:100%; text-align:center; display:inline-block; padding-top:5px">${index + 1}/${allItemCount}</span><br>
            `)
            .buttons([
                CardAction.imBack(session, SelectCourseCatalog.titleFormat(courseCatalog), SelectCourseCatalog.title),
                CardAction.openUrl(session, DeepLinkBuilder.buildCourseCatalogLink(courseCatalog.url), 'View')
            ]);
    }
}

export class CourseCategoryAttachmentBuilder {
    private readonly _lmsContext: LmsContext;

    public constructor(lmsContext: LmsContext) {
        this._lmsContext = lmsContext;
    }

    public buildListWithCourseTypeFilter(queryableCourseType: CourseType, categories: CourseCategory[]): IIsAttachment {
        const lmsContext = this._lmsContext;
        const session = lmsContext.session;
        const messageBuilder = (category: CourseCategory) => (queryableCourseType != null)
            ? `Show ${CommonHelper.escape(resourceSet.getCourseTypeName(queryableCourseType))} Courses with ${category.name} category`
            : `Show Courses with ${category.name} category`;
        const buttons = categories.map(x => {
            const message = messageBuilder(x);

            return CardAction.imBack(session, message, x.name);
        });

        return new ThumbnailCard(session)
            .title(resourceSet.MoreThanPageCourseCount)
            .buttons(buttons);
    }

    public buildList(categories: CourseCategory[]): IIsAttachment {
        const lmsContext = this._lmsContext;
        const session = lmsContext.session;
        const buttons = categories.map(x => {
            return CardAction.imBack(session, `Show Courses with ${x.name} category`, x.name);
        });

        return new ThumbnailCard(session)
            .title(resourceSet.CourseCategoryList_Title)
            .buttons(buttons);
    }
}

export class GreetingAttachmentBuilder {
    private readonly _lmsContext: LmsContext;

    public constructor(lmsContext: LmsContext) {
        this._lmsContext = lmsContext;
    }

    public build(): IAttachment | IIsAttachment {
        const lmsContext = this._lmsContext;
        const session = lmsContext.session;
        const user = session.message.user;
        const messageBuilder = (courseType: CourseType) =>
            (courseType != CourseType.TrainingPlan)
                ? `Show ${CommonHelper.escape(resourceSet.getCourseTypeName(courseType))} Courses`
                : `Show ${resourceSet.TrainingPlans}`;

        return new ThumbnailCard(session)
            .title(resourceSet.Greeting_Title(user.name))
            .text(resourceSet.Greeting)
            .buttons([
                CardAction.imBack(session, ShowCourseCatalogList.title, ShowCourseCatalogList.title),
                CardAction.imBack(session, messageBuilder(CourseType.ELearning), messageBuilder(CourseType.ELearning)),
                CardAction.imBack(session, messageBuilder(CourseType.Webinar), messageBuilder(CourseType.Webinar)),
                CardAction.imBack(session, messageBuilder(CourseType.TrainingPlan), messageBuilder(CourseType.TrainingPlan)),
                CardAction.imBack(session, CommonHelper.escape(messageBuilder(CourseType.ClassRoom)), messageBuilder(CourseType.ClassRoom)),
                CardAction.imBack(session, ShowCourseCategoryList.title, ShowCourseCategoryList.title)
            ]);
    }
}

export class AttachmentBuilderFactory {
    private readonly _courses: CourseAttachmentBuilder;
    private readonly _courseCatalogs: CourseCatalogAttachmentBuilder;
    private readonly _courseCategories: CourseCategoryAttachmentBuilder;
    private readonly _greeting: GreetingAttachmentBuilder;

    public constructor(lmsContext: LmsContext) {
        this._courses = new CourseAttachmentBuilder(lmsContext);
        this._courseCatalogs = new CourseCatalogAttachmentBuilder(lmsContext);
        this._courseCategories = new CourseCategoryAttachmentBuilder(lmsContext);
        this._greeting = new GreetingAttachmentBuilder(lmsContext);
    }

    public get courses(): CourseAttachmentBuilder {
        return this._courses;
    }

    public get courseCatalogs(): CourseCatalogAttachmentBuilder {
        return this._courseCatalogs;
    }

    public get courseCategories(): CourseCategoryAttachmentBuilder {
        return this._courseCategories;
    }

    public get greeting(): GreetingAttachmentBuilder {
        return this._greeting;
    }
}