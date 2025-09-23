import { InjectionToken } from '@angular/core';
import { ErrorLabelsConfig } from './error-labels.config';

export const ERROR_LABELS_TOKEN = new InjectionToken<ErrorLabelsConfig>('ERROR_LABELS_TOKEN');
