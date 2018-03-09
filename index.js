module.exports = parseTorrent;

const bencode = require('bencode');
const sha1 = require('simple-sha1');

function parseTorrent(buffer) {
    let info = bencode.decode(buffer).info;
    let torrent = {};
    torrent.name = (info['name.utf-8'] || info.name).toString();
    torrent.piecesHash = sha1.sync(info.pieces);
    torrent.infoHash = sha1.sync(bencode.encode(info));
    delete info.source;
    delete info.private;
    torrent.infoHashOriginal = sha1.sync(bencode.encode(info));
    return torrent;
}
