import React from 'react';
import * as filestack from 'filestack-js';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import AddAPhoto from '@material-ui/icons/AddAPhoto';



const styles = theme => ({
   

 });


class ImageUpload extends React.Component {
   constructor(props) {
       super(props);
       this.state = { file: '', imagePreviewUrl: '' };
       this.apiKey = 'ARzYlU4xfRaiK1QMTe6Qpz'
       this.client = filestack.init(this.apiKey);
       this.options = {
           uploadInBackground: false,
           onUploadDone: this.showFileData
       };
   }
   

   
   showFileData = (response) => {
    //    console.log(response);
       console.log(this.state);

       
       

       this.props.dispatch({
           type:'UPDATE_PROFILE',
           payload: response.filesUploaded[0]
       })

   }


   render() {

       const { classes } = this.props;


       return (
           <div>
               {/* <label value="fileupload">Upload Profile Picture</label> */}
               {/* <input type="file" id="fileupload"/> */}
               
               <IconButton size="small" onClick={() => this.client.picker(this.options).open()} variant="contained" color="default" className={classes.button}>
                  <AddAPhoto />
               </IconButton>
               
               </div>
       )
   }
}
export default connect()(withStyles(styles)(ImageUpload));