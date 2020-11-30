import {Request,Response} from 'express';
import {Link} from '../models/link';

const links : Link[] = [];

function postLink(req, res) {
    res.send('postLink');
}
function getLink(req, res) {
    res.send('getLink');
}
function hitLink(req, res) {
    res.send('hitLink');
}
exports.default = {
    postLink,
    getLink,
    hitLink
};
