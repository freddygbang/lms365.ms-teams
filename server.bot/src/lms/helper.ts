import { AppInfo, AppType, EnvironmentConfig } from 'lms365';
import { Course } from './models';

export class Helper {
    public static Keys = {
        CourseCatalog: 'ef.lms365.course-catalog',
        UserToken: 'ef.lms365.user-token'
    }

    public static Urls = {
        Course: {
            getAll: (courseCatalogId: string) => {
                const courseCatalogIdFilter = courseCatalogId ? `CourseCatalogId eq ${encodeURIComponent(courseCatalogId)} and ` : '';

                return `odata/v2/Courses?$filter=${courseCatalogIdFilter}IsPublished eq true and ShowInCatalog eq true&$select=CourseType,Description,Id,ImageUrl,LongDescription,Title&$expand=SharepointWeb`
            },
            getByType: (courseCatalogId: string, courseType: string) => {
                const courseCatalogIdFilter = courseCatalogId ? `CourseCatalogId eq ${encodeURIComponent(courseCatalogId)} and ` : '';

                return `odata/v2/Courses?$filter=${courseCatalogIdFilter}CourseType eq '${courseType}' and IsPublished eq true and ShowInCatalog eq true&$select=CourseType,Description,Id,ImageUrl,LongDescription,Title&$expand=SharepointWeb`;
            },
            getByKeyword: (courseCatalogId: string, keyword: string) => {
                const courseCatalogIdFilter = courseCatalogId ? `CourseCatalogId eq ${encodeURIComponent(courseCatalogId)} and ` : '';

                return `odata/v2/Courses?$filter=${courseCatalogIdFilter}contains(Title,'${keyword}') and IsPublished eq true and ShowInCatalog eq true&$select=CourseType,Description,Id,ImageUrl,LongDescription,Title&$expand=SharepointWeb`;
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
            getByUrl: (url: string) => `odata/v2/CourseCatalogs?$select=Id,Title&$expand=SharepointWeb&$filter=SharepointWeb/Url eq '${Helper.encodeURIComponent(url)}'`
        }
    }

    public static encodeURIComponent(value: string) {
        return encodeURIComponent(value).replace(/'/g, '\'\'');
    }
}