import * as React from 'react';
import {connect} from 'react-redux';
import { fetchPOST, uploadFileRequest, fetchFormPOST } from '../../utils';
import { ReduxAction, AppDNACode, AppDetailState, uiLinkParams } from '../../../../types';
import { Hash } from '../../../../holochain';
// import './RegisterApp.css';

// core components
import Button from "../../components/CustomButtons/Button.jsx";

/*tslint:disable jsx-no-lambda*/
/*tslint:disable jsx-no-string-ref*/

type FileUploadProps = {
  addButtonProps:{color: string, round: boolean},
  changeButtonProps:{color: string, round: boolean},
  removeButtonProps:{color: string, round: boolean},
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentAppDetails: {Entry: AppDetailState, Hash: Hash},
  appCode: AppDNACode,
  UIappLink: uiLinkParams,
  returnState: () => void,
  uploadRequest: () => void,
  uploadFileSuccess: () => void,
  uploadFileError: () => void,
  onFileUpdate: (file) => void,
}

type inputState =  string | number | string[];
type FileUploadState = {
  file: inputState | null,
  fileName: string | null,
  errorMessage: string | undefined,
}

class FileUpload extends React.Component<FileUploadProps, FileUploadState>  {
  constructor(props: any) {
    super(props);
    this.state = ({
      file: null,
      fileName: null,
      errorMessage: "",
    });
    this.handleChange = this.handleChange.bind(this);
    // this.fileInput = React.createRef();
  }

  public handleChange = (event: any) => {
   console.log("current file - on inputChange", event.target.files[0]);

   const input = event.target.files[0]
   const fileName = input.name;

   let fileUrl = "";
   const reader = new FileReader();
   reader.onload = () => {
     fileUrl = reader.result;
     console.log("fileURL : ", fileUrl);
   };

   reader.onloadend = () => {
       this.addNameToDataURI(fileUrl, fileName);
   };
   reader.readAsDataURL(input);
   const file = input
   this.props.onFileUpdate(file);
  }

  public addNameToDataURI=(dataURL, name) => {
    const fileURL = dataURL.replace(";base64", `;name=${name};base64`);
    this.setState({
      file: fileURL,
      fileName: name
     });
    console.log("this.state: ", this.state);
  }

    public handleClick() {
      // (this.fileInput as any).current.click();
      (this.refs as any).fileInput.click();
    }

    public handleRemove() {
      this.setState({
        file: null
      });
      // (this.fileInput as any).current.value = null;
      (this.refs as any).fileInput.value = null;
    }

  public render() {
    const {file} = this.state;
    return (
      <div className="fileinput text-center">
          <input id="linkUpload" type="file" name="fileInput" onChange={this.handleChange} ref="fileInput" /> {/* ref={this.fileInput} */}
          <div>
            {this.state.file === null ? (
              <Button {...this.props.addButtonProps} onClick={() => this.handleClick()}>Select File</Button>
            ) : (
              <span>
                <div>
                  <span style={{fontSize: "75px", color: "Mediumslateblue"}}>
                    <i className="fas fa-file-code"/>
                  </span>
                  <h6>{this.state.fileName ? this.state.fileName : <div/> }</h6>
                </div>
                <Button {...this.props.changeButtonProps} onClick={() => this.handleClick()}>Change File</Button>
                <br/>
                <Button {...this.props.removeButtonProps} onClick={() => this.handleRemove()}>
                  <i className="fas fa-times" /> Remove
                </Button>
              </span>
            )}
          </div>
        </div>
    );
  }
}

const mapStateToProps = ({currentAgent}) => ({currentAgent});
const mapDispatchToProps = dispatch => ({
  uploadRequest: () =>  dispatch({type: 'UPLOAD_FILE_REQUEST'}),
  uploadFileSuccess: () =>  dispatch({type: 'UPLOAD_FILE_SUCCESS'}),
  uploadFileError: () =>  dispatch({type: 'UPLOAD_FILE_ERROR'}),
  returnState: () => dispatch({type: 'RETURN_STATE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);