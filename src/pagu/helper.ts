export class Helper{
    static customFileName(req, file, cb){
        let customFile = "pagu".split('.')[0];
        let fileExtension = '';
        if(file.mimetype.indexOf('csv') > 0){
            fileExtension = '.csv'
        }
        customFile = customFile + fileExtension;
        cb(null, customFile);
    }
    static filePath(req, file, cb){
        cb(null, './files/pagu');
    }
}