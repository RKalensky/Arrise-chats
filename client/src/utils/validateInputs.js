const EMPTY_FIELD_ERROR = `Field can't be empty`;
const TOO_LONG_FIELD_ERROR = (limit) => `Max ${limit} symbols are allowed`;

const MAX_MESSAGE_LENGTH = 255;
const MAX_NAME_LENGTH = 40;

const validate = (value, limit) => {
  if (!value.trim()) {
    return EMPTY_FIELD_ERROR;
  }

  if (value.length > limit) {
    return TOO_LONG_FIELD_ERROR(limit);
  }

  return '';
};

export const validateName = (name) => validate(name, MAX_NAME_LENGTH);
export const validateMessage = (message) => validate(message, MAX_MESSAGE_LENGTH);
