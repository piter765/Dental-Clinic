const { validatePhoneNumber } = require("./validators");

/*To valid a phone number like
XXX-XXX-XXX
XXX.XXX.XXX
XXX XXX XXX
XXXXXXXXX */

test('check if phone number is valid - should return true', () => {
    expect(validatePhoneNumber("111.222.333")).toEqual(true);
    expect(validatePhoneNumber("897-856-123")).toEqual(true);
    expect(validatePhoneNumber("999 222 888")).toEqual(true);
    expect(validatePhoneNumber("999999999")).toEqual(true);
});

test('check if phone number is invalid - should return false', () => {
    expect(validatePhoneNumber("safajsfnas")).toEqual(false);
    expect(validatePhoneNumber("123 123 1233")).toEqual(false);
    expect(validatePhoneNumber("7858493")).toEqual(false);
    expect(validatePhoneNumber("ajs nfj 123")).toEqual(false);
    expect(validatePhoneNumber("")).toEqual(false);
})

