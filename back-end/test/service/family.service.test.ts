import familyService from '../../service/family.service';
import { FamilyInput, UserInput } from '../../types';
import { User } from '../../model/user';
import { Family } from '../../model/family';
import familyDB from '../../repository/family.db';

const userInput: UserInput = {
    id: 1,
    name: "john",
    email: "john@email.com",
    password: "john1234",
    role: "parent",
};

const user = new User({
    ...userInput,
});

const familyInput: FamilyInput = {
    id: 3,
    name: 'De Boze familie',
    familyList: [user],
    owner: user,
};

const family = new Family({
    ...familyInput,
});

let mockFamilyDBGetFamilyById: jest.Mock;

beforeEach(() => {
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
    await familyService.deleteFamily(familyId);

    // then
    expect(mockFamilyDBGetFamilyById).toHaveBeenCalledTimes(1);
    expect(mockFamilyDBGetFamilyById).toHaveBeenCalledWith(familyId);
    expect(mockDeleteFamily).toHaveBeenCalledTimes(1);
    expect(mockDeleteFamily).toHaveBeenCalledWith(familyId);
});


// Unhappy
test('given family does not exist, when deleteFamily is called, then it throws an error', async () => {
    // Given
    const nonExistentFamilyId = 999; 
    mockFamilyDBGetFamilyById = familyDB.getFamilyById = jest.fn().mockReturnValue(null); 
    
    // When
    let error;
    try {
        await familyService.deleteFamily(nonExistentFamilyId);
    } catch (e) {
        error = e;
    }

    // Then
    expect(error).toEqual(new Error('Family does not exist.')); 
    expect(mockFamilyDBGetFamilyById).toHaveBeenCalledTimes(1); 
    expect(familyDB.deleteFamily).not.toHaveBeenCalled(); 
});
