import { Request, Response } from 'express';
import { Environment, Variable } from '../models';
import { sendSuccess, sendError, asyncHandler } from '../utils/response';
import { HTTP_STATUS } from '../constants';

export class EnvironmentController {
    /**
     * Create a new environment
     */
    static create = asyncHandler(async (req: Request, res: Response) => {
        const { name, variables } = req.body;
        const userId = (req as any).userId;

        if (!name) {
            return sendError(res, 'Environment name is required', HTTP_STATUS.BAD_REQUEST);
        }

        const environment = await Environment.create({
            name,
            userId
        });

        if (variables && Array.isArray(variables)) {
            for (const v of variables) {
                await Variable.create({
                    key: v.key,
                    value: v.value,
                    environmentId: environment.id
                });
            }
        }

        const result = await Environment.findByPk(environment.id, {
            include: [{ model: Variable }]
        });

        return sendSuccess(res, result, 'Environment created successfully', HTTP_STATUS.CREATED);
    });

    /**
     * Get all environments for user
     */
    static getAll = asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;

        const environments = await Environment.findAll({
            where: { userId },
            include: [{ model: Variable }],
            order: [['createdAt', 'ASC']]
        });

        return sendSuccess(res, environments);
    });

    /**
     * Update an environment
     */
    static update = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, variables } = req.body;
        const userId = (req as any).userId;

        const environment = await Environment.findOne({
            where: { id: Number(id), userId }
        });

        if (!environment) {
            return sendError(res, 'Environment not found', HTTP_STATUS.NOT_FOUND);
        }

        if (name) environment.name = name;
        await environment.save();

        if (variables && Array.isArray(variables)) {
            // Simple approach: delete all and recreate
            await Variable.destroy({ where: { environmentId: environment.id } });
            for (const v of variables) {
                await Variable.create({
                    key: v.key,
                    value: v.value,
                    environmentId: environment.id
                });
            }
        }

        const result = await Environment.findByPk(environment.id, {
            include: [{ model: Variable }]
        });

        return sendSuccess(res, result, 'Environment updated successfully');
    });

    /**
     * Delete an environment
     */
    static delete = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = (req as any).userId;

        const environment = await Environment.findOne({
            where: { id: Number(id), userId }
        });

        if (!environment) {
            return sendError(res, 'Environment not found', HTTP_STATUS.NOT_FOUND);
        }

        await environment.destroy();

        return sendSuccess(res, null, 'Environment deleted successfully');
    });
}
