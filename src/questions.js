import { fullQuery } from './database';

export async function get(req, res) {
    res.json(await fullQuery('FOR q IN questions RETURN q')
        .map(({ id, name, category }) => ({ id, name, category })))
}
