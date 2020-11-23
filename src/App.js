import React, {Component} from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

//state는 props값에 따라 내부 구현에 필요한 데이터들


class App extends Component {
  constructor(props){
    super(props); //부모클래스의 생성자가 호출되고 props를 설정
    this.max_content_id = 3;
    this.state = {
      mode: 'create',
      selected_content_id: 2,
      subject: {title:'WEB', sub:'world wide web'},
      welcome: {title:'welcome', desc:'hello, react'},
      contents:[
        {id:1, title:'html', desc:'html si fasd'},
        {id:2, title:'css', desc:'css si fasd'},
        {id:3, title:'js', desc:'js si fasd'},
      ]
    }
    //컴포넌트가 내부적으로 사용할 값은 state를 사용한다.
  }
  //render함수보다 먼저 실행되면서 그 컴포넌트를 초기화시켜주고 싶으면 constructor안에다가 코드를 작성
  
  getReadContent(){
    var i=0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data;  
          break;
        }
        i+=1;
  }
  
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        //add content to this.state.contents
        this.max_content_id += 1;
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        // //var newContents = Array.from(this.state.contents);
        // newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        //배열을 바꿀때는 concat 또는 push를 사용할때 Array.from을 사용해 복제하고 사용할 수있다
        //객체에서는 Object.assign()을 사용해서 복제할 수 있다.
        this.setState({
          contents: _contents
        }); 
        //push는 배열의 오리지널데이터를 변경시키므로 권장x, concat을 쓰면은 오리지널은 안바뀌고 변수에 할당됨
        //push를 해버리면 contents값이 바뀌므로 render함수가 다시 다 실행되버리므로 좋지않다.
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    }else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_title, _desc){
        //add content to this.state.contents
        this.max_content_id += 1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({
          contents: _contents
        }); 
        console.log(_title, _desc);
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    console.log('App render');
    return (
      <div className="App">
        <Subject 
          title= {this.state.subject.title}
          //상위 컴포넌트의 state값을 하위 컴포넌트의 props값으로 주는것은 가능하다!
          sub= {this.state.subject.sub}
          onChangePage = {function(){
            this.setState({mode: 'welcome'});
          }.bind(this)}
          >
        </Subject>
        <TOC onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id: Number(id),
          });
        }.bind(this)} 
        data={this.state.contents}>
        </TOC>
        <Control onChangeMode={function(_mode){
          this.setState({
            mode: _mode
          })
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    )
  }
}

export default App;
//render함수는 어떤html을 그릴것인지 결정하는 함수인데 props나 state값이 바뀌면 render함수도 다시 호출되고 하위 컴포넌트의 render함수도 다시 호출된다. 그러므로 화면이 다시 그려짐.