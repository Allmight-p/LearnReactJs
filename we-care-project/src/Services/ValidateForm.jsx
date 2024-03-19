
const ValidateForm = (name, value) => {
    switch(name){
        case "name":
            if(!value || (value.length <= 2 || value.length > 50)){
                return "Name should have 3 to 50 characters";
            }
            return "";
        
        case "password":
            if(!value || (value.length <= 4 || value.length > 10)){
                return "Password should have 5 to 10 characters";
            }
            return "";

        case "gender":
            if(!value){
                return "required";
            }
            return "";

        case "dateOfBirth":
            if((value <= 19 || value > 100) || !value){
                return "Age should be between 20 and 100 years";
            }
            return "";

        case "mobileNumber":
            if(!value || (value.length !== 10)){
                return "Mobile Number should have 10 digits";
            }
            return "";

        case "speciality":
            if(!value || (value.length <= 9 || value.length > 50)){
                return "Speciality should have 10 to 50 characters";
            }
            return "";
        
        case "coachid":
            if(!value){
                return "required";
            }
            return "";

        case "pincode" :
            if(!value || (value.length < 6)){
                return "Pincode should have 6 digits";
            }
            return "";
        case "city":
            if(!value || (value.length <= 5 || value.length > 20)){
                return "City should have 6 to 20 characters";
            }
            return "";
        case "state":
            if(!value || (value.length <= 5 || value.length > 20)){
                return "State should have 6 to 20 characters";
            }
            return "";
        case "country":
            if(!value || (value.length <= 5 || value.length > 20)){
                return "Country should have 6 to 20 characters";
            }
            return "";
        case "email":
            if(!value){
                return "Required";
            }
            return "";
        case "Userid":
            if(!value){
                return "Required";
            }
            return "";
        case "slot":
            if(!value){
                return "Required";
            }
            return "";
        case "appointmentDate":
            if(!value){
                return "Required";
            }
            else{
            var d1 = new Date(value);
            var d2 = new Date();
            d2.setDate(d2.getDate() + 7);
            if(d1 > d2){
                return "date should be any upcoming 7 days";
            }  
            }
            return "";

        default :
            return "";
    }
}

export default ValidateForm;