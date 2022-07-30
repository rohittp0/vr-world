import Model, {baseUrl, filePost,  ModelObject} from "./api";
import {getAuth} from "./authUtils";


export class ExampleObject extends ModelObject
{

    constructor(data: Record<string, string | number>, baseUrl: string)
    {

        super(data, baseUrl);
        this.fields = ["id"];
        this.getData();

    }

    async addPhoto(file: File)
    {
        const formData = new FormData();

        formData.append("image", file, file.name);
        formData.append("id", this.id.toString());
        const headers = {"Authorization": `Bearer ${getAuth()}`};

        return await filePost(baseUrl + "/api/image/", formData, headers);
    }
}

export class EventObject extends ModelObject
{
    cover: string;
    intro: string;

    constructor(data: Record<string, string | number>, baseUrl: string)
    {
        super(data, baseUrl);

        this.cover = "";
        this.intro = "";

        this.fields = ["id", "cover", "intro"];
        this.getData();
    }
}

export class BlogObject extends ModelObject
{
    cover: string;
    intro: string;
    html?: string;

    constructor(data: Record<string, string | number>, baseUrl: string)
    {
        super(data, baseUrl);

        this.cover = "";
        this.intro = "";

        this.fields = ["id", "cover", "intro", "html"];
        this.getData();
    }
}

export const Example = new Model(baseUrl + "/api/marker/", ExampleObject);
export const Events = new Model(baseUrl + "/api/events/", EventObject);
export const Blogs = new Model(baseUrl + "/api/blogs/", BlogObject);

export type ModelRegistry = typeof ExampleObject | typeof EventObject | typeof BlogObject;

