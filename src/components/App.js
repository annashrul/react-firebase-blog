import React, { Component } from 'react';
import {database} from "../firebase";
import _ from "lodash";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';


class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      title : "",
      body  : "",
      posts : {}
    };
    this.onHandleChange   = this.onHandleChange.bind(this);
    this.onHandleSubmit   = this.onHandleSubmit.bind(this);
  }
  
  //lifecycle
  componentDidMount(){
    database.on('value', snapshot => {
      this.setState({
        posts : snapshot.val()
      });
    });
  }
  
  //render post from firebase
  renderPost(){
    return _.map(this.state.posts, (post, key) => {
	    return (
        <div key={key}>
          <h2>{post.title}</h2>
          <ul>
            <li>{renderHTML(post.body)}</li>
          </ul>
        </div>
      );
	
    });
  }
	
	onHandleChange(e){
    this.setState({
      body : e,
    })
  }
  
  
  onHandleSubmit(e){
    e.preventDefault();
    const post = {
      title : this.state.title,
      body  : this.state.body,
    };
    if(post){
      database.push(post);
      this.setState({
        title : "",
        body  : ""
      });
      alert("data berhasil disimpan")
    }else{
      alert("data gagal disimmpan")
    }
    
    
  }
  
  render() {
    return (
      <div className="container">
        <form onSubmit={this.onHandleSubmit}>
          <div className="form-group">
            <input
              type="text" className="form-control" name="title" placeholder="Title" ref="title"
              value={this.state.title} onChange={(e) => {this.setState({title: e.target.value})}}/>
          </div>
          <div className="form-group">
            <ReactQuill
              modules={App.modules}
              format={App.formats}
              placeholder="Body"
              defaultValue={this.state.body}
              onChange={this.onHandleChange}/>
          </div>
          <button className="btn btn-primary">Post</button>
        </form>
  
        <br/>
        
        {this.renderPost()}
        
        
      </div>
    );
  }
}

App.modules = {
  toolbar: [
    [{header:'1'},{header:'2'},{font:[]}],
    [{size:[]}],
    ['bold','italic','underline','strike','blockquote'],
    [{list:'ordered'},{list:'bullet'}],
    ['link','image','video'],
    ['clean'],
    ['code-block']
  ]
};

App.formats = [
  'header','font','size',
  'bold','italic','underline','strike','blockquote',
  'list','bullet','link','image','video','code-block'
];

export default App;