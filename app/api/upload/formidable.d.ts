declare module 'formidable' {
  import { IncomingMessage } from 'http';

  export interface Fields {
    [key: string]: string[];
  }

  export interface Files {
    [key: string]: {
      filepath: string;
      originalFilename?: string;
      [key: string]: any;
    }[];
  }

  export interface IncomingFormOptions {
    uploadDir?: string;
    keepExtensions?: boolean;
    [key: string]: any;
  }

  export class IncomingForm {
    constructor(options?: IncomingFormOptions);
    parse(req: IncomingMessage | any, callback: (err: Error | null, fields: Fields, files: Files) => void): void;
  }
}
