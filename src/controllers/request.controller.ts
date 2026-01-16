import { Request, Response } from 'express';
import { Request as RequestModel, Collection } from '../models';
import { sendSuccess, sendError, asyncHandler } from '../utils/response';
import { HTTP_STATUS } from '../constants';

export class RequestController {
    /**
     * Create a new request
     */
    static create = asyncHandler(async (req: Request, res: Response) => {
        const { collectionId, type, name, method, url, headers, body, bodyType, auth, preRequestScript } = req.body;
        const userId = (req as any).userId;

        let verifiedCollectionId: number | undefined = undefined;

        if (collectionId && collectionId !== 'null' && collectionId !== 'undefined') {
            // Verify collection belongs to user
            const collection = await Collection.findOne({ where: { id: Number(collectionId), userId } });
            if (!collection) {
                return sendError(res, 'Collection not found', HTTP_STATUS.NOT_FOUND);
            }
            verifiedCollectionId = Number(collectionId);
        }

        const defaultMethod = type === 'websocket' || type === 'socketio' ? 'WS' : 'GET';

        const request = await RequestModel.create({
            name: name || 'New Request',
            method: method || defaultMethod,
            url: url || '',
            collectionId: verifiedCollectionId,
            bodyType: bodyType || 'none',
            type: type || 'http',
            preRequestScript: preRequestScript || '',
            headers: headers || [],
            body: body || {},
            auth: auth || { type: 'none' },
            isFavorite: false,
            userId,
        });

        return sendSuccess(res, request, 'Request created successfully', HTTP_STATUS.CREATED);
    });

    /**
     * Get all independent requests for user
     */
    static getAll = asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;

        const requests = await RequestModel.findAll({
            where: {
                userId,
                collectionId: null as any
            }
        });

        return sendSuccess(res, requests);
    });

    /**
     * Update a request
     */
    static update = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const updates = req.body;
        const userId = (req as any).userId;

        const request = await RequestModel.findOne({
            where: { id: Number(id), userId }
        });

        if (!request) {
            return sendError(res, 'Request not found', HTTP_STATUS.NOT_FOUND);
        }

        const { id: _, userId: __, ...updateData } = req.body;
        await request.update(updateData);

        return sendSuccess(res, request, 'Request updated successfully');
    });

    /**
     * Delete a request
     */
    static delete = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = (req as any).userId;

        const request = await RequestModel.findOne({
            where: { id: Number(id), userId }
        });

        if (!request) {
            return sendError(res, 'Request not found', HTTP_STATUS.NOT_FOUND);
        }

        await request.destroy();

        return sendSuccess(res, null, 'Request deleted successfully');
    });

    /**
     * Get a single request
     */
    static getOne = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = (req as any).userId;

        const request = await RequestModel.findOne({
            where: { id: Number(id), userId }
        });

        if (!request) {
            return sendError(res, 'Request not found', HTTP_STATUS.NOT_FOUND);
        }

        return sendSuccess(res, request);
    });
}
