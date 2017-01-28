import React, { Component } from 'react';
import DropZone from 'react-dropzone';
import request from 'superagent';

const AddProp = ({newProp, handleChangeNPname, handleChangeNPdata}) => {
    return (
        <div>
            property name:&nbsp;
            <input name="name" value={newProp.name} onChange={handleChangeNPname} />
            <br />
            propoerty value:&nbsp;
            <input name="data" value={newProp.data} onChange={handleChangeNPdata} />
        </div>
    )
}

const AddChild = ({newProp, handleChangeNPname}) => {
    return (
        <div>
            child name:&nbsp;
            <input name="name" value={newProp.name} onChange={handleChangeNPname} />
        </div>
    )
}

class AddPic extends Component {
    constructor(props) {
        super(props)
        this.state = { upfs: [] }
    }
    onImageDrop(files) {
        this.setState({ upfs: files })
        console.log(JSON.stringify(files))
        var p = new FormData()
        p.append('p1', files[0])
        request.post('/upload')
            .send(p)
            .end(function (err, resp) {
                if (err) console.error(err)
                return resp
            })
    }
    /*
         onDrop: function(acceptedFiles){
            var req = request.post('/upload');
            acceptedFiles.forEach((file)=> {
                req.attach(file.name, file);
            });
            req.end(callback);
        }
    */
    render() {
        return (
            <div>
                <DropZone
                    multiple={false}
                    accept="image/*"
                    onDrop={this.onImageDrop.bind(this)} >
                    <p>Drop an image or click to select a file to upload.</p>
                </DropZone>
                {this.state.upfs.length > 0 ?
                    <div>
                        <h6>Uping {this.state.upfs.length} files</h6>
                        <div>
                            {this.state.upfs.map((file) => <img src={file.preview} alt="preview" />)}
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export { AddProp, AddChild, AddPic }