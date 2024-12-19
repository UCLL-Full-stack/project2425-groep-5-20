import familyService from '../../service/family.service';
import { FamilyInput, UserInput } from '../../types';
import { User } from '../../model/user';
import { Family } from '../../model/family';
import familyDB from '../../repository/family.db';
import userDb from '../../repository/user.db';

const userInput: UserInput = {
    id: 1,
    name: "john",
    email: "john@email.com",
    password: "john1234",
    role: "parent",
};

const userInput2: UserInput = {
    id: 2,
    name: "child",
    email: "child@email.com",
    password: "child123",
    role: "child",
};

const user = new User({...userInput,});
const user2 = new User({...userInput2,});

let family: Family;
let mockFamilyDBGetFamilyById: jest.Mock;

beforeEach(() => {
    family = new Family({
    id: 3,
    name: "De Boze familie",
    familyList: [user],
    owner: user,
    });
    mockFamilyDBGetFamilyById = familyDB.getFamilyById = jest.fn().mockReturnValue(family);
});

afterEach(() => {
    jest.clearAllMocks();
});

// Happy
test('given family exists, when deleteFamily is called, then it deletes the family', async () => {
    // given
    const familyId = family.getId();
    if (familyId === undefined) {
        throw new Error('Family ID is undefined');
    }
    const mockDeleteFamily = familyDB.deleteFamily = jest.fn();

    // when
    await familyService.deleteFamily(familyId, "admin");

    // then
    expect(mockFamilyDBGetFamilyById).toHaveBeenCalledTimes(1);
    expect(mockFamilyDBGetFamilyById).toHaveBeenCalledWith(familyId);
    expect(mockDeleteFamily).toHaveBeenCalledTimes(1);
    expect(mockDeleteFamily).toHaveBeenCalledWith(familyId);
});

test('given family exists, when addFamilyMember is called, then it adds the family member', async () => {
    // Given
    const familyId = family.getId();
    if (familyId === undefined) {
        throw new Error('Family ID is undefined');
    }
    const mockAddFamilyMember = familyDB.addFamilyMember = jest.fn().mockImplementation((familyId, email) => {
        family.getFamilyList().push(user2);
        return family;
    });
    
    // When
    await familyService.addFamilyMember(familyId, user2.getEmail(), "admin");

    // Then
    expect(mockFamilyDBGetFamilyById).toHaveBeenCalledTimes(1);
    expect(mockFamilyDBGetFamilyById).toHaveBeenCalledWith(familyId);
    expect(mockAddFamilyMember).toHaveBeenCalledTimes(1);
    expect(family.getFamilyList()).toContain(user2);
    expect(family.getFamilyList().length).toBe(2);
});


// Unhappy
test('given family does not exist, when deleteFamily is called, then it throws an error', async () => {
    // Given
    const nonExistentFamilyId = 999; 
    mockFamilyDBGetFamilyById = familyDB.getFamilyById = jest.fn().mockReturnValue(null); 
    
    // When
    let error;
    try {
        await familyService.deleteFamily(nonExistentFamilyId, "admin");
    } catch (e) {
        error = e;
    }

    // Then
    expect(error).toEqual(new Error('Family does not exist.')); 
    expect(mockFamilyDBGetFamilyById).toHaveBeenCalledTimes(1); 
    expect(familyDB.deleteFamily).not.toHaveBeenCalled(); 
});

test('given family exists, when addFamilyMember is called with a non-existent user, then it throws an error', async () => {
    // Given
    const familyId = family.getId();
    if (familyId === undefined) {
        throw new Error('Family ID is undefined');
    }
    const nonExistentUserEmail = "nonexistent@email.com";
    const mockGetUserByEmail = userDb.getUserByEmail = jest.fn().mockReturnValue(null);
    // When
    let error;
    try {
        await familyService.addFamilyMember(familyId, nonExistentUserEmail, "admin");
    } catch (e) {
        error = e;
    }

    // Then
    expect(error).toEqual(new Error('User does not exist.'));
    expect(mockFamilyDBGetFamilyById).toHaveBeenCalledTimes(1);
    expect(mockGetUserByEmail).toHaveBeenCalledTimes(1);
    expect(familyDB.addFamilyMember).not.toHaveBeenCalled();
});
