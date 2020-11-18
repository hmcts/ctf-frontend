export const hasProperty = (actual: {}, expected: string): boolean => {
  return actual !== undefined && expected in actual;
};

export const isEmpty = (value: string): boolean => {
  return value === undefined || value === '';
};

export const isObjectEmpty = (obj: {}): boolean => {
  return Object.keys(obj).length === 0;
};

export const isPostcodeValid = (postcode: string): boolean => {
  const regex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i;
  return regex.test(postcode);
};

export const postcodeIsScottish = (postcode: string): boolean => {
  const regex = /^(ZE|KW|IV|HS|PH|AB|DD|PA|FK|G|KY|KA|DG|TD|EH|ML)/i;
  return regex.test(postcode);
};

export const postcodeIsNorthernIreland = (postcode: string): boolean => {
  const regex = /^(BT)/i;
  return regex.test(postcode);
};
