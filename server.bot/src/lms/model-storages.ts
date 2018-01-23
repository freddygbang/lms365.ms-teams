import { LmsContext } from './lms-context';
import { Course, CourseCatalog, CourseCategory, CourseType } from './models';
import { CommonHelper } from './helpers/common-helper';

export abstract class StorageBase<T> {
    private readonly _lmsContext: LmsContext;

    public constructor(lmsContext: LmsContext) {
        this._lmsContext = lmsContext;
    }

    protected abstract createModel(source: any): T;

    protected createModels(source: any): T[] {
        return source.value.map(x => this.createModel(x));
    }

    protected async getModels(url: string): Promise<T[]> {
        const data = await this._lmsContext.queryExecuter.execute({ url: url });

        return this.createModels(data);
    }

    protected get courseCatalogId(): string {
        return this.lmsContext.courseCatalog ? this.lmsContext.courseCatalog.id : null;
    }

    protected get lmsContext(): LmsContext {
        return this._lmsContext;
    }
}

export class CourseStorage extends StorageBase<Course> {
    protected createModel(source: any): Course {
        return this.lmsContext.modelCreator.createCourse(source);
    }

    public async getAll(): Promise<Course[]> {
        return this.getModels(CommonHelper.Urls.Course.getAll(this.courseCatalogId));
    }

    public async getByCategoryName(categoryName: string): Promise<Course[]> {
        return this.getModels(CommonHelper.Urls.Course.getByCategoryName(this.courseCatalogId, categoryName));
    }

    public async getByKeyword(keyword: string): Promise<Course[]> {
        return this.getModels(CommonHelper.Urls.Course.getByKeyword(this.courseCatalogId, keyword));
    }

    public async getByType(courseType: CourseType): Promise<Course[]> {
        return this.getModels(CommonHelper.Urls.Course.getByType(this.courseCatalogId, courseType));
    }

    public async getByTypeAndCategoryName(courseType: CourseType, categoryName: string): Promise<Course[]> {
        return this.getModels(CommonHelper.Urls.Course.getByTypeAndCategoryName(this.courseCatalogId, courseType, categoryName));
    }
}

export class CourseCatalogStorage extends StorageBase<CourseCatalog> {
    protected createModel(source: any): CourseCatalog {
        return this.lmsContext.modelCreator.createCourseCatalog(source);
    }

    public async getAll(): Promise<CourseCatalog[]> {
        return this.getModels(CommonHelper.Urls.CourseCatalog.getAll());
    }

    public async getByUrl(url: string): Promise<CourseCatalog> {
        const result = await this.getModels(CommonHelper.Urls.CourseCatalog.getByUrl(url));

        return result.length == 1 ? result[0] : null;
    }

    // protected createModel(index: number): CourseCatalog {
    //     return {
    //         id: `id_${index}`,
    //         title: `Course Catalog ${index}`,
    //         url: `http://cc${index}.com`
    //     } as any;
    // }

    // protected createModels(count?: number): CourseCatalog[] {
    //     var result = [];

    //     count = count || 26;

    //     for (let i = 0; i < count; i++) {
    //         result.push(i + 1);
    //     }

    //     return result;
    // }

    // public async getByUrl(url: string): Promise<CourseCatalog> {
    //     return new Promise<any>((resolve: (value?: any) => void, reject: (reason?: any) => void) => {
    //         resolve(this.createModels(26).filter(x => x.url == url));
    //     });
    // }

    // public async getAll(): Promise<CourseCatalog[]> {
    //     return new Promise<any>((resolve: (value?: any) => void, reject: (reason?: any) => void) => {
    //         resolve(this.createModels(26));
    //     });
    // }
}

export class CourseCategoryStorage extends StorageBase<CourseCategory> {
    protected createModel(source: any): CourseCategory {
        return this.lmsContext.modelCreator.createCourseCategory(source);
    }

    public async getAll(): Promise<CourseCategory[]> {
        return this.getModels(CommonHelper.Urls.CourseCategory.getAll(this.courseCatalogId));
    }
}

export class ModelStorageFactory {
    private readonly _courseCatalogs: CourseCatalogStorage;
    private readonly _courseCategories: CourseCategoryStorage;
    private readonly _courses: CourseStorage;

    public constructor(lmsContext: LmsContext) {
        this._courseCatalogs = new CourseCatalogStorage(lmsContext);
        this._courseCategories = new CourseCategoryStorage(lmsContext);
        this._courses = new CourseStorage(lmsContext);
    }

    public get courseCatalogs(): CourseCatalogStorage {
        return this._courseCatalogs;
    }

    public get courseCategories(): CourseCategoryStorage {
        return this._courseCategories;
    }

    public get courses(): CourseStorage {
        return this._courses;
    }
}