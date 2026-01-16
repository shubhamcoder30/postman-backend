import { Request, Response } from 'express';
import { Collection, Folder, Request as RequestModel } from '../models';
import { sendSuccess, sendError, asyncHandler } from '../utils/response';
import { HTTP_STATUS } from '../constants';

export class CollectionController {
    /**
     * Create a new collection
     */
    static create = asyncHandler(async (req: Request, res: Response) => {
        const { name } = req.body;
        const userId = (req as any).userId;

        if (!name) {
            return sendError(res, 'Collection name is required', HTTP_STATUS.BAD_REQUEST);
        }

        const collection = await Collection.create({
            name,
            userId
        });

        return sendSuccess(res, collection, 'Collection created successfully', HTTP_STATUS.CREATED);
    });

    /**
     * Get all collections for user
     */
    static getAll = asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;

        const collections = await Collection.findAll({
            where: { userId },
            include: [
                {
                    model: Folder,
                    as: 'folders',
                    include: [{ model: RequestModel, as: 'requests' }]
                },
                {
                    model: RequestModel,
                    as: 'requests',
                    where: { folderId: null }, // Requests at root of collection
                    required: false
                }
            ],
            order: [['createdAt', 'ASC']]
        });

        return sendSuccess(res, collections);
    });

    /**
     * Delete a collection
     */
    static delete = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = (req as any).userId;

        const collection = await Collection.findOne({
            where: { id, userId }
        });

        if (!collection) {
            return sendError(res, 'Collection not found', HTTP_STATUS.NOT_FOUND);
        }

        await collection.destroy();

        return sendSuccess(res, null, 'Collection deleted successfully');
    });

    /**
     * Update a collection
     */
    static update = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name } = req.body;
        const userId = (req as any).userId;

        const collection = await Collection.findOne({
            where: { id, userId }
        });

        if (!collection) {
            return sendError(res, 'Collection not found', HTTP_STATUS.NOT_FOUND);
        }

        if (name) collection.name = name;

        await collection.save();

        return sendSuccess(res, collection, 'Collection updated successfully');
    });
}
