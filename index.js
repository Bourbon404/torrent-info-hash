module.exports = getHash;

const bencode = require('bencode');
const sha1 = require('simple-sha1');

function getHash(buffer, filter) {
    let torrent = bencode.decode(buffer);
    let info = torrent.info;
    if (filter) {
        delete info.source;
        delete info.private;
    }
    return sha1.sync(bencode.encode(info));
}
