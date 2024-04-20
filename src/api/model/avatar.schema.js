const Joi = require('joi');

const avatarSchema = Joi.object({

    id: Joi.any(),

    createdAt: Joi.any(),

    avatarName: Joi
        .string()
        .max(20)
        .required(),

    childAge: Joi.number().integer().min(0).max(100),
    skinColor: Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),

    hairStyle: Joi
        .string()
        .valid(
            'short',
            'bald',
            'short-curly',
            'short-straight',
            'medium-curly',
            'medium-straight',
            'long-curly',
            'long-straight',
            'dread-locks')
        .default('medium-straight'),

    headShape: Joi
        .string()
        .valid(
            'oval',
            'round',
            'heart',
            'rectangular'
        )
        .default('oval'),

    upperClothing: Joi
        .string()
        .valid(
            'jacket',
            'shirt',
            'hoodie',
            'dress'
        )
        .default('shirt'),

    lowerClothing: Joi.alternatives()
            .conditional(
                'upperClothing', {
                is: 'dress',
                then: Joi.forbidden(), //.optional(),
                otherwise: Joi
                    .string()
                    .valid('shorts', 'pants', 'skirt')
                    .default('pants')
            }),


})

module.exports = avatarSchema;