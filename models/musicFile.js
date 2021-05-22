
class File {
    constructor(folder, fileName, originName) {
        this.folder = folder;
        this.fileName = fileName;
        this.originName = originName;
    }
}

module.exports = class MusicFile extends File {
    constructor(fileFolder, fileName, originName) {
        super(fileFolder, fileName, originName);
        this.propsAll = this.originName.split(' - ');
        this.srcPath = './' + this.fileFolder + this.fileName;
    }

    addFileProp() {
        this.propsAll.push(this.srcPath);
    }

    static getPropsAll() {
        return this.propsAll;
    }
}