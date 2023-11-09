export class Helper{
    static customFileName(req, file, cb){
        let customFile = "file"
        let fileExtension = '';
        if(file.mimetype.indexOf('pdf') > 0){
            fileExtension = '.pdf'
        }
        customFile = customFile + fileExtension; 
        cb(null, customFile);
    }
    static filePath(req, file, cb){
        cb(null, './files');
    }
}