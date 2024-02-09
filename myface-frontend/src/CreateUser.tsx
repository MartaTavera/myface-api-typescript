import { useState, FormEventHandler, ChangeEventHandler } from "react";
import { CreateUserRequest } from "./models/api/createUserRequest";


function ErrorDiv(props: any) {
    if (props.isValidated === false) {
        return (
            <div>{props.errors}</div>
        )
    }
}
export const CreateUser: React.FC = () => {
    const [user, setUser] = useState<CreateUserRequest>({
        name: '',
        username: '',
        email: '',
        profileImageUrl: '',
        coverImageUrl: '',
    })
    
    const [isValidated, setIsValidated] = useState<boolean>(true);
    const [errors, setErrors] = useState<string>('');
    const validateInput = (user: any) => {
        let error: string = '';
        const emailRegex = /((@[a-z\d-]+)\.([a-z\d-]){2,}(\.[a-z]{2,})?)+$/gi;
        const urlRegex = "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"

        if (user.username.length < 2) {
            error = "The username is too short";
            setErrors(error);
            setIsValidated(false);
        }
        if (user.email === '') {
            error = "enter an email address";
            setErrors(error);
            setIsValidated(false);
        }
        if (!user.email.match(emailRegex)) {
            error = "Please enter a valid email address"
            setErrors(error);
            setIsValidated(false);

        }
        if (!user.profileImageUrl.match(urlRegex) || !user.coverImageUrl.match(urlRegex)) {
            error = "Please enter a valid URL;"
            setErrors(error);
            setIsValidated(false)
        }
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;
        setUser(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(user);
        validateInput(user);

        if (isValidated === true) {
            fetch("http://localhost:3001/users/create", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error(response.statusText);
                    }
                })
                .then(() => {
                    console.log("We'll be in touch soon.");
                })
                .catch((err) => {
                    console.log(err.toString());
                });
        }
    };

    return (
        <div className="flexContainer">
            <h1>Create User</h1>
            <ErrorDiv errors={errors} isValidated={isValidated} />
            <form onSubmit={handleSubmit}>
                <div className="formContainer">
                    <label>
                        Name:
                        <br />
                        <input type="text" name="name" value={user.name} onChange={handleChange} />
                        <br />
                    </label>
                    <label>
                        Username:
                        <br />
                        <input type="text" name="username" value={user.username} onChange={handleChange} />
                        <br />
                    </label>
                    <label>
                        Email:
                        <br />
                        <input type="text" name="email" value={user.email} onChange={handleChange} />
                        <br />
                    </label>
                    <label>
                        ProfileImageUrl:
                        <br />
                        <input type="text" name="profileImageUrl" value={user.profileImageUrl} onChange={handleChange} />
                        <br />
                    </label>
                    <label>
                        CoverImageUrl:
                        <br />
                        <input type="text" name="coverImageUrl" value={user.coverImageUrl} onChange={handleChange} />
                        <br />
                    </label>
                </div>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}