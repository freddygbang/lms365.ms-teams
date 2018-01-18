import { AppInfo, AppType, EnvironmentConfig } from 'lms365';
import { Course } from '../models';

const courseUrlQueryParameters = '$select=CEU,CourseID,CourseType,Description,Duration,Id,ImageUrl,LongDescription,Title,Rating&$expand=Admins,Categories,CourseSessions,SharepointWeb,Rating';

export class CommonHelper {
    public static Fields = {
        Course: {
            AdminNames: 'admins.title',
            Categories: 'categories',
            CategoryIds: 'categories.id',
            CategoryNames: 'categories.name',
            CourseId: 'courseId',
            CreationDate: 'creationDate',
            Description: 'description',
            Duration: 'duration',
            Id: 'id',
            Points: 'points',
            LongDescription: 'longDescriptionText',
            Dates: 'Dates',
            Session_Location: 'sessions.location',
            Session_StartDate: 'sessions.startDate',
            Tags: 'tags',
            TagNames: 'tags.name',
            Title: 'title',
            Type: 'type',
            Rating: 'rating.rating'
        },
        CourseSession: {
            EndDate: 'endDate',
            EndDateTimezoned: 'endDateTimezoned',
            Location: 'location',
            StartDate: 'startDate',
            StartDateTimezoned: 'startDateTimezoned'
        }
    };

    public static Keys = {
        CourseCatalog: 'ef.lms365.course-catalog',
        UserToken: 'ef.lms365.user-token'
    }

    public static Urls = {
        Course: {
            getAll: (courseCatalogId: string) => {
                const courseCatalogIdFilter = courseCatalogId ? `CourseCatalogId eq ${encodeURIComponent(courseCatalogId)} and ` : '';

                return `odata/v2/Courses?$filter=${courseCatalogIdFilter}IsPublished eq true and ShowInCatalog eq true&${courseUrlQueryParameters}`
            },
            getByType: (courseCatalogId: string, courseType: string) => {
                const courseCatalogIdFilter = courseCatalogId ? `CourseCatalogId eq ${encodeURIComponent(courseCatalogId)} and ` : '';

                return `odata/v2/Courses?$filter=${courseCatalogIdFilter}CourseType eq '${courseType}' and IsPublished eq true and ShowInCatalog eq true&${courseUrlQueryParameters}`;
            },
            getByKeyword: (courseCatalogId: string, keyword: string) => {
                const courseCatalogIdFilter = courseCatalogId ? `CourseCatalogId eq ${encodeURIComponent(courseCatalogId)} and ` : '';

                return `odata/v2/Courses?$filter=${courseCatalogIdFilter}contains(Title,'${keyword}') and IsPublished eq true and ShowInCatalog eq true&${courseUrlQueryParameters}`;
            },
            getImage: (tenantId: string, environmentConfig: EnvironmentConfig, course: Course) => {
                const appInfo = environmentConfig.getAppInfo(AppType.CourseCatalog);

                return course.imageUrl
                    ? `${environmentConfig.apiUrl}courseCatalogImages/getCourseImage?tenantId=${encodeURIComponent(tenantId)}&courseId=${encodeURIComponent(course.id)}`
                    : `https://${appInfo.host}/images/head_edu.png`;
            }
        },
        CourseCatalog: {
            getAll: () => `odata/v2/CourseCatalogs?$select=Id,Title&$expand=SharepointWeb`,
            getByUrl: (url: string) => `odata/v2/CourseCatalogs?$select=Id,Title&$expand=SharepointWeb&$filter=SharepointWeb/Url eq '${CommonHelper.encodeURIComponent(url)}'`
        }
    }

    public static encodeURIComponent(value: string) {
        return encodeURIComponent(value).replace(/'/g, '\'\'');
    }
}