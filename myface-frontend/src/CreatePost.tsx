import { CreatePostRequest } from '../../src/models/api/createPostRequest'
import { useState, FormEventHandler, ChangeEventHandler } from "react";

function ErrorDiv(props: any) {
    if (props.isValidated === false) {
        return (
            <div>{props.errors}</div>
        )
    }
}


export default function CreatePost() {
    const [post, setPost] = useState<CreatePostRequest>({
        message: '',
        imageUrl: '',
    })

    const [isValidated, setIsValidated] = useState<boolean>(true);
    const [errors, setErrors] = useState<string>();
    
    const validateInput = (post: any) => {
        let error: string = '';
        const urlRegex =  "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
        // /((@[a-z\d-]+)\.([a-z\d-]){2,}(\.[a-z]{2,})?)+$/gi
        if (!post.imageUrl.match(urlRegex)) {
            error = "Please enter a valid URL";
            setErrors(error);
            setIsValidated(false);
        }
        if (post.message === '') {
            error = "Plase enter a message";
            setErrors(error);
            setIsValidated(false);
        }
    
    }


    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(post);
        validateInput(post);
    }
    return(
        <div>
            <h1>Create Post</h1>

            <ErrorDiv errors={errors} isValidated={isValidated} />
            <form onSubmit={handleSubmit}>
                <label>
                    Message:
                    
                    <input type="text" name="message" value={post.message} onChange={handleChange}/>
                </label>
                <label>
                    ImageUrl:
                    <input type="text" name="imageUrl" value={post.imageUrl} onChange={handleChange}/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
