import { User } from "../../model/user";
import userDb from "../../repository/user.db";
import userService from "../../service/user.service";

let mockGetAllUsers: jest.Mock;
let mockGetUserByEmail: jest.Mock;
let mockCreateUser: jest.Mock;
let mockUserDbgetUserByEmail: jest.Mock;

const user: User = new User({
    name: "John",
    email: "email@john.com",
    password: "password123",
    role: 'admin'
});

const users: User[] = [user];

beforeEach(() => {

    mockGetAllUsers = jest.fn();
    mockGetUserByEmail = jest.fn();
    mockCreateUser = jest.fn();
    mockUserDbgetUserByEmail = jest.fn();

});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: Users in the database; when: getting all users; then: return all users', () => {

    userService.getAllUsers = mockGetAllUsers.mockReturnValue(users);


    const result = userService.getAllUsers();


    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(users);
});

test('given: Users in the database; when: getting a user by email; then: return set user', () => {

    userService.getUserByEmail = mockGetUserByEmail.mockReturnValue(user);

   
    const result = userService.getUserByEmail(user.getEmail());


    expect(mockGetUserByEmail).toHaveBeenCalledTimes(1);
    expect(mockGetUserByEmail).toHaveBeenCalledWith(user.getEmail());
    expect(result).toEqual(user);
});
