import React, { useContext } from 'react'
import ProjectItem from './ProjectItem'
import ProjectContext from '../context/project/projectContext'
import Preloader from './Preloader'

const Projects = () => {

    const projectContext = useContext(ProjectContext)

    const { loading, projects } = projectContext;

    if(loading){
        return <Preloader />
    }

    return (
        <div className='row'>
            { projects.map(project => <ProjectItem key={project.id} project={project} />) }
        </div>
    )
}

export default Projects
