import React, { useReducer } from 'react'
import ProjectContext from './projectContext'
import ProjectReducer from './projectReducer'
import { store, database, timeStamp } from '../../firebase/config'
import { GET_PROJECTS } from '../types'
import M from 'materialize-css/dist/js/materialize.min.js'

const ProjectState = (props) => {

    const initalState = {
        loading: true,
        projects: [],
    }

    const [state, dispatch] = useReducer(ProjectReducer, initalState);

    const uploadImage = (file, user) => {
        const dbRef = database.ref(file.name);
        const collectionRef = store.collection('uploads');
        dbRef.put(file).on('state_changed', snap => {
            // progress
        }, err => {
            console.error(err);
        }, async () => {
            try {
                const url = await dbRef.getDownloadURL();
                collectionRef.add({ url, user, createdAt: timeStamp() });
                M.toast({ html: 'Photo Uploaded' })
            } catch (err) {
                console.error(err);
            }
        });
    }


    const addProject = async ({ formData, user }) => {
        uploadImage(formData, user);
    }

    const getProjects = async (data) => {
        dispatch({
            type: GET_PROJECTS,
            payload: data
        })
    }

    const getProjectsByUser = async (userId) => {
        console.log(userId);
    }

    return (
        <ProjectContext.Provider value={{
            loading: state.loading,
            projects: state.projects,
            getProjects,
            getProjectsByUser,
            addProject,
            uploadImage
        }}>
            { props.children }
        </ProjectContext.Provider>
    )
}

export default ProjectState
