

export const checkValidateEmail = (email) => {
    if(!email) return "Email is required.";
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    
    if(!isEmailValid) return "Email ID is not valid.";
    return null;
}

export const checkValidatePassword = (password) => {
    if(!password) return "Password is required."
    const isPasswordValid = (/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/).test(password);

    if(!isPasswordValid) return "Password must be 8+ chars with 1 uppercase, 1 number, 1 special character.";
    return null;
}

export const checkValidateName = (name) => {
    if(!name){
        return "Name is required.";
    }
    if(name.trim().length < 2){
        return "Name must be at leadt 2 characters.";
    }
    if(name.trim().length > 15){
        return "Name must be less than 15 characters.";
    }
    if(!/^[a-zA-Z '-]{2,50}$/.test(name)){
        return "Name can only contain letters, spaces, hyphens.";
    }
    return null;
}

