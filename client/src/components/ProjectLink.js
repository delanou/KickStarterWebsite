import React, { Component } from 'react';

class ProjectLink extends Component {
    render() {
        return(
            <div>
                <form>
                    <label>
                        Project URL:
                        <input type="text" name="name" />
                    </label>
                    
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default ProjectLink;