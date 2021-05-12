const musicFiles = [];

class File {
    constructor(folder, fileName, originName) {
        this.folder = folder;
        this.fileName = fileName;
        this.originName = originName;
    }
}

module.exports = class MusicFile extends File {
    constructor(folder, fileName, originName) {
        super(folder, fileName, originName);
        this.srcPath = './' + this.folder + this.fileName;
        this.trackName = this.originName.split(' - ');
        [this.singerName, this.songName] = this.trackName;
    }

    saveFile() {
        musicFiles.push(this);
    }
    
    static getAll = () => musicFiles;
}