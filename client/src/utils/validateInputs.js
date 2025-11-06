const EMPTY_FIELD_ERROR = `Field can't be empty`;
const getTooLongFieldError = (limit) => `Max ${limit} symbols are allowed`;

const MAX_MESSAGE_LENGTH = 255;

const validateNotEmpty = (value) => {
  if (!value.trim()) {
    return EMPTY_FIELD_ERROR;
  }

  return '';
};

const validateWithLimit = (value, limit) => {
  const emptyError = validateNotEmpty(value);
  if (emptyError) return emptyError;

  if (value.length > limit) {
    return getTooLongFieldError(limit);
  }

  return '';
};

export const validateName = (name) => validateNotEmpty(name);
export const validateMessage = (message) => validateWithLimit(message, MAX_MESSAGE_LENGTH);
