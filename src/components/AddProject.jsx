import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import ProjectContext from '../context/project/projectContext'
import AuthContext from '../context/auth/authContext'

const AddProject = () => {

    const { register, handleSubmit, errors } = useForm();
    const [submitting, setSubmitting] = useState(false);

    const authContext = useContext(AuthContext);
    const { user } = authContext;

    const projectContext = useContext(ProjectContext);
    const { addProject } = projectContext;

    return (
        <div>
            <form onSubmit={handleSubmit((formData) => {
                setSubmitting(true);
                const photo = formData.file[0];
                addProject({ formData: photo, user: { photo: user.photoURL, id: user.uid, name: user.displayName } });
                setSubmitting(false);
            })}>
                <div className="file-field input-field">
                    <div className="btn white black-text">
                        <span>Image</span>
                        <input type="file" name='file' ref={register({ required: 'Required!' })} required />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                        {errors.file ? <span className="red-text helper-text"> {errors.file.message} </span> : <span className="helper-text">Add Image</span>}
                    </div>
                </div>
                <div className="input-field">
                    <button type="submit" className='btn red' disabled={submitting}>
                        Upload
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProject
