import { ExtractFormatObject } from '@utils/type-utils';

export function injectVariables<T extends string>(
  template: T,
  variables: ExtractFormatObject<T>
) {
  return Object.entries(variables).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, value as string)
  }, template as string)
}
