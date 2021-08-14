import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage as VeeErrorMessage,
} from 'vee-validate';
import { required, min, max, alpha_spaces as alphaSpaces, email } from '@vee-validate/rules';

const VeeValidatePlugin = {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('VeeErrorMessage', VeeErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
  },
};

export default VeeValidatePlugin;
