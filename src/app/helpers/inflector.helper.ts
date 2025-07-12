// String transformation helpers for case and form conversions

/**
 * Converts a string to camelCase.
 * @param {string} str - The string to convert
 * @returns {string} The camelized string.
 */
export const camelize = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, '');
};

/**
 * Changes a string of words separated by spaces or underscores to pascal case.
 *
 * @param {string} str - The string to pascalize
 * @example
 * pascalize('foo bar');
 *
 * @returns {string} - The pascalized string
 */
export const pascalize = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, '');
};

/**
 * Converts a string to snake_case.
 * @param {string} str - The string to convert
 * @returns {string} The underscored string.
 */
export const underscore = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : `_${word.toLowerCase()}`,
    )
    .replace(/\s+/g, '_');
};

/**
 * Converts a string to lower_case_with_underscores from camel or pascal case.
 * @param {string} str - The string to convert
 * @returns {string} The decamelized string.
 */
export const decamelize = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : `_${word.toLowerCase()}`,
    )
    .replace(/\s+/g, '_');
};

/**
 * Converts a string to a human readable form from camel, pascal or snake case.
 * @param {string} str - The string to convert
 * @returns {string} The humanized string.
 */
export const humanize = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toUpperCase() : ` ${word.toLowerCase()}`,
    )
    .replace(/\s+/g, ' ');
};

/**
 * Checks if a string is pluralizable.
 *
 * @param {string} str - The string to check
 * @example
 * isPluralizable('foo');
 *
 * @returns {boolean} - Whether the string is pluralizable
 */
export const isPluralizable = (str: string): boolean => {
  return str.endsWith('s');
};

/**
 * Converts a string to kebab-case from camel, pascal or snake case.
 * @param {string} str - The string to convert
 * @returns {string} The dasherized string.
 */
export const dasherize = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : `-${word.toLowerCase()}`,
    )
    .replace(/\s+/g, '-');
};

/**
 * Changes a number to its ordinal form.
 *
 * @param {number} num - The number to ordinalize
 * @example
 * ordinalize(1);
 *
 * @returns {string} - The ordinalized number
 */
export const ordinal = (num: number): string => {
  const j = num % 10;
  const k = num % 100;

  if (j === 1 && k !== 11) {
    return `${num}st`;
  }
  if (j === 2 && k !== 12) {
    return `${num}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${num}rd`;
  }
  return `${num}th`;
};

/**
 * Changes a number to its ordinal form.
 *
 * @param {number} num - The number to ordinalize
 * @example
 * ordinalize(1);
 *
 * @returns {string} - The ordinalized number
 */
export const ordinalize = (num: number): string => {
  return `${num}${ordinal(num)}`;
};

/**
 * Converts a string to its plural form (basic English pluralization).
 * @param {string} str - The string to pluralize
 * @returns {string} The pluralized string.
 */
export const pluralize = (str: string): string => {
  if (str.endsWith('y')) {
    return str.slice(0, -1) + 'ies';
  }
  if (str.endsWith('s')) {
    return str;
  }
  return str + 's';
};

/**
 * Converts a string to its singular form (basic English singularization).
 * @param {string} str - The string to singularize
 * @returns {string} The singularized string.
 */
export const singularize = (str: string): string => {
  if (str.endsWith('ies')) {
    return str.slice(0, -3) + 'y';
  }
  if (str.endsWith('s')) {
    return str.slice(0, -1);
  }
  return str;
};

/**
 * Changes a string to its title case form.
 *
 * @param {string} str - The string to titleize
 * @example
 * titleize('foo bar');
 *
 * @returns {string} - The titleized string
 */
export const titleize = (str: string): string => {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};
