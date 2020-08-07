import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min.js'

const ProjectItem = ({ project: { url, user: { name, photo } } }) => {

    const imageRef = useRef();

    useEffect(() => {
        M.Materialbox.init(imageRef.current);
    }, [imageRef]);


    return (
        <div className='col s12 m6 l6'>
            <div className="card small">
                <div className='card-content'>
                    <img src={url} alt="project" className="responsive-img materialboxed" ref={imageRef} />
                </div>
                <div className="card-action">
                    <div className="chip">
                        <img src={photo} alt="Publisher" />
                        {name}
                    </div>
                </div>
            </div>
        </div>
    )
}

ProjectItem.propTypes = {
    project: PropTypes.object.isRequired,
}

export default ProjectItem
