import linkModel, {ILinkModel} from './linkModel';
import {Link} from './link';

function findByCode(code: string) {             // select no BD
    return linkModel.findOne<ILinkModel>({ where: {code}});
}

function add(link: Link) {
    return linkModel.create<ILinkModel>(link);  // insert no BD
}

async function hit(code: string) {
    const link = await findByCode(code);
    if (!link) return null;
    link.hits!++;   // hits e opcional e teoricamente pode vir com zero, 
                    // o "!" e para indicar que nós nos responsabilizamos por isso
    await link.save();    // faz o update do BD
    return link;
}

export default {          // exportando as funçoes para podermos usá-los fora
    findByCode,
    add,
    hit
}