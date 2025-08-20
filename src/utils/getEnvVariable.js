export const getEnvVariable = (name, defaultValue) => {
  const value = process.env[name];
  if (value!== undefined && value !== '') return value;
  if (defaultValue !== undefined) return defaultValue;
  throw new Error(`Cannot read variable ${name} from process.env`);
};
