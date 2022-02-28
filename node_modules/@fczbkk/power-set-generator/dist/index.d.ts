declare type powerSetGeneratorOptions = {
    maxResults?: number;
};
export declare function powerSetGenerator<T>(input?: Array<T>, { maxResults }?: powerSetGeneratorOptions): IterableIterator<Array<T>>;
export default powerSetGenerator;
