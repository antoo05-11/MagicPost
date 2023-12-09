import { role } from '../../models/human/role';

const Joi = require('joi');

export const employee_adding_schema = Joi.object({
    identifier: Joi.string()
        .length(12)
        .pattern(/^[0-9]+$/)
        .required(),

    phoneNumber: Joi.string().length(10)
        .pattern(/^[0-9]+$/)
        .required(),

    fullName: Joi.string()
        .pattern(/[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u)
        .required(),

    address: {
        detail: Joi.string().required(),
        communeID: Joi.number().integer().required(),
        districtID: Joi.number().integer().required(),
        provinceID: Joi.number().integer().required()
    },

    workingPointID: Joi.number().integer().allow(null).optional(),

    email: Joi.string().email().required(),

    role: Joi.string().allow(null).valid(role.GOODS_POINT_EMPLOYEE,
        role.GOODS_POINT_HEADER,
        role.MANAGER,
        role.TRANSACTION_POINT_EMPLOYEE,
        role.TRANSACTION_POINT_HEADER).optional()
});

export const employee_editting_schema = Joi.object({
    identifier: Joi.string()
        .length(12)
        .pattern(/^[0-9]+$/)
        .optional(),

    phoneNumber: Joi.string().length(10)
        .pattern(/^[0-9]+$/)
        .optional(),

    fullName: Joi.string()
        .pattern(/[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u)
        .optional(),

    address: {
        detail: Joi.string().optional(),
        communeID: Joi.number().integer().optional(),
        districtID: Joi.number().integer().optional(),
        provinceID: Joi.number().integer().optional()
    },

    workingPointID: Joi.number().integer().allow(null).optional(),

    email: Joi.string().email().optional(),

    role: Joi.string().allow(null).valid(role.GOODS_POINT_EMPLOYEE,
        role.GOODS_POINT_HEADER,
        role.MANAGER,
        role.TRANSACTION_POINT_EMPLOYEE,
        role.TRANSACTION_POINT_HEADER),

    status: Joi.string().optional().valid('ACTIVE', 'INACTIVE')
});