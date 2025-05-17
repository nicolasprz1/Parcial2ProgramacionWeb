/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Estudiante } from "./estudiantes";

describe('Estudiantes', () => {
  it('should be defined', () => {
    expect(new Estudiante()).toBeDefined();
  });
});
