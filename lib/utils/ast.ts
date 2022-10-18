/**
 * Utils from eslint-plugin-playwright adatpedt to the typescript-eslint parser
 *
 * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/src/utils/ast.ts
 */

import {
    CallExpression,
    Node,
    MemberExpression,
} from '@typescript-eslint/types/dist/generated/ast-spec'

function isIdentifier(node: Node, name: string) {
    return node.type === 'Identifier' && node.name === name
}

function getStringValue(node: Node | undefined) {
    if (!node) return ''

    return node.type === 'Identifier'
        ? node.name
        : node.type === 'TemplateLiteral'
        ? node.quasis[0].value.raw
        : node.type === 'Literal' && typeof node.value === 'string'
        ? node.value
        : ''
}

function isTestIdentifier(node: Node) {
    return (
        isIdentifier(node, 'test') ||
        (node.type === 'MemberExpression' && isIdentifier(node.object, 'test'))
    )
}

function isPropertyAccessor(node: MemberExpression, name: string) {
    return getStringValue(node.property) === name
}

const describeProperties = new Set([
    'parallel',
    'serial',
    'only',
    'skip',
    'fixme',
])

function isDescribeCall(node: Node): boolean {
    const inner = node.type === 'CallExpression' ? node.callee : node

    // Allow describe without test prefix
    if (isIdentifier(inner, 'describe')) {
        return true
    }

    if (inner.type !== 'MemberExpression') {
        return false
    }

    return isPropertyAccessor(inner, 'describe')
        ? true
        : describeProperties.has(getStringValue(inner.property))
        ? isDescribeCall(inner.object)
        : false
}

export function isTest(node: CallExpression) {
    return (
        isTestIdentifier(node.callee) &&
        !isDescribeCall(node) &&
        node.arguments.length === 2 &&
        ['ArrowFunctionExpression', 'FunctionExpression'].includes(
            node.arguments[1].type
        )
    )
}
