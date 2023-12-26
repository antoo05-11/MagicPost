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

    gender: Joi.string().valid('MALE', 'FEMALE').required(),

    birthDate: Joi.string().isoDate().required(),

    workingPointID: Joi.number().integer().allow(null).optional(),

    email: Joi.string().email().required(),

    role: Joi.string().valid(role.GOODS_POINT_EMPLOYEE,
        role.GOODS_POINT_HEAD,
        role.MANAGER,
        role.TRANSACTION_POINT_EMPLOYEE,
        role.TRANSACTION_POINT_HEAD).required()
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
        role.GOODS_POINT_HEAD,
        role.MANAGER,
        role.TRANSACTION_POINT_EMPLOYEE,
        role.TRANSACTION_POINT_HEAD),

    status: Joi.string().optional().valid('ACTIVE', 'INACTIVE')
});

export const employee_filter_schema = Joi.object({
    page: Joi.number().integer().min(0).optional(),
    limit: Joi.number().integer().min(1).optional(),
    employeeID: Joi.string().optional(),
    identifier: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    fullName: Joi.string().optional(),
    role: Joi.string().optional(),
    email: Joi.string().optional(),
    status: Joi.string().optional(),
    address: Joi.object({
        provinceID: Joi.number().integer().min(1),
        communeID: Joi.number().integer().min(1),
        districtID: Joi.number().integer().min(1),
    }).or('provinceID', 'communeID', 'districtID').optional(),
    workingAddress: Joi.object({
        provinceID: Joi.number().integer().min(1),
        communeID: Joi.number().integer().min(1),
        districtID: Joi.number().integer().min(1),
    }).or('provinceID', 'communeID', 'districtID').optional()
}).when(Joi.object({ address: Joi.exist() }), {
    then: Joi.object({
        address: Joi.required()
    })
}).when(Joi.object({ workingAddress: Joi.exist() }), {
    then: Joi.object({
        address: Joi.required()
    })
});