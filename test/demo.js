var Lab = require('lab');
var Joi = require('joi');
var schema = require('../lib/schema');

Lab.test('returns true when 1 + 1 equals 2', function (done) {
    Lab.expect(1 + 1).to.equal(2);
    console.log('test');
    done();
});

var demo = {
    swaggerVersion: '1.2',
    apiVersion: '1.2',
    basePath: '1.2',
    resourcePath: '1.2',
    produces: [
        "application/json",
        "application/xml",
        "text/plain",
        "text/html"
    ],
    apis: [
        {
            path: "/pet/{petId}",
            operations: [
                {
                    method: "PATCH",
                    summary: "partial updates to a pet",
                    notes: "",
                    type: "array",
                    items: {
                        $ref: "Pet"
                    },
                    nickname: "partialUpdate",
                    produces: [
                        "application/json",
                        "application/xml"
                    ],
                    consumes: [
                        "application/json",
                        "application/xml"
                    ],
                    authorizations: {
                        oauth2: [
                            {
                                scope: "write:pets",
                                description: "modify pets in your account"
                            }
                        ]
                    },
                    parameters: [
                        {
                            name: "petId",
                            description: "ID of pet that needs to be fetched",
                            required: true,
                            type: "string",
                            paramType: "path",
                            allowMultiple: false
                        },
                        {
                            name: "body",
                            description: "Pet object that needs to be added to the store",
                            required: true,
                            type: "Pet",
                            paramType: "body",
                            allowMultiple: false
                        }
                    ],
                    responseMessages: [
                        {
                            code: 400,
                            message: "Invalid tag value"
                        }
                    ]
                },
                {
                    method: "POST",
                    summary: "Updates a pet in the store with form data",
                    notes: "",
                    type: "void",
                    nickname: "updatePetWithForm",
                    consumes: [
                        "application/x-www-form-urlencoded"
                    ],
                    authorizations: {
                        oauth2: [
                            {
                                scope: "write:pets",
                                description: "modify pets in your account"
                            }
                        ]
                    },
                    parameters: [
                        {
                            name: "petId",
                            description: "ID of pet that needs to be updated",
                            required: true,
                            type: "string",
                            paramType: "path",
                            allowMultiple: false
                        },
                        {
                            name: "name",
                            description: "Updated name of the pet",
                            required: false,
                            type: "string",
                            paramType: "form",
                            allowMultiple: false
                        },
                        {
                            name: "status",
                            description: "Updated status of the pet",
                            required: false,
                            type: "string",
                            paramType: "form",
                            allowMultiple: false
                        }
                    ],
                    responseMessages: [
                        {
                            code: 405,
                            message: "Invalid input"
                        }
                    ]
                },
                {
                    method: "GET",
                    summary: "Find pet by ID",
                    notes: "Returns a pet based on ID",
                    type: "Pet",
                    nickname: "getPetById",
                    authorizations: { },
                    parameters: [
                        {
                            name: "petId",
                            description: "ID of pet that needs to be fetched",
                            required: true,
                            type: "integer",
                            format: "int64",
                            paramType: "path",
                            allowMultiple: false,
                            minimum: "1.0",
                            maximum: "100000.0"
                        }
                    ],
                    responseMessages: [
                        {
                            code: 400,
                            message: "Invalid ID supplied"
                        },
                        {
                            code: 404,
                            message: "Pet not found"
                        }
                    ]
                },
                {
                    method: "DELETE",
                    summary: "Deletes a pet",
                    notes: "",
                    type: "void",
                    nickname: "deletePet",
                    authorizations: {
                        oauth2: [
                            {
                                scope: "write:pets",
                                description: "modify pets in your account"
                            }
                        ]
                    },
                    parameters: [
                        {
                            name: "petId",
                            description: "Pet id to delete",
                            required: true,
                            type: "string",
                            paramType: "path",
                            allowMultiple: false
                        }
                    ],
                    responseMessages: [
                        {
                            code: 400,
                            message: "Invalid pet value"
                        }
                    ]
                }
            ]
        },
        {
            path: "/pet",
            operations: [
                {
                    method: "POST",
                    summary: "Add a new pet to the store",
                    notes: "",
                    type: "void",
                    nickname: "addPet",
                    consumes: [
                        "application/json",
                        "application/xml"
                    ],
                    authorizations: {
                        oauth2: [
                            {
                                scope: "write:pets",
                                description: "modify pets in your account"
                            }
                        ]
                    },
                    parameters: [
                        {
                            name: "body",
                            description: "Pet object that needs to be added to the store",
                            required: true,
                            type: "Pet",
                            paramType: "body",
                            allowMultiple: false
                        }
                    ],
                    responseMessages: [
                        {
                            code: 405,
                            message: "Invalid input"
                        }
                    ]
                },
                {
                    method: "PUT",
                    summary: "Update an existing pet",
                    notes: "",
                    type: "void",
                    nickname: "updatePet",
                    authorizations: { },
                    parameters: [
                        {
                            name: "body",
                            description: "Pet object that needs to be updated in the store",
                            required: true,
                            type: "Pet",
                            paramType: "body",
                            allowMultiple: false
                        }
                    ],
                    responseMessages: [
                        {
                            code: 400,
                            message: "Invalid ID supplied"
                        },
                        {
                            code: 404,
                            message: "Pet not found"
                        },
                        {
                            code: 405,
                            message: "Validation exception"
                        }
                    ]
                }
            ]
        },
        {
            path: "/pet/findByStatus",
            operations: [
                {
                    method: "GET",
                    summary: "Finds Pets by status",
                    notes: "Multiple status values can be provided with comma seperated strings",
                    type: "array",
                    items: {
                        $ref: "Pet"
                    },
                    nickname: "findPetsByStatus",
                    authorizations: { },
                    parameters: [
                        {
                            name: "status",
                            description: "Status values that need to be considered for filter",
                            defaultValue: "available",
                            required: true,
                            type: "string",
                            paramType: "query",
                            allowMultiple: true,
                            enum: [
                                "available",
                                "pending",
                                "sold"
                            ]
                        }
                    ],
                    responseMessages: [
                        {
                            code: 400,
                            message: "Invalid status value"
                        }
                    ]
                }
            ]
        },
        {
            path: "/pet/findByTags",
            operations: [
                {
                    method: "GET",
                    summary: "Finds Pets by tags",
                    notes: "Muliple tags can be provided with comma seperated strings. Use tag1, tag2, tag3 for testing.",
                    type: "array",
                    items: {
                        $ref: "Pet"
                    },
                    nickname: "findPetsByTags",
                    authorizations: { },
                    parameters: [
                        {
                            name: "tags",
                            description: "Tags to filter by",
                            required: true,
                            type: "string",
                            paramType: "query",
                            allowMultiple: true
                        }
                    ],
                    responseMessages: [
                        {
                            code: 400,
                            message: "Invalid tag value"
                        }
                    ],
                    deprecated: "true"
                }
            ]
        },
        {
            path: "/pet/uploadImage",
            operations: [
                {
                    method: "POST",
                    summary: "uploads an image",
                    notes: "",
                    type: "void",
                    nickname: "uploadFile",
                    consumes: [
                        "multipart/form-data"
                    ],
                    authorizations: {
                        oauth2: [
                            {
                                scope: "write:pets",
                                description: "modify pets in your account"
                            },
                            {
                                scope: "read:pets",
                                description: "read your pets"
                            }
                        ]
                    },
                    parameters: [
                        {
                            name: "additionalMetadata",
                            description: "Additional data to pass to server",
                            required: false,
                            type: "string",
                            paramType: "form",
                            allowMultiple: false
                        },
                        {
                            name: "file",
                            description: "file to upload",
                            required: false,
                            type: "File",
                            paramType: "body",
                            allowMultiple: false
                        }
                    ]
                }
            ]
        }
    ],
    models: {
        Tag: {
            id: "Tag",
            properties: {
                id: {
                    type: "integer",
                    format: "int64"
                },
                name: {
                    type: "string"
                }
            }
        },
        Pet: {
            id: "Pet",
            required: [
                "id",
                "name"
            ],
            properties: {
                id: {
                    type: "integer",
                    format: "int64",
                    description: "unique identifier for the pet",
                    minimum: "0.0",
                    maximum: "100.0"
                },
                category: {
                    $ref: "Category"
                },
                name: {
                    type: "string"
                },
                photoUrls: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },
                tags: {
                    type: "array",
                    items: {
                        $ref: "Tag"
                    }
                },
                status: {
                    type: "string",
                    description: "pet status in the store",
                    enum: [
                        "available",
                        "pending",
                        "sold"
                    ]
                }
            }
        },
        Category: {
            id: "Category",
            properties: {
                id: {
                    type: "integer",
                    format: "int64"
                },
                name: {
                    type: "string"
                }
            }
        }
    }
};


Lab.test('test', function (done) {
    Joi.validate(demo, schema.APIDeclaration, function (err, value) {
        Lab.expect(err).to.equal(null);
        done();
    });
});