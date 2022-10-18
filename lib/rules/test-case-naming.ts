/*
 * Copyright © 2016–2022 Flock Freight, Inc.
 */

import { ESLintUtils } from '@typescript-eslint/utils'

interface TestNameMatch {
    match: string
    requirement: string
    violation: string
    // TODO: allow explicit import module for TDD/BDD versbs
    // importName: "@playwright/test"
}

const createRule = ESLintUtils.RuleCreator(
    (name) => `https://example.com/rule/${name}`
)

export const ruleTestCaseNaming = createRule({
    name: 'test-case-naming',
    defaultOptions: [
        {
            matches: [],
            fn: 'tdd',
        },
    ],
    meta: {
        docs: {
            description: 'Test',
            recommended: 'error',
        },
        messages: {
            doesNotMeetRequirement: 'Requirement not met: {{ violation }}',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    matches: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                match: {
                                    type: 'string',
                                },
                                requirement: {
                                    type: 'string',
                                },
                                violation: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                    fn: {
                        enum: ['it', 'test'],
                    },
                },
            },
        ],
        type: 'problem',
        hasSuggestions: false,
    },
    create(context) {
        const options = context.options[0]

        if (!options.matches) {
            throw new Error('No options specified')
        }

        return {
            Literal(node) {
                options.matches.forEach((matchRule: TestNameMatch) => {
                    if (
                        new RegExp(matchRule.match).test(node.value.toString())
                    ) {
                        const testName = node.value.toString()

                        if (node.parent.type === 'CallExpression') {
                            const calleeName = (node.parent.callee as any).name

                            if (calleeName === options.fn) {
                                const meetsRequirement = new RegExp(
                                    matchRule.requirement
                                ).test(testName)
                                if (!meetsRequirement) {
                                    context.report({
                                        node,
                                        messageId: 'doesNotMeetRequirement',
                                        data: {
                                            violation: matchRule.violation,
                                        },
                                    })
                                }
                            }
                        }
                    }
                })
            },
        }
    },
})
