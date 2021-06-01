class File {
    constructor(fileOriginName) {
        this.originName = fileOriginName;
    }
}

module.exports = class FileConverted extends File {
    constructor(fileFullName) {
        super(fileFullName);
        [this.singerName, this.songName] = this.originName.split(' - ');
    }

    getSingerName() {
        return this.singerName;
    }

    getSongName() {
        return this.songName;
    }
}