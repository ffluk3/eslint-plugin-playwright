import { stripIndent } from 'common-tags'
import { ESLintUtils } from '@typescript-eslint/utils'
import { ruleTestCaseNaming } from '../../../lib/rules/test-case-naming'

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
})

ruleTester.run('test-name-cases', ruleTestCaseNaming, {
    invalid: [
        {
            code: stripIndent`
            import { test } from '@playwright/test';

            test.describe("hello world", async () => {
                test("@flaky nothing else here")
            })
            `,
            options: [
                {
                    matches: [
                        {
                            match: '@flaky',
                            requirement: 'hello world',
                            violation:
                                'Expected flaky test to have hello world in name',
                        },
                    ],
                    fn: 'test',
                },
            ],
            errors: [
                {
                    messageId: 'doesNotMeetRequirement',
                    data: {
                        violation:
                            'Expected flaky test to have hello world in name',
                    },
                },
            ],
        },
        {
            code: stripIndent`
            describe("hello world", async () => {
                it("@flaky nothing else here")
            })
            `,
            options: [
                {
                    matches: [
                        {
                            match: '@flaky',
                            requirement: 'hello world',
                            violation:
                                'Expected flaky test to have hello world in name',
                        },
                    ],
                    fn: 'it',
                },
            ],
            errors: [
                {
                    messageId: 'doesNotMeetRequirement',
                    data: {
                        violation:
                            'Expected flaky test to have hello world in name',
                    },
                },
            ],
        },
    ],
    valid: [
        {
            code: stripIndent`
            import { test } from '@playwright/test';

            test.describe("hello world", async () => {
                test("@flaky hello world")
            })
            `,
            options: [
                {
                    matches: [
                        {
                            match: '@flaky',
                            requirement: 'hello world',
                            violation:
                                'Expected flaky test to have hello world in name',
                        },
                    ],
                    fn: 'test',
                },
            ],
        },
        {
            code: stripIndent`
            describe("hello world", async () => {
                it("@flaky hello world")
            })
            `,
            options: [
                {
                    matches: [
                        {
                            match: '@flaky',
                            requirement: 'hello world',
                            violation:
                                'Expected flaky test to have hello world in name',
                        },
                    ],
                    fn: 'it',
                },
            ],
        },
    ],
})
