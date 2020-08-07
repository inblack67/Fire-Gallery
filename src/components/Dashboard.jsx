import React, { useContext, useEffect } from 'react'
import AddProject from './AddProject'
import ProjectContext from '../context/project/projectContext'
import Projects from './Projects'
import { store } from '../firebase/config'

const Dashboard = () => {

    useEffect(() => {
        const unSubscribe = store.collection('uploads').orderBy('createdAt', 'desc').onSnapshot((snap) => {
            let docs = [];
            snap.forEach(doc => {
                docs.push({...doc.data(), id: doc.id});
            })
            getProjects(docs);
        })
        return () => {
            unSubscribe();
        }
        // eslint-disable-next-line
    }, [])


    const projectContext = useContext(ProjectContext);
    const { getProjects } = projectContext;

    return (
        <div className='center'>
            <p className="flow-text">Add Project</p>
            <AddProject />
            <Projects />
        </div>
    )
}

export default Dashboard
