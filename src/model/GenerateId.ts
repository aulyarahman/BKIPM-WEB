export const GenerateId = (prefix: string) => {
  const frist = Math.round(Math.random() * (99 - 10) + 10);
  const last = Math.round(Math.random() * (99 - 10) + 10);
  const id = new Date().getTime().toString();
  return prefix + "-" + frist + id + last;
};
