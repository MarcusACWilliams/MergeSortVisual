import UserName from "../valueobjects/Name"
import { exportAllDeclaration } from "@babel/types";

test('Input is not Null', () => {
    let input = null;
    expect( () => {console.log( new UserName(input) )} ).toThrow();
});

test('Input is not Undefined', () => {
    let input;
    expect( () => {new UserName(input)} ).toThrow();
});

test('Input is not Empty', () => {
    let input = '';
    expect( () => {new UserName(input)} ).toThrow();
});

test('Input is only letters', () => {
    let input = 'Marcus6';
    expect( () => {new UserName(input)} ).toThrow();
});

test('Input has no internal white space', () => {
    let input = 'Marcus Williams';
    expect( () => {new UserName(input)} ).toThrow();
});

test('Input has no external white space', () => {
    let input = ' Yen ';
    let name  = new UserName(input);

    expect( name.getName ).toEqual('Yen');
});



