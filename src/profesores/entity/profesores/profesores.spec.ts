/* eslint-disable prettier/prettier */
import { Profesor } from "./profesores";

describe('Profesores', () => {
  it('should be defined', () => {
    expect(new Profesor()).toBeDefined();
  });
});
