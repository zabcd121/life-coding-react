import React, {Component} from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

//state는 props값에 따라 내부 구현에 필요한 데이터들


class App extends Component {
  constructor(props){
    super(props); //부모클래스의 생성자가 호출되고 props를 설정
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
  render() {
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      var i=0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i+=1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onsubmit={function(_title, _desc){}.bind(this)}></CreateContent>
    }
    console.log('render', this);
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
        {_article}
      </div>
    )
  }
}

export default App;
//render함수는 어떤html을 그릴것인지 결정하는 함수인데 props나 state값이 바뀌면 render함수도 다시 호출되고 하위 컴포넌트의 render함수도 다시 호출된다. 그러므로 화면이 다시 그려짐.