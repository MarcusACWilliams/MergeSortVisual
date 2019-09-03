import DateObj from "../valueobjects/DateObj"
import { exportAllDeclaration } from "@babel/types";

test('When DateObj is Null date is NOW', () => {
    
    expect( Math.floor(new DateObj()._utcDate/10) ).toBe(Math.floor(Date.now()/10));
});


test('DateObj is not Undefined', () => {
    let input;
    //expect( () => {new DateObj(undefined)} ).toThrow();
});

test('Specific ISO date value sets correctly', () => {
    //expect(new DateObj('2019-08-25')._utcDate).toBe(Date('2019-08-25'));
});

