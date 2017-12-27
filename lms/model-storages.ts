import { Helper } from './helper';
import { LmsContext } from './lms-context';
import { Course, CourseCatalog } from './models';

export abstract class StorageBase<T> {
    private readonly _lmsContext: LmsContext;

    protected constructor(lmsContext: LmsContext) {
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
    public constructor(lmsContext: LmsContext) {
        super(lmsContext);
    }

    protected createModel(source: any): Course {
        return {
            description: source.Description,
            id: source.Id,
            imageUrl: source.ImageUrl,
            longDescription: source.LongDescription,
            title: source.Title,
            url: source.SharepointWeb ? source.SharepointWeb.Url : null
        };
    }

    public async getAll(): Promise<Course[]> {
        return this.getModels(Helper.Urls.Course.getAll(this.courseCatalogId));
    }

    public async getByKeyword(keyword: string): Promise<Course[]> {
        return this.getModels(Helper.Urls.Course.getByKeyword(this.courseCatalogId, keyword));
    }

    public async getByType(courseType: string): Promise<Course[]> {
        return this.getModels(Helper.Urls.Course.getByType(this.courseCatalogId, courseType));
    }
}

export class CourseCatalogStorage extends StorageBase<CourseCatalog> {
    public constructor(lmsContext: LmsContext) {
        super(lmsContext);
    }

    protected createModel(source: any): CourseCatalog {
        return {
            id: source.Id,
            title: source.Title,
            url: source.SharepointWeb ? source.SharepointWeb.Url : null
        };
    }

    public async getAll(): Promise<CourseCatalog[]> {
        return this.getModels(Helper.Urls.CourseCatalog.getAll());
    }

    public async getByUrl(url: string): Promise<CourseCatalog> {
        const result = await this.getModels(Helper.Urls.CourseCatalog.getByUrl(url));

        return result.length == 1 ? result[0] : null;
    }

    // protected createModel(index: number): CourseCatalog {
    //     return {
    //         id: `id_${index}`,
    //         title: `Course Catalog ${index}`,
    //         url: `http://cc${index}.com`
    //     };
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

export class ModelStorageFactory {
    private readonly _courseCatalogs: CourseCatalogStorage;
    private readonly _courses: CourseStorage;

    public constructor(lmsContext: LmsContext) {
        this._courseCatalogs = new CourseCatalogStorage(lmsContext);
        this._courses = new CourseStorage(lmsContext);
    }

    public get courseCatalogs(): CourseCatalogStorage {
        return this._courseCatalogs;
    }

    public get courses(): CourseStorage {
        return this._courses;
    }
}