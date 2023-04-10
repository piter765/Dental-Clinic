const { validateName } = require("./validators");

test('check if correct name returns true', () => {
    expect(validateName("Szymon")).toEqual(true);
    expect(validateName("aksfkasf")).toEqual(true);
    expect(validateName("ajsfjasfjasfas fnasjfnajfnjasf")).toEqual(true);
    expect(validateName("Szymon tymula")).toEqual(true);
});

test('check if incorrect name returns false', () => {
    expect(validateName("Szymon1")).toEqual(false);
    expect(validateName("aksf%kasf!")).toEqual(false);
    expect(validateName("1231231231")).toEqual(false);
    expect(validateName("Szymon tymula23")).toEqual(false);
});