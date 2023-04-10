const { validatePassword } = require("./validators");

//haslo powinno miec minimum 8 znakow, 1 wielką literę, 1 znak specjalny i 1 cyfre

test('check if correct password returns true', () => {
    expect(validatePassword("Auto123!")).toEqual(true);
    expect(validatePassword("auTo123345%")).toEqual(true);
    expect(validatePassword("ajsfjasfjASDsfasfTGTjfnajf123njasf!!@#")).toEqual(true);
    expect(validatePassword("auto !123B")).toEqual(true);
});

test('check if incorrect password returns false', () => {
    expect(validatePassword("auto")).toEqual(false);
    expect(validatePassword("auto123%")).toEqual(false);
    expect(validatePassword("Auto19022")).toEqual(false);
    expect(validatePassword("asfnajsnfjanfsa")).toEqual(false);
});