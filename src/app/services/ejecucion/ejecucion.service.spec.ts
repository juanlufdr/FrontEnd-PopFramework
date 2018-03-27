import { TestBed, inject } from '@angular/core/testing';

import { EjecucionService } from './ejecucion.service';

describe('EjecucionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EjecucionService]
    });
  });

  it('should be created', inject([EjecucionService], (service: EjecucionService) => {
    expect(service).toBeTruthy();
  }));
});
