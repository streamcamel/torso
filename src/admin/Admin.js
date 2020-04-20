import React, { Component } from "react";
import { JsonToTable } from "react-json-to-table";
import Spinner from "./Spinner";
import Images from "./Images";
import Buttons from "./Buttons";

class Admin extends Component {
    state = {
        uploading: false,
        images: []
      }

      componentDidMount() {
        console.log(this.props.company);

        var url = 'https://api.streamcamel.com/companies/' + this.props.company;

        fetch(url)
        .then(res => res.json())
        .then(res => {
            this.setState({
                company: res[0],
                loading: false
            })
        })
      }

   
      onChange = e => {
        const files = Array.from(e.target.files)
        this.setState({ uploading: true })
    
        const formData = new FormData()
    
        files.forEach((file, i) => {
          formData.append(i, file)
        })

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }
    
        fetch(`api.streamcamel.com/company/logo/upload?slug=` + this.props.company, {
          method: 'POST',
          body: formData
        })
        .then(handleErrors)
        .then(res => res.json())
        .then(images => {
          this.setState({ 
            uploading: false,
            images
          })
        })
      }
    
      removeImage = id => {
        this.setState({
          images: this.state.images.filter(image => image.public_id !== id)
        })
      }
      
      render() {
        const { uploading, images, company } = this.state
    
        const content = () => {
          switch(true) {
            case uploading:
              return <Spinner />
            case images.length > 0:
              return <Images images={images} removeImage={this.removeImage} />
            case company != undefined:
                const imageUrl = 'https:' + company.url;
                const camelUrl = company.camel_url != undefined ? 'https:' + company.camel_url : "";

                return <div>
                        Admin Page for {company.name}
                        <JsonToTable json={company} />
                        IGDB: <img src={imageUrl}/>
                        <p></p>Override: 
                        <img src={camelUrl}/>
                        <input type='file' id='single' onChange={this.onChange} /> 
                        </div>;
          }
        }
    
        return (
          <div>
            <div className='buttons'>
              {content()}
            </div>
          </div>
        )
      }
}
 
export default Admin;