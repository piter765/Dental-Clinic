const {validateEmail} = require("./validators");

/*Example of valid email id

mysite@ourearth.com
my.ownsite@ourearth.org
mysite@you.me.net

Example of invalid email id

mysite.ourearth.com [@ is not present]
mysite@.com.my [ tld (Top Level domain) can not start with dot "." ]
@you.me.net [ No character before @ ]
mysite123@gmail.b [ ".b" is not a valid tld ]
mysite@.org.org [ tld can not start with dot "." ]
.mysite@mysite.org [ an email should not be start with "." ]
mysite()*@gmail.com [ here the regular expression only allows character, digit, underscore, and dash ]
mysite..1234@yahoo.com [double dots are not allowed]*/

test('check if correct email returns true', () => {
    expect(validateEmail("test@mysite.com")).toEqual(true);
    expect(validateEmail("my.ownsite@ourearth.org")).toEqual(true);
    expect(validateEmail("mysite@you.me.net")).toEqual(true);
})

test('check if incorrect email returns false', () => {
    expect(validateEmail("testmysite.com")).toEqual(false);
    expect(validateEmail("testgmailcom")).toEqual(false);
    expect(validateEmail("test@.gmail.com")).toEqual(false);
    expect(validateEmail("@gmail.com")).toEqual(false);
    expect(validateEmail(".testgmailcom")).toEqual(false);
    expect(validateEmail("test()*@gmail.com")).toEqual(false);
    expect(validateEmail("test..1234@yahoo.com")).toEqual(false);
})