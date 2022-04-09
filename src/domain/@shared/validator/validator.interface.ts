export default interface ValidatorInterface<T> {
  validate(entity: T): void;
}
