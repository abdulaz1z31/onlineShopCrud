export const pagination = (req, res, next) => {
    let { page, limit } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (!page || page < 1) page = 1;
    if (!limit || limit < 1) limit = 5;

    req.pagination = { page, limit };
    next();
};
