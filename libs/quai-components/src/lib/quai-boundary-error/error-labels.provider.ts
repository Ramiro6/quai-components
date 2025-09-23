import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ERROR_LABELS_TOKEN } from './error-labels.token';
import { DEFAULT_ERROR_LABELS, ErrorLabelsConfig } from './error-labels.config';


export function provideErrorLabels(custom: Partial<ErrorLabelsConfig>): EnvironmentProviders {
  const merge = { ...DEFAULT_ERROR_LABELS, ...custom}
  return makeEnvironmentProviders([{
    provide: ERROR_LABELS_TOKEN,
    useValue: merge
  }]);
}
