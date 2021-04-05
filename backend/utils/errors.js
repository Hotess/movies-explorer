const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Conflict = require('../errors/Conflict');
const InternalServerError = require('../errors/InternalServerError');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.currentError = (err) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    throw new BadRequestError({ message: 'Указаны некорректные данные' });
  } else if (err.name === 'DocumentNotFoundError') {
    throw new NotFoundError({ message: 'Ресурс не найден' });
  } else if (err.name === 'ForbiddenError') {
    throw new ForbiddenError({ message: 'Недостаточно прав для выполнения операции' });
  } else if (err.name === 'Conflict') {
    throw new Conflict({ message: 'Такой объект уже существует' });
  } else if (err.name === 'UnauthorizedError') {
    throw new UnauthorizedError({ message: 'Необходима авторизация' });
  } else {
    throw new InternalServerError({ message: 'Ошибка на сервере' });
  }
};
