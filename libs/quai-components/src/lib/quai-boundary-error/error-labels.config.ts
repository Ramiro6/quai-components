export interface ErrorLabelsConfig {
  [key: string]: (error?: any) => string;
}

export const DEFAULT_ERROR_LABELS: ErrorLabelsConfig = {
  required: () => 'Este campo es obligatorio.',
  minlength: (error) => `Mínimo ${error?.minlength?.requiredLength} caracteres.`,
  maxlength: (error) => `Máximo ${error?.maxlength?.requiredLength} caracteres.`,
  email: () => 'Email inválido.',
  pattern: () => 'Formato incorrecto.',
  passwordMismatch: () => {
    return 'Las contraseñas no coinciden.';
  },
  usernameTaken: () => 'Este nombre de usuario ya está en uso.',
  remote: (error) => error?.message || 'Error del servidor.'
}

// check
// required
// minlength
// maxlength
// email
