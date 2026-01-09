declare type ModelExC<T> = import('mongoose').Model<T>
declare type DocumentExC = import('mongoose').Document

declare interface Models {
    ThingModel: ThingModelI;
}

declare interface Db {
    models: Models;
}
// define options
declare interface MyPluginOptions {
}